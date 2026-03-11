// src/routes/users.routes.js
import express from "express";
import { getUsers, getUserById } from "../controllers/users.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";

const router = express.Router();

/**
 * @route GET /api/users
 * @desc Get all users
 * @access Admin, MP
 */
router.get("/", authMiddleware, roleMiddleware(["Admin", "MP"]), getUsers);

/**
 * @route GET /api/users/:id
 * @desc Get a user by ID
 * @access Private
 */
router.get("/:id", authMiddleware, getUserById);

export default router;