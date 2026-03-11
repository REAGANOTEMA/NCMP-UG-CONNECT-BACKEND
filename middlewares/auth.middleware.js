// src/middlewares/auth.middleware.js
import jwt from "jsonwebtoken";

/**
 * Middleware to verify JWT token from Authorization header.
 * Adds `req.user` if valid.
 */
export const verifyToken = (req, res, next) => {
  try {
    // Get Authorization header
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authorization header missing or malformed" });
    }

    // Extract token
    const token = authHeader.split(" ")[1].trim();

    if (!token) {
      return res.status(401).json({ message: "Token not provided" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach decoded user data to request
    req.user = decoded;

    next(); // proceed to the next middleware or route
  } catch (error) {
    console.error("JWT verification error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};