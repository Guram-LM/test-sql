// routes/dynamic.js
import express from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";
import { db } from "../database/db.js";                  
import * as schema from "../database/schema.js";
import { eq, desc, count, sql } from "drizzle-orm";
import rateLimit from "express-rate-limit";
import { extractPublicId } from "../utils/cloudinaryHelpers.js";
import { adminAuth } from "../middleware/adminAuth.js";
import { parseYouTubeUrl } from "../utils/youtube.js";

const router = express.Router();

/* ================================================================
   CONFIGURATION
================================================================ */

// resource name → drizzle table object
const TABLE_MAP = {
  offers:                schema.offers,
  contacts:              schema.contacts,
  orders:                schema.orders,
  individualoffersOrder: schema.individualoffersOrder,
  companyoffers:         schema.companyoffers,
  free_pdfs:             schema.free_pdfs,
  free_pdf_downloads:    schema.free_pdf_downloads,
  paid_pdfs:             schema.paid_pdfs,
  videos:                schema.videos,
  articles:              schema.articles,
  social_media:          schema.social_media,
  feedback:              schema.feedback,
};

const READ_RESOURCES  = new Set(Object.keys(TABLE_MAP));
const WRITE_RESOURCES = new Set(Object.keys(TABLE_MAP));

const PUBLIC_WRITE_RESOURCES = new Set(["contacts", "orders", "free_pdf_downloads"]);
const ISREAD_SUPPORTED       = new Set(["free_pdf_downloads"]);

console.log("იუსერის ტოკენი", adminAuth)

const RESOURCE_FIELDS = {
  offers:                ["title","description","activities","image_url"],
  contacts:              ["name","email","message"],
  orders:                ["firstName","lastName","email","phone","message","courseTitle","coursePrice"],
  individualoffersOrder: ["title_ka","title_en","Program_ka","Program_en","programDuration_ka","programDuration_en","totalHours_ka","totalHours_en","benefit_ka","benefit_en","price","description_ka","description_en","activities","results","image_url"],
  companyoffers:         ["title_ka","title_en","programDuration_ka","programDuration_en","totalHours_ka","totalHours_en","benefit_ka","benefit_en","price","description_ka","description_en","activities","results","image_url"],
  free_pdfs:             ["title_ka","title_en","description_ka","description_en","pdf_url"],
  free_pdf_downloads:    ["pdf_title","firstName","lastName"],
  paid_pdfs:             ["title_ka","title_en","description_ka","description_en","includes_ka","includes_en","price","pdf_url"],
  videos:                ["title_ka","title_en","description_ka","description_en","youtube_id","youtube_embed","video_url","image_url"],
  articles:              ["title_ka","title_en","MagazineName_ka","MagazineName_en","subtitle_ka","subtitle_en","description_ka","description_en","article_url","image_url"],
  social_media:          ["platform","title_ka","title_en","description_ka","description_en","link","image_url"],
  feedback:              ["title_ka","title_en","image_url"],
};

/* ================================================================
   STORAGE CONFIG
================================================================ */


console.log("adminAuth loaded as:", Array.isArray(adminAuth) ? "array" : "NOT array");




const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "offers_images",
    allowed_formats: ["jpg","jpeg","png","webp"],
    transformation: [{ quality: "auto", fetch_format: "auto" }],
  },
});

const pdfStorage = new CloudinaryStorage({
  cloudinary,
  params: { folder: "pdf_files", resource_type: "raw", allowed_formats: ["pdf"] },
});

const upload    = multer({ storage: imageStorage, limits: { fileSize: 5  * 1024 * 1024 } });
const pdfUpload = multer({ storage: pdfStorage,   limits: { fileSize: 20 * 1024 * 1024 } });

/* ================================================================
   RATE LIMIT
================================================================ */

const postLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,

  keyGenerator: (req) =>
    req.headers["x-forwarded-for"]?.split(",")[0].trim() ?? req.ip,

  skip: (req) => req.auth?.role === "admin",

  handler: (_req, res) =>
    res.status(429).json({
      success: false,
      message: "Too many requests. Try again later.",
    }),
});

/* ================================================================
   HELPERS
================================================================ */

