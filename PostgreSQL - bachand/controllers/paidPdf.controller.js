import fs from "fs";
import bcrypt from "bcrypt";
import multer from "multer";
import crypto from "crypto";
import { db } from "../database/db.js";
import { paid_pdfs, pdf_access_codes } from "../database/schema.js";
import { eq, and, desc } from "drizzle-orm";
import { uploadPdfToCloud } from "../utils/uploadToCloud.js";
import cloudinary from "../config/cloudinary.js";

/* ===============================
   IP BASED RATE LIMIT STORAGE
================================= */

const ipAttempts = new Map();

function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  return forwarded ? forwarded.split(",")[0].trim() : req.socket.remoteAddress;
}

function checkIpBlocked(ip) {
  const data = ipAttempts.get(ip);
  if (!data) return false;
  if (data.blockedUntil && data.blockedUntil > Date.now()) return true;
  if (data.blockedUntil && data.blockedUntil <= Date.now()) ipAttempts.delete(ip);
  return false;
}

function registerFailedAttempt(ip) {
  const data = ipAttempts.get(ip) || { attempts: 0, blockedUntil: 0 };
  data.attempts += 1;
  if (data.attempts >= 3) {
    data.blockedUntil = Date.now() + 30 * 60 * 1000;
  }
  ipAttempts.set(ip, data);
  return data;
}

function resetIpAttempts(ip) {
  ipAttempts.delete(ip);
}

/* ===============================
   MULTER
================================= */

export const upload = multer({
  dest: "temp/",
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF allowed"));
    }
    cb(null, true);
  },
});

/* ===============================
   HELPERS
================================= */

function extractPublicId(url) {
  if (!url || typeof url !== "string") return null;
  try {
    const parts = url.split("/");
    const uploadIndex = parts.indexOf("upload");
    if (uploadIndex === -1) return null;
    let start = uploadIndex + 1;
    if (parts[start]?.match(/^v\d+$/)) start++;
    while (start < parts.length - 1 && parts[start].includes(",") && parts[start].includes("_")) {
      start++;
    }
    const lastPart = parts[parts.length - 1];
    const nameNoExt = lastPart.replace(/\.[^/.]+$/, "");
    return parts.slice(start, -1).concat(nameNoExt).join("/");
  } catch {
    return null;
  }
}

/* ===============================
   CREATE PAID PDF
================================= */

export const createPaidPdf = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false });
    }

    const cloudUrl = await uploadPdfToCloud(req.file.path);
    fs.unlinkSync(req.file.path);

    const { title_ka, title_en, description_ka, description_en, includes_ka, includes_en, price } = req.body;

    await db.insert(paid_pdfs).values({
      title_ka, title_en,
      description_ka, description_en,
      includes_ka, includes_en,
      price,
      pdf_url: cloudUrl,
    });

    res.json({ success: true });
  } catch (err) {
    console.error("createPaidPdf error:", err);
    res.status(500).json({ success: false });
  }
};

/* ===============================
   GET PAID PDFS
================================= */

export const getPaidPdfs = async (req, res) => {
  try {
    const pdfs = await db
      .select({
        id: paid_pdfs.id,
        title_ka: paid_pdfs.title_ka,
        title_en: paid_pdfs.title_en,
        description_ka: paid_pdfs.description_ka,
        description_en: paid_pdfs.description_en,
        includes_ka: paid_pdfs.includes_ka,
        includes_en: paid_pdfs.includes_en,
        price: paid_pdfs.price,
      })
      .from(paid_pdfs);

    res.json({ success: true, data: pdfs });
  } catch (err) {
    console.error("getPaidPdfs error:", err);
    res.status(500).json({ success: false });
  }
};

/* ===============================
   GENERATE ACCESS CODE
================================= */

export const generateAccessCode = async (req, res) => {
  try {
    const { id } = req.params;

    const plainCode = crypto.randomBytes(6).toString("hex");
    const hash = await bcrypt.hash(plainCode, 10);
    const expiresAt = Date.now() + 24 * 60 * 60 * 1000;

    await db.insert(pdf_access_codes).values({
      pdf_id: parseInt(id),
      code_hash: hash,
      expires_at: expiresAt,
      used: false,
    });

    res.json({ success: true, code: plainCode });
  } catch (err) {
    console.error("generateAccessCode error:", err);
    res.status(500).json({ success: false });
  }
};

