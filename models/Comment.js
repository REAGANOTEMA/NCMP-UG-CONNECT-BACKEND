import { DataTypes } from "sequelize";
import db from "../config/db.js";
import Post from "./Post.js";
import User from "./User.js";

const Comment = db.define("comments", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  postId: { type: DataTypes.UUID, allowNull: false },
  authorId: { type: DataTypes.UUID, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
});

Comment.belongsTo(Post, { foreignKey: "postId" });
Comment.belongsTo(User, { foreignKey: "authorId" });

export default Comment;