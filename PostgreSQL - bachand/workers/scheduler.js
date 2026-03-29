import cron from "node-cron";
import { db } from "../database/db.js";
import { scheduled_posts } from "../database/schema.js";
import { and, lte, eq } from "drizzle-orm";

/**
 * Production-ready scheduler with locking to prevent race conditions
 * და Socket.IO emit-ით
 */
export function startScheduler(io) {
  cron.schedule("* * * * *", async () => {
    const now = new Date().toISOString();

    // ვირჩევთ მხოლოდ იმ პოსტებს რომლებიც უკვე დროა
    const posts = await db
      .select()
      .from(scheduled_posts)
      .where(
        and(
          lte(scheduled_posts.publishUtc, now),
          eq(scheduled_posts.status, "scheduled")
        )
      )
      .limit(10); // პატარა batch რომ არ დაკავდეს cron

    for (const post of posts) {
      // 1. Lock (status → publishing)
      const locked = await db
        .update(scheduled_posts)
        .set({ status: "publishing" })
        .where(
          and(
            eq(scheduled_posts.id, post.id),
            eq(scheduled_posts.status, "scheduled")
          )
        )
        .returning();

      if (!locked.length) continue; // ვიღაცამ უკვე წაიღო

      try {
        // 2. Publish
        const [updated] = await db
          .update(scheduled_posts)
          .set({
            status: "published",
            published_at: new Date(),
          })
          .where(eq(scheduled_posts.id, post.id))
          .returning();

        console.log(`✅ Published scheduled post #${post.id}`);

        // 3. Socket.IO-ს გაგზავნა frontend-ზე
        if (io) {
          io.emit("post:published", updated);
        }
      } catch (err) {
        console.error(`❌ Failed to publish post #${post.id}`, err);
        await db
          .update(scheduled_posts)
          .set({
            status: "failed",
            attempts: post.attempts + 1,
          })
          .where(eq(scheduled_posts.id, post.id));
      }
    }
  });
}