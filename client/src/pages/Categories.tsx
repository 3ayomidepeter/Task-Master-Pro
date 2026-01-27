import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import {
  FaBars,
  FaBriefcase,
  FaUser,
  FaGraduationCap,
  FaHeartbeat,
  FaCoins,
} from "react-icons/fa";

interface Task {
  _id: string;
  title: string;
  status: string;
  category?: string;
}

const Categories = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "https://task-master-api-u5xy.onrender.com/api/tasks",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setTasks(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTasks();
  }, []);

  // Helper to count tasks
  const getCount = (cat: string) =>
    tasks.filter((t) => (t.category || "Work") === cat).length;

  const categories = [
    { name: "Work", icon: <FaBriefcase />, color: "bg-blue-100 text-blue-600" },
    {
      name: "Personal",
      icon: <FaUser />,
      color: "bg-purple-100 text-purple-600",
    },
    {
      name: "Study",
      icon: <FaGraduationCap />,
      color: "bg-green-100 text-green-600",
    },
    { name: "Health", icon: <FaHeartbeat />, color: "bg-red-100 text-red-600" },
    {
      name: "Finance",
      icon: <FaCoins />,
      color: "bg-yellow-100 text-yellow-600",
    },
  ];

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div className="flex-1 md:ml-72 p-8">
        <div className="md:hidden flex items-center mb-6">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-2xl text-gray-600 mr-4"
          >
            <FaBars />
          </button>
          <h1 className="text-2xl font-bold">Categories</h1>
        </div>

        <h1 className="hidden md:block text-3xl font-bold text-gray-800 mb-8">
          Task Categories
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition"
            >
              <div className="flex justify-between items-start">
                <div className={`p-4 rounded-lg text-2xl ${cat.color}`}>
                  {cat.icon}
                </div>
                <span className="text-3xl font-bold text-gray-700">
                  {getCount(cat.name)}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mt-4">
                {cat.name}
              </h3>
              <p className="text-gray-500 text-sm mt-1">
                {getCount(cat.name)} tasks active
              </p>
            </div>
          ))}
        </div>

        {/* Simple List of Tasks below (Optional) */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            All Categorized Tasks
          </h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="flex justify-between py-3 border-b last:border-0"
              >
                <span>{task.title}</span>
                <span className="text-sm px-2 py-1 bg-gray-100 rounded text-gray-600">
                  {task.category || "Work"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
