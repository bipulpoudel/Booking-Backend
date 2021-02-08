import express from "express";

const router = express.Router();

import {
  book,
  getList,
  updateEvent,
} from "../controllers/bookingController.js";
import { auth } from "../middlewares/authMiddleware.js";

router.route("/book").post(book);

router.route("/list").get(auth, getList);

router.route("/update/:eventId").put(updateEvent);

export default router;
