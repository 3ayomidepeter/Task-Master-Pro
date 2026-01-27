// const express = require("express");
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
// const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase';

// Middleware
app.use(express.json()); // Allows us to parse JSON bodies (like data sent from forms)
app.use(cors()); // Allows frontend running on port 5173 to talk to backend on 5000
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Database connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string, {
      // Robust Production Settings
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of hanging
      socketTimeoutMS: 45000, // Close idle connections to prevent "ghosts"
      maxPoolSize: 10, // Maintain up to 10 socket connections
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error: ${(error as Error).message}`);
    process.exit(1); // Stop the app if DB fails
  }
};

// Connect to DB, then start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