function getTable(resource) {
  return TABLE_MAP[resource] ?? null;
}

function sanitizeFields(resource, fields) {
  const allowed = RESOURCE_FIELDS[resource];
  if (!allowed) return {};
  return Object.fromEntries(
    Object.entries(fields).filter(([k]) => allowed.includes(k))
  );
}

function serializeActivities(fields) {
  ["activities","activities_ka","activities_en","results"].forEach((k) => {
    if (Array.isArray(fields[k])) fields[k] = JSON.stringify(fields[k]);
  });
}

function parseActivities(row) {
  ["activities","activities_ka","activities_en","results"].forEach((k) => {
    if (typeof row[k] === "string" && (row[k].startsWith("[") || row[k].startsWith("{"))) {
      try { row[k] = JSON.parse(row[k]); } catch {}
    }
  });
  return row;
}

async function cleanupCloudinary(item) {
  const tasks = [];
  if (item?.image_url) {
    const pid = extractPublicId(item.image_url);
    if (pid) tasks.push(cloudinary.uploader.destroy(pid, { resource_type: "image" }).catch(() => {}));
  }
  if (item?.pdf_url) {
    const pid = extractPublicId(item.pdf_url);
    if (pid) tasks.push(cloudinary.uploader.destroy(pid, { resource_type: "raw" }).catch(() => {}));
  }
  if (tasks.length) await Promise.allSettled(tasks);
}

/* ================================================================
   MIDDLEWARE
================================================================ */

function canRead(req, res, next) {
  if (!READ_RESOURCES.has(req.params.resource))
    return res.status(403).json({ success: false, message: "Access denied" });
  next();
}

function canWrite(req, res, next) {
  if (!WRITE_RESOURCES.has(req.params.resource))
    return res.status(403).json({ success: false, message: "Access denied" });
  next();
}

/* ================================================================
   ROUTES
================================================================ */

/* ── GET /:resource/unread-count ── */
router.get("/:resource/unread-count", canRead, async (req, res) => {
  const { resource } = req.params;

  if (!ISREAD_SUPPORTED.has(resource))
    return res.json({ success: true, count: 0 });

  try {
    const table = getTable(resource);
    const [{ value }] = await db   // ← drizzleDb → db
      .select({ value: count() })
      .from(table)
      .where(eq(table.isRead, false));

    res.json({ success: true, count: Number(value) });
  } catch (e) {
    console.error("[unread-count]", e);
    res.status(500).json({ success: false, message: "Failed" });
  }
});

/* ── GET /:resource/:id ── */
router.get("/:resource/:id", canRead, async (req, res) => {
  const { resource, id } = req.params;
  const numericId = parseInt(id, 10);

  if (isNaN(numericId))
    return res.status(400).json({ success: false, message: "Invalid ID" });

  try {
    const table = getTable(resource);
    const rows = await db   // ← drizzleDb → db
      .select()
      .from(table)
      .where(eq(table.id, numericId))
      .limit(1);

    if (!rows.length)
      return res.status(404).json({ success: false, message: "Not found" });

    res.json({ success: true, data: parseActivities(rows[0]) });
  } catch (e) {
    console.error("[findById]", e);
    res.status(500).json({ success: false, message: "Failed" });
  }
});

/* ── GET /:resource (pagination) ── */
router.get("/:resource", canRead, async (req, res) => {
  const { resource } = req.params;
  const page   = Math.max(1,   parseInt(req.query.page  ?? "1",  10));
  const limit  = Math.min(100, Math.max(1, parseInt(req.query.limit ?? "50", 10)));
  const offset = (page - 1) * limit;

  try {
    const table = getTable(resource);

    const [rows, [{ value: total }]] = await Promise.all([
      db   // ← drizzleDb → db
        .select()
        .from(table)
        .orderBy(desc(table.created_at))
        .limit(limit)
        .offset(offset),

      db.select({ value: count() }).from(table),   // ← drizzleDb → db
    ]);

    res.json({
      success: true,
      data: rows.map(parseActivities),
      pagination: {
        page,
        limit,
        total: Number(total),
        pages: Math.ceil(Number(total) / limit),
      },
    });
  } catch (e) {
    console.error("[findMany]", e);
    res.status(500).json({ success: false, message: "Failed" });
  }
});

