import express from "express";
import { getMPProfiles, getMPProfileById } from "../controllers/mp.controller.js";
import { authMiddleware } from "../Middleware/auth.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, getMPProfiles);
router.get("/:id", authMiddleware, getMPProfileById);

export default router;