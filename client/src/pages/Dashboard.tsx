import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import AddTaskModal from "../components/AddTaskModal";
import TaskChart from "../components/TaskChart";
import CompletedTasks from "../components/CompletedTasks";
import {
  FaSearch,
  FaBell,
  FaCalendarAlt,
  FaBars,
  FaCircle,
  FaTrash,
  FaEdit,
} from "react-icons/fa";

// Define the shape of a Task
interface Task {
  _id: string;
  title: string;
  priority: string;
  status: string;
  description: string;
}

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [user, setUser] = useState<{ fullName: string } | null>(null);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null); // 👈 Stores the task we want to edit

  const currentDate = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  // Fetch User & Tasks on Load
  useEffect(() => {
    // 1. Get User
    const userData = localStorage.getItem("user");
    if (userData) setUser(JSON.parse(userData));

    // 2. Get Tasks
    fetchTasks();
  }, []);

  // Function to get tasks from Backend
  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      // Use 127.0.0.1 to avoid localhost issues
      const res = await axios.get(
        "https://task-master-api-u5xy.onrender.com/api/tasks",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Helper to get color based on priority
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "text-red-500";
      case "Moderate":
        return "text-blue-500";
      case "Low":
        return "text-gray-500";
      case "Vital":
        return "text-purple-500";
      default:
        return "text-gray-500";
    }
  };

  // ... inside Dashboard component ...

  // Delete Task Function
  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(
          `https://task-master-api-u5xy.onrender.com/api/tasks/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        fetchTasks(); // Refresh the list
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };

  // Handle Edit Click
  const handleEdit = (task: Task) => {
    setTaskToEdit(task); // 1. Store the task to be edited
    setIsModalOpen(true); // 2. Open the modal
  };

  // Update the "+ Add Task" button to clear any previous edit data
  const openNewTaskModal = () => {
    setTaskToEdit(null); // Ensure we are in "Create" mode
    setIsModalOpen(true);
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar with toggle logic */}
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Modal */}
      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onTaskAdded={fetchTasks}
        taskToEdit={taskToEdit as any}
      />

      {/* Main Content */}
      <div className="flex-1 md:ml-72 p-4 md:p-8 transition-all duration-300">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center w-full md:w-auto justify-between">
            <div className="flex items-center gap-3">
              <button
                className="md:hidden text-gray-600 text-2xl"
                onClick={() => setIsSidebarOpen(true)}
              >
                <FaBars />
              </button>
              <h1 className="text-2xl md:text-4xl font-bold text-gray-800">
                Dashboard
              </h1>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search task..."
                className="pl-4 pr-10 py-2 w-full rounded-lg border-none shadow-sm focus:ring-2 focus:ring-red-400 outline-none"
              />
              <FaSearch className="absolute right-3 top-3 text-gray-400" />
            </div>

            <div className="flex items-center justify-between w-full md:w-auto gap-4">
              <div className="flex gap-2">
                <button className="p-2 bg-red-400 text-white rounded-lg shadow-md hover:bg-red-500">
                  <FaBell />
                </button>
                <button className="p-2 bg-red-400 text-white rounded-lg shadow-md hover:bg-red-500">
                  <FaCalendarAlt />
                </button>
              </div>
              <p className="text-sm font-bold text-gray-700 md:text-right">
                {currentDate}
              </p>
            </div>
          </div>
        </header>

        {/* Welcome Message */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
            Welcome back, {user?.fullName.split(" ")[0]} 👋
          </h2>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* To-Do List Section */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-96 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-700">To-Do</h3>
              <button
                onClick={openNewTaskModal}
                className="text-red-500 font-bold hover:underline"
              >
                + Add task
              </button>
            </div>

            {/* Task List Container */}
            <div className="flex-1 overflow-y-auto pr-2 space-y-3">
              {tasks.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <p>No tasks yet. Add one!</p>
                </div>
              ) : (
                tasks.map((task) => (
                  <div
                    key={task._id}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-100 hover:shadow-md transition flex justify-between items-center group"
                  >
                    {" "}
                    {/* 👈 Added 'group' class */}
                    {/* Left Side: Text */}
                    <div>
                      <h4 className="font-bold text-gray-800">{task.title}</h4>
                      <p className="text-sm text-gray-500">
                        {task.description}
                      </p>
                    </div>
                    {/* Right Side: Badges & Buttons */}
                    <div className="flex items-center gap-4">
                      {/* Status/Priority Badges */}
                      <div className="flex items-center gap-2">
                        <FaCircle
                          className={`text-xs ${getPriorityColor(
                            task.priority,
                          )}`}
                        />
                        <span
                          className={`text-xs font-bold ${getPriorityColor(
                            task.priority,
                          )}`}
                        >
                          {task.priority}
                        </span>
                        <span className="text-xs bg-gray-200 px-2 py-1 rounded text-gray-600 ml-2 hidden md:inline-block">
                          {task.status}
                        </span>
                      </div>

                      {/* Action Buttons (Only show on hover for cleaner look) */}
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleEdit(task)}
                          className="text-blue-400 hover:text-blue-600"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(task._id)}
                          className="text-red-400 hover:text-red-600"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Status Column */}
          {/* Status Column */}
          <div className="space-y-6">
            {/* 1. The Donut Chart */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 min-h-[350px] flex flex-col">
              {" "}
              {/* Increased height slightly */}
              <h3 className="text-xl font-bold text-gray-700 mb-4">
                Task Status
              </h3>
              <div className="w-full h-64">
                {/* Pass the tasks to the chart */}
                <TaskChart tasks={tasks} />
              </div>
            </div>

            {/* 2. The Completed List */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-64 flex flex-col">
              <h3 className="text-xl font-bold text-gray-700 mb-4">
                Completed Task
              </h3>
              <div className="flex-1 overflow-hidden">
                <CompletedTasks tasks={tasks} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
