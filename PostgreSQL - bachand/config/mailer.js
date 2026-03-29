import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();  

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false
  }
});


if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
  console.error("❌ SMTP credentials აკლია! MAIL_USER ან MAIL_PASS არ არის .env-ში");
}


transporter.verify((error, success) => {
  if (error) {
    console.error('❌ SMTP connection error:', error.message);
  } else {
    console.log('✅ SMTP ready and connected!');
  }
});

export default transporter;