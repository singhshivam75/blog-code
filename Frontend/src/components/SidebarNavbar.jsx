import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaSearch, FaHome, FaPlus, FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

export default function SidebarNavbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
    setSidebarOpen(false);
  };

  // 🛑 Show nothing if user is not logged in
  if (!isAuthenticated) return null;

  return (
    <div className="relative z-50">
      {/* Top Navigation Header */}
      <div className="flex items-center justify-between px-4 py-4 bg-white shadow-md">
        <Link to="/" className="text-3xl font-bold text-blue-700">
          Blog<span className="text-blue-900">Code</span>
        </Link>
        <button
          onClick={() => setSidebarOpen(true)}
          className="text-gray-700 cursor-pointer focus:outline-none"
        >
          <FaBars size={24} />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out z-50 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">Navigation</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-600 focus:outline-none"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Search Input */}
        <Link to="/search">
          <div className="relative p-4">
            <input
              type="search"
              placeholder="Search blogs..."
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute text-gray-400 transform -translate-y-1/2 top-1/2 right-6" />
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-4 px-4 py-2 font-medium text-gray-800">
          <Link
            to="/"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-2 hover:text-blue-600"
          >
            <FaHome /> Home
          </Link>

          <Link
            to="/create-blog"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-2 hover:text-blue-600"
          >
            <FaPlus /> Create Blog
          </Link>

          <Link
            to="/my-blogs"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-2 hover:text-blue-600"
          >
            <FaUserCircle /> My Blogs
          </Link>

          <Link
            to="/contact"
            onClick={() => setSidebarOpen(false)}
            className="hover:text-blue-600"
          >
            Contact
          </Link>

          <button
            onClick={handleLogout}
            className="text-left hover:text-red-600"
          >
            Logout
          </button>
        </nav>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black opacity-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
