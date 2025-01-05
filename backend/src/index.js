import express from "express";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import Products from "./models/productModel.js";

connectDB();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("api is running...");
});

app.get("/api/products", async (req, res) => {
  try {
    const products = await Products.find({});
    res.json(products);
  } catch (error) {
    res.json({ message: "Oops! Something went wrong" });
  }
});

//Getting dynamic route data
app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    res.json(product);
  } catch (error) {
    console.log("An error occured while fetching products:" + error);
  }
});

app.listen(PORT, () => {
  console.log("Server is running on " + PORT);
});
