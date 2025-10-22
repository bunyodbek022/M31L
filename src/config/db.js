import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

console.log("✅ MONGO_URL:", process.env.MONGO_URL);

const MONGOURL = process.env.MONGO_URL;

export const connectDB = async () => {
  try {
    if (!MONGOURL) {
      throw new Error("MONGO_URL environment variable topilmadi!");
    }

    await mongoose.connect(MONGOURL);
    console.log("✅ MongoDB connected successfully!");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    throw new Error(error);
  }
};
