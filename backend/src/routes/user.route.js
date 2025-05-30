import express from "express";
import {
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
} from "../controllers/user.controller.js";
import {
  protectRoute,
  protectAdminRoute,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/").get(protectRoute, protectAdminRoute, getUsers);
router.route("/login").post(userLogin);
router.route("/signup").post(userSignUp);
router.route("/update").put(updateUserProfile);
router.route("/logout").get(userLogout);
router.route("/forgot-password").post(forgotPassword);
router
  .route("/:id")
  .put(protectRoute, protectAdminRoute, updateUserAsAdmin)
  .get(protectRoute, protectAdminRoute, getUserById)
  .delete(protectRoute, protectAdminRoute, deleteUser);
router.route("/reset-password/:resetToken").patch(resetPassword);

export default router;
