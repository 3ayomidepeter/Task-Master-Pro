import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Ownership
    name: { type: String, required: true },
    color: { type: String, default: "#000000" }, // For the color dots in your UI
  },
  { timestamps: true }
);

// Prevent duplicate category names for the same user (Optional but good for UX)
CategorySchema.index({ user: 1, name: 1 }, { unique: true });

export const Category = mongoose.model("Category", CategorySchema);
