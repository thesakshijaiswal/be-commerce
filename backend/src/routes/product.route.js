import express from "express";
import {
  getProducts,
  getProductsById,
} from "../controllers/product.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.route("/").get(getProducts);
router.route("/:id").get(getProductsById);

export default router;
