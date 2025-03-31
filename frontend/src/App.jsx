import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import InputPage from "./pages/InputPage";
import React from "react";
import Dashboard from "./pages/Dashboard";
import Text from "./pages/Text";
import Vision from "./pages/Vision";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/input" element={<InputPage />} />
        <Route path="/dashboard" element={<Dashboard /> } />
        <Route path="/text" element={<Text />} />
        <Route path="/vision" element={<Vision />} />
      </Routes>
    </Router>
  );
};

export default App;
