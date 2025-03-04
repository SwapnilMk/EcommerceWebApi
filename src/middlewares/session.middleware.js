import session from "express-session";
import { RedisStore } from "connect-redis";
import redisClient from "../config/redis.js";
import env from "../config/env.js";

const sessionMiddleware = session({
  store: new RedisStore({ client: redisClient }),
  secret: env.sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: env.nodeEnv === "production" },
});

export { sessionMiddleware };
