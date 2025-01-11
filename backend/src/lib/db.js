import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB is connected:" + conn.connection.host);
  } catch (error) {
    console.log("MongoDB connection failed:" + error);
    process.exit(1);
  }
};
