import User from "./User.js";
import MPProfile from "./MPProfile.js";
import CitizenProfile from "./CitizenProfile.js";
import Post from "./Post.js";
import Comment from "./Comment.js";
import Message from "./Message.js";
import Project from "./Project.js";
import Notification from "./Notification.js";

const setupAssociations = () => {
  // User <-> Profiles
  User.hasOne(MPProfile, { foreignKey: "user_id", as: "mpProfile" });
  MPProfile.belongsTo(User, { foreignKey: "user_id", as: "user" });

  User.hasOne(CitizenProfile, { foreignKey: "user_id", as: "citizenProfile" });
  CitizenProfile.belongsTo(User, { foreignKey: "user_id", as: "user" });

  // User <-> Posts
  User.hasMany(Post, { foreignKey: "user_id", as: "posts" });
  Post.belongsTo(User, { foreignKey: "user_id", as: "user" });

  // Post <-> Comments
  Post.hasMany(Comment, { foreignKey: "post_id", as: "comments" });
  Comment.belongsTo(Post, { foreignKey: "post_id", as: "post" });

  User.hasMany(Comment, { foreignKey: "user_id", as: "comments" });
  Comment.belongsTo(User, { foreignKey: "user_id", as: "user" });

  // Messages
  User.hasMany(Message, { foreignKey: "sender_id", as: "sentMessages" });
  User.hasMany(Message, { foreignKey: "receiver_id", as: "receivedMessages" });
  Message.belongsTo(User, { foreignKey: "sender_id", as: "sender" });
  Message.belongsTo(User, { foreignKey: "receiver_id", as: "receiver" });

  // MP <-> Projects
  MPProfile.hasMany(Project, { foreignKey: "mp_id", as: "projects" });
  Project.belongsTo(MPProfile, { foreignKey: "mp_id", as: "mp" });

  // Notifications
  User.hasMany(Notification, { foreignKey: "user_id", as: "notifications" });
  Notification.belongsTo(User, { foreignKey: "user_id", as: "user" });
};

export default setupAssociations;