import mongoose from "mongoose";
import { env } from "../config/env.config";

export const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGODB_URI);
    console.log("MongoDB Connected");
  } catch (err) {
    console.log("MongoDB connection error", err);
  }
};
