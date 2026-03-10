import Message from "../models/Message.js";

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.findAll({
      where: { 
        [Op.or]: [
          { senderId: req.user.id, receiverId: req.params.userId },
          { senderId: req.params.userId, receiverId: req.user.id }
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
    const message = await Message.create({ senderId: req.user.id, receiverId, content });
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};