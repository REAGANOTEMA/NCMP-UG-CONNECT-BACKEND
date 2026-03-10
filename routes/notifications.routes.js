import express from "express";
import { sendNotification } from "../config/firebase.js";

const router = express.Router();

router.post("/test", async (req, res) => {
  const { token } = req.body;
  try {
    await sendNotification(token, "NCMP Test", "Hello from NCMP Backend!");
    res.json({ message: "Notification sent!" });
  } catch (err) {
    res.status(500).json({ error: "Failed to send notification" });
  }
});

export default router;