import express from "express";
import { getEngagement, getTrending } from "../controllers/analytics.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/engagement", authMiddleware, getEngagement);
router.get("/trending", authMiddleware, getTrending);

export default router;