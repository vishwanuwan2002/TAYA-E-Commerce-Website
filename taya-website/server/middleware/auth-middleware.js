const jwt = require('jsonwebtoken');
const prisma = require('../helpers/prisma-client');

const JWT_SECRET = process.env.JWT_SECRET || 'CLIENT_SECRET_KEY';

async function requireAuth(req, res, next) {
  try {
    const tokenFromCookie = req.cookies?.token;
    const tokenFromHeader = req.headers.authorization?.startsWith('Bearer ')
      ? req.headers.authorization.slice(7)
      : null;
    const token = tokenFromCookie || tokenFromHeader;

    if (!token) {
      return res.status(401).json({ success: false, message: 'Authentication required' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });

    if (!user) {
      return res.status(401).json({ success: false, message: 'Authentication required' });
    }

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
      userName: user.userName || '',
    };

    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid or expired session' });
  }
}

function requireAdmin(req, res, next) {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Admin access required' });
  }

  next();
}

module.exports = {
  requireAuth,
  requireAdmin,
};