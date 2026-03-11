import express from "express";
import { getMessages, sendMessage } from "../controllers/messages.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/:userId", authMiddleware, getMessages);
router.post("/send", authMiddleware, sendMessage);

export default router;