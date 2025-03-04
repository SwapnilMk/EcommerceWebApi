import "dotenv/config";

export default {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI,
  redisUrl: process.env.REDIS_URL,
  awsRegion: process.env.AWS_REGION,
  jwtSecret: process.env.JWT_SECRET,
  sessionSecret: process.env.SESSION_SECRET,
  nodeEnv: process.env.NODE_ENV || "development",
  sesSenderEmail: process.env.SES_SENDER_EMAIL,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  mixpanelToken: process.env.MIXPANEL_TOKEN,
};
