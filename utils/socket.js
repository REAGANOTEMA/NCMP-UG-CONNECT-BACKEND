import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*", // Update to your frontend URL in production
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("⚡️ New client connected:", socket.id);

    socket.on("join_room", (roomId) => {
      socket.join(roomId);
      console.log(`User joined room: ${roomId}`);
    });

    socket.on("send_message", (data) => {
      const { roomId, message } = data;
      io.to(roomId).emit("receive_message", message);
    });

    socket.on("typing", (data) => {
      const { roomId, userId } = data;
      socket.to(roomId).emit("typing", { userId });
    });

    socket.on("message_read", (data) => {
      const { roomId, messageId } = data;
      io.to(roomId).emit("message_read", { messageId });
    });

    socket.on("disconnect", () => {
      console.log("❌ Client disconnected:", socket.id);
    });
  });
};

export const getIO = () => {
  if (!io) throw new Error("Socket.io not initialized!");
  return io;
};