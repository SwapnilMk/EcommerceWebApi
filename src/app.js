import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";
import csurf from "csurf";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import morgan from "morgan";
import expressLayouts from "express-ejs-layouts";
import { sessionMiddleware } from "./middlewares/session.middleware.js";
import { limiter } from "./middlewares/rateLimit.middleware.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: { title: "Shopping App API", version: "1.0.0" },
  },
  apis: ["./src/routes/*.js"],
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(cookieParser());
app.use(sessionMiddleware);
app.use(limiter);
app.use(morgan("combined"));
app.use(express.static("public"));
app.use(expressLayouts);
app.set("layout", "layouts/main");
app.set("view engine", "ejs");
app.set("views", "src/views");
app.use(csurf({ cookie: true }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) =>
  res.render("pages/index", { csrfToken: req.csrfToken() }),
);
app.get("/login", (req, res) =>
  res.render("pages/login", { csrfToken: req.csrfToken() }),
);
app.get("/register", (req, res) =>
  res.render("pages/register", { csrfToken: req.csrfToken() }),
);

app.use(errorHandler);

export default app;
