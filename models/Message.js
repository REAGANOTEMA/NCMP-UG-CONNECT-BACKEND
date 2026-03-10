import { DataTypes } from "sequelize";
import db from "../config/db.js";
import User from "./User.js";

const Message = db.define("messages", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  senderId: { type: DataTypes.UUID, allowNull: false },
  receiverId: { type: DataTypes.UUID, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
  read: { type: DataTypes.BOOLEAN, defaultValue: false },
});

Message.belongsTo(User, { foreignKey: "senderId" });
Message.belongsTo(User, { foreignKey: "receiverId" });

export default Message;