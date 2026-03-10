import { DataTypes } from "sequelize";
import db from "../config/db.js";
import User from "./User.js";

const CitizenProfile = db.define("citizen_profiles", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  userId: { type: DataTypes.UUID, allowNull: false },
  activityFeed: { type: DataTypes.ARRAY(DataTypes.JSON) },
  submittedIssues: { type: DataTypes.ARRAY(DataTypes.JSON) },
  engagementHistory: { type: DataTypes.ARRAY(DataTypes.JSON) },
});

CitizenProfile.belongsTo(User, { foreignKey: "userId" });

export default CitizenProfile;