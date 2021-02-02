import express from "express";

import { auth } from "../middlewares/authMiddleware.js";

const router = express.Router();

import {
  createTimeline,
  getTimeline,
  updateTimeline,
} from "../controllers/timelineController.js";

router.route("/create").post(auth, createTimeline);
router.route("/update/:timelineId").put(auth, updateTimeline);

router.route("/me").get(auth, getTimeline);

export default router;
