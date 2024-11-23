const jwt = require("jsonwebtoken");

const verifyToken = (requiredRole) => (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; 
      
      if (requiredRole && decoded.role !== requiredRole) {
        return res.status(403).json({ message: "Forbidden: Access denied" });
      } next();
    } catch (err) {
      return res.status(400).json({ message: "Token is not valid" });
    }
  } else {
    return res
      .status(401)
      .json({ message: "Authorization header missing or malformed" });
  }
};

module.exports = verifyToken;
