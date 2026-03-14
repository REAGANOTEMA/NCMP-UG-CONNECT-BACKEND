import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validateRequest } from "../middlewares/validation.middleware.js";
import { register, login, getProfile } from "../controllers/auth.controller.js";
import { registerSchema, loginSchema } from "../utils/validationSchemas.js";

const router = express.Router();

router.post("/register", validateRequest(registerSchema), register);
router.post("/login", validateRequest(loginSchema), login);
router.get("/profile", authMiddleware, getProfile);

export default router;