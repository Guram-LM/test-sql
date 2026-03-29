import express from "express";
import transporter from "../config/mailer.js";
import { db } from "../database/db.js";
import { orders } from "../database/schema.js";
import rateLimit from "express-rate-limit";

const router = express.Router();

/* ================================================================
   RATE LIMIT
================================================================ */

const orderLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) =>
    req.headers["x-forwarded-for"]?.split(",")[0].trim() || req.ip,
  handler: (_req, res) =>
    res.status(429).json({
      success: false,
      message: "თქვენ ძალიან ხშირად აგზავნით შეკვეთას. სცადეთ 1 წუთში.",
    }),
});

/* ================================================================
   VALIDATION
================================================================ */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[\d\s\+\-\(\)]{6,20}$/;

function validateOrderBody(body) {
  const { firstName, lastName, email, phone, courseTitle, coursePrice } = body;
  const errors = [];

  if (!firstName?.trim()) errors.push("firstName is required");
  if (!lastName?.trim()) errors.push("lastName is required");
  if (!email?.trim() || !EMAIL_REGEX.test(email)) errors.push("Valid email is required");
  if (!phone?.trim() || !PHONE_REGEX.test(phone)) errors.push("Valid phone is required");
  if (!courseTitle?.trim()) errors.push("courseTitle is required");
  if (!coursePrice?.trim()) errors.push("coursePrice is required");

  return errors;
}

/* ================================================================
   EMAIL TEMPLATE
================================================================ */

function buildOrderEmail({ firstName, lastName, email, phone, courseTitle, coursePrice, message }) {
  const timeStr = new Date().toLocaleString("ka-GE");

  const text = `
🛒 ახალი შეკვეთა მიღებულია!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 კლიენტის ინფორმაცია:
   სახელი: ${firstName} ${lastName}
   📧 ელ-ფოსტა: ${email}
   📞 ტელეფონი: ${phone}

📚 კურსის დეტალები:
   დასახელება: ${courseTitle}
   💰 ფასი: ${coursePrice}

${message ? `💬 შეტყობინება:\n${message}\n` : ""}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🕐 შეკვეთის დრო: ${timeStr}
📍 ემოციური ქოუჩინგი - ონლაინ შეკვეთა
  `.trim();

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #10B981 0%, #059669 100%); padding: 30px; text-align: center; border-radius: 15px 15px 0 0;">
        <div style="font-size: 60px; margin-bottom: 10px;">🛒</div>
        <h2 style="color: white; margin: 0; font-size: 28px;">ახალი შეკვეთა!</h2>
      </div>

      <div style="background: white; padding: 30px; border-radius: 0 0 15px 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <div style="background: #F0FDF4; padding: 20px; border-radius: 10px; margin-bottom: 20px; border-left: 4px solid #10B981;">
          <h3 style="margin: 0 0 15px 0; color: #059669;">👤 კლიენტის ინფორმაცია</h3>
          <p style="margin: 8px 0; color: #333;"><strong>სახელი:</strong> ${firstName} ${lastName}</p>
          <p style="margin: 8px 0; color: #333;"><strong>📧 ელ-ფოსტა:</strong>
            <a href="mailto:${email}" style="color: #10B981;">${email}</a>
          </p>
          <p style="margin: 8px 0; color: #333;"><strong>📞 ტელეფონი:</strong>
            <a href="tel:${phone}" style="color: #10B981;">${phone}</a>
          </p>
        </div>

        <div style="background: #EFF6FF; padding: 20px; border-radius: 10px; margin-bottom: 20px; border-left: 4px solid #3B82F6;">
          <h3 style="margin: 0 0 15px 0; color: #1D4ED8;">📚 კურსის დეტალები</h3>
          <p style="margin: 8px 0; color: #333;"><strong>დასახელება:</strong> ${courseTitle}</p>
          <p style="margin: 8px 0; color: #333;">
            <strong>💰 ფასი:</strong>
            <span style="color: #059669; font-size: 24px; font-weight: bold;">${coursePrice}</span>
          </p>
        </div>

        ${message ? `
        <div style="background: #FEF3C7; padding: 20px; border-radius: 10px; margin-bottom: 20px; border-left: 4px solid #F59E0B;">
          <h3 style="margin: 0 0 15px 0; color: #D97706;">💬 შეტყობინება</h3>
          <p style="margin: 0; color: #333; line-height: 1.6;">${message}</p>
        </div>
        ` : ""}

        <div style="background: linear-gradient(135deg, #10B981 0%, #059669 100%); padding: 20px; border-radius: 10px; text-align: center;">
          <p style="margin: 0; color: white; font-size: 18px; font-weight: bold;">
            ✅ შეკვეთა წარმატებით მიღებულია!
          </p>
          <p style="margin: 10px 0 0 0; color: white; font-size: 14px; opacity: 0.9;">
            დაუკავშირდით კლიენტს მალე
          </p>
        </div>
      </div>

      <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
        <p style="margin: 5px 0;">🕐 შეკვეთის დრო: ${timeStr}</p>
        <p style="margin: 5px 0;">📍 ემოციური ქოუჩინგი - ონლაინ პლატფორმა</p>
      </div>
    </div>
  `.trim();

  return { text, html, subject: `🛒 ახალი შეკვეთა: ${firstName} ${lastName}` };
}

/* ================================================================
   POST /api/orders
================================================================ */

router.post("/", orderLimiter, async (req, res) => {
  const {
    firstName, lastName, email, phone,
    message = "",
    courseTitle, coursePrice,
  } = req.body;

  // Validation
  const errors = validateOrderBody(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ success: false, message: errors[0], errors });
  }

  // Sanitize
  const sanitized = {
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    email: email.trim().toLowerCase(),
    phone: phone.trim(),
    message: message.trim(),
    courseTitle: courseTitle.trim(),
    coursePrice: coursePrice.trim(),
  };

  try {
    // DB insert
    await db.insert(orders).values(sanitized);

    // Response ჯერ — email და push background-ში
    res.status(201).json({ success: true, message: "Order received successfully" });

    // ---- Background side-effects ----

    // Socket.IO
    const io = req.app.get("io");
    if (io) {
      io.emit("new-order", { ...sanitized, createdAt: new Date() });
    }

    // Push notification
    const sendPush = req.app.get("sendPush");
    if (sendPush) {
      sendPush(
        "🛒 ახალი შეკვეთა!",
        `${sanitized.firstName} ${sanitized.lastName} — ${sanitized.courseTitle}`,
        { type: "order", url: "/ordePage" }
      );
    }

    // Email — async, response გაგზავნილია
    if (process.env.MAIL_USER && process.env.MAIL_PASS && process.env.MAIL_TO) {
      const { subject, text, html } = buildOrderEmail(sanitized);
      transporter
        .sendMail({ from: process.env.MAIL_USER, to: process.env.MAIL_TO, subject, text, html })
        .catch((err) => console.error("[orders] email send failed:", err.message));
    }
  } catch (err) {
    console.error("[orders] DB error:", err);
    // response არ გაგზავნილა — ვბრუნებთ 500
    if (!res.headersSent) {
      res.status(500).json({ success: false, message: "Server error. Please try again." });
    }
  }
});

export default router;