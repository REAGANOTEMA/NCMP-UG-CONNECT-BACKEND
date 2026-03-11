// src/routes/auth.routes.js
import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { register, login, getProfile } from "../controllers/auth.controller.js";

const router = express.Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
router.post("/register", register);

/**
 * @route POST /api/auth/login
 * @desc Authenticate user and return JWT
 * @access Public
 */
router.post("/login", login);

/**
 * @route GET /api/auth/profile
 * @desc Get logged in user profile
 * @access Private
 */
router.get("/profile", authMiddleware, getProfile);

export default router;