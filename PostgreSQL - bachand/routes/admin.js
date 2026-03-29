// routes/admin.auth.routes.js
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { db } from '../database/db.js';
import { admins, admin_refresh_tokens } from '../database/schema.js';
import { eq, and, gt } from 'drizzle-orm';
import transporter from '../config/mailer.js';
import { generateAccessToken, generateRefreshToken } from './tokens.js';
import { emailTemplate } from './emailTemplate.js';
import { adminAuth } from '../middleware/adminAuth.js';
import { getFreshAdmin } from '../services/adminService.js';
import { hashToken } from '../utils/hashToken.js';

const router = express.Router();

/* ====================== CONSTANTS ====================== */
const MAX_LOGIN_ATTEMPTS  = 5;
const LOCK_DURATION_MS    = 10 * 60 * 1000;
const LOGIN_OTP_EXPIRY_MS = 5  * 60 * 1000;
const RESET_EXPIRY_MS     = 15 * 60 * 1000;
const REFRESH_EXPIRY_MS   = 7 * 24 * 60 * 60 * 1000;
const BCRYPT_ROUNDS       = 12;

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure:   process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  maxAge:   REFRESH_EXPIRY_MS,
};

const CLEAR_COOKIE_OPTIONS = {
  httpOnly: true,
  secure:   process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
};

/* ====================== HELPERS ====================== */
const generateOTP = () => crypto.randomInt(100000, 1000000).toString();

async function sendOtpEmail({ to, subject, title, subtitle, code }) {
  await transporter.sendMail({
    from: process.env.MAIL_USER,
    to,
    subject,
    html: emailTemplate({ title, subtitle, code }),
  });
}

/* ====================== LOGIN — STEP 1 ====================== */
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'username და password აუცილებელია' });
    }

    const [admin] = await db
      .select()
      .from(admins)
      .where(eq(admins.username, username))
      .limit(1);

    // Always run bcrypt — prevents username enumeration via timing
    const hashToCheck = admin?.password ?? '$2b$12$invalidhashpaddingtomatchbcryptlengthXXXXXXXXXXXXXXXX';
    const valid = await bcrypt.compare(password, hashToCheck);

    if (!admin || !valid) {
      if (admin) {
        const newAttempts = (admin.failedLoginAttempts || 0) + 1;
        const locked      = newAttempts >= MAX_LOGIN_ATTEMPTS;
        await db.update(admins).set({
          failedLoginAttempts: newAttempts,
          lockedUntil: locked ? new Date(Date.now() + LOCK_DURATION_MS) : null,
        }).where(eq(admins.id, admin.id));

        if (locked) {
          return res.status(429).json({
            success: false,
            message: `${MAX_LOGIN_ATTEMPTS} არასწორი მცდელობა. დაბლოკილია ${LOCK_DURATION_MS / 60000} წუთით.`,
          });
        }
      }
      return res.status(401).json({ success: false, message: 'მომხმარებელი ან პაროლი არასწორია' });
    }

    // Check lock AFTER bcrypt to preserve constant-time behaviour
    if (admin.lockedUntil && admin.lockedUntil > new Date()) {
      const remaining = Math.ceil((admin.lockedUntil - Date.now()) / 60000);
      return res.status(429).json({
        success: false,
        message: `ანგარიში დაბლოკილია. სცადეთ ${remaining} წუთში.`,
      });
    }

    await db.update(admins).set({ failedLoginAttempts: 0, lockedUntil: null }).where(eq(admins.id, admin.id));

    const otp     = generateOTP();
    const otpHash = await bcrypt.hash(otp, 10);

    await db.update(admins).set({
      login_otp_hash:    otpHash,
      login_otp_expires: Date.now() + LOGIN_OTP_EXPIRY_MS,
    }).where(eq(admins.id, admin.id));

    await sendOtpEmail({
      to:       admin.email,
      subject:  'შესვლის OTP კოდი',
      title:    'შესვლის კოდი',
      subtitle: 'კოდი მოქმედია 5 წუთის განმავლობაში',
      code:     otp,
    });

    res.json({ success: true, message: 'OTP კოდი გაიგზავნა ელფოსტაზე' });
  } catch (err) {
    console.error('[ADMIN LOGIN ERROR]', err);
    res.status(500).json({ success: false, message: 'სერვერის შეცდომა' });
  }
});

