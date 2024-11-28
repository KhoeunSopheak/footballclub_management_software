const jwt = require('jsonwebtoken');

const verifyToken = (...allowedRoles) => async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authorization token missing or invalid' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user data to `req.user`
    console.log("verify token:", req.user);

    // Check if the user's role is in the allowed roles
    if (allowedRoles.length && !allowedRoles.includes(decoded.role)) {
      return res.status(403).json({ message: 'Access denied: Unauthorized role' });
    }

    next(); // User is authorized
  } catch (error) {
    res.status(403).json({ message: 'Invalid token' });
  }
};

module.exports = verifyToken;
