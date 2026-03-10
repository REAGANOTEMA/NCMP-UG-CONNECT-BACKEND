import Post from "../models/Post.js";
import Comment from "../models/Comment.js";

export const getEngagement = async (req, res) => {
  try {
    const totalPosts = await Post.count();
    const totalComments = await Comment.count();
    res.status(200).json({ totalPosts, totalComments });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getTrending = async (req, res) => {
  try {
    const trendingPosts = await Post.findAll({ order: [["likes", "DESC"]], limit: 10 });
    res.status(200).json(trendingPosts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};