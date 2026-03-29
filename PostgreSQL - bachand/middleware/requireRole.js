// middleware/requireRole.js
export function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.auth?.role) {
      return res.status(401).json({ success: false, message: 'ავტორიზაცია არ არის' });
    }
    if (!allowedRoles.includes(req.auth.role)) {
      return res.status(403).json({ success: false, message: 'წვდომა აკრძალულია' });
    }
    next();
  };
}