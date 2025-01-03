import mongoose from "mongoose";
import users from "./data/users.js";
import products from "./data/products.js";
import Products from "./models/productModel.js";
import User from "./models/userModel.js";
import Order from "./models/orderModel.js";
import { connectDB } from "./lib/db.js";

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Products.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[2]._id;
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser }; // Corrected field name to 'user'
    });

    await Products.insertMany(sampleProducts);
    console.log("Data imported successfully!");
    process.exit();
  } catch (error) {
    console.log("An error occurred while importing data:" + error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await User.deleteMany();
    await Products.deleteMany();
    console.log("Data destroyed successfully!");
    process.exit();
  } catch (error) {
    console.log("An error occurred while destroying data:" + error);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}