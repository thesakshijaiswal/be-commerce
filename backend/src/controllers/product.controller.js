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

const createProduct = asyncHandler(async (req, res) => {
  const product = new Products({
    name: "Sample Name",
    price: 0,
    user: req.user._id,
    image: "/product_images/no-image-available.jpg",
    brand: "Sample Brand",
    category: "Sample Category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample Description",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, image, brand, category, countInStock, description } =
    req.body;

  const product = await Products.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const productId = req.params.id;

  const product = await Products.findById(productId);

  if (product) {
    await Products.deleteOne({ _id: product._id });
    res.status(200).json({ message: "Product Deleted" });
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

export {
  getProducts,
  getProductsById,
  createProduct,
  updateProduct,
  deleteProduct,
};
