import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
    setMobileMenuOpen(false);
  };

  const handleSearch = (query) => {
    if (query.trim()) {
      navigate(`/search?query=${query}`);
      setMobileMenuOpen(false);
    }
  };

  if (loading) {
    return (
      <nav className="sticky top-0 z-50 p-4 bg-white shadow-md">
        <span>Loading...</span>
      </nav>
    );
  }

  const navLinks = (
    <>
      <div className="w-full md:w-auto">
        <SearchBar onSearch={handleSearch} />
      </div>

      <Link
        to="/"
        className="transition hover:text-blue-600"
        onClick={() => setMobileMenuOpen(false)}
      >
        Home
      </Link>

      {isAuthenticated && (
        <>
          <Link
            to="/create-blog"
            className="transition hover:text-blue-600"
            onClick={() => setMobileMenuOpen(false)}
          >
            Create Blog
          </Link>
          <Link
            to="/my-blogs"
            className="transition hover:text-blue-600"
            onClick={() => setMobileMenuOpen(false)}
          >
            My Blogs
          </Link>
        </>
      )}

      <Link
        to="/contact"
        className="transition hover:text-blue-600"
        onClick={() => setMobileMenuOpen(false)}
      >
        Contact
      </Link>

      {isAuthenticated ? (
        <>
          <button
            onClick={handleLogout}
            className="text-left transition hover:text-red-600"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link
            to="/login"
            className="transition hover:text-blue-600"
            onClick={() => setMobileMenuOpen(false)}
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700 transition inline-block w-max"
            onClick={() => setMobileMenuOpen(false)}
          >
            Sign Up
          </Link>
        </>
      )}
    </>
  );

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="flex items-center justify-between px-4 py-5 mx-auto sm:px-6 lg:px-8">
        <Link to="/" className="text-4xl font-bold text-blue-700">
          Blog<span className="text-blue-900">Code</span>
        </Link>

        <div className="items-center hidden gap-10 text-lg font-bold text-gray-900 md:flex">
          {navLinks}
        </div>

        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="flex flex-col items-center px-4 pt-2 pb-6 space-y-4 text-lg font-semibold bg-white border-t shadow-md md:hidden">
          {navLinks}
        </div>
      )}
    </nav>
  );
}
