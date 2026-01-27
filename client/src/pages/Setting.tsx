import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { FaUser, FaLock, FaSave, FaBars } from "react-icons/fa";

const Settings = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsed = JSON.parse(userData);
      setFormData({
        fullName: parsed.fullName,
        email: parsed.email,
        password: "",
      });
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        "http://127.0.0.1:5000/api/auth/profile",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      // Update LocalStorage with new data
      localStorage.setItem("user", JSON.stringify(res.data));
      localStorage.setItem("token", res.data.token);

      setMessage("Profile Updated Successfully! ✅");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error(error);
      setMessage("Update Failed ❌");
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div className="flex-1 md:ml-72 p-8">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center mb-6">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-2xl text-gray-600 mr-4"
          >
            <FaBars />
          </button>
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>

        <h1 className="hidden md:block text-3xl font-bold text-gray-800 mb-8">
          Settings
        </h1>

        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-2xl">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <FaUser className="text-red-400" /> Edit Profile
          </h2>

          {message && (
            <div
              className={`p-3 mb-4 rounded text-white text-center ${message.includes("Success") ? "bg-green-500" : "bg-red-500"}`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                New Password <FaLock className="text-gray-400 text-xs" />
              </label>
              <input
                type="password"
                name="password"
                placeholder="Leave blank to keep current password"
                value={formData.password}
                onChange={handleChange}
                className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 bg-red-400 text-white font-bold rounded-lg hover:bg-red-500 transition flex items-center gap-2"
            >
              <FaSave /> Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
