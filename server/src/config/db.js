// MongoDB Connection Setup
// ------------------------
// Establishes a connection to MongoDB using Mongoose.
// Reads the connection string from the environment file
// and logs the connection status in the console.

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DB = process.env.URL;

const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${DB}`);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error.message);
  }
};

export default connectDB;
