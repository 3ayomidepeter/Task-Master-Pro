import { Request, Response } from "express";
import { Task } from "../models/Task";

interface AuthRequest extends Request {
  user?: any;
}

// @desc    Get all tasks for the logged-in user
// @route   GET /api/tasks
export const getTasks = async (req: AuthRequest, res: Response) => {
  try {
    const tasks = await Task.find({ user: req.user._id }).sort({
      createdAt: -1,
    }); // Newest first
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Create a new task
// @route   POST /api/tasks
export const createTask = async (req: AuthRequest, res: Response) => {
  const { title, description, priority, status, dueDate, category } = req.body;

  if (!title) {
    res.status(400).json({ message: "Please add a task title" });
    return;
  }

  try {
    const task = await Task.create({
      user: req.user._id, // Attach the logged-in user's ID
      title,
      description,
      priority,
      status,
      dueDate,
      category, // We will handle Category IDs later, for now string/null is fine
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// ... (keep your existing imports and functions)

// @desc    Update a task
// @route   PUT /api/tasks/:id
export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    // Check if user owns the task
    if (task.user.toString() !== req.user._id.toString()) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }

    // Update the task
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated version
    });

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    // Check if user owns the task
    if (task.user.toString() !== req.user._id.toString()) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }

    await task.deleteOne(); // Delete it
    res.json({ id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
