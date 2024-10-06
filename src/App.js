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
          <Route path="/" element={<AuthWrapper />} />
          <Route path="/dashboard" element={<HealthDashboard />} />
          {/* Add more routes here if needed */}
        </Routes>
      </div>
    </Router>
  );
};

// Wrapper component to handle authentication and navigation
const AuthWrapper = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleSubmit = (formData) => {
    console.log("Form submitted:", formData);
    // Handle login/register logic here

    // TODO: Implement actual authentication logic (e.g., API call)
    // Simulate successful authentication with a timeout
    setTimeout(() => {
      // After successful authentication, navigate to the dashboard
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <AuthScreen
      isLogin={isLogin}
      onSubmit={handleSubmit}
      onSwitchMode={() => setIsLogin(!isLogin)}
    />
  );
};

export default App;
