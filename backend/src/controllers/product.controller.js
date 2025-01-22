import Products from "../models/product.model.js";
import asyncHandler from "../utils/helper.js";

const getProducts = asyncHandler(async (req, res) => {
  const products = await Products.find({});
  res.json(products);
});

const getProductsById = asyncHandler(async (req, res) => {
  const product = await Products.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export { getProducts, getProductsById };
