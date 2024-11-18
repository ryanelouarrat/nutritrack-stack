import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import googleLogo from "../assets/google-logo.svg";
import styles from "./styles/login.module.css";
import leafImage from "../assets/leaf.svg";

const Login = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      // Set withCredentials to true to include cookies with the request
      const response = await axios.post(
        "https://localhost:8080/users/login",
        formData,
        { withCredentials: true }
      );

      if (response.status === 200) {
        setIsAuthenticated(true); // Update the authenticated state
        navigate("/dashboard"); // Navigate to the dashboard
      }
    } catch (err) {
      console.error("Error details:", err);

      if (err.response) {
        // Server responded with a status other than 2xx
        if (err.response.status === 401) {
          setError("Invalid email or password. Please try again.");
        } else if (err.response.status === 500) {
          setError("Internal server error. Please try again later.");
        } else {
          setError("An error occurred. Please try again.");
        }
      } else if (err.request) {
        // Request was made but no response received
        setError("Network error. Please check your connection and try again.");
      } else {
        // Error in setting up the request
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  // Handle Sign Up button click
  const handleSignUpClick = () => {
    navigate("/signup");
  };

  return (
    <div className={styles.login}>
      <div className={styles["overlap-wrapper"]}>
        <div className={styles.overlap}>
          <div className={styles["the-interior-has-a"]} />

          <div className={styles["text-wrapper"]}>
            NutriTrack
            <img
              className={styles.leaf}
              src={leafImage}
              alt="Leaf Icon"
              width="100"
              height="100"
            />
          </div>

          <div className={styles.group}>
            <div className={styles["overlap-group"]}>
              <div className={styles.div}>
                <div className={styles["group-2"]}>
                  <p className={styles["welcome-to"]}>
                    <span className={styles.span}>Welcome to </span>
                    <span className={styles["text-wrapper-2"]}>NutriTrack</span>
                  </p>

                  <p className={styles["no-account-sign-up"]}>
                    <span className={styles["text-wrapper-3"]}>
                      No Account ?<br />
                    </span>
                    <span
                      className={styles["text-wrapper-4"]}
                      onClick={handleSignUpClick}
                      style={{ cursor: "pointer", color: "blue" }}
                    >
                      Sign up
                    </span>
                  </p>
                </div>
                <form className={styles["login-form"]} onSubmit={handleSubmit}>
                  <div className={styles["group-3"]}>
                    <label className={styles["text-wrapper-7"]}>
                      email address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={styles["username-or-email-wrapper"]}
                      placeholder="email address"
                      required
                    />
                  </div>

                  <div className={styles["group-4"]}>
                    <label className={styles["text-wrapper-7"]}>
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={styles["div-wrapper"]}
                      placeholder="Password"
                      required
                    />
                  </div>

                  <div
                    onClick={() => navigate("/passwordRecovery")}
                    style={{ cursor: "pointer" }}
                    className={styles["text-wrapper-9"]}
                  >
                    Forgot Password
                  </div>

                  <button
                    type="submit"
                    className={styles["overlap-group-wrapper"]}
                  >
                    <div className={styles["text-wrapper-10"]}>Sign in</div>
                  </button>
                </form>
                {error && (
                  <p className={`${styles.err} text-danger`}>{error}</p>
                )}
                <div className={styles["frame-wrapper"]}>
                  <div className={styles.frame}>
                    {/* Updated to open in the same tab */}
                    <a
                      href="https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=https://localhost:5173/googleAuth&response_type=code&client_id=204925759914-ijoh8n2paoqsoaj6qabaco4jkv5mvtat.apps.googleusercontent.com
&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+openid&access_type=offline&prompt=consent"
                      target="_self"
                      rel="noopener noreferrer"
                      className={styles["continue-with-google"]}
                    >
                      <div className={styles["frame-2"]}>
                        <img
                          className={styles["google-logo"]}
                          alt="Google logo"
                          src={googleLogo}
                        />
                        <div className={styles["text-wrapper-6"]}>
                          Continue with Google
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles["group-5"]}>
            <div className={styles["group-6"]}>
              <div className={styles["text-wrapper-11"]}>Sign in to</div>
              <div className={styles["text-wrapper-12"]}>
                Your NutriTrack Account
              </div>
            </div>

            <p className={styles["helps-you-easily"]}>
              helps you easily plan and track your meals to meet your
              nutritional goals. Personalized recommendations and real-time
              progress updates ensure you stay on track toward a healthier
              lifestyle.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
