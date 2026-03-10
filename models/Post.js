// models/Post.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./User.js";

const Post = sequelize.define("Post", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.INTEGER, references: { model: User, key: "id" } },
  content: DataTypes.TEXT,
  media: { type: DataTypes.JSONB, defaultValue: [] },
  tags: { type: DataTypes.JSONB, defaultValue: [] },
  likes: { type: DataTypes.INTEGER, defaultValue: 0 },
  shares: { type: DataTypes.INTEGER, defaultValue: 0 },
}, { tableName: "posts", timestamps: true });

export default Post;