import { sns } from "../config/aws.js";
import { PublishCommand } from "@aws-sdk/client-sns";
import logger from "../config/logger.js";

const sendSMS = async (phoneNumber, message) => {
  const params = {
    Message: message,
    PhoneNumber: phoneNumber,
  };
  try {
    await sns.send(new PublishCommand(params));
    logger.info(`SMS sent to ${phoneNumber}: ${message}`);
  } catch (error) {
    logger.error(`SMS sending failed: ${error}`);
    throw error;
  }
};

export { sendSMS };
