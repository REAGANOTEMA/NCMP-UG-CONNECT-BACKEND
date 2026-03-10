import express from "express";
import { addComment, getComments } from "../controllers/comments.controller.js";
import { authMiddleware } from "../Middleware/auth.middleware.js";

const router = express.Router();

router.get("/:postId", authMiddleware, getComments);
router.post("/:postId", authMiddleware, addComment);

export default router;