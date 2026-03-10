// models/Message.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./User.js";

const Message = sequelize.define("Message", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  sender_id: { type: DataTypes.INTEGER, references: { model: User, key: "id" } },
  receiver_id: { type: DataTypes.INTEGER, references: { model: User, key: "id" } },
  content: DataTypes.TEXT,
  media: { type: DataTypes.JSONB, defaultValue: [] },
  read: { type: DataTypes.BOOLEAN, defaultValue: false },
}, { tableName: "messages", timestamps: true });

export default Message;