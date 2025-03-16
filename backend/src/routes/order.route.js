import express from "express";
import { addOrderItems } from "../controllers/order.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/").post(protectRoute, addOrderItems);
export default router;
