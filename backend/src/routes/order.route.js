import express from "express";
import {
  addOrderItems,
  getOrderById,
} from "../controllers/order.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/").post(protectRoute, addOrderItems);
router.route("/").get(protectRoute, getOrderById);
export default router;
