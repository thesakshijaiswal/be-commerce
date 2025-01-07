import express from "express";
import Products from "../models/productModel.js";
const router = express.Router();

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Products.find({});
    res.json(products);
  })
);

// Getting dynamic route data
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Products.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  })
);

export default router;
