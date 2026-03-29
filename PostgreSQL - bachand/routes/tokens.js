// routes/tokens.js
import jwt from 'jsonwebtoken';

export function generateAccessToken(user) {
  return jwt.sign(
    {
      id:           user.id,
      role:         user.role || 'user',
      tokenVersion: user.tokenVersion ?? 0,
    },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: process.env.JWT_ACCESS_EXPIRES || '15m' }
  );
}

export function generateRefreshToken(user) {
  return jwt.sign(
    {
      id:           user.id,
      role:         user.role || 'user',
      tokenVersion: user.tokenVersion ?? 0,
    },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRES || '7d' }
  );
}

export function verifyAccessToken(token) {
  return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
}

export function verifyRefreshToken(token) {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
}