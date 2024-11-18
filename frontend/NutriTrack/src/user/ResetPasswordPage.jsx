import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./styles/ForgotPage.module.css"; // Reuse the same CSS module
import leafImage from "../assets/leaf.svg";

const ResetPasswordPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState("success"); // success or error

  // Extract the token from the URL
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      setPopupType("error");
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000); // Hide popup after 3 seconds
      setLoading(false);
      return;
    }

    try {
      // Send a request to reset the password
      const response = await axios.post("https://backend-vmt0.onrender.com/api/password/reset", {
        token,
        password,
      });
      setMessage("Password reset successfully!");
      setPopupType("success");
      setTimeout(() => navigate("/login"), 3000); // Redirect to login page after 3 seconds
    } catch (error) {
      setMessage("Failed to reset password. Try again.");
      setPopupType("error");
    } finally {
      setLoading(false);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000); // Hide popup after 3 seconds
    }
  };

  return (
    <div className={styles.forgot}>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <div className={styles["text-wrapper"]} onClick={() => navigate("/login")} style={{ cursor: "pointer" }}>
            NutriTrack
            <img
              className={styles.leaf}
              src={leafImage}
              alt="Leaf Icon"
              width="50"
              height="50"
            />
          </div>
        </div>
      </nav>
      <div className={styles.container}>
        <div className={styles.formCard}>
          <h2 className={styles.heading}>Reset Password</h2>
          <p className={styles.infoText}>
            Please enter your new password below. Make sure your password is strong and secure.
          </p>
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={styles.input}
              required
            />
            <button type="submit" className={styles.button} disabled={loading}>
              {loading ? (
                <span className="spinner-border spinner-border-sm"></span>
              ) : (
                "Reset Password"
              )}
            </button>
          </form>
        </div>
      </div>
      {showPopup && (
        <div
          className={`${styles.popup} ${
            popupType === "success" ? styles.success : styles.error
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default ResetPasswordPage;
