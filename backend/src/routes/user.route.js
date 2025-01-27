import express from "express";
import {
  userLogin,
  userSignUp,
  updateUserProfile,
  userLogout,
  forgotPassword,
} from "../controllers/user.controller.js";
const router = express.Router();

router.route("/login").post(userLogin);
router.route("/signup").post(userSignUp);
router.route("/update").put(updateUserProfile);
router.route("/logout").get(userLogout);
router.route("/forgot-password").post(forgotPassword);
export default router;
