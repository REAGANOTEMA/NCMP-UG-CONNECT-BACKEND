import { DataTypes } from "sequelize";
import db from "../config/db.js";
import User from "./User.js";

const Post = db.define("posts", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  authorId: { type: DataTypes.UUID, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
  media: { type: DataTypes.ARRAY(DataTypes.STRING) },
  region: { type: DataTypes.STRING },
  district: { type: DataTypes.STRING },
  constituency: { type: DataTypes.STRING },
  likes: { type: DataTypes.INTEGER, defaultValue: 0 },
  shares: { type: DataTypes.INTEGER, defaultValue: 0 },
});

Post.belongsTo(User, { foreignKey: "authorId" });

export default Post;