const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async function(req, res, next) {
  const token = req.headers.authorization;
  if(!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id }; // <- this is required
    next();
  } catch(err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

