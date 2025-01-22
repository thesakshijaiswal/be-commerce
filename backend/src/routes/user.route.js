import express from "express";
import { userLogin } from "../controllers/user.controller.js";
const router = express.Router();

router.route("/login").post(userLogin);
export default router;
