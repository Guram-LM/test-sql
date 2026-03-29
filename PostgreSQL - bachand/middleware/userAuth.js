// middleware/userAuth.js
import jwtAuth from './jwtAuth.js';
import { requireRole } from './requireRole.js';
export const userAuth = [jwtAuth, requireRole('user')];