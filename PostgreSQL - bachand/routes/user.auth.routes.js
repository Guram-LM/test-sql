// routes/user.auth.routes.js
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { db } from '../database/db.js';
import {
  users,
  user_refresh_tokens,
  user_password_resets,
  pending_registrations,
  auth_rate_limits,
  user_login_attempts,
} from '../database/schema.js';
import { sendOtpEmail, sendPasswordResetEmail } from '../services/email.service.js';
import { eq, desc, and, lt } from 'drizzle-orm';
import { generateAccessToken, generateRefreshToken } from './tokens.js';
import { hashToken } from '../utils/hashToken.js';
import crypto from 'crypto';

const router = express.Router();

/* ====================== CONSTANTS ====================== */
const BCRYPT_ROUNDS = 12;
const OTP_EXPIRY_MS    = 10 * 60 * 1000;
const RESET_EXPIRY_MS  = 15 * 60 * 1000;
const REFRESH_EXPIRY_MS = 7 * 24 * 60 * 60 * 1000;

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure:   process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
  maxAge:   REFRESH_EXPIRY_MS,
};

/* ====================== VALIDATION ====================== */
const registerSchema = z.object({
  email:           z.string().email().toLowerCase().trim(),
  firstName:       z.string().min(2).max(50),  // ← დაამატე
  lastName:        z.string().min(2).max(50),  // ← დაამატე
  password:        z.string().min(8, 'პაროლი უნდა იყოს მინიმუმ 8 სიმბოლო'),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: 'პაროლები არ ემთხვევა',
  path:    ['confirmPassword'],
});

const verifySchema = z.object({
  email: z.string().email(),
  otp:   z.string().length(6, 'OTP უნდა იყოს 6 ციფრი'),
});

const loginSchema = z.object({
  email:    z.string().email(),
  password: z.string().min(8),
});

const forgotSchema = z.object({ email: z.string().email() });

const resetSchema = z.object({
  email:       z.string().email(),
  code:        z.string().length(6),
  newPassword: z.string().min(8, 'პაროლი უნდა იყოს მინიმუმ 8 სიმბოლო'),
});

/* ====================== HELPERS ====================== */
const generateOTP = () => crypto.randomInt(100000, 1000000).toString();

const getClientMeta = (req) => ({
  ip: req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket.remoteAddress || 'unknown',
  ua: req.headers['user-agent'] || 'unknown',
});

async function checkRateLimit(key, maxAttempts = 5, windowMs = 15 * 60 * 1000) {
  const now = Date.now();
  const [rec] = await db
    .select()
    .from(auth_rate_limits)
    .where(eq(auth_rate_limits.key, key))
    .limit(1);

  if (rec && rec.blocked_until > now) {
    return { blocked: true, retryAfter: Math.ceil((rec.blocked_until - now) / 1000) };
  }

  const withinWindow  = rec && now - rec.window_start < windowMs;
  const attempts      = withinWindow ? rec.attempts + 1 : 1;
  const window_start  = withinWindow ? rec.window_start : now;
  const blocked       = attempts >= maxAttempts;
  const blocked_until = blocked ? now + windowMs : 0;

  await db
    .insert(auth_rate_limits)
    .values({ key, attempts, window_start, blocked_until, updated_at: new Date() })
    .onConflictDoUpdate({
      target: auth_rate_limits.key,
      set:    { attempts, window_start, blocked_until, updated_at: new Date() },
    });

  return { blocked, retryAfter: blocked ? Math.ceil(windowMs / 1000) : 0 };
}

export async function cleanupRateLimits() {
  const cutoff = Date.now() - 24 * 60 * 60 * 1000;
  await db.delete(auth_rate_limits).where(lt(auth_rate_limits.updated_at, new Date(cutoff)));
}

/* ====================== REGISTER ====================== */
router.post('/register', async (req, res) => {
  try {
    const { email, password, firstName, lastName  } = registerSchema.parse(req.body);
    const { ip } = getClientMeta(req);
    const normalizedEmail = email.toLowerCase();

    const rate = await checkRateLimit(`register:${ip}`, 10, 60 * 60 * 1000);
    if (rate.blocked) {
      return res.status(429).json({ success: false, message: 'ძალიან ბევრი მცდელობა', retryAfter: rate.retryAfter });
    }

    const [existing] = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, normalizedEmail))
      .limit(1);

    if (existing) {
      return res.status(409).json({ success: false, message: 'ეს ელფოსტა უკვე რეგისტრირებულია' });
    }

    const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);
    const otp          = generateOTP();
    const otpHash      = await bcrypt.hash(otp, 10);

    await db
      .insert(pending_registrations)
      .values({
        email:      normalizedEmail,
        otp_hash:   otpHash,
        payload:    JSON.stringify({ passwordHash, firstName, lastName }),
        expires_at: Date.now() + OTP_EXPIRY_MS,
      })
      .onConflictDoUpdate({
        target: pending_registrations.email,
        set: {
          otp_hash:   otpHash,
          payload:    JSON.stringify({ passwordHash, firstName, lastName }),
          expires_at: Date.now() + OTP_EXPIRY_MS,
        },
      });

    await sendOtpEmail(normalizedEmail, otp);
    res.json({ success: true, message: 'OTP კოდი გაიგზავნა თქვენს ელფოსტაზე' });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ success: false, message: err.errors[0].message });
    }
    console.error('[REGISTER ERROR]', err);
    res.status(500).json({ success: false, message: 'სერვერის შეცდომა' });
  }
});

