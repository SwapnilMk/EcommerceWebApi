import express from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/upload.middleware.js";
import { validateUser } from "../middlewares/validation.middleware.js";

const router = express.Router();

router.post("/register", upload.single("avatar"), validateUser, registerUser);

export default router;
