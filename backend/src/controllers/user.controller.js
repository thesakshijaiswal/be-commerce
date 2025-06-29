import User from "../models/user.model.js";
import asyncHandler from "../utils/helper.js";
import sendEmail from "../utils/sendEmail.js";
import tokenGenerator from "../utils/tokenGenerator.js";
import crypto from "crypto";

const userLogin = asyncHandler(async (req, res) => {
  const email = req.body.email?.trim().toLowerCase();
  const password = req.body.password;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    tokenGenerator(res, user._id);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      picture: user.picture,
      isAdmin: user.isAdmin,
      isGoogleUser: user.isGoogleUser,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const userSignUp = asyncHandler(async (req, res) => {
  const name = req.body.name?.trim();
  const email = req.body.email?.trim().toLowerCase();
  const password = req.body.password;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("All fields are required.");
  }

  const emailRegex =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.(com|net|org|edu|gov|co|in|io|me|dev|tech|ai)$/i;

  if (!emailRegex.test(email)) {
    res.status(400);
    throw new Error("Invalid email format");
  }

  if (password.length < 8) {
    res.status(400);
    throw new Error("Password must be at least 8 characters long");
  }

  const isUserExist = await User.findOne({ email });
  if (isUserExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({ name, email, password });
  if (user) {
    tokenGenerator(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      picture: user.picture,
      isAdmin: user.isAdmin,
      isGoogleUser: user.isGoogleUser,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user credentials");
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body._id);
  if (!user) {
    res.status(404);
    throw new Error("User not found!");
  }

  if (!user.isGoogleUser) {
    user.name = req.body.name || user.name;
    if (req.body.password) {
      const password = req.body.password.trim();
      if (password.length < 8) {
        res.status(400);
        throw new Error("Password must be at least 8 characters long.");
      }
      user.password = password;
    }
  }

  if (req.body.picture !== undefined) {
    user.picture = req.body.picture;
  }

  await user.save();
  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    picture: user.picture,
    isAdmin: user.isAdmin,
    isGoogleUser: user.isGoogleUser,
  });
});

const userLogout = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.cookie("connect.sid", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({
    message: "Logged out successfully!",
  });
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error("User not found!");
  }
  const resetToken = user.createPasswordResetToken();
  await user.save();
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/reset-password/${resetToken}`;

  const message = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 20px auto; padding: 20px;">
  <p>Hi,</p>
  <p>We got a request to reset your Becommerce password. Please click the button below to reset your password.</p>
  <a href="${resetUrl}" clicktracking=off>
    <button style="color: white; background-color: #146EF5; padding: 10px 16px; border: none; border-radius: 5px; text-decoration: none; font-size: 14px; margin-bottom: 15px;">
      Reset Password
    </button>
  </a>
  <p style="font-size: 14px;">If you ignore this message, your password won't be changed. If you didn't request a password reset, let us know.</p>
  </div>
`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Becommerce Password Reset token (valid for 10mins)",
      message,
    });
    res.status(200).json({
      message: "Token sent to email!",
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "There was an error sending the email. Try again later!",
    });
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) {
    res.status(400).json({
      status: "Failed",
      message: "Token is invalid or has expired!",
    });
    return;
  }
  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  tokenGenerator(res, user._id);
  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    picture: user.picture,
    isAdmin: user.isAdmin,
    isGoogleUser: user.isGoogleUser,
  });
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.json(users);
});

const updateUserAsAdmin = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);

    await user.save();

    res.json({ message: "User updated successfully" });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await User.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "User Deleted Successfully" });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

export {
  userLogin,
  userSignUp,
  updateUserProfile,
  userLogout,
  forgotPassword,
  resetPassword,
  getUsers,
  updateUserAsAdmin,
  getUserById,
  deleteUser,
};
