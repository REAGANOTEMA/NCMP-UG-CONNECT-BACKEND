import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
  if (io) return io; // Prevent multiple initializations

  io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL || "https://ncmp-ug-connect.onrender.com",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("⚡️ New client connected:", socket.id);

    // ----- Messaging -----
    socket.on("join_room", (roomId) => {
      socket.join(roomId);
      console.log(`User joined room: ${roomId}`);
    });

    socket.on("send_message", ({ roomId, message }) => {
      io.to(roomId).emit("receive_message", message);
    });

    socket.on("typing", ({ roomId, userId }) => {
      socket.to(roomId).emit("typing", { userId });
    });

    socket.on("message_read", ({ roomId, messageId }) => {
      io.to(roomId).emit("message_read", { messageId });
    });

    // ----- Audio/Video Calls -----
    socket.on("call_user", ({ userToCall, signalData, from, name }) => {
      io.to(userToCall).emit("incoming_call", { signal: signalData, from, name });
    });

    socket.on("answer_call", ({ to, signal }) => {
      io.to(to).emit("call_accepted", signal);
    });

    socket.on("disconnect", () => {
      console.log("❌ Client disconnected:", socket.id);
    });
  });

  return io;
};

// Access the initialized Socket.IO instance anywhere
export const getIO = () => {
  if (!io) throw new Error("Socket.io not initialized!");
  return io;
};