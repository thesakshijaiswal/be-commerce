import express from "express";
import products from "./data/products.js";
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("api is running...");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

//Getting dynamic route data
app.get("/api/products/:id", (req, res) => {
  // console.log(req.params.id);
  const product = products.find((product) => product.id == req.params.id);
  res.json(product);
});

app.listen(PORT, () => {
  console.log("Server is running on " + PORT);
});
