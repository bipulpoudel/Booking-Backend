import * as Yup from "yup";

//models imports
import Profile from "../models/profileModel.js";
import User from "../models/userModel.js";

// @desc    Update Profile
// @route   POST /profiles/updateProfle
// @access  Private (Admin)
export const createProfile = async (req, res) => {
  const { type, contact, about } = req.body;

  const schema = Yup.object().shape({
    type: Yup.string().required("Type is a required field"),
    contact: Yup.string().required("Contact No is a required field"),
  });

  try {
    await schema.validate(
      {
        type,
        contact,
      },
      { abortEarly: false }
    );

    let profile = new Profile({
      type,
      contact,
      about,
      user: req.params.userId,
    });

    await profile.save();

    //attach user to profile

    let user = await User.findById(req.params.userId);

    user.profile = profile._id;

    await user.save();

    res.status(200).json(profile);
    //
  } catch (err) {
    return res.status(500).json({
      errors: [err.message || "Internal Server Error"],
    });
  }
};

// @desc    Update Profile
// @route   POST /profiles/updateProfle
// @access  Private (Admin)
export const updateProfile = async (req, res) => {
  const { type, contact, about } = req.body;

  try {
    let profile = await Profile.findById(req.params.profileId);

    if (!profile) {
      return res.status(400).json({
        errors: ["Profile doesn't exist'!"],
      });
    }

    if (type) {
      profile.type = type;
    }

    if (contact) {
      profile.contact = contact;
    }

    if (about) {
      profile.about = about;
    }

    await profile.save();

    res.status(200).json(profile);
  } catch (err) {
    if (err.kind == "ObjectId") {
      return res.status(400).json({
        errors: ["Profile doesn't exist'!"],
      });
    }
    return res.status(500).json({
      errors: [err.message || "Internal Server Error"],
    });
  }
};
