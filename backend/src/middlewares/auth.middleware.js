import jwt from "jsonwebtoken";
import asyncHandler from "../utils/helper.js";
import User from "../models/user.model.js";

const protectRoute = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;

  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decodedToken.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("User not authorized, token failed!");
    }
  } else {
    res.status(401);
    throw new Error("User not authorized, token not found!");
  }
});

const protectAdminRoute = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

export { protectRoute, protectAdminRoute };
