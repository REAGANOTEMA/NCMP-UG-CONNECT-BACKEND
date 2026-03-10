import Notification from "../models/Notification.js";
import { sendNotification } from "../config/firebase.js";

/**
 * createNotification
 * Creates a new notification in DB and optionally sends push notification
 */
export const createNotification = async (req, res) => {
  try {
    const { userId, title, body, data, push } = req.body;

    if (!userId || !title || !body) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Save notification to DB
    const notification = await Notification.create({
      userId,
      title,
      body,
      data: data || {},
      read: false,
    });

    // Send push notification if requested
    if (push && data?.deviceToken) {
      try {
        await sendNotification(data.deviceToken, title, body, data);
      } catch (err) {
        console.error("Firebase push failed:", err.message);
      }
    }

    return res.status(201).json(notification);
  } catch (err) {
    console.error("❌ Error creating notification:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * getNotifications
 * Fetch all notifications for a specific user
 */
export const getNotifications = async (req, res) => {
  try {
    const { userId } = req.params;
    const notifications = await Notification.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json(notifications);
  } catch (err) {
    console.error("❌ Error fetching notifications:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * markAsRead
 * Mark a notification as read
 */
export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findByPk(id);

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    notification.read = true;
    await notification.save();

    return res.status(200).json(notification);
  } catch (err) {
    console.error("❌ Error marking notification as read:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};