import express from "express";
import { userLogin, userSignUp } from "../controllers/user.controller.js";
const router = express.Router();

router.route("/login").post(userLogin);
router.route("/signup").post(userSignUp);
export default router;
