import jwt from "jsonwebtoken";

const generateTokenAndSetCookies = (userId, resp) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "5d",
  });
  resp.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, //MS
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });
};

export default generateTokenAndSetCookies;
