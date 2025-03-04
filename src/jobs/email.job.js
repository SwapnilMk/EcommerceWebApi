import { Queue } from "bull";
import { sendEmail } from "../services/email.service.js";
import redisClient from "../config/redis.js";

const emailQueue = new Queue("email", { redis: redisClient });

emailQueue.process(async (job) => {
  const { email, subject, html } = job.data;
  await sendEmail(email, subject, html);
});

const sendWelcomeEmail = async (email) => {
  await emailQueue.add({
    email,
    subject: "Welcome!",
    html: "<h1>Welcome to Shopping App</h1>",
  });
};

export { sendWelcomeEmail };
