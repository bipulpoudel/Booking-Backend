import * as Yup from "yup";
import crypto from "crypto";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc    Register a new user
// @route   POST /users/register
// @access  Public
export const registerUser = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  const schema = Yup.object().shape({
    name: Yup.string().required("Name is a required field"),
    email: Yup.string().required("Email is a required field"),
    password: Yup.string()
      .required("Password is a required field")
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: Yup.string()
      .required("Confirm Password is a required field")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  try {
    await schema.validate(
      {
        name,
        email,
        password,
        confirmPassword,
      },
      { abortEarly: false }
    );

    let userExists = await User.findOne({
      email,
    });

    if (userExists) {
      return res.status(400).json({
        errors: [{ message: "User with this email already exists!" }],
      });
    }

    //generate secretToken for email Validation
    let token = crypto.randomBytes(20);

    const user = await User.create({
      name,
      email,
      password,
      role: "doctor",
      secretToken: token.toString("hex"),
    });

    res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        confirmed: user.confirmed,
        role: user.role,
      },
      token: generateToken(user._id),
    });

    //TODO: send email to the user
  } catch (err) {
    //yup error catch here
    if (err.errors) {
      return res
        .status(400)
        .json({ errors: [{ message: err.errors || "Validation Error" }] });
    }

    return res.status(500).json({
      errors: [{ message: "Internal Server Error" }],
    });
  }
};

// @desc    Login user
// @route   POST /users/login
// @access  Public
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const schema = Yup.object().shape({
    email: Yup.string().required("Email is a required field"),
    password: Yup.string().required("Password is a required field"),
  });

  try {
    await schema.validate(
      {
        email,
        password,
      },
      { abortEarly: false }
    );

    let user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(401).json({
        errors: [{ message: "Invalid email or password !" }],
      });
    }

    if (!(await user.matchPassword(password))) {
      return res.status(401).json({
        errors: [{ message: "Invalid email or password !" }],
      });
    }

    if (!user.confirmed) {
      return res.status(400).json({
        errors: [{ message: "The email is not confirmed !" }],
      });
    }

    res.status(200).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        confirmed: user.confirmed,
        role: user.role,
      },
      token: generateToken(user._id),
    });

    //TODO: send email to the user
  } catch (err) {
    //yup error catch here
    if (err.errors) {
      return res
        .status(400)
        .json({ errors: [{ message: err.errors || "Validation Error" }] });
    }

    return res.status(500).json({
      errors: [{ message: "Internal Server Error" }],
    });
  }
};
