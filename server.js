import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "./config/db.js";
import { initSocket } from "./utils/socket.js";
import "./config/firebase.js"; // Firebase Admin

// Routes
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/users.routes.js";
import postRoutes from "./routes/posts.routes.js";
import commentRoutes from "./routes/comments.routes.js";
import messageRoutes from "./routes/messages.routes.js";
import projectRoutes from "./routes/projects.routes.js";
import mpRoutes from "./routes/mp.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";
import notificationsRoutes from "./routes/notifications.routes.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(morgan("dev"));
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/mp-profiles", mpRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/notifications", notificationsRoutes);

// Health Check
app.get("/api/health", (req, res) => res.json({ status: "ok" }));

// Start Server
const PORT = process.env.PORT || 5000;
const startServer = async () => {
  try {
    await connectDB();
    const server = app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
    initSocket(server); // Socket.IO
  } catch (err) {
    console.error("❌ Server failed to start:", err);
    process.exit(1);
  }
};

startServer();