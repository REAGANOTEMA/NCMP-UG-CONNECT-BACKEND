import admin from "firebase-admin";
import dotenv from "dotenv";
dotenv.config();

const serviceAccount = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
};

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log("✅ Firebase initialized successfully");
} catch (error) {
  console.error("❌ Firebase initialization error:", error);
}

export const sendNotification = async (token, title, body, data = {}) => {
  if (!token) throw new Error("No device token provided");

  const message = { token, notification: { title, body }, data };
  try {
    const response = await admin.messaging().send(message);
    console.log("✅ Notification sent:", response);
    return response;
  } catch (err) {
    console.error("❌ Error sending notification:", err);
    throw err;
  }
};

export default admin;