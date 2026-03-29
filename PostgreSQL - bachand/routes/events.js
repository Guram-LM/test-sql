import express from "express";
import { db } from "../database/db.js";
import { events } from "../database/schema.js";
import { eq } from "drizzle-orm";
import { zonedTimeToUtc } from "date-fns-tz";

const router = express.Router();

/* ================= POST /api/events ================= */
router.post("/", async (req, res) => {
  try {
    const { title, description, date, time, reminderMinutes, timezone } = req.body;

    if (!title || !date || !time || !timezone) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const eventUtc = zonedTimeToUtc(`${date} ${time}`, timezone).toISOString();
    const reminder = Number(reminderMinutes) || 5;

    const [inserted] = await db
      .insert(events)
      .values({
        title,
        description: description || "",
        date,
        time,
        eventUtc,
        timezone,
        reminderMinutes: reminder,
        notified: "0",
      })
      .returning({ id: events.id });

    res.json({ success: true, id: inserted.id });
  } catch (err) {
    console.error("events POST error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/* ================= GET /api/events ================= */
router.get("/", async (_req, res) => {
  try {
    const rows = await db
      .select()
      .from(events)
      .orderBy(events.eventUtc);

    res.json({ success: true, data: rows });
  } catch (err) {
    console.error("events GET error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/* ================= GET /api/events/:id ================= */
router.get("/:id", async (req, res) => {
  try {
    const [event] = await db
      .select()
      .from(events)
      .where(eq(events.id, parseInt(req.params.id)))
      .limit(1);

    if (!event) return res.status(404).json({ success: false, message: "Event not found" });

    res.json({ success: true, data: event });
  } catch (err) {
    console.error("events GET/:id error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/* ================= PUT /api/events/:id ================= */
router.put("/:id", async (req, res) => {
  try {
    const { title, description, date, time, reminderMinutes, timezone } = req.body;

    const [existing] = await db
      .select()
      .from(events)
      .where(eq(events.id, parseInt(req.params.id)))
      .limit(1);

    if (!existing) return res.status(404).json({ success: false, message: "Event not found" });

    const newDate = date ?? existing.date;
    const newTime = time ?? existing.time;
    const newTimezone = timezone ?? existing.timezone;

    let updatedEventUtc = existing.eventUtc;
    if (date && time && timezone) {
      updatedEventUtc = zonedTimeToUtc(`${newDate} ${newTime}`, newTimezone).toISOString();
    }

    await db
      .update(events)
      .set({
        title: title ?? existing.title,
        description: description ?? existing.description,
        date: newDate,
        time: newTime,
        eventUtc: updatedEventUtc,
        timezone: newTimezone,
        reminderMinutes: reminderMinutes !== undefined ? parseInt(reminderMinutes) : existing.reminderMinutes,
      })
      .where(eq(events.id, parseInt(req.params.id)));

    res.json({ success: true, message: "Event updated successfully" });
  } catch (err) {
    console.error("events PUT error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/* ================= DELETE /api/events/:id ================= */
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await db
      .delete(events)
      .where(eq(events.id, parseInt(req.params.id)))
      .returning({ id: events.id });

    if (!deleted.length) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    res.json({ success: true, message: "Event deleted successfully" });
  } catch (err) {
    console.error("events DELETE error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;