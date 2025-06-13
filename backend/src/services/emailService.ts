import { Task } from "../types/task.js";
import nodemailer from "nodemailer";
import logger from "../utils/logger.js";

export async function sendDueTasksEmail(authorEmail: string, tasks: Task[]) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.emailSender,
      pass: process.env.emailPassword
    }
  });

  try {
    const taskListHtml = tasks.map(task => `
      <li>
        <strong>${task.title}</strong><br/>
        Priority: ${task.priority}<br/>
        Description: ${task.description || "No description"}<br/>
        Due: ${new Date(task.date).toLocaleDateString()}
      </li>
    `).join("");

    const mailOptions = {
      from: process.env.emailSender,
      to: authorEmail,
      subject: "🕒 Trello Reminder: Your Tasks Due Tomorrow",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #007bff;">⏰ You have ${tasks.length} task(s) due tomorrow</h2>
          <p>Here's your list of upcoming tasks:</p>
          <ul style="line-height: 1.8; padding-left: 20px;">${taskListHtml}</ul>
          <p style="margin-top: 30px;">Stay productive!<br/><strong>Your Trello Bot 🤖</strong></p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    logger.error("Error sending grouped email:", error);
  }
}
