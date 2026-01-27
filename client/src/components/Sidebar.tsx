import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaThLarge,
  FaExclamationCircle,
  FaCheckSquare,
  FaLayerGroup,
  FaCog,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";

// Define props to control mobile visibility
interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<{ fullName: string; email: string } | null>(
    null,
  );

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) setUser(JSON.parse(userData));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const getLinkClass = (path: string) => {
    return location.pathname === path
      ? "flex items-center space-x-3 text-red-500 bg-white p-3 rounded-lg font-bold shadow-sm"
      : "flex items-center space-x-3 text-white p-3 hover:bg-red-400 rounded-lg transition";
  };

  return (
    <>
      {/* Overlay for mobile (closes sidebar when clicked) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar Container */}
      <div
        className={`
        fixed left-0 top-0 h-screen bg-[#FF6767] p-6 z-30 transition-transform duration-300
        w-72 flex flex-col justify-between
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
      `}
      >
        <div>
          {/* Mobile Close Button */}
          <div className="flex justify-end md:hidden mb-4">
            <button onClick={toggleSidebar} className="text-white text-2xl">
              <FaTimes />
            </button>
          </div>

          {/* Profile Card */}
          <div className="flex flex-col items-center mb-8 text-white">
            <div className="w-20 h-20 bg-gray-300 rounded-full mb-3 overflow-hidden border-4 border-white">
              <img
                src={`https://ui-avatars.com/api/?name=${user?.fullName}&background=random`}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-xl font-bold text-center">{user?.fullName}</h2>
            <p className="text-xs opacity-80">{user?.email}</p>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            <Link
              to="/dashboard"
              className={getLinkClass("/dashboard")}
              onClick={() => window.innerWidth < 768 && toggleSidebar()}
            >
              <FaThLarge /> <span>Dashboard</span>
            </Link>
            <Link to="/vital-task" className={getLinkClass("/vital-task")}>
              <FaExclamationCircle /> <span>Vital Task</span>
            </Link>
            <Link to="/my-task" className={getLinkClass("/my-task")}>
              <FaCheckSquare /> <span>My Task</span>
            </Link>
            <Link to="/categories" className={getLinkClass("/categories")}>
              <FaLayerGroup /> <span>Task Categories</span>
            </Link>
            <Link to="/settings" className={getLinkClass("/settings")}>
              <FaCog /> <span>Settings</span>
            </Link>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 text-white p-3 hover:bg-red-800 rounded-lg transition"
        >
          <FaSignOutAlt /> <span>Logout</span>
        </button>
      </div>
    </>
  );
};

export default Sidebar;
