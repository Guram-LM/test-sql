// middleware/adminAuth.js
import jwtAuth from './jwtAuth.js';
import { requireRole } from './requireRole.js';
export const adminAuth = [jwtAuth, requireRole('admin')];