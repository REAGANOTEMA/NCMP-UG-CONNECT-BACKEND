import { DataTypes } from "sequelize";
import db from "../config/db.js";

const User = db.define("users", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  fullName: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, allowNull: false }, // Citizen, MP, Admin, President, etc.
  verified: { type: DataTypes.BOOLEAN, defaultValue: false },
  region: { type: DataTypes.STRING },
  district: { type: DataTypes.STRING },
  constituency: { type: DataTypes.STRING },
  profilePhoto: { type: DataTypes.STRING },
});

export default User;