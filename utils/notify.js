const Notification = require("../models/Notification");
const PostgresNotification = require("../models/PostgresNotification");

exports.sendNotification = async ({
  userId,
  title,
  message,
  type = "SYSTEM"
}) => {
  try {
    // ================== SAVE NOTIFICATION IN MONGODB ==================
    await Notification.create({
      userId,
      title,
      message,
      type
    });
    
    // ================== SAVE NOTIFICATION IN POSTGRESQL ==================
    await PostgresNotification.create({
      userId: userId.toString(),  // ✅ Add .toString() here
      title,
      message,
      type,
    });
    
    console.log(`✅ Notification sent: ${title} to ${userId}`);
    
  } catch (err) {
    console.log("Notification error:", err.message);
  }
};