import express from "express";

import { admin } from "../middlewares/adminMiddleware.js";

const router = express.Router();

import {
  loginUser,
  registerUser,
  doctorList,
  detailByUserId,
  confirmDoctorList,
  verifyUser,
} from "../controllers/userController.js";

//auth
router.route("/register").post(admin, registerUser);
router.route("/login").post(loginUser);
router.route("/verify/:code").get(verifyUser);

//doctor list for admin
router.route("/doctorList").get(admin, doctorList);
//doctor list for landing
router.route("/doctor/list").get(confirmDoctorList);

//user detail by userId
router.route("/detail/:userId").get(detailByUserId);

export default router;
