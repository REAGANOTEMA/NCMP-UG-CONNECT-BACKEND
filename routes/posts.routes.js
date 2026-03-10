import express from "express";
import { createPost, getPosts, likePost } from "../controllers/posts.controller.js";
import { authMiddleware } from "../Middleware/auth.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, getPosts);
router.post("/", authMiddleware, createPost);
router.post("/:id/like", authMiddleware, likePost);

export default router;