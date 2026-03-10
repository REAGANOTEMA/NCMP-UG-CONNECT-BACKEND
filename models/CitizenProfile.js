// models/CitizenProfile.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./User.js";

const CitizenProfile = sequelize.define("CitizenProfile", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.INTEGER, references: { model: User, key: "id" } },
  full_name: DataTypes.STRING,
  profile_photo: DataTypes.TEXT,
  district: DataTypes.STRING,
  region: DataTypes.STRING,
  constituency_id: DataTypes.INTEGER,
  contact_info: DataTypes.TEXT,
  activity_feed: { type: DataTypes.JSONB, defaultValue: {} },
  verification_status: { type: DataTypes.BOOLEAN, defaultValue: false },
}, { tableName: "citizen_profiles", timestamps: true });

export default CitizenProfile;