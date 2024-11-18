// src/user/WeightProgress.jsx

import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import axios from "../config/axiosConfig";

import styles from "../user/styles/Dashboard.module.css";

import leafImage from "../assets/leaf.svg";

// Import Chart.js modules
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);
const ResponsiveNavbar = ({ profile, leafImage, navigate, handleLogout }) => {
  return (
    <nav className={`${styles.bgGreen} navbar fixed-top`}>
      <div className={`${styles.bgGreen} container-fluid`}>
        <a
          className={`${styles.nava} navbar-brand d-flex w-75 align-items-center`}
          href="#"
        >
          <img src={leafImage} alt="Leaf Icon" className={styles.leaf} />
          <span className="ms-2">{profile ? profile.name : "Full Name"}</span>
        </a>
        <button
          className={`${styles.navbarTog} navbar-toggler`}
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="offcanvas offcanvas-start"
          tabIndex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              <img src={leafImage} alt="Leaf Icon" className={styles.leaf} />
              {profile ? profile.name : "Full Name"}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className={`${styles.bgGreen} offcanvas-body`}>
            <p>{profile ? profile.email : "email"}</p>
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li
                className={`nav-item ${styles.active}`}
                onClick={() => {
                  const offcanvasElement =
                    document.getElementById("offcanvasNavbar");
                  if (offcanvasElement) {
                    const offcanvas =
                      bootstrap.Offcanvas.getInstance(offcanvasElement) ||
                      new bootstrap.Offcanvas(offcanvasElement);

                    // Add event listener to wait for offcanvas to close
                    offcanvasElement.addEventListener(
                      "hidden.bs.offcanvas",
                      () => {
                        navigate("/dashboard");
                      }
                    );

                    offcanvas.hide(); // Close the offcanvas
                  } else {
                    navigate("/dashboard"); // Fallback if offcanvas is not found
                  }
                }}
              >
                <a className="nav-link text-white active" href="#">
                  Dashboard
                </a>
              </li>
              <li
                className="nav-item"
                onClick={() => {
                  const offcanvasElement =
                    document.getElementById("offcanvasNavbar");
                  if (offcanvasElement) {
                    const offcanvas =
                      bootstrap.Offcanvas.getInstance(offcanvasElement) ||
                      new bootstrap.Offcanvas(offcanvasElement);

                    offcanvasElement.addEventListener(
                      "hidden.bs.offcanvas",
                      () => {
                        navigate("/weekly-log");
                      }
                    );

                    offcanvas.hide();
                  } else {
                    navigate("/weekly-log");
                  }
                }}
              >
                <a className="nav-link text-white" href="#">
                  Weekly Log
                </a>
              </li>
              <li
                className="nav-item"
                onClick={() => {
                  const offcanvasElement =
                    document.getElementById("offcanvasNavbar");
                  if (offcanvasElement) {
                    const offcanvas =
                      bootstrap.Offcanvas.getInstance(offcanvasElement) ||
                      new bootstrap.Offcanvas(offcanvasElement);

                    offcanvasElement.addEventListener(
                      "hidden.bs.offcanvas",
                      () => {
                        navigate("/AddMeal");
                      }
                    );

                    offcanvas.hide();
                  } else {
                    navigate("/AddMeal");
                  }
                }}
              >
                <a className="nav-link text-white" href="#">
                  Add a Meal
                </a>
              </li>
              <li
                className="nav-item"
                onClick={() => {
                  const offcanvasElement =
                    document.getElementById("offcanvasNavbar");
                  if (offcanvasElement) {
                    const offcanvas =
                      bootstrap.Offcanvas.getInstance(offcanvasElement) ||
                      new bootstrap.Offcanvas(offcanvasElement);

                    offcanvasElement.addEventListener(
                      "hidden.bs.offcanvas",
                      () => {
                        navigate("/weightProgress");
                      }
                    );

                    offcanvas.hide();
                  } else {
                    navigate("/weightProgress");
                  }
                }}
              >
                <a className="nav-link text-white" href="#">
                  Weight Progress
                </a>
              </li>
              <li
                className="nav-item"
                onClick={() => {
                  const offcanvasElement =
                    document.getElementById("offcanvasNavbar");
                  if (offcanvasElement) {
                    const offcanvas =
                      bootstrap.Offcanvas.getInstance(offcanvasElement) ||
                      new bootstrap.Offcanvas(offcanvasElement);

                    offcanvasElement.addEventListener(
                      "hidden.bs.offcanvas",
                      () => {
                        navigate("/favorites");
                      }
                    );

                    offcanvas.hide();
                  } else {
                    navigate("/favorites");
                  }
                }}
              >
                <a className="nav-link text-white" href="#">
                  Favorite Meals
                </a>
              </li>
              <li
                className="nav-item"
                onClick={() => {
                  const offcanvasElement =
                    document.getElementById("offcanvasNavbar");
                  if (offcanvasElement) {
                    const offcanvas =
                      bootstrap.Offcanvas.getInstance(offcanvasElement) ||
                      new bootstrap.Offcanvas(offcanvasElement);

                    offcanvasElement.addEventListener(
                      "hidden.bs.offcanvas",
                      () => {
                        navigate("/accountsettings");
                      }
                    );

                    offcanvas.hide();
                  } else {
                    navigate("/accountsettings");
                  }
                }}
              >
                <a className="nav-link text-white" href="#">
                  Account
                </a>
              </li>
            </ul>
            <button
              className={`btn btn-outline-danger w-100 mt-3 ${styles.logoutButton}`}
              onClick={handleLogout}
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const WeightProgress = () => {
  const navigate = useNavigate();
  const [weightLogs, setWeightLogs] = useState([]);
  const [profile, setProfile] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [weightAnalysis, setWeightAnalysis] = useState("");

  // Detect screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768); // Mobile threshold
    handleResize(); // Check on component mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch authenticated user profile data
        const profileResponse = await axios.get("https://backend-vmt0.onrender.com/users/me", {
          withCredentials: true,
        });
        setProfile(profileResponse.data);

        // Fetch weight logs for the authenticated user
        const weightLogsResponse = await axios.get(
          `https://backend-vmt0.onrender.com/dailylogs/user/${profileResponse.data.id}/last30days`
        );
        const sortedLogs = weightLogsResponse.data.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        setWeightLogs(sortedLogs);

        // Analyze weight data
        analyzeWeightData(sortedLogs, profileResponse.data.goal);
      } catch (error) {
        console.error("Error fetching weight progress data", error);
        if (error.response?.status === 403) {
          navigate("/login");
        }
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  // Function to analyze weight data and set the description
  const analyzeWeightData = (logs, goal) => {
    if (!logs || logs.length === 0) {
      setWeightAnalysis("No weight data available to analyze.");
      return;
    }

    const weights = logs.map((log) => log.weight);
    const dates = logs.map((log) => new Date(log.date));

    // Calculate average weight
    const averageWeight =
      weights.reduce((acc, curr) => acc + curr, 0) / weights.length;

    // Determine trend using linear regression (simple approach)
    const n = weights.length;
    const sumX = weights.reduce((acc, _, idx) => acc + idx, 0);
    const sumY = weights.reduce((acc, curr) => acc + curr, 0);
    const sumXY = weights.reduce((acc, curr, idx) => acc + idx * curr, 0);
    const sumX2 = weights.reduce((acc, _, idx) => acc + idx * idx, 0);

    const slope =
      (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX) || 0;

    let trend = "stable";
    if (slope > 0.1) trend = "increasing";
    else if (slope < -0.1) trend = "decreasing";

    // Predict next week's weight
    const prediction = weights[weights.length - 1] + slope * 7;

    // Create analysis message based on goal and trend
    let analysis = `Your average weight over the past ${weights.length} days is ${averageWeight.toFixed(
      1
    )} kg. `;

    if (goal.toLowerCase() === "bulking") {
      if (trend === "increasing") {
        analysis += `You're on track with your bulking goals by steadily gaining weight. Keep up the good work!`;
      } else if (trend === "decreasing") {
        analysis += `It seems your weight is decreasing, which is contrary to your bulking goals. You might want to review your diet and training plan.`;
      } else {
        analysis += `Your weight has been stable. For bulking, you might consider a slight increase in your calorie intake or training intensity to continue gaining muscle mass.`;
      }
    } else if (goal.toLowerCase() === "cutting") {
      if (trend === "decreasing") {
        analysis += `Great job! You're effectively working towards your cutting goals by steadily losing weight. Keep it up!`;
      } else if (trend === "increasing") {
        analysis += `Your weight is increasing, which is contrary to your cutting goals. Consider adjusting your diet or exercise routine to achieve your desired results.`;
      } else {
        analysis += `Your weight has been stable. For cutting, you might consider a slight decrease in your calorie intake or increasing your activity level to continue losing weight.`;
      }
    } else if (goal.toLowerCase() === "maintaining") {
      if (trend === "stable") {
        analysis += `Excellent! You're successfully maintaining your current weight. Keep following your balanced diet and exercise routine.`;
      } else if (trend === "increasing") {
        analysis += `Your weight is increasing slightly, which might require adjustments to maintain your current weight. Consider reviewing your calorie intake or activity levels.`;
      } else if (trend === "decreasing") {
        analysis += `Your weight is decreasing slightly, which might require adjustments to maintain your current weight. Consider reviewing your calorie intake or activity levels.`;
      }
    } else {
      // Default message if goal is undefined or unrecognized
      if (trend === "increasing") {
        analysis += `Your weight is increasing. If this aligns with your goals, great job! If not, consider adjusting your routine.`;
      } else if (trend === "decreasing") {
        analysis += `Your weight is decreasing. If this aligns with your goals, great job! If not, consider adjusting your routine.`;
      } else {
        analysis += `Your weight has been stable. Keep up the good work!`;
      }
    }

    analysis += ` Based on your current trend, your estimated weight next week is ${prediction.toFixed(
      1
    )} kg.`;

    setWeightAnalysis(analysis);
  };

  // Prepare data for Chart.js
  const chartData = {
    labels: weightLogs.map((log) => log.date),
    datasets: [
      {
        label: "Weight (kg)",
        data: weightLogs.map((log) => log.weight),
        borderColor: "#3b82f6",
        backgroundColor: "#3b82f6",
        fill: false,
        tension: 0.1,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const handleLogout = () => {
    axios
      .post("https://backend-vmt0.onrender.com/users/logout", {}, { withCredentials: true })
      .then(() => navigate("/login"))
      .catch((err) => console.error("Error during logout:", err));
  };

  return (
    <div className={styles.dashboardContainer}>
      {isMobile ? (
        <ResponsiveNavbar
          profile={profile}
          leafImage={leafImage}
          navigate={navigate}
          handleLogout={handleLogout}
        />
      ) : (
        <aside className={styles.sidebar}>
          <h2>
            {profile ? profile.name : "Full Name"}
            <img className={styles.leaf} src={leafImage} alt="Leaf Icon" />
          </h2>
          <p>{profile ? profile.email : "email"}</p>
          <nav>
            <ul>
              <li
                className={styles.active}
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </li>
              <li onClick={() => navigate("/weekly-log")}>Weekly Log</li>
              <li onClick={() => navigate("/AddMeal")}>Add a Meal</li>
              <li onClick={() => navigate("/weightProgress")}>
                Weight Progress
              </li>
              <li onClick={() => navigate("/favorites")}>Favorite Meals</li>
              <li onClick={() => navigate("/accountsettings")}>Account</li>
            </ul>
          </nav>
          <button className={styles.logoutButton} onClick={handleLogout}>
            Log Out
          </button>
        </aside>
      )}
      <div className={`position-relative ${isMobile ? "w-100" : "w-75"}`}>
        <div className={`${styles.backgroundLayer} ${isMobile ? "h-100" : ""}`}>
          <div className={`${styles.mainContent} ${styles.mainContentWeight}`}>
            <div className={`${styles.weightContainer} container mt-4`}>
              <div className="row h-100">
                <div className="col-12">
                  <h3>Your Weight Progress Over Time</h3>
                </div>
                <div className="col-12 h-50">
                  <div className={styles.weightChart}>
                    <Line data={chartData} />
                  </div>
                </div>
                <div className="col-12 mt-4">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Weight Analysis</h5>
                      <p className="card-text">{weightAnalysis}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
};

export default WeightProgress;
