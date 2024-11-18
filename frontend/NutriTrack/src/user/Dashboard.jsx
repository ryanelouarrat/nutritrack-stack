// src/user/Dashboard.jsx

import React, { useState, useEffect } from "react";
import SuggestedRecipes from "./components/SuggestedRecipes";
import { Doughnut, Line } from "react-chartjs-2";
import axios from "../config/axiosConfig";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  ArcElement,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../user/styles/Dashboard.module.css";
import leafImage from "../assets/leaf.svg";
import MealModal from "./components/MealModal";
import { Modal, Button, Form } from "react-bootstrap";
import * as bootstrap from "bootstrap";

// Register Chart.js components
ChartJS.register(
  ArcElement,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

// Responsive Navbar Component
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

function Dashboard() {
  const navigate = useNavigate();

  // State Variables
  const [userId, setUserId] = useState(null);
  const [profile, setProfile] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [todaysLog, setTodaysLog] = useState({
    caloriesConsumed: 0,
    proteinConsumed: 0,
    carbsConsumed: 0,
    fatsConsumed: 0,
  });
  const [weightLogs, setWeightLogs] = useState([]);
  const [todayWeight, setTodayWeight] = useState("");
  const [showWeightModal, setShowWeightModal] = useState(false);
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [quote, setQuote] = useState("");
  const [dailyLogId, setDailyLogId] = useState(null); // Initialize dailyLogId
  const [mealId, setMealId] = useState(undefined);

  const today = new Date().toISOString().split("T")[0];

  const quotesList = [
    "Keep pushing forward! 🌟",
    "Every step counts! 🚀",
    "You’re closer than you were yesterday! 💪",
    "Stay strong and keep going! 🏋️‍♂️",
    "Believe in yourself, you’ve got this! 🎯",
  ];

  const handleMealClick = (meal) => setSelectedMeal(meal);
  const closeModal = () => setSelectedMeal(null);
  const handleShowWeightModal = () => setShowWeightModal(true);
  const handleCloseWeightModal = () => setShowWeightModal(false);
  const goToFavorites = () => navigate("/favorites");

  useEffect(() => {
    // Fetch the user's profile securely using cookies
    const fetchProfile = async () => {
      try {
        const profileResponse = await axios.get(
          "https://backend-vmt0.onrender.com/users/me",
          {
            withCredentials: true,
          }
        );
        const { id, ...profileData } = profileResponse.data;
        setUserId(id);
        setProfile(profileData);
      } catch (error) {
        console.error("Error fetching profile:", error);
        navigate("/login");
      }
    };

    fetchProfile();
  }, [navigate]);

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      try {
        // Fetch today's daily log
        const dailyLogResponse = await axios.get(
          `https://backend-vmt0.onrender.com/dailylogs/user/${userId}`,
          { params: { date: today } }
        );
        if (dailyLogResponse.data) {
          setTodaysLog({
            caloriesConsumed: dailyLogResponse.data.caloriesConsumed || 0,
            proteinConsumed: dailyLogResponse.data.proteinConsumed || 0,
            carbsConsumed: dailyLogResponse.data.carbsConsumed || 0,
            fatsConsumed: dailyLogResponse.data.fatsConsumed || 0,
          });
          setDailyLogId(dailyLogResponse.data.id);
        }

        // Fetch weight logs for the last 30 days
        const weightLogsResponse = await axios.get(
          `https://backend-vmt0.onrender.com/dailylogs/user/${userId}/last30days`
        );
        setWeightLogs(weightLogsResponse.data || []);

        // Fetch today's meals
        const mealsResponse = await axios.get(
          `https://backend-vmt0.onrender.com/meals/user/${userId}/date`,
          { params: { date: today } }
        );
        setMealId(mealsResponse.data.id);
        setMeals(mealsResponse.data || []);

        // Fetch recommendations based on profile and daily log
        await fetchRecommendations(profile, dailyLogResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchRecommendations = async (profileData, dailyLogData) => {
      try {
        if (!profileData) return;

        const remainingMacros = {
          Calories:
            profileData.profile.targetCalories -
            (dailyLogData?.caloriesConsumed || 0),
          FatContent:
            profileData.profile.targetFats - (dailyLogData?.fatsConsumed || 0),
          CarbohydrateContent:
            profileData.profile.targetCarbs -
            (dailyLogData?.carbsConsumed || 0),
          ProteinContent:
            profileData.profile.targetProteins -
            (dailyLogData?.proteinConsumed || 0),
        };

        const favoriteFoods = profileData.profile.favoriteItems
          ? profileData.profile.favoriteItems
              .split(",")
              .map((item) => item.trim())
          : [];

        // Generate recommendations
        const recommendationsResponse = await axios.post(
          `https://backend-vmt0.onrender.com/recommendation/generate`,
          {
            user_macros: remainingMacros,
            user_favorites: favoriteFoods,
          }
        );

        setRecipes(recommendationsResponse.data || []);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };

    fetchData();
  }, [userId, today, profile]);

  useEffect(() => {
    const randomQuote =
      quotesList[Math.floor(Math.random() * quotesList.length)];
    setQuote(randomQuote);
  }, [quotesList]);

  const macroData = profile
    ? [
        {
          label: "Calories",
          value: todaysLog.caloriesConsumed,
          target: profile.profile.targetCalories,
          color: "#ff6384",
        },
        {
          label: "Protein",
          value: todaysLog.proteinConsumed,
          target: profile.profile.targetProteins,
          color: "#36a2eb",
        },
        {
          label: "Carbs",
          value: todaysLog.carbsConsumed,
          target: profile.profile.targetCarbs,
          color: "#ffcd56",
        },
        {
          label: "Fats",
          value: todaysLog.fatsConsumed,
          target: profile.profile.targetFats,
          color: "#4bc0c0",
        },
      ]
    : [];

  const chartData = (value, target, color) => ({
    datasets: [
      {
        data: [value, target - value],
        backgroundColor: [color, "#e5e7eb"],
        borderWidth: 0,
        cutout: "70%",
      },
    ],
  });

  const weightData = {
    labels: weightLogs.map((log) => log.date),
    datasets: [
      {
        label: "Weight (kg)",
        data: weightLogs.map((log) => log.weight),
        fill: false,
        borderColor: "#3b82f6",
        tension: 0.1,
      },
    ],
  };

  const handleWeightSubmit = async () => {
    try {
      const weightResponse = await axios.get(
        `https://backend-vmt0.onrender.com/dailylogs/user/${userId}?date=${today}`
      );
      if (weightResponse.data) {
        const updatedLog = { ...weightResponse.data, weight: todayWeight };
        await axios.put(
          `https://backend-vmt0.onrender.com/dailylogs/${weightResponse.data.id}`,
          updatedLog
        );
      } else {
        await axios.post(
          `https://backend-vmt0.onrender.com/dailylogs/create?userId=${userId}`,
          { date: today, weight: todayWeight }
        );
      }
      await axios.put(`https://backend-vmt0.onrender.com/users/${userId}/weight`, null, {
        params: { weight: todayWeight },
      });
      window.location.reload();
    } catch (error) {
      console.error("Error handling weight data:", error);
    }
  };

  const calculateOverallProgress = () => {
    if (!profile) return 0;
    const { targetCalories, targetProteins, targetCarbs, targetFats } =
      profile.profile;
    const caloriesPercent = targetCalories
      ? (todaysLog.caloriesConsumed / targetCalories) * 100
      : 0;
    const proteinPercent = targetProteins
      ? (todaysLog.proteinConsumed / targetProteins) * 100
      : 0;
    const carbsPercent = targetCarbs
      ? (todaysLog.carbsConsumed / targetCarbs) * 100
      : 0;
    const fatsPercent = targetFats
      ? (todaysLog.fatsConsumed / targetFats) * 100
      : 0;
    return Math.min(
      Math.round(
        (caloriesPercent + proteinPercent + carbsPercent + fatsPercent) / 4
      ),
      100
    );
  };

  const overallProgressData = {
    datasets: [
      {
        data: [calculateOverallProgress(), 100 - calculateOverallProgress()],
        backgroundColor: ["#3b82f6", "#e5e7eb"],
        borderWidth: 0,
        cutout: "70%",
      },
    ],
  };

  const handleDeleteMeal = async (mealId) => {
    if (!dailyLogId) return;

    const mealToDelete = meals.find((meal) => meal.mealId === mealId);
    if (!mealToDelete) return;

    try {
      const response = await axios.delete(
        `https://backend-vmt0.onrender.com/dailylogs/${dailyLogId}/meals/${mealId}`
      );

      if (response.status === 200) {
        setMeals((prevMeals) =>
          prevMeals.filter((meal) => meal.mealId !== mealId)
        );
        setSelectedMeal(null);
      }
    } catch (error) {
      console.error(
        "Error deleting the meal from daily log:",
        error.response?.data || error.message || error
      );
    }
  };

  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768); // Mobile threshold
    handleResize(); // Check on component mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    axios
      .post("https://backend-vmt0.onrender.com/users/logout", {}, { withCredentials: true })
      .then(() => navigate("/login"))
      .catch((err) => console.error("Error during logout:", err));
  };

  return (
    <div className={` ${styles.dashboardContainer}`}>
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
        <div className={styles.backgroundLayer}>
          <main className={styles.mainContent}>
            <header className={styles.header}>
              <h1>Dashboard</h1>
            </header>
            <div className={`${styles.mainWidgets} row mx-auto `}>
              <div className={`${styles.fchld} col-md-8`}>
                <section className={`${styles.progressSection} mx-auto row`}>
                  <div className={`${styles.prg} col-auto col-md-8`}>
                    <div className={styles.circularProgressContainer}>
                      <Doughnut data={overallProgressData} />
                      <div className={styles.progressTextCenter}>
                        <span className={styles.progressText}>
                          {calculateOverallProgress()}%
                        </span>
                      </div>
                    </div>
                    <p className={styles.progressQuote}>{quote}</p>
                    <div className={styles.progressCharts}>
                      {macroData.map(({ label, value, target, color }) => (
                        <div className={styles.spiralChart} key={label}>
                          <Doughnut data={chartData(value, target, color)} />
                          <div className={styles.chartCenter}>
                            <span className={styles.percentage}>
                              {`${value.toFixed(1)} /${target.toFixed(1)}`}
                            </span>
                          </div>
                          <p className={styles.chartLabel}>{label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className={`${styles.todaysmeals} col-12 col-md-4`}>
                    <h3>Today’s Meals</h3>
                    {meals.length > 0 ? (
                      <ul
                        className={`${styles.mealList} ${styles.bar}`}
                        style={{ maxHeight: "200px", overflowY: "auto" }}
                      >
                        {meals.map((meal, index) => (
                          <li
                            key={meal.id || meal.mealId || index}
                            onClick={() => handleMealClick(meal)}
                            style={{ padding: "10px 0" }}
                          >
                            <strong>{meal.name}</strong> - {meal.totalCalories}{" "}
                            kcal
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className={styles.noMealsMessage}>
                        <p>Looks like your plate is empty! 🍽️</p>
                        <p>Why not add your first meal of the day?</p>
                      </div>
                    )}
                  </div>
                </section>
              </div>
              <div className={`${styles.poids} col-3`}>
                <section className={`${styles.weightSection} pb-0`}>
                  <h3>Weight Progress</h3>
                  <div className={styles.weightChart}>
                    <Line data={weightData} />
                  </div>
                  <p>Current weight: {profile ? profile.weight : "N/A"} Kg</p>
                  <button
                    className={styles.logButton}
                    onClick={handleShowWeightModal}
                  >
                    LOG TODAY'S WEIGHT
                  </button>
                </section>
              </div>
            </div>
            <div className={styles.suggestedRecipes}>
              <h6 className={styles.titleS}>
                Here are some meal suggestions tailored to your preferences and
                fitness goals:
              </h6>
              <SuggestedRecipes recipes={recipes} />
            </div>
            {selectedMeal && (
              <MealModal
                meal={selectedMeal}
                onClose={() => setSelectedMeal(null)}
                onDelete={handleDeleteMeal}
              />
            )}
          </main>
        </div>
      </div>
      <Modal show={showWeightModal} onHide={handleCloseWeightModal}>
        <Modal.Header closeButton>
          <Modal.Title>Record Your Weight for Today</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formWeight">
              <Form.Label>How much do you weigh today? (in kg)</Form.Label>
              <Form.Control
                type="number"
                value={todayWeight}
                onChange={(e) => setTodayWeight(e.target.value)}
                min="0"
                step="0.1"
                placeholder="e.g., 72.5"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseWeightModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleWeightSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Dashboard;
