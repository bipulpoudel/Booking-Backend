import express from "express";

import { admin } from "../middlewares/adminMiddleware.js";

const router = express.Router();

import {
  loginUser,
  registerUser,
  doctorList,
  detailByUserId,
} from "../controllers/userController.js";

//auth
router.route("/register").post(admin, registerUser);
router.route("/login").post(loginUser);

//doctor list for all confirmed and not confirmed
router.route("/doctorList").get(admin, doctorList);

//user detail by userId
router.route("/detail/:userId").get(detailByUserId);

export default router;
