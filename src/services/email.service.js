import nodemailer from "nodemailer";
import { ses } from "../config/aws.js";
import env from "../config/env.js";
import logger from "../config/logger.js";

const transporter = nodemailer.createTransport({
  SES: { ses },
});

const sendEmail = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      from: env.sesSenderEmail,
      to,
      subject,
      html,
    });
    logger.info(`Email sent to ${to}: ${subject}`);
  } catch (error) {
    logger.error(`Email sending failed: ${error}`);
    throw error;
  }
};

export { sendEmail };
