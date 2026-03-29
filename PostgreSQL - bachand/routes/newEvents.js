import express from "express";
import { db } from "../database/db.js";
import { my_events, partner_events } from "../database/schema.js";
import { eq } from "drizzle-orm";
import { adminAuth } from "../middleware/adminAuth.js"; 
import { zonedTimeToUtc } from "date-fns-tz";
import { sendCreatedNotification } from "./eventEmailNotifier.js";

/* ============================================================
   HELPER — UTC გამოთვლა (timezone-ის მიხედვით, DST-სთან)
============================================================ */

function buildEventUtc(date, time, timezone) {
  try {
    return zonedTimeToUtc(`${date} ${time}`, timezone).toISOString();
  } catch {
    return null;
  }
}

function resolveStatus(eventUtc) {
  if (!eventUtc) return "upcoming";
  return new Date(eventUtc) < new Date() ? "past" : "upcoming";
}

/* ============================================================
   MY EVENTS ROUTER
============================================================ */

export const myEventsRouter = express.Router();

// GET /api/my-events
myEventsRouter.get("/", async (req, res) => {
  try {
    const rows = await db
      .select()
      .from(my_events)
      .orderBy(my_events.eventUtc);

    const data = rows.map((r) => ({ ...r, status: resolveStatus(r.eventUtc) }));
    res.json({ success: true, data });
  } catch (err) {
    console.error("my_events GET error:", err);
    res.status(500).json({ success: false, message: "სერვერის შეცდომა" });
  }
});

// GET /api/my-events/:id
myEventsRouter.get("/:id", async (req, res) => {
  try {
    const [row] = await db
      .select()
      .from(my_events)
      .where(eq(my_events.id, parseInt(req.params.id)))
      .limit(1);

    if (!row) return res.status(404).json({ success: false, message: "ვერ მოიძებნა" });

    res.json({ success: true, data: { ...row, status: resolveStatus(row.eventUtc) } });
  } catch (err) {
    console.error("my_events GET/:id error:", err);
    res.status(500).json({ success: false, message: "სერვერის შეცდომა" });
  }
});

// POST /api/my-events
myEventsRouter.post("/", ...adminAuth, async (req, res) => {
  try {
    const {
      title_ka, title_en,
      description_ka, description_en,
      event_date, event_time,
      timezone, utcOffset,
      reminderMinutes,
      meeting_type,
      meeting_link, platform,
      city, address,
    } = req.body;

    if (!title_ka || !title_en || !event_date || !event_time || !timezone) {
      return res.status(400).json({
        success: false,
        message: "სავალდებულო ველები: title_ka, title_en, event_date, event_time, timezone",
      });
    }

    const eventUtc = buildEventUtc(event_date, event_time, timezone);
    if (!eventUtc) {
      return res.status(400).json({ success: false, message: "თარიღი ან დრო არასწორია" });
    }
    if (new Date(eventUtc) < new Date()) {
      return res.status(400).json({ success: false, message: "ჩავლილ თარიღზე ივენთის შექმნა შეუძლებელია" });
    }

    const [inserted] = await db
      .insert(my_events)
      .values({
        title_ka, title_en,
        description_ka: description_ka || null,
        description_en: description_en || null,
        event_date, event_time,
        timezone,
        utcOffset: utcOffset || 0,
        eventUtc,
        reminderMinutes: reminderMinutes || 30,
        meeting_type: meeting_type || "online",
        meeting_link: meeting_link || null,
        platform: platform || null,
        city: city || null,
        address: address || null,
        notified: false,
      })
      .returning({ id: my_events.id });

    await sendCreatedNotification(
      { id: inserted.id, title_ka, title_en, event_date, event_time, timezone, utcOffset: utcOffset || 0, eventUtc, reminderMinutes: reminderMinutes || 30, meeting_type, meeting_link, platform, city, address },
      "my_events"
    );

    res.json({ success: true, id: inserted.id });
  } catch (err) {
    console.error("my_events POST error:", err);
    res.status(500).json({ success: false, message: "სერვერის შეცდომა" });
  }
});

