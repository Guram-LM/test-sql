import express from "express";
import transporter from "../config/mailer.js";
import { db } from "../database/db.js";
import { contacts } from "../database/schema.js";
import rateLimit from "express-rate-limit";

const router = express.Router();

/* ================================================================
   RATE LIMIT
================================================================ */

const contactLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 3,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) =>
    req.headers["x-forwarded-for"]?.split(",")[0].trim() || req.ip,
  handler: (_req, res) =>
    res.status(429).json({
      success: false,
      message: "თქვენ ძალიან ხშირად აგზავნით შეტყობინებას. სცადეთ მოგვიანებით.",
    }),
});

/* ================================================================
   VALIDATION
================================================================ */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateContactBody({ name, email, message }) {
  const errors = [];
  if (!name?.trim() || name.trim().length < 2) errors.push("Name must be at least 2 characters");
  if (!email?.trim() || !EMAIL_REGEX.test(email)) errors.push("Valid email is required");
  if (!message?.trim() || message.trim().length < 5) errors.push("Message must be at least 5 characters");
  if (message?.trim().length > 2000) errors.push("Message is too long (max 2000 chars)");
  return errors;
}

/* ================================================================
   EMAIL TEMPLATE
================================================================ */

function buildContactEmail({ name, email, message }) {
  const timeStr = new Date().toLocaleString("ka-GE");

  const text = `
💬 ახალი კონტაქტის შეტყობინება

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 სახელი: ${name}
📧 ელ-ფოსტა: ${email}

📝 შეტყობინება:
${message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🕐 მიღების დრო: ${timeStr}
📍 კონტაქტ ფორმა
  `.trim();

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 15px 15px 0 0;">
        <div style="font-size: 60px; margin-bottom: 10px;">💬</div>
        <h2 style="color: white; margin: 0; font-size: 28px;">ახალი შეტყობინება</h2>
      </div>

      <div style="background: white; padding: 30px; border-radius: 0 0 15px 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <div style="background: #f3f4f6; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
          <p style="margin: 10px 0; color: #333;"><strong>👤 სახელი:</strong> ${name}</p>
          <p style="margin: 10px 0; color: #333;">
            <strong>📧 ელ-ფოსტა:</strong>
            <a href="mailto:${email}" style="color: #667eea;">${email}</a>
          </p>
        </div>

        <div style="background: #EEF2FF; padding: 20px; border-radius: 10px; border-left: 4px solid #667eea;">
          <p style="margin: 0 0 10px 0; color: #667eea; font-weight: bold;">📝 შეტყობინება:</p>
          <p style="margin: 0; color: #333; line-height: 1.6;">${message}</p>
        </div>

        <div style="margin-top: 20px; padding: 15px; background: #F0FDF4; border-radius: 8px; text-align: center;">
          <p style="margin: 0; color: #16A34A; font-size: 14px;">
            ✅ შეტყობინება წარმატებით მიღებულია
          </p>
        </div>
      </div>

      <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
        <p style="margin: 5px 0;">🕐 მიღების დრო: ${timeStr}</p>
        <p style="margin: 5px 0;">📍 კონტაქტ ფორმა - ემოციური ქოუჩინგი</p>
      </div>
    </div>
  `.trim();

  return { text, html, subject: `💬 ახალი შეტყობინება: ${name}` };
}

/* ================================================================
   POST /api/contact
================================================================ */

router.post("/", contactLimiter, async (req, res) => {
  const { name, email, message } = req.body;

  // Validation
  const errors = validateContactBody({ name, email, message });
  if (errors.length > 0) {
    return res.status(400).json({ success: false, message: errors[0], errors });
  }

  const sanitized = {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    message: message.trim(),
  };

  try {
    const [inserted] = await db
      .insert(contacts)
      .values(sanitized)
      .returning({ id: contacts.id });

    // Response ჯერ
    res.status(201).json({
      success: true,
      message: "Message received successfully",
      id: inserted.id,
    });

    // ---- Background side-effects ----

    // Socket.IO
    const io = req.app.get("io");
    if (io) {
      io.emit("new-contact", { id: inserted.id, name: sanitized.name });
    }

    // Push notification
    const sendPush = req.app.get("sendPush");
    if (sendPush) {
      sendPush(
        "💬 ახალი კონტაქტი!",
        `${sanitized.name}-ისგან შეტყობინება მოვიდა`,
        { type: "contact", url: "/contactPage" }
      );
    }

    // Email — fire-and-forget
    if (process.env.MAIL_USER && process.env.MAIL_PASS && process.env.MAIL_TO) {
      const { subject, text, html } = buildContactEmail(sanitized);
      transporter
        .sendMail({ from: process.env.MAIL_USER, to: process.env.MAIL_TO, subject, text, html })
        .catch((err) => console.error("[contact] email send failed:", err.message));
    }
  } catch (err) {
    console.error("[contact] DB error:", err);
    if (!res.headersSent) {
      res.status(500).json({ success: false, message: "Server error. Please try again." });
    }
  }
});

export default router;