import { HashRouter, Route, Routes } from "react-router";
import "./App.css";
import HomePage from "./components/pages/HomePage";
import Header from "./components/containers/Header";
import DestinationPage from "./components/pages/DestinationPage";
import Footer from "./components/containers/Footer";
import ContactUsPage from "./components/pages/ContactUsPage";
import FavoritesPage from "./components/pages/FavoritesPage";
import CalendarPage from "./components/pages/CalendarPage";

function App() {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/destinations/:city" element={<DestinationPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
      </Routes>
      <Footer />
    </HashRouter>
  );
}

export default App;
