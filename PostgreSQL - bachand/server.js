import "./config/env.js";
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { createServer } from "http";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";

import { startEventEmailNotifier } from "./routes/eventEmailNotifier.js";

import contactRoutes from "./routes/contact.js";
import dynamicRoutes from "./routes/dynamic.js";
import adminRoutes from "./routes/admin.js";
import ordersRouter from "./routes/orders.js";
import eventsRouter from "./routes/events.js";
import paidPdfRoutes from "./routes/paidPdf.routes.js";
import pushRouter, { sendPushToAll } from "./routes/push.js";
import { myEventsRouter, partnerEventsRouter } from "./routes/newEvents.js";

import { scheduledPostsRouter } from "./routes/scheduledPosts.router.js";
import { startScheduler } from "./workers/scheduler.js";   

// USER ROUTES (IMPORTANT)
import userAuthRoutes from "./routes/user.auth.routes.js";
import userProfileRoutes from "./routes/user.profile.routes.js";
import { cleanupExpiredRecords } from './workers/cleanup.js';


if (!process.env.JWT_ACCESS_SECRET || !process.env.JWT_REFRESH_SECRET) {
  console.error("❌ JWT secrets missing in .env");
  process.exit(1);
}

const app = express();
const httpServer = createServer(app);

app.set("trust proxy", 1);

/* ================================
   SERVICES (DB handled by drizzle, no initDB needed)
================================ */
startEventEmailNotifier();
console.log("✅ Services ready");

/* ================================
   SOCKET.IO
================================ */
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_ORIGINS?.split(",") || [
      "http://localhost:5173",
      "http://localhost:5174",
    ],
    credentials: true,
  },
});

app.set("io", io);
app.set("sendPush", sendPushToAll);

/* ================================
   MIDDLEWARE
================================ */
app.use(helmet());
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

app.use(
  cors({
    origin: (origin, cb) => {
      const allowed = [
        "http://localhost:5173",
        "http://localhost:5174",
        ...(process.env.FRONTEND_ORIGINS?.split(",") || []),
      ];

      if (!origin || allowed.includes(origin)) {
        return cb(null, true);
      }
      cb(new Error("CORS blocked"));
    },
    credentials: true,
  })
);

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: process.env.NODE_ENV === "development" ? 5000 : 1000,
});

app.use(limiter);

/* ================================
   ROUTES
================================ */
app.use("/api/push", pushRouter);
app.use("/api/contact", contactRoutes);
app.use("/api/orders", ordersRouter);
app.use("/api/admin", adminRoutes);
app.use("/api/events", eventsRouter);
app.use("/api/pdf", paidPdfRoutes);
app.use("/api/my-events", myEventsRouter);
app.use("/api/partner-events", partnerEventsRouter);
app.use("/api/scheduled-posts", scheduledPostsRouter);

// USER SYSTEM (IMPORTANT FIX)
app.use("/api/auth", userAuthRoutes);
app.use("/api/user", userProfileRoutes);

// dynamic last
app.use("/api", dynamicRoutes);





/* ================================
   ERRORS
================================ */
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    success: false,
    message: "Server error",
  });
});

app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Not found",
  });
});

/* ================================
   START SERVER
================================ */
const PORT = process.env.PORT || 5000;
let cronStarted = false;

httpServer.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);

  if (cronStarted) return;
  cronStarted = true;

  startScheduler(io);

  console.log("✅ Scheduled posts scheduler started (with locking & Socket.IO)");

   // დაამატე აქ:
   cleanupExpiredRecords();
   setInterval(cleanupExpiredRecords, 60 * 60 * 1000);
   console.log("✅ Cleanup scheduler started");
});