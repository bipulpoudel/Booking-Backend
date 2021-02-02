import mongoose from "mongoose";

const profileSchema = mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    file: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

const Profile = mongoose.model("profile", profileSchema);

export default Profile;
