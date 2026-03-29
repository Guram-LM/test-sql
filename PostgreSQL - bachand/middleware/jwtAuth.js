// middleware/jwtAuth.js
import { db } from '../database/db.js';
import { users, admins } from '../database/schema.js';
import { eq } from 'drizzle-orm';
import { verifyAccessToken } from '../routes/tokens.js';

export default async function jwtAuth(req, res, next) {
  console.log("=== JWT AUTH START ===");
  try {
    const authHeader = req.headers.authorization;
    console.log("AUTH HEADER:", authHeader ? authHeader.substring(0, 60) + "..." : "NO HEADER");

    if (!authHeader?.startsWith('Bearer ')) {
      console.log("❌ No Bearer token");
      return res.status(401).json({ success: false, message: 'ტოკენი არ არის მითითებული' });
    }

    const token = authHeader.split(' ')[1];


    let payload;
    try {
      payload = verifyAccessToken(token);
      console.log("✅ Token verified successfully");
    } catch (err) {
      console.error("❌ Token verification FAILED:", err.name, "-", err.message);
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ success: false, message: 'ტოკენის ვადა ამოიწურა' });
      }
      return res.status(403).json({ success: false, message: 'არასწორი ტოკენი' });
    }

    if (!payload?.id || !payload?.role) {
      console.log("❌ Payload missing id or role");
      return res.status(403).json({ success: false, message: 'არასწორი ტოკენის შიგთავსი' });
    }

    let entity;
    if (payload.role === 'admin') {
      [entity] = await db
        .select()
        .from(admins)
        .where(eq(admins.id, payload.id))
        .limit(1);
        console.log("Admin lookup:", entity ? `✅ FOUND (tokenVersion: ${entity.tokenVersion})` : "❌ NOT FOUND");
    } else {
      [entity] = await db
        .select()
        .from(users)
        .where(eq(users.id, payload.id))
        .limit(1);
        console.log("User lookup:", entity ? `✅ FOUND (tokenVersion: ${entity.tokenVersion})` : "❌ NOT FOUND");
    }

    if (!entity) {
      console.log("❌ Entity not found in database");
      return res.status(401).json({ success: false, message: 'მომხმარებელი ვერ მოიძებნა' });
    }

    if (entity.tokenVersion !== payload.tokenVersion) {
      console.log(`❌ TOKEN VERSION MISMATCH → DB: ${entity.tokenVersion} | Token: ${payload.tokenVersion}`);
      return res.status(401).json({ success: false, message: 'სესია გაუქმებულია' });
    }

    // Set both — routes use req.user or req.admin depending on context
    req.auth  = { id: entity.id, role: payload.role, entity };
    req.user  = req.auth;
    req.admin = req.auth;

    console.log(`🎉 AUTH SUCCESS → Role: ${payload.role}, ID: ${payload.id}, DB tokenVersion: ${entity.tokenVersion}`);

    next();
  } catch (err) {
    console.error('[JWT AUTH ERROR]', err.message);
    return res.status(403).json({ success: false, message: 'ავტორიზაციის შეცდომა' });
  }
}