import React, { useState, useEffect } from "react";
import { Link } from "react-router";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark" ? true : false;
  });

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light"
    );
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const closeModals = () => {
    setShowSignIn(false);
    setShowSignUp(false);
  };

  const modalClass = `${
    darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
  }`;
  const inputClass = `w-full mb-4 p-3 rounded border border-gray-300 ${
    darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
  }`;

  return (
    <header
      className={`shadow-md sticky top-0 z-50 w-full transition ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <Link to="/" className="text-2xl font-bold tracking-wide">
          🌍 Travel Planner
        </Link>

        <div className="flex items-center space-x-4">
          <nav className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="hover:underline underline-offset-4">
              Home
            </Link>
            <Link to="/contact" className="hover:underline underline-offset-4">
              Contact
            </Link>
            <button
              onClick={() => setShowSignIn(true)}
              className="text-sm font-medium hover:underline"
            >
              Sign In
            </button>
            <button
              onClick={() => setShowSignUp(true)}
              className="text-sm font-medium hover:underline"
            >
              Sign Up
            </button>
          </nav>

          <button
            onClick={toggleDarkMode}
            className="text-sm px-3 py-1 rounded border border-gray-400 hover:border-gray-600 transition"
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>

          <button
            className="md:hidden focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          className={`md:hidden w-full px-6 pb-4 transition ${
            darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
          }`}
        >
          <nav className="flex flex-col space-y-2">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="hover:underline"
            >
              Home
            </Link>
            <Link to="/contact" className="hover:underline underline-offset-4">
              Contact
            </Link>
            <button onClick={() => setShowSignIn(true)} className="text-left">
              Sign In
            </button>
            <button onClick={() => setShowSignUp(true)} className="text-left">
              Sign Up
            </button>
          </nav>
        </div>
      )}

      {/* Sign In Modal */}
      {showSignIn && (
        <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm bg-black/30">
          <div
            className={`w-full max-w-md mx-auto ${modalClass} p-8 rounded-xl shadow-2xl relative border border-gray-300 dark:border-gray-700`}
          >
            <h2 className="text-2xl font-bold mb-6">Sign In</h2>
            <input type="email" placeholder="Email" className={inputClass} />
            <input
              type="password"
              placeholder="Password"
              className={inputClass}
            />
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-lg">
              Sign In
            </button>
            <button
              onClick={closeModals}
              className="absolute top-2 right-3 text-2xl hover:text-red-500"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Sign Up Modal */}
      {showSignUp && (
        <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm bg-black/30">
          <div
            className={`w-full max-w-md mx-auto ${modalClass} p-8 rounded-xl shadow-2xl relative border border-gray-300 dark:border-gray-700`}
          >
            <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
            <input type="text" placeholder="Name" className={inputClass} />
            <input type="email" placeholder="Email" className={inputClass} />
            <input
              type="password"
              placeholder="Password"
              className={inputClass}
            />
            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded text-lg">
              Create Account
            </button>
            <button
              onClick={closeModals}
              className="absolute top-2 right-3 text-2xl hover:text-red-500"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
