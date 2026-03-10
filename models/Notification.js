import { DataTypes } from "sequelize";
import db from "../config/db.js";
import User from "./User.js";

const Notification = db.define("notifications", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  userId: { type: DataTypes.UUID, allowNull: false },
  type: { type: DataTypes.STRING },
  content: { type: DataTypes.TEXT },
  read: { type: DataTypes.BOOLEAN, defaultValue: false },
});

Notification.belongsTo(User, { foreignKey: "userId" });

export default Notification;