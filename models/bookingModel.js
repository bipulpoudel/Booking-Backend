import mongoose from "mongoose";
import { sendBookingMail, updateBookingEmail } from "../utils/sendMail.js";

const bookingSchema = mongoose.Schema(
  {
    date: {
      type: String,
    },
    month: {
      type: String,
    },
    timeline: {
      type: String,
    },
    user_details: {
      type: String,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

bookingSchema.post("save", async (data, next) => {
  let user = JSON.parse(data.user_details);
  let timeline = JSON.parse(data.timeline);

  //send user email after save completed

  sendBookingMail(user.email, data.date, data.month, timeline);

  next();
});

bookingSchema.post("update", async (data, next) => {
  let user = JSON.parse(data.user_details);
  let timeline = JSON.parse(data.timeline);

  //send user email after save completed
  updateBookingEmail(user.email, data.date, data.month, timeline);

  next();
});

const Booking = mongoose.model("booking", bookingSchema);

export default Booking;
