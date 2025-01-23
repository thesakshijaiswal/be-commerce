import User from "../models/user.model.js";
import asyncHandler from "../utils/helper.js";
import jwt from "jsonwebtoken";
const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "20d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 20 * 24 * 60 * 60 * 1000, // 20 days
  });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

export { userLogin };
