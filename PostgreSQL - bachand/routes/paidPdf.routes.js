import express from "express";
import {
  upload,
  createPaidPdf,
  getPaidPdfs,
  generateAccessCode,
  verifyAndDownload,
  deletePaidPdf
} from "../controllers/paidPdf.controller.js";

import { adminAuth } from "../middleware/adminAuth.js"; 


const router = express.Router();


router.get("/paid-pdfs", getPaidPdfs); 


router.post(
  "/admin/paid-pdfs", 
  ...adminAuth,
  upload.single("pdf"), 
  createPaidPdf
);

router.post(
  "/admin/paid-pdfs/:id/generate-code", 
  ...adminAuth,
  generateAccessCode
);

router.delete(
  "/admin/paid-pdfs/:id", 
  ...adminAuth, 
  deletePaidPdf
);

router.post("/paid-pdfs/:id/verify", verifyAndDownload);

export default router;