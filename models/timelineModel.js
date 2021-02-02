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
  },
  {
    timestamps: true,
  }
);

const Timeline = mongoose.model("timeline", timelineModel);

export default Timeline;
