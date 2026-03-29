import { db } from "../database/db.js";
import { scheduled_posts } from "../database/schema.js";
import { eq } from "drizzle-orm";

export async function createScheduledPost(data) {
  const [row] = await db
    .insert(scheduled_posts)
    .values(data)
    .returning();
  return row;
}

export async function updateScheduledPost(id, data) {
  await db
    .update(scheduled_posts)
    .set(data)
    .where(eq(scheduled_posts.id, id));
}

export async function deleteScheduledPost(id) {
  const [deleted] = await db
    .delete(scheduled_posts)
    .where(eq(scheduled_posts.id, id))
    .returning(); 

  if (!deleted) {
    throw new Error(`Post with ID ${id} not found`);
  }

  return deleted;
}