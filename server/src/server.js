import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import fs from "fs";

dotenv.config();

// Ensure 'uploads' folder exists for file uploads
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// Connect to MongoDB
connectDB();

const app = express();

const corsOptions = {
  origin: ["https://assignment-lvpn0agls-akashs-projects-6f1d4f45.vercel.app", "http://localhost:5173"],
  methods: ["GET", "POST", "DELETE", "PUT"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// Middleware
app.use(cors(corsOptions)); // Enable CORS
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Health check route
app.get("/", (req, res) => {
  res.json({ message: "Credit Report API is running" });
});

// Routes
app.use("/api", uploadRoutes);

// Custom error handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
