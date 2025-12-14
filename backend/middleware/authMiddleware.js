const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ msg: "No token, access denied" });

  try {
    // Remove "Bearer " prefix if present
    const actualToken = token.startsWith("Bearer ") ? token.slice(7) : token;
    const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);

    // Set user id for downstream routes
    req.user = { id: decoded.id };
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
};

