import express from "express";
import { db } from "../database/db.js";
import { scheduled_posts } from "../database/schema.js";
import { eq, desc } from "drizzle-orm";
import { adminAuth } from "../middleware/adminAuth.js"; 
import { buildPublishUtc } from "../utils/time.js";
import {
  createScheduledPost,
  updateScheduledPost,
  deleteScheduledPost,
} from "../services/scheduledPost.service.js";

export const scheduledPostsRouter = express.Router();

// GET public (მხოლოდ გამოქვეყნებული)
scheduledPostsRouter.get("/", async (req, res) => {
  try {
    const rows = await db
      .select()
      .from(scheduled_posts)
      .where(eq(scheduled_posts.status, "published"))
      .orderBy(desc(scheduled_posts.published_at));
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// GET ADMIN (ყველა)
scheduledPostsRouter.get("/admin/all", ...adminAuth, async (req, res) => {
  try {
    const rows = await db
      .select()
      .from(scheduled_posts)
      .orderBy(desc(scheduled_posts.created_at));
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// POST – ახალი პოსტის დაგეგმვა
scheduledPostsRouter.post("/", ...adminAuth, async (req, res) => {
  try {
    const {
      title_ka,
      title_en,
      content_ka,
      content_en,
      icon,
      publish_date,
      publish_time,
      timezone = "Asia/Tbilisi",
      utcOffset = 0,
    } = req.body;

    if (!title_ka?.trim() || !title_en?.trim() || !publish_date || !publish_time) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const publishUtc = buildPublishUtc(publish_date, publish_time, timezone);
    if (!publishUtc) {
      return res.status(400).json({ success: false, message: "Invalid date/time format" });
    }

    if (new Date(publishUtc) < new Date()) {
      return res.status(400).json({ success: false, message: "Past დრო არ შეიძლება" });
    }

    const post = await createScheduledPost({
      title_ka: title_ka.trim(),
      title_en: title_en.trim(),
      content_ka: content_ka?.trim() || null,
      content_en: content_en?.trim() || null,
      icon: icon?.trim() || null,
      publish_date,
      publish_time,
      timezone,
      utcOffset,
      publishUtc,
      status: "scheduled",
    });

    res.json({ success: true, data: post });
  } catch (err) {
    console.error("POST scheduled post error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// PUT – განახლება (admin)
scheduledPostsRouter.put("/:id", ...adminAuth, async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ success: false, message: "Invalid ID" });
    }

    const {
      title_ka,
      title_en,
      content_ka,
      content_en,
      icon,
      publish_date,
      publish_time,
      timezone = "Asia/Tbilisi",
    } = req.body;

    if (!title_ka?.trim() || !title_en?.trim() || !publish_date || !publish_time) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const publishUtc = buildPublishUtc(publish_date, publish_time, timezone);
    if (!publishUtc) {
      return res.status(400).json({ success: false, message: "Invalid date/time format" });
    }

    if (new Date(publishUtc) < new Date()) {
      return res.status(400).json({ success: false, message: "Past დრო არ შეიძლება" });
    }

    const updateData = {
      title_ka: title_ka.trim(),
      title_en: title_en.trim(),
      content_ka: content_ka?.trim() || null,
      content_en: content_en?.trim() || null,
      icon: icon?.trim() || null,
      publish_date,
      publish_time,
      timezone,
      publishUtc,
      status: "scheduled",
      published_at: null,
      attempts: 0,
    };

    await updateScheduledPost(id, updateData);

    res.json({ success: true, message: "Scheduled post updated successfully" });
  } catch (err) {
    console.error("UPDATE scheduled post error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


scheduledPostsRouter.delete("/:id", ...adminAuth, async (req, res) => {
  try {
    const id = Number(req.params.id);

    // ID ვალიდაცია
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid ID" 
      });
    }

    // სრული წაშლა ბაზიდან
    await deleteScheduledPost(id);

    console.log(`🗑️ Hard deleted scheduled post ID: ${id}`);

    res.json({ 
      success: true, 
      message: "შეტყობინება სრულიად წაიშალა ბაზიდან" 
    });
  } catch (err) {
    console.error("❌ Hard DELETE error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Server error during deletion" 
    });
  }
});