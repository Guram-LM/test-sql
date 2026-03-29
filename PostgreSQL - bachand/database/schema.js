import { pgTable, serial, text, timestamp, integer, boolean, bigint } from 'drizzle-orm/pg-core';

// ─── OFFERS ──────────────────────────────────────────────────────
export const offers = pgTable('offers', {
  id:          serial('id').primaryKey(),
  title:       text('title'),
  description: text('description'),
  activities:  text('activities'),
  image_url:   text('image_url'),
  created_at:  timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

// ─── CONTACTS ────────────────────────────────────────────────────
export const contacts = pgTable('contacts', {
  id:         serial('id').primaryKey(),
  name:       text('name'),
  email:      text('email'),
  message:    text('message'),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

// ─── ADMINS ──────────────────────────────────────────────────────
export const admins = pgTable('admins', {
  id:                    serial('id').primaryKey(),
  username:              text('username').unique().notNull(),
  email:                 text('email').unique().notNull(),
  password:              text('password').notNull(),
  role:                  text('role').default('admin').notNull(),
  tokenVersion:          integer('tokenVersion').default(0).notNull(),
  login_otp_hash:        text('login_otp_hash'),
  login_otp_expires:     bigint('login_otp_expires', { mode: 'number' }),
  reset_code:            text('reset_code'),
  reset_expires:         bigint('reset_expires', { mode: 'number' }),
  reset_verify_attempts: integer('reset_verify_attempts').default(0).notNull(),
  failedLoginAttempts:   integer('failed_login_attempts').default(0).notNull(),
  lockedUntil:           timestamp('locked_until', { withTimezone: true }),
  created_at:            timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

// ─── ADMIN OTPs ──────────────────────────────────────────────────
export const admin_otps = pgTable('admin_otps', {
  id:          serial('id').primaryKey(),
  admin_id:    integer('admin_id').references(() => admins.id, { onDelete: 'cascade' }),
  otp_hash:    text('otp_hash'),
  destination: text('destination'),
  expires_at:  bigint('expires_at', { mode: 'number' }),
  used:        boolean('used').default(false).notNull(),
  created_at:  timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

// ─── ADMIN REFRESH TOKENS ────────────────────────────────────────
export const admin_refresh_tokens = pgTable('admin_refresh_tokens', {
  id:         serial('id').primaryKey(),
  admin_id:   integer('admin_id').notNull().references(() => admins.id, { onDelete: 'cascade' }),
  token:      text('token').notNull(),
  expires_at: bigint('expires_at', { mode: 'number' }).notNull(),
  revoked:    boolean('revoked').default(false).notNull(),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

// ─── ORDERS ──────────────────────────────────────────────────────
export const orders = pgTable('orders', {
  id:          serial('id').primaryKey(),
  firstName:   text('firstName'),
  lastName:    text('lastName'),
  email:       text('email'),
  phone:       text('phone'),
  message:     text('message'),
  courseTitle: text('courseTitle'),
  coursePrice: text('coursePrice'),
  created_at:  timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

// ─── INDIVIDUAL OFFERS ORDER ─────────────────────────────────────
export const individualoffersOrder = pgTable('individualoffersOrder', {
  id:                   serial('id').primaryKey(),
  title_ka:             text('title_ka'),
  title_en:             text('title_en'),
  Program_ka:           text('Program_ka'),
  Program_en:           text('Program_en'),
  programDuration_ka:   text('programDuration_ka'),
  programDuration_en:   text('programDuration_en'),
  totalHours_ka:        text('totalHours_ka'),
  totalHours_en:        text('totalHours_en'),
  benefit_ka:           text('benefit_ka'),
  benefit_en:           text('benefit_en'),
  price:                text('price'),
  description_ka:       text('description_ka'),
  description_en:       text('description_en'),
  activities:           text('activities'),
  results:              text('results'),
  image_url:            text('image_url'),
  created_at:           timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

// ─── COMPANY OFFERS ──────────────────────────────────────────────
export const companyoffers = pgTable('companyoffers', {
  id:                 serial('id').primaryKey(),
  title_ka:           text('title_ka'),
  title_en:           text('title_en'),
  programDuration_ka: text('programDuration_ka'),
  programDuration_en: text('programDuration_en'),
  totalHours_ka:      text('totalHours_ka'),
  totalHours_en:      text('totalHours_en'),
  benefit_ka:         text('benefit_ka'),
  benefit_en:         text('benefit_en'),
  price:              text('price'),
  description_ka:     text('description_ka'),
  description_en:     text('description_en'),
  activities:         text('activities'),
  results:            text('results'),
  image_url:          text('image_url'),
  created_at:         timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

// ─── EVENTS ──────────────────────────────────────────────────────
export const events = pgTable('events', {
  id:              serial('id').primaryKey(),
  title:           text('title'),
  description:     text('description'),
  date:            text('date'),
  time:            text('time'),
  notified:        text('notified'),
  image_url:       text('image_url'),
  type:            text('type').default('general'),
  priority:        integer('priority').default(0),
  duration:        integer('duration'),
  repeat:          text('repeat').default('none'),
  status:          text('status').default('pending'),
  reminderMinutes: integer('reminderMinutes'),
  eventUtc:        text('eventUtc'),
  timezone:        text('timezone'),
  utcOffset:       integer('utcOffset'),
  created_at:      timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

// ─── MY EVENTS ───────────────────────────────────────────────────
export const my_events = pgTable('my_events', {
  id:              serial('id').primaryKey(),
  title_ka:        text('title_ka').notNull(),
  title_en:        text('title_en').notNull(),
  description_ka:  text('description_ka'),
  description_en:  text('description_en'),
  event_date:      text('event_date').notNull(),
  event_time:      text('event_time').notNull(),
  timezone:        text('timezone').notNull().default('Asia/Tbilisi'),
  utcOffset:       integer('utcOffset').default(0),
  eventUtc:        text('eventUtc'),
  reminderMinutes: integer('reminderMinutes').default(30),
  meeting_type:    text('meeting_type').notNull().default('online'),
  meeting_link:    text('meeting_link'),
  platform:        text('platform'),
  city:            text('city'),
  address:         text('address'),
  notified:        boolean('notified').default(false).notNull(),
  created_at:      timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

// ─── PARTNER EVENTS ──────────────────────────────────────────────
export const partner_events = pgTable('partner_events', {
  id:              serial('id').primaryKey(),
  title_ka:        text('title_ka').notNull(),
  title_en:        text('title_en').notNull(),
  description_ka:  text('description_ka'),
  description_en:  text('description_en'),
  event_date:      text('event_date').notNull(),
  event_time:      text('event_time').notNull(),
  timezone:        text('timezone').notNull().default('Asia/Tbilisi'),
  utcOffset:       integer('utcOffset').default(0),
  eventUtc:        text('eventUtc'),
  reminderMinutes: integer('reminderMinutes').default(30),
  meeting_type:    text('meeting_type').notNull().default('online'),
  meeting_link:    text('meeting_link'),
  platform:        text('platform'),
  notified:        boolean('notified').default(false).notNull(),
  created_at:      timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

// ─── FREE PDFs ───────────────────────────────────────────────────
export const free_pdfs = pgTable('free_pdfs', {
  id:             serial('id').primaryKey(),
  title_ka:       text('title_ka'),
  title_en:       text('title_en'),
  description_ka: text('description_ka'),
  description_en: text('description_en'),
  pdf_url:        text('pdf_url'),
  created_at:     timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

// ─── FREE PDF DOWNLOADS ──────────────────────────────────────────
export const free_pdf_downloads = pgTable('free_pdf_downloads', {
  id:         serial('id').primaryKey(),
  pdf_title:  text('pdf_title'),
  firstName:  text('firstName'),
  lastName:   text('lastName'),
  isRead:     boolean('isRead').default(false).notNull(),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

// ─── PAID PDFs ───────────────────────────────────────────────────
export const paid_pdfs = pgTable('paid_pdfs', {
  id:             serial('id').primaryKey(),
  title_ka:       text('title_ka'),
  title_en:       text('title_en'),
  description_ka: text('description_ka'),
  description_en: text('description_en'),
  includes_ka:    text('includes_ka'),
  includes_en:    text('includes_en'),
  price:          text('price'),
  pdf_url:        text('pdf_url').notNull(),
  created_at:     timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

// ─── PDF ACCESS CODES ────────────────────────────────────────────
export const pdf_access_codes = pgTable('pdf_access_codes', {
  id:            serial('id').primaryKey(),
  pdf_id:        integer('pdf_id').notNull().references(() => paid_pdfs.id, { onDelete: 'cascade' }),
  code_hash:     text('code_hash').notNull(),
  expires_at:    bigint('expires_at', { mode: 'number' }).notNull(),
  attempts:      integer('attempts').default(0),
  blocked_until: bigint('blocked_until', { mode: 'number' }).default(0),
  used:          boolean('used').default(false).notNull(),
  created_at:    timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

// ─── VIDEOS ──────────────────────────────────────────────────────
export const videos = pgTable('videos', {
  id:             serial('id').primaryKey(),
  title_ka:       text('title_ka'),
  title_en:       text('title_en'),
  description_ka: text('description_ka'),
  description_en: text('description_en'),
  youtube_id:     text('youtube_id'),
  youtube_embed:  text('youtube_embed'),
  video_url:      text('video_url'),
  image_url:      text('image_url'),
  created_at:     timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

// ─── ARTICLES ────────────────────────────────────────────────────
export const articles = pgTable('articles', {
  id:               serial('id').primaryKey(),
  title_ka:         text('title_ka'),
  title_en:         text('title_en'),
  MagazineName_ka:  text('MagazineName_ka'),
  MagazineName_en:  text('MagazineName_en'),
  subtitle_ka:      text('subtitle_ka'),
  subtitle_en:      text('subtitle_en'),
  description_ka:   text('description_ka'),
  description_en:   text('description_en'),
  article_url:      text('article_url'),
  image_url:        text('image_url'),
  created_at:       timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

// ─── SOCIAL MEDIA ────────────────────────────────────────────────
export const social_media = pgTable('social_media', {
  id:             serial('id').primaryKey(),
  platform:       text('platform').notNull(),
  title_ka:       text('title_ka'),
  title_en:       text('title_en'),
  description_ka: text('description_ka'),
  description_en: text('description_en'),
  link:           text('link'),
  image_url:      text('image_url'),
  created_at:     timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

// ─── FEEDBACK ────────────────────────────────────────────────────
export const feedback = pgTable('feedback', {
  id:         serial('id').primaryKey(),
  title_ka:   text('title_ka'),
  title_en:   text('title_en'),
  image_url:  text('image_url'),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

// ─── USERS ───────────────────────────────────────────────────────
export const users = pgTable('users', {
  id:           serial('id').primaryKey(),
  firstName:    text('firstName'),
  lastName:     text('lastName'),
  email:        text('email').unique().notNull(),
  password:     text('password').notNull(),
  role:         text('role').default('user').notNull(),
  tokenVersion: integer('tokenVersion').default(0).notNull(),
  isVerified:   boolean('isVerified').default(false).notNull(),
  created_at:   timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

// ─── PENDING REGISTRATIONS ───────────────────────────────────────
export const pending_registrations = pgTable('pending_registrations', {
  id:         serial('id').primaryKey(),
  email:      text('email').unique().notNull(),
  otp_hash:   text('otp_hash').notNull(),   // bcrypt hash of OTP
  payload:    text('payload').notNull(),     // encrypted registration data
  expires_at: bigint('expires_at', { mode: 'number' }).notNull(),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

// ─── AUTH RATE LIMITS ────────────────────────────────────────────
export const auth_rate_limits = pgTable('auth_rate_limits', {
  id:            serial('id').primaryKey(),
  key:           text('key').unique().notNull(),
  attempts:      integer('attempts').default(0).notNull(),
  blocked_until: bigint('blocked_until', { mode: 'number' }).default(0).notNull(),
  window_start:  bigint('window_start',  { mode: 'number' }).default(0).notNull(),
  updated_at:    timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

// ─── USER REFRESH TOKENS ─────────────────────────────────────────
export const user_refresh_tokens = pgTable('user_refresh_tokens', {
  id:         serial('id').primaryKey(),
  user_id:    integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  token:      text('token').notNull(),
  ip:         text('ip'),
  user_agent: text('user_agent'),
  expires_at: bigint('expires_at', { mode: 'number' }).notNull(),
  revoked:    boolean('revoked').default(false).notNull(),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

// ─── USER PASSWORD RESETS ────────────────────────────────────────
export const user_password_resets = pgTable('user_password_resets', {
  id:         serial('id').primaryKey(),
  email:      text('email').notNull(),
  reset_code: text('reset_code').notNull(),
  expires_at: bigint('expires_at', { mode: 'number' }).notNull(),
  used:       boolean('used').default(false).notNull(),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

// ─── USER EMAIL CHANGES ──────────────────────────────────────────
export const user_email_changes = pgTable('user_email_changes', {
  id:         serial('id').primaryKey(),
  user_id:    integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  new_email:  text('new_email').notNull(),
  otp:        text('otp').notNull(),
  expires_at: bigint('expires_at', { mode: 'number' }).notNull(),
  used:       boolean('used').default(false).notNull(),
  ip:         text('ip'),           // ახალი
  user_agent: text('user_agent'),   // ახალი
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

// ─── USER LOGIN ATTEMPTS (audit log) ─────────────────────────────
export const user_login_attempts = pgTable('user_login_attempts', {
  id:         serial('id').primaryKey(),
  email:      text('email').notNull(),
  success:    boolean('success').default(false).notNull(),
  ip:         text('ip'),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

// ─── scheduled posts  ─────────────────────────────
export const scheduled_posts = pgTable('scheduled_posts', {
  id: serial('id').primaryKey(),
  title_ka: text('title_ka').notNull(),
  title_en: text('title_en').notNull(),
  content_ka: text('content_ka'),
  content_en: text('content_en'),
  icon: text('icon'),
  publish_date: text('publish_date').notNull(),
  publish_time: text('publish_time').notNull(),
  timezone: text('timezone').notNull().default('Asia/Tbilisi'),
  utcOffset: integer('utcOffset').default(0),
  publishUtc: text('publishUtc').notNull(),
  status: text('status').default('scheduled').notNull(),
  published_at: timestamp('published_at', { withTimezone: true }),
  attempts: integer('attempts').default(0),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});