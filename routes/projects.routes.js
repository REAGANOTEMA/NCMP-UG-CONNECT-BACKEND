import express from "express";
import { getProjects, createProject } from "../controllers/projects.controller.js";
import { authMiddleware } from "../Middleware/auth.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, getProjects);
router.post("/", authMiddleware, createProject);

export default router;