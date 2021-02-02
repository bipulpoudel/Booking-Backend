import express from "express";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
//middlewares
import { admin } from "../middlewares/adminMiddleware.js";
import {
  createProfile,
  updateProfile,
} from "../controllers/profileController.js";

const router = express.Router();

let filename = uuidv4(); // '110ec58a-a0f2-4ac4-8393-c866d813b8d1'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, filename + file.originalname);
  },
});

const upload = multer({ storage: storage });

//update profile routes
router
  .route("/update/:profileId")
  .put(admin, upload.single("file"), updateProfile);

router
  .route("/create/:userId")
  .post(admin, upload.single("file"), createProfile);

export default router;
