// workers/cleanup.js
import { db } from '../database/db.js';
import { pending_registrations, auth_rate_limits, user_password_resets } from '../database/schema.js';
import { lt, and, eq } from 'drizzle-orm';

export async function cleanupExpiredRecords() {
  try {
    const now = Date.now();
    const dayAgo = new Date(now - 24 * 60 * 60 * 1000);

    await db
      .delete(pending_registrations)
      .where(lt(pending_registrations.expires_at, now));

    await db
      .delete(user_password_resets)
      .where(and(
        lt(user_password_resets.expires_at, now),
        eq(user_password_resets.used, true)
      ));

    await db
      .delete(auth_rate_limits)
      .where(lt(auth_rate_limits.updated_at, dayAgo));

  } catch (err) {
    console.error('[CLEANUP ERROR]', err.message);
  }
}