/* ====================== VERIFY EMAIL ====================== */
router.post('/verify-email', async (req, res) => {
  try {
    const { email, otp } = verifySchema.parse(req.body);
    const normalizedEmail = email.toLowerCase();

    const rate = await checkRateLimit(`otp_verify:${normalizedEmail}`, 5);
    if (rate.blocked) {
      return res.status(429).json({ success: false, message: 'ძალიან ბევრი OTP მცდელობა', retryAfter: rate.retryAfter });
    }

    const [pending] = await db
      .select()
      .from(pending_registrations)
      .where(eq(pending_registrations.email, normalizedEmail))
      .limit(1);

    if (!pending || Date.now() > pending.expires_at) {
      return res.status(400).json({ success: false, message: 'არასწორი ან ვადაგასული მოთხოვნა' });
    }

    const validOtp = await bcrypt.compare(otp, pending.otp_hash);
    if (!validOtp) {
      return res.status(400).json({ success: false, message: 'არასწორი OTP კოდი' });
    }

    const user = await db.transaction(async (tx) => {
      const [alreadyExists] = await tx
        .select({ id: users.id })
        .from(users)
        .where(eq(users.email, normalizedEmail))
        .limit(1);

      if (alreadyExists) throw Object.assign(new Error('ALREADY_EXISTS'), { status: 409 });

      await tx.delete(pending_registrations).where(eq(pending_registrations.id, pending.id));

      const data = JSON.parse(pending.payload);
      const [newUser] = await tx
        .insert(users)
        .values({
          email:        normalizedEmail,
          password:     data.passwordHash,
          firstName:    data.firstName, 
          lastName:     data.lastName,   
          tokenVersion: crypto.randomInt(1, 999999),
          isVerified:   true,
          role:         'user',
        })
        .returning();

      return newUser;
    });

    const accessToken  = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    const { ip, ua }   = getClientMeta(req);

    await db.insert(user_refresh_tokens).values({
      user_id:    user.id,
      token:      hashToken(refreshToken),
      expires_at: Date.now() + REFRESH_EXPIRY_MS,
      ip,
      user_agent: ua,
    });

    res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS);
    res.json({ success: true, accessToken, message: 'რეგისტრაცია წარმატებით დასრულდა' });
  } catch (err) {
    if (err?.status === 409) {
      return res.status(409).json({ success: false, message: 'ეს ელფოსტა უკვე რეგისტრირებულია' });
    }
    if (err instanceof z.ZodError) {
      return res.status(400).json({ success: false, message: 'არასწორი მონაცემები' });
    }
    console.error('[VERIFY ERROR]', err);
    res.status(500).json({ success: false, message: 'სერვერის შეცდომა' });
  }
});

/* ====================== LOGIN ====================== */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    const normalizedEmail = email.toLowerCase();
    const { ip, ua } = getClientMeta(req);

    const rate = await checkRateLimit(`login:${normalizedEmail}:${ip}`, 10);
    if (rate.blocked) {
      return res.status(429).json({ success: false, message: 'ძალიან ბევრი შესვლის მცდელობა', retryAfter: rate.retryAfter });
    }

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, normalizedEmail))
      .limit(1);

    // Always run bcrypt — prevents timing-based email enumeration
    const hashToCheck = user?.password ?? '$2b$12$invalidhashpaddingtomatchbcryptlengthXXXXXXXXXXXXXXXX';
    const isValid = user ? await bcrypt.compare(password, hashToCheck) : false;

    db.insert(user_login_attempts)
      .values({ email: normalizedEmail, success: isValid, ip })
      .catch((e) => console.error('[LOGIN ATTEMPT LOG ERROR]', e));

    if (!isValid) {
      return res.status(401).json({ success: false, message: 'არასწორი ელფოსტა ან პაროლი' });
    }

    const accessToken  = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await db.insert(user_refresh_tokens).values({
      user_id:    user.id,
      token:      hashToken(refreshToken),
      expires_at: Date.now() + REFRESH_EXPIRY_MS,
      ip,
      user_agent: ua,
    });

    res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS);
    res.json({ success: true, accessToken, message: 'წარმატებით შეხვედით' });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ success: false, message: err.errors[0].message });
    }
    console.error('[LOGIN ERROR]', err);
    res.status(500).json({ success: false, message: 'სერვერის შეცდომა' });
  }
});

