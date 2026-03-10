import Comment from "../models/Comment.js";

export const getComments = async (req, res) => {
  try {
    const comments = await Comment.findAll({ where: { postId: req.params.postId }, order: [["createdAt", "ASC"]] });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addComment = async (req, res) => {
  try {
    const { content } = req.body;
    const comment = await Comment.create({ content, userId: req.user.id, postId: req.params.postId });
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};