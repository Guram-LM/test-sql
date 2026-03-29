import express from "express";
import webpush from "web-push";
import { db } from "../database/db.js";
import { sql } from "drizzle-orm";

const router = express.Router();

webpush.setVapidDetails(
  process.env.VAPID_MAILTO,
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

// VAPID key
router.get("/vapid-public-key", (req, res) => {
  res.json({ publicKey: process.env.VAPID_PUBLIC_KEY });
});

// subscribe
router.post("/subscribe", async (req, res) => {
  const { subscription } = req.body;

  if (!subscription?.endpoint) {
    return res.status(400).json({ success: false });
  }

  try {
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS push_subscriptions (
        id SERIAL PRIMARY KEY,
        endpoint TEXT UNIQUE NOT NULL,
        subscription TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);

    await db.execute(sql`
      INSERT INTO push_subscriptions (endpoint, subscription)
      VALUES (${subscription.endpoint}, ${JSON.stringify(subscription)})
      ON CONFLICT (endpoint)
      DO UPDATE SET subscription = EXCLUDED.subscription
    `);

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

// send push
export async function sendPushToAll(title, body, data = {}) {
  try {
    const result = await db.execute(sql`
      SELECT subscription FROM push_subscriptions
    `);

    const rows = result.rows || [];

    const payload = JSON.stringify({ title, body, ...data });

    await Promise.allSettled(
      rows.map((row) =>
        webpush.sendNotification(JSON.parse(row.subscription), payload)
      )
    );
  } catch (err) {
    console.error("Push error:", err);
  }
}

export default router;