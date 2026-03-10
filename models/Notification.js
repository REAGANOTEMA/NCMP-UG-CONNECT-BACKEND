// models/Notification.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./User.js";

const Notification = sequelize.define("Notification", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.INTEGER, references: { model: User, key: "id" } },
  title: DataTypes.STRING,
  body: DataTypes.TEXT,
  read: { type: DataTypes.BOOLEAN, defaultValue: false },
  data: { type: DataTypes.JSONB, defaultValue: {} },
}, { tableName: "notifications", timestamps: true });

export default Notification;