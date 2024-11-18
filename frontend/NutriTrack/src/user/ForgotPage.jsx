import React, { useState } from "react";
import axios from "axios";
import styles from "./styles/ForgotPage.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import leafImage from "../assets/leaf.svg";
import { useNavigate } from "react-router-dom";

const ForgotPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState("success"); // success or error
  const navigate = useNavigate();
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://backend-vmt0.onrender.com/api/password/forgot",
        { email }
      );
      setMessage("Check your inbox for the password reset link.");
      setPopupType("success");
    } catch (error) {
      setMessage("Error sending password reset email. Please try again.");
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
          <h2 className={styles.heading}>Forgot Password</h2>
          <p className={styles.infoText}>
            Enter the email address associated with your NutriTrack account. We
            will send you a link to reset your password. Please check your
            inbox for further instructions.
          </p>
          <form onSubmit={handleForgotPassword}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              required
            />
            <button type="submit" className={styles.button} disabled={loading}>
              {loading ? (
                <span className="spinner-border spinner-border-sm"></span>
              ) : (
                "Send Reset Link"
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

export default ForgotPage;
