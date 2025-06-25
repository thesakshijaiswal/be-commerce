import express from "express";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import productRoute from "./routes/product.route.js";
import {
  errorHandler,
  pathNotFound,
} from "./middlewares/errorHandler.middleware.js";
import secureHeaders from "./middlewares/secureHeaders.middleware.js";
import userRoutes from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import configurePassport from "./utils/passport.js";
import authRoutes from "./routes/auth.route.js";
import orderRoutes from "./routes/order.route.js";
import uploadRoutes from "./routes/upload.route.js";
import path from "path";
import { configureStripe, stripeWebhookRoute } from "./utils/stripe.js";

connectDB();
const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use("/webhook", stripeWebhookRoute);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? "https://be-commerce-q7nw.onrender.com"
        : "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
configurePassport(app);
configureStripe(app);

app.use(secureHeaders);

app.use("/api/products", productRoute);
app.use("/api/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

/*********PRODUCTION CODE**********/
if (process.env.NODE_ENV === "production") {
  const publicPath = path.join(__dirname, "..", "frontend", "public");

  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.use("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
  });

  app.get("/robots.txt", (req, res) => {
    res.sendFile(path.join(publicPath, "robots.txt"));
  });

  app.get("/sitemap.xml", (req, res) => {
    res.sendFile(path.join(publicPath, "sitemap.xml"));
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
