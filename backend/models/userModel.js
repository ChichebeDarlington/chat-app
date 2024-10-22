import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    fullName: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    password: { type: String, required: true, minLength: 6 },
    gender: { type: String, required: true, enum: ["male", "female"] },
    profilePicture: { type: String, default: "" },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