/* ====================== VERIFY LOGIN OTP ====================== */
router.post('/verify-otp', async (req, res) => {
  try {
    const { username, otp } = req.body;
    if (!username || !otp) {
      return res.status(400).json({ success: false, message: 'username და otp აუცილებელია' });
    }

    const [admin] = await db
      .select()
      .from(admins)
      .where(eq(admins.username, username))
      .limit(1);

    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin ვერ მოიძებნა' });
    }

    if (!admin.login_otp_hash || !(await bcrypt.compare(otp, admin.login_otp_hash))) {
      return res.status(401).json({ success: false, message: 'OTP არასწორია' });
    }

    if (!admin.login_otp_expires || Date.now() > admin.login_otp_expires) {
      return res.status(400).json({ success: false, message: 'OTP ვადაგასულია' });
    }

    let accessToken, refreshToken;

    await db.transaction(async (tx) => {
      await tx.update(admins).set({
        login_otp_hash:    null,
        login_otp_expires: null,
        tokenVersion:      crypto.randomInt(1, 999999),
      }).where(eq(admins.id, admin.id));

      const freshAdmin = await getFreshAdmin(admin.id);
      accessToken  = generateAccessToken(freshAdmin);
      refreshToken = generateRefreshToken(freshAdmin);

      await tx.insert(admin_refresh_tokens).values({
        admin_id:   admin.id,
        token:      hashToken(refreshToken),
        expires_at: Date.now() + REFRESH_EXPIRY_MS,
        revoked:    false,
      });
    });

    res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS);
    res.json({ success: true, accessToken });
  } catch (err) {
    console.error('[ADMIN VERIFY-OTP ERROR]', err);
    res.status(500).json({ success: false, message: 'სერვერის შეცდომა' });
  }
});

/* ====================== REFRESH ====================== */
router.post('/refresh', async (req, res) => {
  try {
    const token = req.cookies?.refreshToken;
    if (!token) {
      return res.status(401).json({ success: false, message: 'Refresh ტოკენი არ არის' });
    }

    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    } catch {
      res.clearCookie('refreshToken', CLEAR_COOKIE_OPTIONS);
      return res.status(403).json({ success: false, message: 'არასწორი ან ვადაგასული refresh ტოკენი' });
    }

    const [admin] = await db
      .select()
      .from(admins)
      .where(eq(admins.id, payload.id))
      .limit(1);

    if (!admin || admin.tokenVersion !== payload.tokenVersion) {
      res.clearCookie('refreshToken', CLEAR_COOKIE_OPTIONS);
      return res.status(403).json({ success: false, message: 'სესია გაუქმებულია' });
    }

    const tokenHash = hashToken(token);

    const [stored] = await db
      .select()
      .from(admin_refresh_tokens)
      .where(and(
        eq(admin_refresh_tokens.token, tokenHash),
        eq(admin_refresh_tokens.revoked, false),
        gt(admin_refresh_tokens.expires_at, Date.now()),
      ))
      .limit(1);

    if (!stored) {
      res.clearCookie('refreshToken', CLEAR_COOKIE_OPTIONS);
      return res.status(403).json({ success: false, message: 'ტოკენი გაუქმებულია' });
    }

    const newAccessToken  = generateAccessToken(admin);
    const newRefreshToken = generateRefreshToken(admin);

    await db.transaction(async (tx) => {
      await tx.update(admin_refresh_tokens)
        .set({ revoked: true })
        .where(eq(admin_refresh_tokens.id, stored.id));

      await tx.insert(admin_refresh_tokens).values({
        admin_id:   admin.id,
        token:      hashToken(newRefreshToken),
        expires_at: Date.now() + REFRESH_EXPIRY_MS,
        revoked:    false,
      });
    });

    res.cookie('refreshToken', newRefreshToken, COOKIE_OPTIONS);
    res.json({ success: true, accessToken: newAccessToken });
  } catch (err) {
    console.error('[ADMIN REFRESH ERROR]', err);
    res.status(500).json({ success: false, message: 'სერვერის შეცდომა' });
  }
});

/* ====================== LOGOUT ====================== */
router.post('/logout', async (req, res) => {
  try {
    const token = req.cookies?.refreshToken;
    if (token) {
      await db.update(admin_refresh_tokens)
        .set({ revoked: true })
        .where(eq(admin_refresh_tokens.token, hashToken(token)));
    }
    res.clearCookie('refreshToken', CLEAR_COOKIE_OPTIONS);
    res.json({ success: true, message: 'წარმატებით გამოხვედით' });
  } catch (err) {
    console.error('[ADMIN LOGOUT ERROR]', err);
    res.status(500).json({ success: false, message: 'სერვერის შეცდომა' });
  }
});

