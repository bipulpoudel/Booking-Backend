import express from "express";

const router = express.Router();

import { book, getList } from "../controllers/bookingController.js";
import { auth } from "../middlewares/authMiddleware.js";

router.route("/book").post(book);

router.route("/list").get(auth, getList);

export default router;
