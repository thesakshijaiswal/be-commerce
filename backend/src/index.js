import express from "express";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import productRoute from "./routes/productRoute.js";
import { errorHandler, pathNotFound } from "./middleware/errorHandlerMiddleware.js";
connectDB();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("api is running...");
});

app.use("/api/products", productRoute);

app.use(pathNotFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Server is running on " + PORT);
});
