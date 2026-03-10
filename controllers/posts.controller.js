import Post from "../models/Post.js";
import User from "../models/User.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({ include: ["user", "comments"], order: [["createdAt", "DESC"]] });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const post = await Post.create({ content, userId: req.user.id });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const likePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    post.likes = post.likes + 1;
    await post.save();
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};