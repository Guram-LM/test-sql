// utils/validations.ts
import { z } from "zod";

const msg = {
  ka: {
    required: "სავალდებულო ველი",
    email:    "სწორი ელ.ფოსტა შეიყვანეთ",
    minPass:  "პაროლი მინიმუმ 8 სიმბოლო",
    passMatch:"პაროლები არ ემთხვევა",
    minName:  "მინიმუმ 2 სიმბოლო",
    maxName:  "მაქსიმუმ 50 სიმბოლო",
    otpLen:   "კოდი 6 ციფრია",
    otpNum:   "კოდი მხოლოდ ციფრებია",
  },
  en: {
    required: "Required field",
    email:    "Enter a valid email",
    minPass:  "Password min 8 characters",
    passMatch:"Passwords do not match",
    minName:  "At least 2 characters",
    maxName:  "Max 50 characters",
    otpLen:   "Code is 6 digits",
    otpNum:   "Code must be digits only",
  },
};

export const getSchemas = (lang: string) => {
  const m = lang === "ka" ? msg.ka : msg.en;

  const registerSchema = z
    .object({
      firstName:       z.string().min(2, m.minName).max(50, m.maxName),
      lastName:        z.string().min(2, m.minName).max(50, m.maxName),
      email:           z.string().email(m.email),
      password:        z.string().min(8, m.minPass),
      confirmPassword: z.string().min(1, m.required),
    })
    .refine((d) => d.password === d.confirmPassword, {
      message: m.passMatch,
      path: ["confirmPassword"],
    });

  const loginSchema = z.object({
    email:    z.string().email(m.email),
    password: z.string().min(1, m.required),
  });

  const otpSchema = z.object({
    otp: z.string().length(6, m.otpLen).regex(/^\d+$/, m.otpNum),
  });

  const forgotSchema = z.object({
    email: z.string().email(m.email),
  });

  // FIX: no 'code' field — code comes from state, not the form
  const resetSchema = z
    .object({
      newPassword:     z.string().min(8, m.minPass),
      confirmPassword: z.string().min(1, m.required),
    })
    .refine((d) => d.newPassword === d.confirmPassword, {
      message: m.passMatch,
      path: ["confirmPassword"],
    });

  const changePasswordSchema = z
    .object({
      oldPassword:     z.string().min(1, m.required),
      newPassword:     z.string().min(8, m.minPass),
      confirmPassword: z.string().min(1, m.required),
    })
    .refine((d) => d.newPassword === d.confirmPassword, {
      message: m.passMatch,
      path: ["confirmPassword"],
    });

  const updateProfileSchema = z.object({
    firstName: z.string().min(2, m.minName).max(50, m.maxName).optional(),
    lastName:  z.string().min(2, m.minName).max(50, m.maxName).optional(),
  });

  return {
    registerSchema,
    loginSchema,
    otpSchema,
    forgotSchema,
    resetSchema,
    changePasswordSchema,
    updateProfileSchema,
  };
};

const s = getSchemas("ka");
export type RegisterSchema       = z.infer<typeof s.registerSchema>;
export type LoginSchema          = z.infer<typeof s.loginSchema>;
export type OtpSchema            = z.infer<typeof s.otpSchema>;
export type ForgotSchema         = z.infer<typeof s.forgotSchema>;
export type ResetSchema          = z.infer<typeof s.resetSchema>;
export type ChangePasswordSchema = z.infer<typeof s.changePasswordSchema>;
export type UpdateProfileSchema  = z.infer<typeof s.updateProfileSchema>;