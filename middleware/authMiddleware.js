const jwt = require("jsonwebtoken");

exports.authenticate = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");

  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

exports.isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) return res.status(403).json({ message: "Access forbidden" });
  next();
};

exports.isTokenValid = (token) => {
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return true;
  } catch (error) {
    return false;
  }
}