/* ====================== FORGOT PASSWORD ====================== */
router.post('/request-reset', async (req, res) => {
  try {
    const email = req.body?.email?.toLowerCase().trim();
    if (!email) {
      return res.status(400).json({ success: false, message: 'email აუცილებელია' });
    }

    const SAFE_RESPONSE = { success: true, message: 'კოდი გაგზავნილია ელფოსტაზე (თუ ანგარიში არსებობს)' };

    const [admin] = await db
      .select({ id: admins.id, email: admins.email })
      .from(admins)
      .where(eq(admins.email, email))
      .limit(1);

    if (!admin) {
      await bcrypt.hash('dummy-timing-equalizer', 10);
      return res.json(SAFE_RESPONSE);
    }

    const code = generateOTP();
    const hash = await bcrypt.hash(code, 10);

    await db.update(admins).set({
      reset_code:            hash,
      reset_expires:         Date.now() + RESET_EXPIRY_MS,
      reset_verify_attempts: 0,
    }).where(eq(admins.id, admin.id));

    try {
      await sendOtpEmail({
        to:       admin.email,
        subject:  'პაროლის აღდგენა',
        title:    'პაროლის აღდგენა',
        subtitle: 'კოდი მოქმედია 15 წუთის განმავლობაში',
        code,
      });
    } catch (mailErr) {
      console.error('[ADMIN RESET EMAIL ERROR]', mailErr.message);
    }

    res.json(SAFE_RESPONSE);
  } catch (err) {
    console.error('[ADMIN REQUEST-RESET ERROR]', err);
    res.status(500).json({ success: false, message: 'სერვერის შეცდომა' });
  }
});

/* ====================== VERIFY RESET CODE ====================== */
router.post('/verify-reset-code', async (req, res) => {
  try {
    const email = req.body?.email?.toLowerCase().trim();
    const { code } = req.body;

    if (!email || !code) {
      return res.status(400).json({ success: false, message: 'email და code აუცილებელია' });
    }

    const [admin] = await db
      .select({
        reset_code:            admins.reset_code,
        reset_expires:         admins.reset_expires,
        reset_verify_attempts: admins.reset_verify_attempts,
      })
      .from(admins)
      .where(eq(admins.email, email))
      .limit(1);

    if (!admin || (admin.reset_verify_attempts ?? 0) >= 5) {
      return res.status(400).json({ success: false, message: 'არასწორი ან ვადაგასული კოდი' });
    }

    const valid = admin.reset_code
      ? await bcrypt.compare(code, admin.reset_code)
      : false;

    if (!valid || Date.now() > admin.reset_expires) {
      await db.update(admins).set({
        reset_verify_attempts: (admin.reset_verify_attempts ?? 0) + 1,
      }).where(eq(admins.email, email));
      return res.status(400).json({ success: false, message: 'არასწორი ან ვადაგასული კოდი' });
    }

    await db.update(admins).set({ reset_verify_attempts: 0 }).where(eq(admins.email, email));
    res.json({ success: true, message: 'კოდი ვალიდურია' });
  } catch (err) {
    console.error('[ADMIN VERIFY-RESET-CODE ERROR]', err);
    res.status(500).json({ success: false, message: 'სერვერის შეცდომა' });
  }
});

/* ====================== RESET PASSWORD ====================== */
router.post('/reset-password', async (req, res) => {
  try {
    const { code, password, confirmPassword } = req.body;
    const email = req.body?.email?.toLowerCase().trim();

    if (!email || !code || !password || !confirmPassword) {
      return res.status(400).json({ success: false, message: 'ყველა ველი აუცილებელია' });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'პაროლები ერთმანეთს არ ემთხვევა' });
    }
    if (password.length < 8) {
      return res.status(400).json({ success: false, message: 'პაროლი უნდა იყოს მინიმუმ 8 სიმბოლო' });
    }

    const [adminRecord] = await db
      .select({ id: admins.id, reset_code: admins.reset_code, reset_expires: admins.reset_expires })
      .from(admins)
      .where(eq(admins.email, email))
      .limit(1);

    if (!adminRecord?.reset_code) {
      return res.status(400).json({ success: false, message: 'არასწორი ან ვადაგასული კოდი' });
    }

    const valid = await bcrypt.compare(code, adminRecord.reset_code);
    if (!valid) {
      return res.status(400).json({ success: false, message: 'არასწორი ან ვადაგასული კოდი' });
    }

    if (Date.now() > adminRecord.reset_expires) {
      return res.status(400).json({ success: false, message: 'კოდი ვადაგასულია' });
    }

    const hashed = await bcrypt.hash(password, BCRYPT_ROUNDS);

    await db.transaction(async (tx) => {
      await tx.update(admins).set({
        password:              hashed,
        reset_code:            null,
        reset_expires:         null,
        reset_verify_attempts: 0,
        tokenVersion:          crypto.randomInt(1, 999999),
      }).where(eq(admins.id, adminRecord.id));

      await tx.update(admin_refresh_tokens)
        .set({ revoked: true })
        .where(eq(admin_refresh_tokens.admin_id, adminRecord.id));
    });

    res.json({ success: true, message: 'პაროლი წარმატებით შეიცვალა. ყველა სესია გაუქმებულია.' });
  } catch (err) {
    console.error('[ADMIN RESET-PASSWORD ERROR]', err);
    res.status(500).json({ success: false, message: 'სერვერის შეცდომა' });
  }
});

