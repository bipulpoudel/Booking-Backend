import express from "express";

import { admin } from "../middlewares/adminMiddleware.js";

const router = express.Router();

import {
  createProfile,
  updateProfile,
} from "../controllers/profileController.js";

//update profile routes
router.route("/update/:profileId").put(admin, updateProfile);
router.route("/create/:userId").post(admin, createProfile);

export default router;
