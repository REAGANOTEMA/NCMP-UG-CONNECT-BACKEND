// models/User.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const User = sequelize.define(
  "User",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    fullName: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, allowNull: false }, // Role as string
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.TEXT, allowNull: false },
    phone: { type: DataTypes.STRING },
    district: { type: DataTypes.STRING },
    region: { type: DataTypes.STRING },
    constituency: { type: DataTypes.STRING },
    nationalId: { type: DataTypes.STRING },
  },
  { tableName: "users", timestamps: true }
);

export default User;