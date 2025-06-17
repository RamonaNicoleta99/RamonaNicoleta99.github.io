import { HashRouter, Route, Routes } from "react-router";
import "./App.css";
import HomePage from "./components/pages/HomePage";
import Header from "./components/containers/Header";
import AttractionPage from "./components/pages/AttractionsPage";
import { useEffect } from "react";
import { useState } from "react";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);


  return (
    <HashRouter >
      <Header darkMode={darkMode} toggleDarkMode={() => setDarkMode((prev) => !prev)} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/attractions" element={<AttractionPage />} />
      </Routes>
    </HashRouter >
  );
}

export default App;