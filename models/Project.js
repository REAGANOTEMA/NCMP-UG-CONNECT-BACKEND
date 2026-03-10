// models/Project.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import MPProfile from "./MPProfile.js";

const Project = sequelize.define("Project", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  mp_id: { type: DataTypes.INTEGER, references: { model: MPProfile, key: "id" } },
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
  status: { type: DataTypes.STRING, defaultValue: "ongoing" },
  start_date: DataTypes.DATE,
  end_date: DataTypes.DATE,
  budget: DataTypes.NUMERIC,
  location: DataTypes.TEXT,
}, { tableName: "projects", timestamps: true });

export default Project;