/* ====================== CHANGE PASSWORD REQUEST ====================== */
router.post('/change-password/request', ...adminAuth, async (req, res) => {
  try {
    const admin = req.admin.entity;
    const { oldPassword } = req.body;

    if (!oldPassword) {
      return res.status(400).json({ success: false, message: 'ძველი პაროლი აუცილებელია' });
    }

    const isValid = await bcrypt.compare(oldPassword, admin.password);
    if (!isValid) {
      return res.status(401).json({ success: false, message: 'ძველი პაროლი არასწორია' });
    }

    const code = generateOTP();
    const hash = await bcrypt.hash(code, 10);

    await db.update(admins).set({
      reset_code:            hash,
      reset_expires:         Date.now() + RESET_EXPIRY_MS,
      reset_verify_attempts: 0,
    }).where(eq(admins.id, admin.id));

    await sendOtpEmail({
      to:       admin.email,
      subject:  'პაროლის შეცვლის ვერიფიკაცია',
      title:    'პაროლის შეცვლა',
      subtitle: 'კოდი მოქმედია 15 წუთის განმავლობაში',
      code,
    });

    res.json({ success: true, message: 'ვერიფიკაციის კოდი გაიგზავნა თქვენს ელფოსტაზე' });
  } catch (err) {
    console.error('[ADMIN CHANGE-PW REQUEST ERROR]', err);
    res.status(500).json({ success: false, message: 'სერვერის შეცდომა' });
  }
});

/* ====================== CHANGE PASSWORD CONFIRM ====================== */
router.post('/change-password/confirm', ...adminAuth, async (req, res) => {
  try {
    const admin = req.admin.entity;
    const { code, newPassword } = req.body;

    if (!code || !newPassword) {
      return res.status(400).json({ success: false, message: 'კოდი და ახალი პაროლი აუცილებელია' });
    }
    if (newPassword.length < 8) {
      return res.status(400).json({ success: false, message: 'პაროლი უნდა იყოს მინიმუმ 8 სიმბოლო' });
    }

    const [record] = await db
      .select({ reset_code: admins.reset_code, reset_expires: admins.reset_expires })
      .from(admins)
      .where(eq(admins.id, admin.id))
      .limit(1);

    if (!record?.reset_code) {
      return res.status(400).json({ success: false, message: 'არასწორი ან ვადაგასული კოდი' });
    }

    const valid = await bcrypt.compare(code, record.reset_code);
    if (!valid) {
      return res.status(400).json({ success: false, message: 'არასწორი ან ვადაგასული კოდი' });
    }

    if (Date.now() > record.reset_expires) {
      return res.status(400).json({ success: false, message: 'კოდი ვადაგასულია' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, BCRYPT_ROUNDS);

    await db.transaction(async (tx) => {
      await tx.update(admins).set({
        password:              hashedPassword,
        reset_code:            null,
        reset_expires:         null,
        reset_verify_attempts: 0,
        tokenVersion:          crypto.randomInt(1, 999999),
      }).where(eq(admins.id, admin.id));

      await tx.update(admin_refresh_tokens)
        .set({ revoked: true })
        .where(eq(admin_refresh_tokens.admin_id, admin.id));
    });

    // Issue fresh tokens — admin stays logged in on current device
    const freshAdmin      = await getFreshAdmin(admin.id);
    const newAccessToken  = generateAccessToken(freshAdmin);
    const newRefreshToken = generateRefreshToken(freshAdmin);

    await db.insert(admin_refresh_tokens).values({
      admin_id:   freshAdmin.id,
      token:      hashToken(newRefreshToken),
      expires_at: Date.now() + REFRESH_EXPIRY_MS,
      revoked:    false,
    });

    res.cookie('refreshToken', newRefreshToken, COOKIE_OPTIONS);
    res.json({ success: true, accessToken: newAccessToken, message: 'პაროლი წარმატებით შეიცვალა.' });
  } catch (err) {
    console.error('[ADMIN CHANGE-PW CONFIRM ERROR]', err);
    res.status(500).json({ success: false, message: 'სერვერის შეცდომა' });
  }
});

export default router;