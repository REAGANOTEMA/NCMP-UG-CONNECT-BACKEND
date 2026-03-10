import { DataTypes } from "sequelize";
import db from "../config/db.js";
import User from "./User.js";

const Project = db.define("projects", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  mpId: { type: DataTypes.UUID, allowNull: false },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: "pending" },
  startDate: { type: DataTypes.DATE },
  endDate: { type: DataTypes.DATE },
});

Project.belongsTo(User, { foreignKey: "mpId" });

export default Project;