import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

export const ProtectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(500)
        .json({ error: "Unauthorised - No Token Provided..." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorised - Invalid Token..." });
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User Not Found..." });
    }
    req.user = user;

    next();
  } catch (error) {
    console.log("Error exist in the protected route:", error.message);
    res.status(500).json({ error: "Internal server error..." });
  }
};
