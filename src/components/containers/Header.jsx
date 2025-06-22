import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";

const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  const [users, setUsers] = useState([
    { name: "Ramona", email: "ramona@example.com", password: "1234" },
    { name: "Mihai", email: "mihai@example.com", password: "1234" },
  ]);

  const [userFavorites, setUserFavorites] = useState({
    "ramona@example.com": [],
    "mihai@example.com": [],
  });

  const [currentUser, setCurrentUser] = useState(() => {
    return JSON.parse(localStorage.getItem("currentUser"));
  });

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light"
    );
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const closeModals = () => {
    setShowSignIn(false);
    setShowSignUp(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      setCurrentUser({ email });
      localStorage.setItem("currentUser", JSON.stringify({ email }));

      const userFavs = userFavorites[email] || [];
      localStorage.setItem("favorites", JSON.stringify(userFavs));

      closeModals();
    } else {
      alert("Invalid credentials");
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    if (users.find((u) => u.email === email)) {
      alert("User already exists");
      return;
    }

    const newUser = { name, email, password };
    setUsers([...users, newUser]);
    setUserFavorites((prev) => ({ ...prev, [email]: [] }));
    setCurrentUser({ email });
    localStorage.setItem("currentUser", JSON.stringify({ email }));
    localStorage.setItem("favorites", JSON.stringify([]));
    closeModals();
  };

  const handleLogout = () => {
    if (currentUser?.email) {
      setUserFavorites((prev) => ({
        ...prev,
        [currentUser.email]: JSON.parse(
          localStorage.getItem("favorites") || "[]"
        ),
      }));
    }

    localStorage.removeItem("currentUser");
    localStorage.removeItem("favorites");
    setCurrentUser(null);
    navigate("/");
  };

  const currentUserData = users.find((u) => u.email === currentUser?.email);
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
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide flex items-center gap-2"
        >
          🌍
          <span>
            <span className="font-serif">Travel</span>{" "}
            <span className="font-mono">Planner</span>
          </span>
        </Link>

        <div className="flex items-center space-x-4">
          <nav className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="hover:underline underline-offset-4">
              Home
            </Link>
            <Link to="/contact" className="hover:underline underline-offset-4">
              Contact
            </Link>
            {currentUser && (
              <>
                <Link
                  to="/favorites"
                  className="hover:underline underline-offset-4"
                >
                  Favorites
                </Link>
                <Link
                  to="/calendar"
                  className="hover:underline underline-offset-4"
                >
                  Planner
                </Link>
              </>
            )}
            {!currentUser ? (
              <>
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
              </>
            ) : (
              <>
                <span className="hidden md:inline text-sm">
                  Hello, {currentUserData?.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-sm px-3 py-1 border border-red-400 hover:border-red-600 rounded transition"
                >
                  Logout
                </button>
              </>
            )}
          </nav>

          <button
            onClick={toggleDarkMode}
            className="text-sm px-3 py-1 rounded border border-gray-400 hover:border-gray-600 transition"
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>

          {currentUser && (
            <span className="md:hidden text-sm">
              Hello, {currentUserData?.name}
            </span>
          )}

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
          className={`md:hidden w-full px-6 py-4 transition ${
            darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
          }`}
        >
          <nav className="flex flex-wrap justify-center gap-4 mb-4">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="hover:underline"
            >
              Home
            </Link>
            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="hover:underline"
            >
              Contact
            </Link>
            {currentUser && (
              <>
                <Link
                  to="/favorites"
                  onClick={() => setMenuOpen(false)}
                  className="hover:underline"
                >
                  Favorites
                </Link>
                <Link
                  to="/calendar"
                  onClick={() => setMenuOpen(false)}
                  className="hover:underline"
                >
                  Planner
                </Link>
              </>
            )}
          </nav>

          <div className="flex flex-wrap justify-center gap-4">
            {!currentUser ? (
              <>
                <button
                  onClick={() => {
                    setShowSignIn(true);
                    setMenuOpen(false);
                  }}
                  className="text-sm font-medium hover:underline"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setShowSignUp(true);
                    setMenuOpen(false);
                  }}
                  className="text-sm font-medium hover:underline"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="text-sm font-medium text-red-500 hover:underline"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}

      {/* Sign In Modal */}
      {showSignIn && (
        <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm bg-black/30">
          <div
            className={`w-full max-w-md mx-auto ${modalClass} p-8 rounded-xl shadow-2xl relative`}
          >
            <h2 className="text-2xl font-bold mb-6">Sign In</h2>
            <form onSubmit={handleLogin}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className={inputClass}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className={inputClass}
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-lg"
              >
                Sign In
              </button>
            </form>
            <button
              onClick={closeModals}
              className="absolute top-2 right-3 text-2xl hover:text-red-500"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {/* Sign Up Modal */}
      {showSignUp && (
        <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm bg-black/30">
          <div
            className={`w-full max-w-md mx-auto ${modalClass} p-8 rounded-xl shadow-2xl relative`}
          >
            <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
            <form onSubmit={handleRegister}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                className={inputClass}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className={inputClass}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className={inputClass}
                required
              />
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded text-lg"
              >
                Create Account
              </button>
            </form>
            <button
              onClick={closeModals}
              className="absolute top-2 right-3 text-2xl hover:text-red-500"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
