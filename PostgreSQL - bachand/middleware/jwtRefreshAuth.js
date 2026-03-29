// middleware/jwtRefreshAuth.js
import { verifyRefreshToken } from "../routes/tokens.js";

export default function jwtRefreshAuth(req, res, next) {
  try {
    const token = req.cookies?.refreshToken || req.body?.refreshToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Refresh token missing",
      });
    }

    const payload = verifyRefreshToken(token);

    // ❗ ONLY id + tokenVersion
    if (!payload?.id) {
      return res.status(403).json({
        success: false,
        message: "Invalid refresh token",
      });
    }

    req.refresh = {
      id: payload.id,
      tokenVersion: payload.tokenVersion,
      token,
    };

    next();
  } catch (err) {
    console.error("REFRESH ERROR:", err.message);

    if (err.name === "TokenExpiredError") {
      return res.status(403).json({
        success: false,
        message: "Refresh token expired",
      });
    }

    return res.status(403).json({
      success: false,
      message: "Invalid refresh token",
    });
  }
}