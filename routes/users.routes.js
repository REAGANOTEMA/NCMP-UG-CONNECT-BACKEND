import express from "express";
import { getUsers, getUserById } from "../controllers/users.controller.js";
import { authMiddleware } from "../Middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/role.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, roleMiddleware(["Admin", "MP"]), getUsers);
router.get("/:id", authMiddleware, getUserById);

export default router;