// PUT /api/my-events/:id
myEventsRouter.put("/:id", ...adminAuth, async (req, res) => {
  try {
    const [existing] = await db
      .select()
      .from(my_events)
      .where(eq(my_events.id, parseInt(req.params.id)))
      .limit(1);

    if (!existing) return res.status(404).json({ success: false, message: "ვერ მოიძებნა" });

    const {
      title_ka, title_en,
      description_ka, description_en,
      event_date, event_time,
      timezone, utcOffset,
      reminderMinutes,
      meeting_type, meeting_link, platform,
      city, address,
    } = req.body;

    const newDate     = event_date || existing.event_date;
    const newTime     = event_time || existing.event_time;
    const newTimezone = timezone   ?? existing.timezone;
    const eventUtc    = buildEventUtc(newDate, newTime, newTimezone);

    await db
      .update(my_events)
      .set({
        title_ka:        title_ka        ?? existing.title_ka,
        title_en:        title_en        ?? existing.title_en,
        description_ka:  description_ka  ?? existing.description_ka,
        description_en:  description_en  ?? existing.description_en,
        event_date:      newDate,
        event_time:      newTime,
        timezone:        newTimezone,
        utcOffset:       utcOffset       ?? existing.utcOffset,
        eventUtc,
        reminderMinutes: reminderMinutes ?? existing.reminderMinutes,
        meeting_type:    meeting_type    ?? existing.meeting_type,
        meeting_link:    meeting_link    ?? existing.meeting_link,
        platform:        platform        ?? existing.platform,
        city:            city            ?? existing.city,
        address:         address         ?? existing.address,
        notified:        false,
      })
      .where(eq(my_events.id, parseInt(req.params.id)));

    res.json({ success: true, message: "განახლდა" });
  } catch (err) {
    console.error("my_events PUT error:", err);
    res.status(500).json({ success: false, message: "სერვერის შეცდომა" });
  }
});

// DELETE /api/my-events/:id
myEventsRouter.delete("/:id", ...adminAuth, async (req, res) => {
  try {
    const deleted = await db
      .delete(my_events)
      .where(eq(my_events.id, parseInt(req.params.id)))
      .returning({ id: my_events.id });

    if (!deleted.length) return res.status(404).json({ success: false, message: "ვერ მოიძებნა" });

    res.json({ success: true, message: "წაიშალა" });
  } catch (err) {
    console.error("my_events DELETE error:", err);
    res.status(500).json({ success: false, message: "სერვერის შეცდომა" });
  }
});

/* ============================================================
   PARTNER EVENTS ROUTER
============================================================ */

export const partnerEventsRouter = express.Router();

// GET /api/partner-events
partnerEventsRouter.get("/", async (req, res) => {
  try {
    const rows = await db
      .select()
      .from(partner_events)
      .orderBy(partner_events.eventUtc);

    const data = rows.map((r) => ({ ...r, status: resolveStatus(r.eventUtc) }));
    res.json({ success: true, data });
  } catch (err) {
    console.error("partner_events GET error:", err);
    res.status(500).json({ success: false, message: "სერვერის შეცდომა" });
  }
});

// GET /api/partner-events/:id
partnerEventsRouter.get("/:id", async (req, res) => {
  try {
    const [row] = await db
      .select()
      .from(partner_events)
      .where(eq(partner_events.id, parseInt(req.params.id)))
      .limit(1);

    if (!row) return res.status(404).json({ success: false, message: "ვერ მოიძებნა" });

    res.json({ success: true, data: { ...row, status: resolveStatus(row.eventUtc) } });
  } catch (err) {
    console.error("partner_events GET/:id error:", err);
    res.status(500).json({ success: false, message: "სერვერის შეცდომა" });
  }
});