/* ====================== REFRESH ====================== */
router.post('/refresh', async (req, res) => {
  try {
    const oldRefreshToken = req.cookies?.refreshToken;
    if (!oldRefreshToken) {
      return res.status(401).json({ success: false, message: 'Refresh ტოკენი არ არის' });
    }

    let payload;
    try {
      payload = jwt.verify(oldRefreshToken, process.env.JWT_REFRESH_SECRET);
    } catch {
      res.clearCookie('refreshToken', COOKIE_OPTIONS);
      return res.status(403).json({ success: false, message: 'არასწორი ან ვადაგასული refresh ტოკენი' });
    }

    const tokenHash = hashToken(oldRefreshToken);

    const [storedToken] = await db
      .select()
      .from(user_refresh_tokens)
      .where(eq(user_refresh_tokens.token, tokenHash))
      .limit(1);

    if (!storedToken || storedToken.revoked || Number(storedToken.expires_at) < Date.now()) {
      res.clearCookie('refreshToken', COOKIE_OPTIONS);
      return res.status(403).json({ success: false, message: 'ტოკენი გაუქმებულია' });
    }

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, payload.id))
      .limit(1);

    if (!user || user.tokenVersion !== payload.tokenVersion) {
      res.clearCookie('refreshToken', COOKIE_OPTIONS);
      return res.status(403).json({ success: false, message: 'სესია გაუქმებულია' });
    }

    const newAccessToken  = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);
    const { ip, ua } = getClientMeta(req);

    await db.transaction(async (tx) => {
      await tx
        .update(user_refresh_tokens)
        .set({ revoked: true })
        .where(eq(user_refresh_tokens.token, tokenHash));

      await tx.insert(user_refresh_tokens).values({
        user_id:    user.id,
        token:      hashToken(newRefreshToken),
        expires_at: Date.now() + REFRESH_EXPIRY_MS,
        ip,
        user_agent: ua,
      });
    });

    res.cookie('refreshToken', newRefreshToken, COOKIE_OPTIONS);
    res.json({ success: true, accessToken: newAccessToken });
  } catch (err) {
    console.error('[REFRESH ERROR]', err);
    res.status(403).json({ success: false, message: 'არასწორი refresh ტოკენი' });
  }
});

/* ====================== LOGOUT ====================== */
router.post('/logout', async (req, res) => {
  try {
    const token = req.cookies?.refreshToken;
    if (token) {
      await db
        .update(user_refresh_tokens)
        .set({ revoked: true })
        .where(eq(user_refresh_tokens.token, hashToken(token)));
    }
    res.clearCookie('refreshToken', COOKIE_OPTIONS);
    res.json({ success: true, message: 'წარმატებით გამოხვედით' });
  } catch (err) {
    console.error('[LOGOUT ERROR]', err);
    res.status(500).json({ success: false, message: 'სერვერის შეცდომა' });
  }
});

/* ====================== LOGOUT ALL ====================== */
router.post('/logout-all', async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ success: false, message: 'Refresh ტოკენი არ არის' });
    }

    let payload;
    try {
      payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    } catch {
      return res.status(403).json({ success: false, message: 'არასწორი refresh ტოკენი' });
    }

    const [storedToken] = await db
      .select()
      .from(user_refresh_tokens)
      .where(eq(user_refresh_tokens.token, hashToken(refreshToken)))
      .limit(1);

    if (!storedToken || storedToken.revoked) {
      return res.status(403).json({ success: false, message: 'ტოკენი უკვე გაუქმებულია' });
    }

    await db.transaction(async (tx) => {
      await tx
        .update(user_refresh_tokens)
        .set({ revoked: true })
        .where(eq(user_refresh_tokens.user_id, payload.id));

      await tx
        .update(users)
        .set({ tokenVersion: crypto.randomInt(1, 999999) })
        .where(eq(users.id, payload.id));
    });

    res.clearCookie('refreshToken', COOKIE_OPTIONS);
    res.json({ success: true, message: 'წარმატებით გამოხვედით ყველა მოწყობილობიდან' });
  } catch (err) {
    console.error('[LOGOUT-ALL ERROR]', err);
    res.status(500).json({ success: false, message: 'სერვერის შეცდომა' });
  }
});

