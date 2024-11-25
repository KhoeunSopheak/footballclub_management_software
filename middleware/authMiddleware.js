const jwt = require('jsonwebtoken');

const verifyToken = (role) => async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authorization token missing or invalid' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user data to `req.user`

    // Optional: Check user role
    if (role && decoded.role !== role) {
      return res.status(403).json({ message: 'Access denied: Unauthorized role' });
    }

    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid token' });
  }
};

module.exports = verifyToken;
