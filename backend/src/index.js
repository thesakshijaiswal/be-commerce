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
import path from "path";

connectDB();
const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use((req, res, next) => {
  console.log("Request: log from index.js", req.method, req.url);
  next();
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  next();
});

app.use(
  cors({
    origin: ["http://127.0.0.1:3000", "http://localhost:3000"],
    methods: "GET, POST, PATCH, DELETE, PUT",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
configurePassport(app);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/products", productRoute);
app.use("/api/users", userRoutes);
app.use("/auth", authRoutes);

app.use(pathNotFound);
app.use(errorHandler);

/*********PRODUCTION CODE**********/
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
  });
}
/*********PRODUCTION CODE**********/

app.listen(PORT, () => {
  console.log("Server is running on " + PORT);
});
