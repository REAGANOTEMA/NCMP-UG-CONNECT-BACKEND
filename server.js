import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

import { connectDB } from "./config/db.js";
import { initSocket } from "./utils/socket.js";
import setupAssociations from "./models/associations.js";

import "./config/firebase.js";

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

/* ================================
   MIDDLEWARE
================================ */

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ================================
   API ROUTES
================================ */

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/mp-profiles", mpRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/notifications", notificationsRoutes);

/* ================================
   HEALTH CHECK
================================ */

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "NCMP Uganda Connect API",
    timestamp: new Date(),
  });
});

/* ================================
   GLOBAL ERROR HANDLER
================================ */

app.use((err, req, res, next) => {
  console.error("Server Error:", err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

/* ================================
   SERVER STARTUP
================================ */

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect database
    await connectDB();

    // Setup model relationships
    setupAssociations();

    // Start express server
    const server = app.listen(PORT, () => {
      console.log(`🚀 NCMP API running on port ${PORT}`);
    });

    // Initialize WebSocket
    initSocket(server);

  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

export default app;