import express from "express";
import {
  addOrderItems,
  getOrderById,
  getUserOrder,
  getOrders,
  updateOrderToDelivered,
  updateOrderToPaid,
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
router.route("/pay/:id").patch(protectRoute, updateOrderToPaid);

export default router;
