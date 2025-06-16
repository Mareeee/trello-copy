import sendEmailNotifications from "../utils/sendEmailNotifications.js";
import logger from "../utils/logger.js";
import cron from "node-cron";

cron.schedule("0 12 * * *", async () => {
  try {
    sendEmailNotifications();
  } catch (error) {
    logger.error("Error in due task checker job:", error);
  }
});
