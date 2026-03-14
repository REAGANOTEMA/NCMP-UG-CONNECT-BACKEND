import Message from "../models/Message.js";
import { Op } from "sequelize";
import { getIO } from "../utils/socket.js";

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.findAll({
      where: { 
        [Op.or]: [
          { sender_id: req.user.id, receiver_id: req.params.userId },
          { sender_id: req.params.userId, receiver_id: req.user.id }
        ]
      },
      order: [["createdAt", "ASC"]]
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { receiverId, content } = req.body;
    const message = await Message.create({ 
      sender_id: req.user.id, 
      receiver_id: receiverId, 
      content 
    });

    // Emit real-time event via Socket.io
    const io = getIO();
    io.to(`user_${receiverId}`).emit("receive_message", message);

    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};