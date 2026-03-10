import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "https://ncmp-ug-connect.onrender.com", // <-- your frontend
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("⚡️ New client connected:", socket.id);

    // Messaging
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

    // Audio/Video Calls
    socket.on("call_user", (data) => {
      const { userToCall, signalData, from, name } = data;
      io.to(userToCall).emit("incoming_call", { signal: signalData, from, name });
    });

    socket.on("answer_call", (data) => {
      const { to, signal } = data;
      io.to(to).emit("call_accepted", signal);
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