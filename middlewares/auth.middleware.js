// src/middlewares/auth.middleware.js
import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authorization header missing or malformed",
      });
    }

    const token = authHeader.split(" ")[1].trim();

    if (!token) {
      return res.status(401).json({
        message: "Token not provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    console.error("JWT verification error:", error.message);

    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};