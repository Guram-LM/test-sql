// services/adminService.js
import { db } from '../database/db.js';
import { admins } from '../database/schema.js';
import { eq } from 'drizzle-orm';

export async function getFreshAdmin(id) {
  if (!id) throw new Error('Admin ID is required');

  const [admin] = await db
    .select()
    .from(admins)
    .where(eq(admins.id, id))
    .limit(1);

  if (!admin) throw new Error('Admin not found');
  return admin;
}