/* ===============================
   VERIFY & DOWNLOAD
================================= */

export const verifyAndDownload = async (req, res) => {
  try {
    const { id } = req.params;
    const { code } = req.body;

    if (!code || typeof code !== "string") {
      return res.status(400).json({ success: false, message: "Invalid code" });
    }

    const ip = getClientIp(req);

    if (checkIpBlocked(ip)) {
      return res.status(403).json({
        success: false,
        message: "Too many failed attempts. Try again in 30 minutes.",
      });
    }

    const [record] = await db
      .select()
      .from(pdf_access_codes)
      .where(
        and(
          eq(pdf_access_codes.pdf_id, parseInt(id)),
          eq(pdf_access_codes.used, false)
        )
      )
      .orderBy(desc(pdf_access_codes.created_at))
      .limit(1);

    if (!record) {
      registerFailedAttempt(ip);
      return res.status(400).json({ success: false, message: "Invalid code" });
    }

    const now = Date.now();

    if (record.blocked_until && record.blocked_until > now) {
      return res.status(403).json({ success: false, message: "დაბლოკილია 30 წუთით" });
    }

    if (record.expires_at && record.expires_at < now) {
      return res.status(400).json({ success: false, message: "კოდი ვადაგასულია" });
    }

    const match = await bcrypt.compare(code, record.code_hash);

    if (!match) {
      registerFailedAttempt(ip);

      const attempts = (record.attempts || 0) + 1;
      const blockedUntil = attempts >= 3 ? now + 30 * 60 * 1000 : (record.blocked_until || 0);

      await db
        .update(pdf_access_codes)
        .set({ attempts, blocked_until: blockedUntil })
        .where(eq(pdf_access_codes.id, record.id));

      return res.status(400).json({ success: false, message: "Invalid code" });
    }

    resetIpAttempts(ip);

    await db
      .update(pdf_access_codes)
      .set({ used: true })
      .where(eq(pdf_access_codes.id, record.id));

    const [pdf] = await db
      .select({ pdf_url: paid_pdfs.pdf_url })
      .from(paid_pdfs)
      .where(eq(paid_pdfs.id, parseInt(id)))
      .limit(1);

    if (!pdf?.pdf_url) {
      return res.status(404).json({ success: false, message: "File not found" });
    }

    const downloadUrl = pdf.pdf_url.replace("/upload/", "/upload/fl_attachment/");

    return res.json({ success: true, url: downloadUrl });
  } catch (err) {
    console.error("verifyAndDownload error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

/* ===============================
   DELETE PAID PDF
================================= */

export const deletePaidPdf = async (req, res) => {
  try {
    const { id } = req.params;

    const [pdf] = await db
      .select({ pdf_url: paid_pdfs.pdf_url })
      .from(paid_pdfs)
      .where(eq(paid_pdfs.id, parseInt(id)))
      .limit(1);

    if (!pdf) {
      return res.status(404).json({ success: false, message: "PDF არ მოიძებნა" });
    }

    if (pdf.pdf_url) {
      const publicId = extractPublicId(pdf.pdf_url);
      if (publicId) {
        try {
          await cloudinary.uploader.destroy(publicId, { resource_type: "raw" });
        } catch (cloudErr) {
          console.error("Cloudinary delete failed:", cloudErr.message);
        }
      }
    }

    // schema-ში onDelete: 'cascade' გაქვს — paid_pdfs-ის წაშლა pdf_access_codes-საც წაშლის
    await db.delete(paid_pdfs).where(eq(paid_pdfs.id, parseInt(id)));

    res.json({ success: true, message: "PDF და კოდები წაიშალა" });
  } catch (err) {
    console.error("deletePaidPdf error:", err);
    res.status(500).json({ success: false, message: "წაშლა ვერ მოხერხდა" });
  }
};