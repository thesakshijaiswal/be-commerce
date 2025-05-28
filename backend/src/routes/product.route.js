import express from "express";
import {
  getProducts,
  getProductsById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
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
router
  .route("/:id")
  .get(getProductsById)
  .put(protectRoute, protectAdminRoute, updateProduct)
  .delete(protectRoute, protectAdminRoute, deleteProduct);

router.route("/:id/review").post(protectRoute, createProductReview);

export default router;
