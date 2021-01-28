import express from "express";

import { loginUser, registerUser } from "../controllers/userController.js";

import { admin } from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.route("/register").post(admin, registerUser);
router.route("/login").post(loginUser);

export default router;
