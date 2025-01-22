import userModel from "../models/user.model.js";
import asyncHandler from "../utils/helper.js";
const userLogin = asyncHandler(async (req, res) => {
  res.send("login")
})

export { userLogin}