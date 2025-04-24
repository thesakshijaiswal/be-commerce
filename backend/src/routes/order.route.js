import express from "express";
import {
  addOrderItems,
  getOrderById,
  getUserOrder,
} from "../controllers/order.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/").post(protectRoute, addOrderItems);
router.route("/user-orders").get(protectRoute, getUserOrder);
router.route("/:id").get(protectRoute, getOrderById);

export default router;
