// config/env.js ან სადაც გაქვს
import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(5000),

  DATABASE_URL: z.string()
    .url()
    .refine(url => url.startsWith('postgresql://') || url.startsWith('postgres://'), {
      message: 'DATABASE_URL უნდა იყოს PostgreSQL connection string',
    })
    .refine(url => url.includes('sslmode='), {
      message: 'DATABASE_URL-ში აუცილებელია sslmode=require ან sslmode=verify-full (Neon-ისთვის)',
    }),

  JWT_ACCESS_SECRET: z.string().min(32, 'JWT_ACCESS_SECRET უნდა იყოს მინიმუმ 32 სიმბოლო'),
  JWT_REFRESH_SECRET: z.string().min(32, 'JWT_REFRESH_SECRET უნდა იყოს მინიმუმ 32 სიმბოლო'),

  JWT_ACCESS_EXPIRES: z.string().default("15m"),
  JWT_REFRESH_EXPIRES: z.string().default("7d"),



  MAIL_USER: z.string().email().optional(),
  MAIL_PASS: z.string().optional(),

  CLOUD_NAME: z.string().optional(),
  CLOUD_API_KEY: z.string().optional(),
  CLOUD_API_SECRET: z.string().optional(),

  ADMIN_USER: z.string().min(3).optional(),
  ADMIN_PASS: z.string().min(6).optional(),
  RESEND_API_KEY: z.string().optional(),

  VAPID_PUBLIC_KEY: z.string().optional(),
  VAPID_PRIVATE_KEY: z.string().optional(),
  VAPID_MAILTO: z.string().optional(),


  FRONTEND_ORIGINS: z
    .string()
    .optional()
    .default('http://localhost:5173,http://localhost:5174')
    .transform((val) => val.split(',').map((s) => s.trim())),

  TRUST_PROXY: z.enum(['true', 'false', '1', '0']).default('1').transform((v) => v === 'true' || v === '1'),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  console.error('❌ Env validation failed:');
  console.error(result.error.format());
  process.exit(1);   // production-შიც გავჩერდეთ, თუ env არასწორია
}

export const env = result.data;
export const isProduction = env.NODE_ENV === 'production';