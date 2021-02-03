//models imports
import Timeline from "../models/timelineModel.js";
import User from "../models/userModel.js";

// @desc    Create new timeline
// @route   POST /timelines/create
// @access  Private
export const createTimeline = async (req, res) => {
  const {
    sunday,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
  } = req.body;

  try {
    const timeline = await Timeline.create({
      sunday,
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      user: req.user._id,
    });

    let user = await User.findById(req.user._id);

    user.timeline = timeline._id;

    user.save();

    res.status(200).json(timeline);
  } catch (err) {
    return res.status(500).json({
      errors: ["Internal Server Error"],
    });
  }
};

// @desc    Get timeline for logged in user
// @route   POST /timelines/me
// @access  Private
export const getTimeline = async (req, res) => {
  try {
    const timeline = await Timeline.findOne({
      user: req.user._id,
    }).select(["-createdAt", "-updatedAt", "-user"]);

    if (!timeline) {
      return res.status(400).json({
        errors: ["No timeline found yet, Create timeline now!"],
      });
    }

    res.status(200).json(timeline);
  } catch (err) {
    return res.status(500).json({
      errors: ["Internal Server Error"],
    });
  }
};

// @desc    Update Timeline
// @route   POST /timelines/update/:templateId
// @access  Private
export const updateTimeline = async (req, res) => {
  const {
    sunday,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
  } = req.body;

  try {
    let timeline = await Timeline.findById(req.params.timelineId);

    if (!timeline) {
      return res.status(400).json({
        errors: ["Timeline doesn't exist'!"],
      });
    }

    if (sunday) {
      timeline.sunday = sunday;
    }

    if (monday) {
      timeline.monday = monday;
    }

    if (tuesday) {
      timeline.tuesday = tuesday;
    }

    if (wednesday) {
      timeline.wednesday = wednesday;
    }
    if (thursday) {
      timeline.thursday = thursday;
    }
    if (friday) {
      timeline.friday = friday;
    }
    if (saturday) {
      timeline.saturday = saturday;
    }

    await timeline.save();

    res.status(200).json(timeline);
  } catch (err) {
    if (err.kind == "ObjectId") {
      return res.status(400).json({
        errors: ["Timeline doesn't exist'!"],
      });
    }
    return res.status(500).json({
      errors: [err.message || "Internal Server Error"],
    });
  }
};
