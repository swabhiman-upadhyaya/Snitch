import { config } from "../config/config.js";
import jwt from "jsonwebtoken"
import userModel from "../models/user.model.js";

async function sendTokenResponse(user, res, message) {
  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return res.status(201).json({
    message,
    token,
    user: {
      id: user._id,
      email: user.email,
      contact: user.contact,
      fullname: user.fullname,
    },
  });
}

export const registerController = async (req, res) => {
  const { email, contact, password, fullname, isSeller } = req.body;

  try {
    const existingUser = await userModel.findOne({
      $or: [
        { email },
        { contact }
      ]
    })

    if (existingUser) {
      return res.status(400).json({
        message: "User with this email or contact alredy exists"
      })
    }

    const user = await userModel.create({
      email,
      contact,
      password,
      fullname,
      role: isSeller ? "seller" : "buyer"
    })

    await sendTokenResponse(user, res, "User register successfully")

  }
  catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Server error" });
  }
}