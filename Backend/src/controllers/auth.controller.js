import { config } from "../config/config.js";
import jwt from "jsonwebtoken"
import userModel from "../models/user.model.js";

async function sendTokenResponse(user, res, message) {
  const token = jwt.sign(
    { id: user._id },
    config.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.cookie("token", token);

  return res.status(201).json({
    message,
    token,
    user: {
      id: user._id,
      email: user.email,
      contact: user.contact,
      fullname: user.fullname,
      role: user.role
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

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email })

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      })
    }

    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Invalid password"
      })
    }

    await sendTokenResponse(user, res, "User logged in successfully")

  }
  catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Server error" });
  }
}

export const googleCallback = async (req, res) => {
  try {

    /* const {id, displayName, emails, photos} = req.user */

    const profile = req.user;
    const fullname = profile.displayName;
    const googleId = profile.id;

    const email = profile.emails[0].value;
    const profilePic = profile.photos[0].value;

    // Find existing user by googleId or email, or create a new one
    let user = await userModel.findOne({
      $or: [{ googleId }, { email }]
    });

    if (!user) {
      user = await userModel.create({
        email,
        fullname,
        googleId
      });
    }
    else if (!user.googleId) {
      // Link Google account to existing email-based user
      user.googleId = googleId;
      await user.save();
    }

    const token = jwt.sign(
      { id: user._id },
      config.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    // Redirect to frontend with token so the SPA can store it
    res.redirect(`http://localhost:5173/auth/google/callback?token=${token}&user=${encodeURIComponent(JSON.stringify({
      id: user._id,
      email: user.email,
      fullname: user.fullname,
      role: user.role
    }))}`);
  } catch (error) {
    console.log("Google auth error:", error);
    res.redirect("http://localhost:5173/login?error=google_auth_failed");
  }
}