import { Resend } from "resend";
import crypto from "crypto";
import { otpEmailTemplate, resetEmailTemplate, emailChangeTemplate } from "../emails/email.templates.js";

const resend = new Resend(process.env.RESEND_API_KEY);

/* ================================================================
   GENERIC SEND EMAIL FUNCTION
================================================================ */
export async function sendEmail({ to, subject, html, text }) {
  try {
    const { data, error } = await resend.emails.send({
      from: "ნუცა ბახტაძე <noreply@nutsabakhtadze.com>",
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      ...(text ? { text } : {}),
      headers: {
        "X-Entity-Ref-ID": crypto.randomUUID(),
      },
    });

    if (error) {
      console.error("[Resend Error]", error);
      throw new Error(error.message);
    }

    return { success: true, id: data.id };
  } catch (err) {
    console.error("[SEND EMAIL ERROR]", err);
    throw err;
  }
}

/* ================================================================
   NAMED EMAIL SENDERS
================================================================ */
export async function sendOtpEmail(to, otp) {
  return sendEmail({
    to,
    subject: "ანგარიშის დადასტურება — ნუცა ბახტაძე",
    html: otpEmailTemplate(otp),
    text: `თქვენი კოდია: ${otp}. მოქმედია 5 წუთი.`,
  });
}

export async function sendPasswordResetEmail(to, code) {
  return sendEmail({
    to,
    subject: "პაროლის აღდგენა — ნუცა ბახტაძე",
    html: resetEmailTemplate(code),
    text: `პაროლის კოდია: ${code}. მოქმედია 5 წუთი.`,
  });
}

export async function sendEmailChangeOtp(to, otp) {
  return sendEmail({
    to,
    subject: "ელფოსტის დადასტურება — ნუცა ბახტაძე",
    html: emailChangeTemplate(otp),
    text: `ელფოსტის კოდია: ${otp}. მოქმედია 5 წუთი.`,
  });
}