/* ── POST /:resource (admin) ── */
router.post(
  "/:resource",
  postLimiter,
  ...adminAuth,
  upload.single("image"),
  canWrite,
  async (req, res) => {
    const { resource } = req.params;
    const io = req.app.get("io");

    try {
      const raw = { ...req.body };
      serializeActivities(raw);

      // YouTube URL parsing
      const videoInput = raw.youtube_url || raw.video_url || raw.videoId;
      if (videoInput) {
        const parsed = parseYouTubeUrl(videoInput);
        if (!parsed) {
          await cleanupCloudinary({ image_url: req.file?.path });
          return res.status(400).json({ success: false, message: "Invalid YouTube URL" });
        }
        raw.youtube_id    = parsed.videoId;
        raw.youtube_embed = parsed.embedUrl;
        delete raw.youtube_url;
        delete raw.video_url;
        delete raw.videoId;
      }

      const fields = sanitizeFields(resource, raw);
      const insertData = {
        ...fields,
        ...(req.file?.path ? { image_url: req.file.path } : {}),
        ...(ISREAD_SUPPORTED.has(resource) ? { isRead: false } : {}),
      };

      if (Object.keys(insertData).length === 0) {
        await cleanupCloudinary({ image_url: req.file?.path });
        return res.status(400).json({ success: false, message: "No valid fields" });
      }

      const table = getTable(resource);
      const [inserted] = await db
        .insert(table)
        .values(insertData)
        .returning({ id: table.id });

      io?.emit("new-resource", { resource, id: inserted.id });
      res.status(201).json({
        success: true,
        message: "Created",
        id: inserted.id,
        url: req.file?.path,
      });
    } catch (e) {
      console.error("[insert]", e);
      await cleanupCloudinary({ image_url: req.file?.path });
      res.status(500).json({ success: false, message: "Failed" });
    }
  }
);

/* ── PUT /:resource/:id (admin) ── */
router.put(
  "/:resource/:id",
  ...adminAuth,
  upload.single("image"),
  canWrite,
  async (req, res) => {
    const { resource, id } = req.params;
    const io = req.app.get("io");
    const numericId = parseInt(id, 10);

    if (isNaN(numericId))
      return res.status(400).json({ success: false, message: "Invalid ID" });

    try {
      const raw = { ...req.body };

      if (raw.activities_ka || raw.activities_en) {
        try {
          raw.activities = JSON.stringify({
            ka: JSON.parse(raw.activities_ka || "[]"),
            en: JSON.parse(raw.activities_en || "[]"),
          });
        } catch {
          raw.activities = JSON.stringify({ ka: [], en: [] });
        }
        delete raw.activities_ka;
        delete raw.activities_en;
      }

      const table = getTable(resource);

      // ძველი სურათის წაშლა თუ ახალი ატვირთულია
      if (req.file?.path) {
        const existing = await db
          .select({ image_url: table.image_url })
          .from(table)
          .where(eq(table.id, numericId))
          .limit(1);

        if (existing[0]?.image_url)
          await cleanupCloudinary({ image_url: existing[0].image_url });

        raw.image_url = req.file.path;
      }

      const fields = sanitizeFields(resource, raw);

      if (Object.keys(fields).length === 0) {
        await cleanupCloudinary({ image_url: req.file?.path });
        return res.status(400).json({ success: false, message: "No valid fields" });
      }

      const updated = await db
        .update(table)
        .set(fields)
        .where(eq(table.id, numericId))
        .returning({ id: table.id });

      if (!updated.length)
        return res.status(404).json({ success: false, message: "Resource not found" });

      io?.emit("update-resource", { resource, id: numericId });
      res.json({ success: true, message: "Updated" });
    } catch (e) {
      console.error("[update]", e);
      await cleanupCloudinary({ image_url: req.file?.path });
      res.status(500).json({ success: false, message: "Failed" });
    }
  }
);

