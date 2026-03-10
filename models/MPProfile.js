import { DataTypes } from "sequelize";
import db from "../config/db.js";
import User from "./User.js";

const MPProfile = db.define("mp_profiles", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  userId: { type: DataTypes.UUID, allowNull: false },
  constituency: { type: DataTypes.STRING, allowNull: false },
  district: { type: DataTypes.STRING, allowNull: false },
  region: { type: DataTypes.STRING, allowNull: false },
  party: { type: DataTypes.STRING, allowNull: false },
  term: { type: DataTypes.STRING, allowNull: false },
  committees: { type: DataTypes.ARRAY(DataTypes.STRING) },
  bio: { type: DataTypes.TEXT },
  contact: { type: DataTypes.STRING },
  verified: { type: DataTypes.BOOLEAN, defaultValue: true },
  photo: { type: DataTypes.STRING },
});

MPProfile.belongsTo(User, { foreignKey: "userId" });

export default MPProfile;