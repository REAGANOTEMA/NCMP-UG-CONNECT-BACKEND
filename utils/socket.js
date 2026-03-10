import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: { origin: "*", methods: ["GET", "POST"] },
  });

  io.on("connection", (socket) => {
    console.log("⚡️ New client connected:", socket.id);

    socket.on("join_room", (roomId) => socket.join(roomId));
    socket.on("send_message", (data) => io.to(data.roomId).emit("receive_message", data.message));
    socket.on("typing", (data) => socket.to(data.roomId).emit("typing", { userId: data.userId }));
    socket.on("message_read", (data) => io.to(data.roomId).emit("message_read", { messageId: data.messageId }));

    socket.on("disconnect", () => console.log("❌ Client disconnected:", socket.id));
  });
};

export const getIO = () => {
  if (!io) throw new Error("Socket.io not initialized!");
  return io;
};