/* ====================== FORGOT PASSWORD ====================== */
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = forgotSchema.parse(req.body);
    const normalizedEmail = email.toLowerCase().trim();
    const SAFE_MSG = { success: true, message: 'პაროლის აღდგენის კოდი გაიგზავნა ელფოსტაზე' };

    const rate = await checkRateLimit(`forgot:${normalizedEmail}`, 5, 60 * 60 * 1000);
    if (rate.blocked) return res.json(SAFE_MSG);

    const [user] = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, normalizedEmail))
      .limit(1);

    if (!user) {
      await bcrypt.hash('dummy-timing-equalizer', 10);
      return res.json(SAFE_MSG);
    }

    const code = generateOTP();
    const hash = await bcrypt.hash(code, 10);

    await db
      .delete(user_password_resets)
      .where(and(eq(user_password_resets.email, normalizedEmail), eq(user_password_resets.used, false)));

    await db.insert(user_password_resets).values({
      email:      normalizedEmail,
      reset_code: hash,
      expires_at: Date.now() + RESET_EXPIRY_MS,
      used:       false,
    });

    await sendPasswordResetEmail(normalizedEmail, code);
    res.json(SAFE_MSG);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ success: false, message: err.errors[0].message });
    }
    console.error('[FORGOT ERROR]', err);
    res.status(500).json({ success: false, message: 'სერვერის შეცდომა' });
  }
});

/* ====================== verify reset code ====================== */
router.post('/verify-reset-code', async (req, res) => {
  try {
    const { email, code } = req.body;
    if (!email || !code) {
      return res.status(400).json({ success: false, message: 'email და code აუცილებელია' });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const rate = await checkRateLimit(`reset_verify:${normalizedEmail}`, 5);
    if (rate.blocked) {
      return res.status(429).json({ success: false, message: 'ძალიან ბევრი მცდელობა' });
    }

    const [record] = await db
      .select()
      .from(user_password_resets)
      .where(and(
        eq(user_password_resets.email, normalizedEmail),
        eq(user_password_resets.used, false)
      ))
      .orderBy(desc(user_password_resets.id))
      .limit(1);

    if (!record || Date.now() > record.expires_at) {
      return res.status(400).json({ success: false, message: 'არასწორი ან ვადაგასული კოდი' });
    }

    const valid = await bcrypt.compare(code, record.reset_code);
    if (!valid) {
      return res.status(400).json({ success: false, message: 'არასწორი კოდი' });
    }

    return res.json({ success: true, message: 'კოდი ვალიდურია' });
  } catch (err) {
    console.error('[VERIFY-RESET-CODE ERROR]', err);
    res.status(500).json({ success: false, message: 'სერვერის შეცდომა' });
  }
});

/* ====================== RESET PASSWORD ====================== */
router.post('/reset-password', async (req, res) => {
  try {
    const { email, code, newPassword } = resetSchema.parse(req.body);
    const normalizedEmail = email.toLowerCase().trim();

    const rate = await checkRateLimit(`reset:${normalizedEmail}`, 5);
    if (rate.blocked) {
      return res.status(429).json({ success: false, message: 'ძალიან ბევრი მცდელობა', retryAfter: rate.retryAfter });
    }

    const [record] = await db
      .select()
      .from(user_password_resets)
      .where(and(eq(user_password_resets.email, normalizedEmail), eq(user_password_resets.used, false)))
      .orderBy(desc(user_password_resets.id))
      .limit(1);

    if (!record || Date.now() > record.expires_at) {
      return res.status(400).json({ success: false, message: 'არასწორი ან ვადაგასული კოდი' });
    }

    const valid = await bcrypt.compare(code, record.reset_code);
    if (!valid) {
      return res.status(400).json({ success: false, message: 'არასწორი კოდი' });
    }

    const hashed = await bcrypt.hash(newPassword, BCRYPT_ROUNDS);

    await db.transaction(async (tx) => {
      const [user] = await tx
        .select({ id: users.id })
        .from(users)
        .where(eq(users.email, normalizedEmail))
        .limit(1);

      if (!user) throw new Error('User not found');

      await tx
        .update(users)
        .set({ password: hashed, tokenVersion: crypto.randomInt(1, 999999) })
        .where(eq(users.id, user.id));

      await tx
        .update(user_password_resets)
        .set({ used: true })
        .where(eq(user_password_resets.id, record.id));

      await tx
        .update(user_refresh_tokens)
        .set({ revoked: true })
        .where(eq(user_refresh_tokens.user_id, user.id));
    });

    res.json({ success: true, message: 'პაროლი წარმატებით შეიცვალა' });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ success: false, message: err.errors[0].message });
    }
    console.error('[RESET ERROR]', err);
    res.status(500).json({ success: false, message: 'სერვერის შეცდომა' });
  }
});

export default router;