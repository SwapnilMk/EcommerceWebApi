import "dotenv/config";
import http from "http";
import { Server } from "socket.io";
import app from "./app.js";
import connectDB from "./config/db.js";
import env from "./config/env.js";
import logger from "./config/logger.js";

const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  logger.info("A user connected");
  socket.on("disconnect", () => logger.info("User disconnected"));
});

const startServer = async () => {
  await connectDB();
  server.listen(env.port, () =>
    logger.info(`Server running on port ${env.port}`),
  );
};

startServer();

export { server, io };
