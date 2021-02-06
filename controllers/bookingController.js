import * as Yup from "yup";

//models imports
import Booking from "../models/bookingModel.js";

export const book = async (req, res) => {
  const { date, timeline, user_details, doctor, month } = req.body;

  const schema = Yup.object().shape({
    date: Yup.string().required("Date is a required field"),
    timeline: Yup.string().required("Timeline is a required field"),

    user_details: Yup.string().required("User Details is a required field"),
    doctor: Yup.string().required("Doctor is a required field"),
  });

  try {
    await schema.validate(
      {
        date,
        timeline,
        user_details,
        doctor,
      },
      { abortEarly: false }
    );

    let booking = new Booking({
      date,
      timeline,
      user_details,
      doctor,
      month,
    });

    await booking.save();

    res.status(200).json(booking);
    //
  } catch (err) {
    //yup error catch here
    if (err.errors) {
      return res
        .status(400)
        .json({ errors: [err.errors || "Validation Error"] });
    }

    return res.status(500).json({
      errors: [err.message || "Internal Server Error"],
    });
  }
};

export const getList = async (req, res) => {
  try {
    const bookings = await Booking.find({
      doctor: req.user._id,
    });

    res.status(200).json(bookings);
    //
  } catch (err) {
    return res.status(500).json({
      errors: [err.message || "Internal Server Error"],
    });
  }
};
