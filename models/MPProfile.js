// models/MPProfile.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./User.js";

const MPProfile = sequelize.define("MPProfile", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.INTEGER, references: { model: User, key: "id" } },
  full_name: DataTypes.STRING,
  profile_photo: DataTypes.TEXT,
  constituency_id: DataTypes.INTEGER,
  political_party: DataTypes.STRING,
  term_start: DataTypes.DATE,
  term_end: DataTypes.DATE,
  committees: DataTypes.TEXT,
  education: DataTypes.TEXT,
  biography: DataTypes.TEXT,
  contact_info: DataTypes.TEXT,
  office_address: DataTypes.TEXT,
  verified: { type: DataTypes.BOOLEAN, defaultValue: true },
  performance_metrics: { type: DataTypes.JSONB, defaultValue: {} },
}, { tableName: "mp_profiles", timestamps: true });

export default MPProfile;