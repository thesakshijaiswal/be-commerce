import User from "../models/user.model.js";
import asyncHandler from "../utils/helper.js";
import tokenGenerator from "../utils/tokenGenerator.js";
const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  tokenGenerator(res, user._id);
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
const userSignUp = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const isUserExist = await User.findOne({ email });
  if (isUserExist) {
    res.status(400);
    throw new error("User already exist");
  }

  const user = await User.create({ name, email, password });
  if (user) {
    tokenGenerator(res, user._id);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user credentials");
  }
});

export { userLogin, userSignUp };
