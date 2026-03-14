import express from "express";
import { getMPProfiles, getMPProfileById, updateMPProfile } from "../controllers/mp.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, getMPProfiles);
router.get("/:id", authMiddleware, getMPProfileById);
router.put("/me", authMiddleware, roleMiddleware(["MP"]), updateMPProfile);

export default router;