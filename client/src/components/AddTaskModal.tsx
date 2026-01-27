import { useState, useEffect } from "react";
import axios from "axios";
import { FaTimes } from "react-icons/fa";

// Define the Task interface here so TypeScript knows what a task looks like
interface Task {
  _id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  dueDate: string;
}

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTaskAdded: () => void;
  taskToEdit?: Task | null; // 👈 NEW: This tells us which task to update
}

const AddTaskModal = ({
  isOpen,
  onClose,
  onTaskAdded,
  taskToEdit,
}: AddTaskModalProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Moderate",
    status: "Not Started",
    dueDate: "",
    category: "Work",
  });

  // 👈 NEW: When the modal opens, check if we are editing
  useEffect(() => {
    if (taskToEdit) {
      // Pre-fill the form
      setFormData({
        title: taskToEdit.title,
        description: taskToEdit.description,
        priority: taskToEdit.priority,
        status: taskToEdit.status,
        dueDate: taskToEdit.dueDate ? taskToEdit.dueDate.split("T")[0] : "", // Fix date format
        category: "Work",
      });
    } else {
      // Reset form for "New Task"
      setFormData({
        title: "",
        description: "",
        priority: "Moderate",
        status: "Not Started",
        dueDate: "",
        category: "Work",
      });
    }
  }, [taskToEdit, isOpen]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      if (taskToEdit) {
        // 👈 EDIT MODE: Update existing task (PUT)
        await axios.put(
          `https://task-master-api-u5xy.onrender.com/api/tasks/${taskToEdit._id}`,
          formData,
          config,
        );
      } else {
        // 👈 CREATE MODE: Create new task (POST)
        await axios.post(
          "https://task-master-api-u5xy.onrender.com/api/tasks",
          formData,
          config,
        );
      }

      onTaskAdded();
      onClose();
    } catch (error) {
      console.error("Error saving task:", error);
      alert("Failed to save task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <FaTimes />
        </button>

        {/* Dynamic Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {taskToEdit ? "Edit Task" : "Add New Task"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Task Title
            </label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none"
            />
          </div>

          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Priority
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none bg-white text-sm"
              >
                <option value="Low">Low</option>
                <option value="Moderate">Moderate</option>
                <option value="High">High</option>
                <option value="Vital">Vital</option>
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none bg-white text-sm"
              >
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            {/* 👈 NEW CATEGORY DROPDOWN */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                name="category"
                value={formData.category || "Work"}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none bg-white text-sm"
              >
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Study">Study</option>
                <option value="Health">Health</option>
                <option value="Finance">Finance</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Due Date
            </label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#FF6767] text-white font-bold rounded-lg hover:bg-red-500 transition disabled:opacity-50"
          >
            {loading ? "Saving..." : taskToEdit ? "Update Task" : "Create Task"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
