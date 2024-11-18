import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Signup from "./user/SignUpFlow";
import Signup2 from "./user/SignUp2";
import Signup3 from "./user/SignUp3";
import UserDashboard from "./user/Dashboard";
import Login from "./user/login";
import AddMeal1 from "./food/AddMeal1";
import FavoriteMeals from "./user/FavoriteMeals";
import WeightProgress from "./user/WeightProgress";
import WeeklyLog1 from "./user/Weeklylog1";
import AccountSettings from "./user/AccountSettings";
import ForgotPage from "./user/ForgotPage";
import ResetPasswordPage from "./user/ResetPasswordPage.jsx";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";

function MainApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation(); // useLocation is now safely inside the Router context

  useEffect(() => {
    // Reset body styles whenever the route changes
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
  }, [location]);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get("https://localhost:8080/users/verifyToken", { withCredentials: true });
        setIsAuthenticated(response.data.isAuthenticated);
      } catch (error) {
        console.error("Authentication check failed:", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, []);

  if (loading) {
    return (
      <div className="loading-overlay">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
      <Route path="/passwordRecovery" element={<ForgotPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />

      {/* Protected Routes */}
      <Route path="/dashboard" element={isAuthenticated ? <UserDashboard /> : <Navigate to="/login" replace />} />
      <Route path="/weightProgress" element={isAuthenticated ? <WeightProgress /> : <Navigate to="/login" replace />} />
      <Route path="/AddMeal" element={isAuthenticated ? <AddMeal1 /> : <Navigate to="/login" replace />} />
      <Route path="/favorites" element={isAuthenticated ? <FavoriteMeals /> : <Navigate to="/login" replace />} />
      <Route path="/weekly-log" element={isAuthenticated ? <WeeklyLog1 /> : <Navigate to="/login" replace />} />
      <Route path="/accountSettings" element={isAuthenticated ? <AccountSettings /> : <Navigate to="/login" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}

export default App;
