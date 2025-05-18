import express from "express";
import {
  getProducts,
  getProductsById,
  createProduct,
} from "../controllers/product.controller.js";
import {
  protectRoute,
  protectAdminRoute,
} from "../middlewares/auth.middleware.js";
const router = express.Router();

router
  .route("/")
  .get(getProducts)
  .post(protectRoute, protectAdminRoute, createProduct);
router.route("/:id").get(getProductsById);

export default router;
