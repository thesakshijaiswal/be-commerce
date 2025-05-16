import express from "express";
import {
  addOrderItems,
  getOrderById,
  getUserOrder,
  getOrders,
  updateOrderToDelivered,
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
router
  .route("/deliver/:id")
  .patch(protectRoute, protectAdminRoute, updateOrderToDelivered);

export default router;
