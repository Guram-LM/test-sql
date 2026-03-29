// routes/user.profile.routes.js
import express from 'express';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { db } from '../database/db.js';
import {
  users,
  user_refresh_tokens,
  user_email_changes,
  auth_rate_limits,
} from '../database/schema.js';
import { userAuth } from '../middleware/userAuth.js';
import { eq, and, desc } from 'drizzle-orm';
import { sendEmail } from '../services/email.service.js';
import { hashToken } from '../utils/hashToken.js';

const router = express.Router();

const BCRYPT_ROUNDS     = 12;
const EMAIL_OTP_EXPIRY  = 15 * 60 * 1000;

/* ====================== HELPERS ====================== */
const generateOTP = () => crypto.randomInt(100000, 1000000).toString();

const getClientMeta = (req) => ({
  ip: req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket.remoteAddress || 'unknown',
  ua: req.headers['user-agent'] || 'unknown',
});

async function rateLimit(key, max, windowMs) {
  const now = Date.now();
  const [rec] = await db
    .select()
    .from(auth_rate_limits)
    .where(eq(auth_rate_limits.key, key))
    .limit(1);

  if (rec?.blocked_until > now) {
    return { blocked: true };
  }

  const withinWindow  = rec && now - rec.window_start < windowMs;
  const attempts      = withinWindow ? rec.attempts + 1 : 1;
  const windowStart   = withinWindow ? rec.window_start : now;
  const blocked       = attempts >= max;
  const blocked_until = blocked ? now + windowMs : 0;

  await db
    .insert(auth_rate_limits)
    .values({ key, attempts, window_start: windowStart, blocked_until, updated_at: new Date() })
    .onConflictDoUpdate({
      target: auth_rate_limits.key,
      set:    { attempts, window_start: windowStart, blocked_until, updated_at: new Date() },
    });

  return { blocked };
}

/* ====================== GET PROFILE ====================== */
router.get('/me', ...userAuth, async (req, res) => {
  try {
    const [user] = await db
      .select({
        id:         users.id,
        firstName:  users.firstName,
        lastName:   users.lastName,
        email:      users.email,
        role:       users.role,
        isVerified: users.isVerified,
        created_at: users.created_at,
      })
      .from(users)
      .where(eq(users.id, req.user.id))
      .limit(1);

    if (!user) {
      return res.status(404).json({ success: false, message: 'მომხმარებელი ვერ მოიძებნა' });
    }

    return res.json({ success: true, user });
  } catch (err) {
    console.error('[GET /me ERROR]', err);
    return res.status(500).json({ success: false, message: 'სერვერის შეცდომა' });
  }
});

/* ====================== UPDATE PROFILE ====================== */
router.put('/update', ...userAuth, async (req, res) => {
  try {
    const { firstName, lastName } = req.body;
    const update = {};

    if (firstName?.trim()) update.firstName = firstName.trim();
    if (lastName?.trim())  update.lastName  = lastName.trim();

    if (!Object.keys(update).length) {
      return res.status(400).json({ success: false, message: 'განახლებისთვის მონაცემი არ არის' });
    }

    await db.update(users).set(update).where(eq(users.id, req.user.id));
    return res.json({ success: true, message: 'პროფილი განახლდა' });
  } catch (err) {
    console.error('[UPDATE PROFILE ERROR]', err);
    return res.status(500).json({ success: false, message: 'სერვერის შეცდომა' });
  }
});