// POST /api/partner-events
partnerEventsRouter.post("/", ...adminAuth, async (req, res) => {
  try {
    const {
      title_ka, title_en,
      description_ka, description_en,
      event_date, event_time,
      timezone, utcOffset,
      reminderMinutes,
      meeting_type, meeting_link, platform,
    } = req.body;

    if (!title_ka || !title_en || !event_date || !event_time || !timezone) {
      return res.status(400).json({
        success: false,
        message: "სავალდებულო ველები: title_ka, title_en, event_date, event_time, timezone",
      });
    }

    const eventUtc = buildEventUtc(event_date, event_time, timezone);
    if (!eventUtc) {
      return res.status(400).json({ success: false, message: "თარიღი ან დრო არასწორია" });
    }
    if (new Date(eventUtc) < new Date()) {
      return res.status(400).json({ success: false, message: "ჩავლილ თარიღზე ივენთის შექმნა შეუძლებელია" });
    }

    const [inserted] = await db
      .insert(partner_events)
      .values({
        title_ka, title_en,
        description_ka: description_ka || null,
        description_en: description_en || null,
        event_date, event_time,
        timezone,
        utcOffset: utcOffset || 0,
        eventUtc,
        reminderMinutes: reminderMinutes || 30,
        meeting_type: meeting_type || "online",
        meeting_link: meeting_link || null,
        platform: platform || null,
        notified: false,
      })
      .returning({ id: partner_events.id });

    await sendCreatedNotification(
      { id: inserted.id, title_ka, title_en, event_date, event_time, timezone, utcOffset: utcOffset || 0, eventUtc, reminderMinutes: reminderMinutes || 30, meeting_type, meeting_link, platform },
      "partner_events"
    );

    res.json({ success: true, id: inserted.id });
  } catch (err) {
    console.error("partner_events POST error:", err);
    res.status(500).json({ success: false, message: "სერვერის შეცდომა" });
  }
});

// PUT /api/partner-events/:id
partnerEventsRouter.put("/:id", ...adminAuth, async (req, res) => {
  try {
    const [existing] = await db
      .select()
      .from(partner_events)
      .where(eq(partner_events.id, parseInt(req.params.id)))
      .limit(1);

    if (!existing) return res.status(404).json({ success: false, message: "ვერ მოიძებნა" });

    const {
      title_ka, title_en,
      description_ka, description_en,
      event_date, event_time,
      timezone, utcOffset,
      reminderMinutes,
      meeting_type, meeting_link, platform,
    } = req.body;

    const newDate     = event_date || existing.event_date;
    const newTime     = event_time || existing.event_time;
    const newTimezone = timezone   ?? existing.timezone;
    const eventUtc    = buildEventUtc(newDate, newTime, newTimezone);

    await db
      .update(partner_events)
      .set({
        title_ka:        title_ka        ?? existing.title_ka,
        title_en:        title_en        ?? existing.title_en,
        description_ka:  description_ka  ?? existing.description_ka,
        description_en:  description_en  ?? existing.description_en,
        event_date:      newDate,
        event_time:      newTime,
        timezone:        newTimezone,
        utcOffset:       utcOffset       ?? existing.utcOffset,
        eventUtc,
        reminderMinutes: reminderMinutes ?? existing.reminderMinutes,
        meeting_type:    meeting_type    ?? existing.meeting_type,
        meeting_link:    meeting_link    ?? existing.meeting_link,
        platform:        platform        ?? existing.platform,
        notified:        false,
      })
      .where(eq(partner_events.id, parseInt(req.params.id)));

    res.json({ success: true, message: "განახლდა" });
  } catch (err) {
    console.error("partner_events PUT error:", err);
    res.status(500).json({ success: false, message: "სერვერის შეცდომა" });
  }
});

// DELETE /api/partner-events/:id
partnerEventsRouter.delete("/:id", ...adminAuth, async (req, res) => {
  try {
    const deleted = await db
      .delete(partner_events)
      .where(eq(partner_events.id, parseInt(req.params.id)))
      .returning({ id: partner_events.id });

    if (!deleted.length) return res.status(404).json({ success: false, message: "ვერ მოიძებნა" });

    res.json({ success: true, message: "წაიშალა" });
  } catch (err) {
    console.error("partner_events DELETE error:", err);
    res.status(500).json({ success: false, message: "სერვერის შეცდომა" });
  }
});