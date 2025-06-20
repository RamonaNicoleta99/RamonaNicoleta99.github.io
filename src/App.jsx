import { HashRouter, Route, Routes } from "react-router";
import "./App.css";
import HomePage from "./components/pages/HomePage";
import Header from "./components/containers/Header";
import DestinationPage from "./components/pages/DestinationPage";

function App() {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/destinations/:city" element={<DestinationPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
