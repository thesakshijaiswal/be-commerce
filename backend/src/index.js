import express from "express";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import productRoute from "./routes/product.route.js";
import {
  errorHandler,
  pathNotFound,
} from "./middlewares/errorHandler.middleware.js";
import userRoutes from "./routes/user.route.js";
import cookieParser from "cookie-parser";
connectDB();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("api is running...");
});

app.use("/api/products", productRoute);
app.use("/api/users", userRoutes);

app.use(pathNotFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Server is running on " + PORT);
});