/* ====================== CHANGE PASSWORD ====================== */
router.post('/change-password', ...userAuth, async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;

    if (!oldPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ success: false, message: 'ყველა ველი აუცილებელია' });
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'პაროლები არ ემთხვევა' });
    }
    if (newPassword.length < 8) {
      return res.status(400).json({ success: false, message: 'პაროლი უნდა იყოს მინიმუმ 8 სიმბოლო' });
    }

    const [user] = await db
      .select({ password: users.password })
      .from(users)
      .where(eq(users.id, req.user.id))
      .limit(1);

    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) {
      return res.status(401).json({ success: false, message: 'ძველი პაროლი არასწორია' });
    }

    const hash = await bcrypt.hash(newPassword, BCRYPT_ROUNDS);

    await db.transaction(async (tx) => {
      await tx
        .update(users)
        .set({ password: hash, tokenVersion: crypto.randomInt(1, 999999) })
        .where(eq(users.id, req.user.id));

      await tx
        .update(user_refresh_tokens)
        .set({ revoked: true })
        .where(eq(user_refresh_tokens.user_id, req.user.id));
    });

    return res.json({ success: true, message: 'პაროლი შეიცვალა. გთხოვთ შეხვიდეთ ხელახლა.' });
  } catch (err) {
    console.error('[CHANGE PASSWORD ERROR]', err);
    return res.status(500).json({ success: false, message: 'სერვერის შეცდომა' });
  }
});

/* ====================== REQUEST EMAIL CHANGE ====================== */
router.post('/request-email-change', ...userAuth, async (req, res) => {
  try {
    const { newEmail } = req.body;
    const { ip, ua }   = getClientMeta(req);

    if (!newEmail?.trim()) {
      return res.status(400).json({ success: false, message: 'ახალი ელფოსტა აუცილებელია' });
    }

    const email = newEmail.toLowerCase().trim();

    const limit = await rateLimit(`email_change:${req.user.id}:${ip}`, 3, 10 * 60 * 1000);
    if (limit.blocked) {
      return res.status(429).json({ success: false, message: 'ძალიან ბევრი მცდელობა' });
    }

    const [user] = await db
      .select({ email: users.email })
      .from(users)
      .where(eq(users.id, req.user.id))
      .limit(1);

    if (user.email === email) {
      return res.status(400).json({ success: false, message: 'ეს უკვე თქვენი ელფოსტაა' });
    }

    const [taken] = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (taken) {
      return res.status(409).json({ success: false, message: 'ეს ელფოსტა უკვე გამოყენებულია' });
    }

    const otp  = generateOTP();
    const hash = await bcrypt.hash(otp, 10);

    // Invalidate any pending email change requests
    await db
      .update(user_email_changes)
      .set({ used: true })
      .where(and(eq(user_email_changes.user_id, req.user.id), eq(user_email_changes.used, false)));

    await db.insert(user_email_changes).values({
      user_id:    req.user.id,
      new_email:  email,
      otp:        hash,
      expires_at: Date.now() + EMAIL_OTP_EXPIRY,
      used:       false,
      ip,
      user_agent: ua,
    });

    await sendEmail({
      to:      email,
      subject: 'ელფოსტის შეცვლის ვერიფიკაცია',
      html:    `<p>თქვენი ვერიფიკაციის კოდია: <strong>${otp}</strong></p><p>კოდი მოქმედია 15 წუთის განმავლობაში.</p>`,
    });

    return res.json({ success: true, message: 'ვერიფიკაციის კოდი გაიგზავნა ახალ ელფოსტაზე' });
  } catch (err) {
    console.error('[REQUEST EMAIL CHANGE ERROR]', err);
    return res.status(500).json({ success: false, message: 'სერვერის შეცდომა' });
  }
});

