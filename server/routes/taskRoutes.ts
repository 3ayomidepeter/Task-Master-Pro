import express from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController"; // 👈 Import new functions
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

// Logic for "/"
router.route("/").get(protect, getTasks).post(protect, createTask);

// Logic for "/:id" (Specific Task)
router
  .route("/:id")
  .put(protect, updateTask) // 👈 Handle Updates
  .delete(protect, deleteTask); // 👈 Handle Deletes

export default router;
