// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import HealthDashboard from "./components/HealthDashboard";
import AuthScreen from "./components/AuthScreen/AuthScreen";


const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<AuthScreen />} />
          <Route path="/dashboard" element={<HealthDashboard />} />
          {/* Add more routes here if needed */}
        </Routes>
      </div>
    </Router>
  );
};



export default App;
