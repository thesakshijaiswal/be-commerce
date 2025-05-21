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
import configurePassport from "./utils/passport.js";
import authRoutes from "./routes/auth.route.js";
import orderRoutes from "./routes/order.route.js";
import uploadRoutes from "./routes/upload.route.js";
import path from "path";
import configureStripe from "./utils/stripe.js";

connectDB();
const app = express();
const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
configurePassport(app);
configureStripe(app);

app.use("/api/products", productRoute);
app.use("/api/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/*********PRODUCTION CODE**********/
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.use("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
  });
}
/*********PRODUCTION CODE**********/

app.get("/", (req, res) => {
  res.send("Server is up and running 😌");
});

app.use(pathNotFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
