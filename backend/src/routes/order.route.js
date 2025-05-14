import express from "express";
import {
  addOrderItems,
  getOrderById,
  getUserOrder,
  getOrders,
} from "../controllers/order.controller.js";
import {
  protectRoute,
  protectAdminRoute,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

router
  .route("/")
  .post(protectRoute, addOrderItems)
  .get(protectRoute, protectAdminRoute, getOrders);
router.route("/user-orders").get(protectRoute, getUserOrder);
router.route("/:id").get(protectRoute, getOrderById);

export default router;