/* ── DELETE /:resource/:id (admin) ── */
router.delete("/:resource/:id", ...adminAuth, canWrite, async (req, res) => {
  const { resource, id } = req.params;
  const io = req.app.get("io");
  const numericId = parseInt(id, 10);

  if (isNaN(numericId))
    return res.status(400).json({ success: false, message: "Invalid ID" });

  try {
    const table = getTable(resource);

    const existing = await db
      .select()
      .from(table)
      .where(eq(table.id, numericId))
      .limit(1);

    if (!existing.length)
      return res.status(404).json({ success: false, message: "Not found" });

    await cleanupCloudinary(existing[0]);

    await db.delete(table).where(eq(table.id, numericId));

    io?.emit("delete-resource", { resource, id: numericId });
    res.json({ success: true, message: "Deleted" });
  } catch (e) {
    console.error("[delete]", e);
    res.status(500).json({ success: false, message: "Failed" });
  }
});

/* ── POST /:resource/mark-read (admin) ── */
router.post("/:resource/mark-read", ...adminAuth, canWrite, async (req, res) => {
  const { resource } = req.params;

  if (!ISREAD_SUPPORTED.has(resource))
    return res.json({ success: true, message: "Not applicable" });

  try {
    const table = getTable(resource);
    await db
      .update(table)
      .set({ isRead: true })
      .where(eq(table.isRead, false));

    res.json({ success: true, message: "Marked as read" });
  } catch (e) {
    console.error("[mark-read]", e);
    res.status(500).json({ success: false, message: "Failed to mark as read" });
  }
});

/* ── POST /public/:resource (public, no auth) ── */
router.post(
  "/public/:resource",
  postLimiter,
  upload.single("image"),
  async (req, res) => {
    const { resource } = req.params;

    if (!PUBLIC_WRITE_RESOURCES.has(resource))
      return res.status(403).json({ success: false, message: "Access denied" });

    try {
      const raw = { ...req.body };
      serializeActivities(raw);

      const fields = sanitizeFields(resource, raw);
      const insertData = {
        ...fields,
        ...(req.file?.path ? { image_url: req.file.path } : {}),
        ...(ISREAD_SUPPORTED.has(resource) ? { isRead: false } : {}),
      };

      if (Object.keys(insertData).length === 0)
        return res.status(400).json({ success: false, message: "No valid fields provided" });

      const table = getTable(resource);
      const [inserted] = await db
        .insert(table)
        .values(insertData)
        .returning({ id: table.id });

      res.status(201).json({
        success: true,
        message: "Created",
        id: inserted.id,
        image_url: req.file?.path,
      });
    } catch (e) {
      console.error(`[PUBLIC CREATE ${req.params.resource}]`, e);
      res.status(500).json({ success: false, message: "Failed to create resource" });
    }
  }
);

/* ── POST /:resource/:id/upload-pdf (admin) ── */
router.post(
  "/:resource/:id/upload-pdf",
  ...adminAuth,
  pdfUpload.single("pdf"),
  canWrite,
  async (req, res) => {
    const { resource, id } = req.params;
    const numericId = parseInt(id, 10);

    if (isNaN(numericId))
      return res.status(400).json({ success: false, message: "Invalid ID" });

    if (!RESOURCE_FIELDS[resource]?.includes("pdf_url")) {
      await cleanupCloudinary({ pdf_url: req.file?.path });
      return res.status(400).json({ success: false, message: "Resource does not support PDF uploads" });
    }

    try {
      const pdfUrl = req.file?.path;
      if (!pdfUrl)
        return res.status(400).json({ success: false, message: "No PDF file uploaded" });

      const table = getTable(resource);

      // ძველი PDF-ის წაშლა
      const existing = await db
        .select({ pdf_url: table.pdf_url })
        .from(table)
        .where(eq(table.id, numericId))
        .limit(1);

      if (existing[0]?.pdf_url)
        await cleanupCloudinary({ pdf_url: existing[0].pdf_url });

      await db
        .update(table)
        .set({ pdf_url: pdfUrl })
        .where(eq(table.id, numericId));

      res.json({ success: true, pdfUrl });
    } catch (e) {
      console.error(`[PDF UPLOAD ${resource}/${id}]`, e);
      await cleanupCloudinary({ pdf_url: req.file?.path });
      res.status(500).json({ success: false, message: "PDF upload failed" });
    }
  }
);

export default router;