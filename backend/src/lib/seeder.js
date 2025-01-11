import users from "../data/users.js";
import products from "../data/products.js";
import Products from "../models/product.model.js";
import User from "../models/user.model.js";
import Order from "../models/order.model.js";
import { connectDB } from "./db.js";

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Products.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[2]._id;
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
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
    await Products.deleteMany();
    await User.deleteMany();
    console.log("Data destroyed successfully!");
    process.exit();
  } catch (error) {
    console.log("An error occurred while destroying data:" + error);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
