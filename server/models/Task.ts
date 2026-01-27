import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    priority: {
      type: String,
      enum: ["Low", "Moderate", "High", "Vital"],
      default: "Moderate",
    },
    status: {
      type: String,
      enum: ["Not Started", "In Progress", "Completed"],
      default: "Not Started",
    },
    // 👇 FIXED: Changed from ObjectId to String so it accepts "Work", "Finance", etc.
    category: {
      type: String,
      default: "Work",
    },
    // 👇 ADDED: You were missing this, so dates weren't saving!
    dueDate: {
      type: Date,
    },
  },
  { timestamps: true },
);

export const Task = mongoose.model("Task", taskSchema);