/* ====================== CONFIRM EMAIL CHANGE ====================== */
router.post('/confirm-email-change', ...userAuth, async (req, res) => {
  try {
    const { otp } = req.body;

    if (!otp) {
      return res.status(400).json({ success: false, message: 'OTP კოდი აუცილებელია' });
    }

    const limit = await rateLimit(`email_change_fail:${req.user.id}`, 5, 10 * 60 * 1000);
    if (limit.blocked) {
      return res.status(429).json({ success: false, message: 'ძალიან ბევრი მცდელობა' });
    }

    const [record] = await db
      .select()
      .from(user_email_changes)
      .where(and(eq(user_email_changes.user_id, req.user.id), eq(user_email_changes.used, false)))
      .orderBy(desc(user_email_changes.id))
      .limit(1);

    if (!record || Date.now() > Number(record.expires_at)) {
      return res.status(400).json({ success: false, message: 'არასწორი ან ვადაგასული მოთხოვნა' });
    }

    const valid = await bcrypt.compare(otp, record.otp);
    if (!valid) {
      return res.status(400).json({ success: false, message: 'არასწორი OTP კოდი' });
    }

    // Double-check the new email is still available inside the transaction
    await db.transaction(async (tx) => {
      const [taken] = await tx
        .select({ id: users.id })
        .from(users)
        .where(eq(users.email, record.new_email))
        .limit(1);

      if (taken) throw Object.assign(new Error('EMAIL_TAKEN'), { status: 409 });

      await tx
        .update(users)
        .set({ email: record.new_email })
        .where(eq(users.id, req.user.id));

      await tx
        .update(user_email_changes)
        .set({ used: true })
        .where(eq(user_email_changes.id, record.id));

      // Revoke all sessions — email changed, re-login required
      await tx
        .update(user_refresh_tokens)
        .set({ revoked: true })
        .where(eq(user_refresh_tokens.user_id, req.user.id));
    });

    return res.json({ success: true, message: 'ელფოსტა შეიცვალა. გთხოვთ შეხვიდეთ ხელახლა.' });
  } catch (err) {
    if (err?.status === 409) {
      return res.status(409).json({ success: false, message: 'ეს ელფოსტა უკვე გამოყენებულია' });
    }
    console.error('[CONFIRM EMAIL CHANGE ERROR]', err);
    return res.status(500).json({ success: false, message: 'სერვერის შეცდომა' });
  }
});

/* ====================== GET ACTIVE SESSIONS ====================== */
router.get('/sessions', ...userAuth, async (req, res) => {
  try {
    const currentRaw = req.cookies?.refreshToken;
    // FIX: compare hashes not raw tokens — DB stores hashes
    const currentHash = currentRaw ? hashToken(currentRaw) : null;

    const sessions = await db
      .select({
        id:         user_refresh_tokens.id,
        token:      user_refresh_tokens.token,
        ip:         user_refresh_tokens.ip,
        user_agent: user_refresh_tokens.user_agent,
        created_at: user_refresh_tokens.created_at,
        expires_at: user_refresh_tokens.expires_at,
        revoked:    user_refresh_tokens.revoked,
      })
      .from(user_refresh_tokens)
      .where(eq(user_refresh_tokens.user_id, req.user.id))
      .orderBy(desc(user_refresh_tokens.created_at));

    const now = Date.now();

    return res.json({
      success: true,
      sessions: sessions
        .filter((s) => !s.revoked && Number(s.expires_at) > now)
        .map((s) => ({
          id:        s.id,
          ip:        s.ip,
          device:    s.user_agent,
          createdAt: s.created_at,
          expiresAt: s.expires_at,
          isCurrent: currentHash ? s.token === currentHash : false,
        })),
    });
  } catch (err) {
    console.error('[SESSIONS ERROR]', err);
    return res.status(500).json({ success: false, message: 'სერვერის შეცდომა' });
  }
});

/* ====================== REVOKE SINGLE SESSION ====================== */
router.delete('/sessions/:id', ...userAuth, async (req, res) => {
  try {
    const sessionId = parseInt(req.params.id, 10);
    if (isNaN(sessionId)) {
      return res.status(400).json({ success: false, message: 'არასწორი სესიის ID' });
    }

    // Verify the session belongs to this user before revoking
    const [session] = await db
      .select({ id: user_refresh_tokens.id, user_id: user_refresh_tokens.user_id })
      .from(user_refresh_tokens)
      .where(eq(user_refresh_tokens.id, sessionId))
      .limit(1);

    if (!session || session.user_id !== req.user.id) {
      return res.status(404).json({ success: false, message: 'სესია ვერ მოიძებნა' });
    }

    await db
      .update(user_refresh_tokens)
      .set({ revoked: true })
      .where(eq(user_refresh_tokens.id, sessionId));

    return res.json({ success: true, message: 'სესია გაუქმდა' });
  } catch (err) {
    console.error('[REVOKE SESSION ERROR]', err);
    return res.status(500).json({ success: false, message: 'სერვერის შეცდომა' });
  }
});

export default router;