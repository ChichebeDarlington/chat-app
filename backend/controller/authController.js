import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookies from "../utils/generateToken.js";

export const Signup = async (req, res) => {
  const { fullName, userName, password, confirmPassword, gender } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Incorrect password!" });
  }

  try {
    const user = await User.findOne({ userName });

    if (user) {
      return res.status(400).json({ error: "User already exist!" });
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const maleDP = `https://avatar.iran.liara.run/public/boy?userName=${userName}`;
    const femaleDP = `https://avatar.iran.liara.run/public/girl?userName=${userName}`;

    const newUser = new User({
      fullName,
      userName,
      password: hashPassword,
      gender,
      profilePicture: gender === "male" ? maleDP : femaleDP,
    });
    if (newUser) {
      // generate token
      generateTokenAndSetCookies(newUser._id, res);
      await newUser.save();

      return res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        userName: newUser.userName,
        gender,
        profilePicture: newUser.profilePicture,
      });
    } else {
      return res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in sign up controller", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const Login = async (req, res) => {
  const { userName, password } = req.body;

  try {
    const user = await User.findOne({ userName });

    const ispasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!userName || !ispasswordCorrect) {
      return res.status(400).json({ error: "Invalid username or password" });
    }
    generateTokenAndSetCookies(user._id, res);

    return res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      userName: user.userName,
      profilePicture: user.profilePicture,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const Logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
