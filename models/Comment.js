// models/Comment.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Post from "./Post.js";
import User from "./User.js";

const Comment = sequelize.define("Comment", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  post_id: { type: DataTypes.INTEGER, references: { model: Post, key: "id" } },
  user_id: { type: DataTypes.INTEGER, references: { model: User, key: "id" } },
  content: DataTypes.TEXT,
  parent_comment_id: { type: DataTypes.INTEGER, allowNull: true },
}, { tableName: "comments", timestamps: true });

export default Comment;