// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("❌ No token provided in request headers");
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    const token = authHeader.split(" ")[1];
    console.log("✅ Token received:", token);

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("✅ Decoded token payload:", decoded);
    } catch (err) {
      console.log("❌ JWT verification failed:", err.message);
      return res.status(401).json({ message: "Token is not valid" });
    }

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      console.log("❌ No user found for this token");
      return res.status(401).json({ message: "User not found" });
    }

    // Attach user to request so routes can use it
    req.user = user;
    next();
  } catch (err) {
    console.error("❌ Auth middleware error:", err.message);
    res.status(500).json({ message: "Server error in authentication" });
  }
};

module.exports = protect;
