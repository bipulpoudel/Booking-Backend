import mongoose from "mongoose";

const timelineModel = mongoose.Schema(
  {
    sunday: {
      type: Array,
    },
    monday: {
      type: Array,
    },
    tuesday: {
      type: Array,
    },
    wednesday: {
      type: Array,
    },
    thursday: {
      type: Array,
    },
    friday: {
      type: Array,
    },
    saturday: {
      type: Array,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Timeline = mongoose.model("timeline", timelineModel);

export default Timeline;
