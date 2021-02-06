import mongoose from "mongoose";

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

const Booking = mongoose.model("booking", bookingSchema);

export default Booking;
