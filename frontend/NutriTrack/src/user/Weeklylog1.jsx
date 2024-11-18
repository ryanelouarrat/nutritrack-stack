import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "../config/axiosConfig";
import { Circles } from "react-loader-spinner";

import styles from "../user/styles/Dashboard.module.css";

import leafImage from "../assets/leaf.svg";
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

const WeeklyLog = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [userId, setUserId] = useState(null);
  const [profile, setProfile] = useState(null);
  const [dailyLog, setDailyLog] = useState(null);
  const [mealsWithFoodItems, setMealsWithFoodItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("https://localhost:8080/users/me", {
          withCredentials: true,
        });
        const { id, ...profileData } = response.data;
        setUserId(id);
        setProfile(profileData);
      } catch (error) {
        console.error("Error fetching profile data", error);
        navigate("/login");
      }
    };
    fetchProfile();
  }, [navigate]);

  useEffect(() => {
    if (!userId) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const logResponse = await axios.get(
          `https://localhost:8080/dailylogs/user/${userId}`,
          {
            params: { date: selectedDate.toISOString().split("T")[0] },
            withCredentials: true,
          }
        );
        setDailyLog(logResponse.data);

        const mealsResponse = await axios.get(
          `https://localhost:8080/meals/user/${userId}/date`,
          {
            params: { date: selectedDate.toISOString().split("T")[0] },
            withCredentials: true,
          }
        );
        const meals = mealsResponse.data;

        const mealsWithItems = await Promise.all(
          meals.map(async (meal) => {
            const foodItemsResponse = await axios.get(
              `https://localhost:8080/meals/${meal.mealId}/fooditems`,
              { withCredentials: true }
            );
            return { ...meal, foodItems: foodItemsResponse.data };
          })
        );
        setMealsWithFoodItems(mealsWithItems);
      } catch (error) {
        console.error("Error fetching data", error);
        setDailyLog(null);
        setMealsWithFoodItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedDate, userId]);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768); // Mobile threshold
    handleResize(); // Check on component mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className={ ` ${styles.dashboardContainer}`}>
      {isMobile ? (
        <ResponsiveNavbar
          profile={profile}
          leafImage={leafImage}
          navigate={navigate}
          handleLogout={() => {
            axios
              .post(
                "https://localhost:8080/users/logout",
                {},
                { withCredentials: true }
              )
              .then(() => navigate("/login"))
              .catch((err) => console.error("Error during logout:", err));
          }}
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
              <li onClick={() => navigate("/dashboard")}>Dashboard</li>
              <li
                className={styles.active}
                onClick={() => navigate("/weekly-log")}
              >
                Weekly Log
              </li>
              <li onClick={() => navigate("/AddMeal")}>Add a Meal</li>
              <li onClick={() => navigate("/weightprogress")}>
                Weight Progress
              </li>
              <li onClick={() => navigate("/favorites")}>Favorite Meals</li>
              <li onClick={() => navigate("/accountsettings")}>Account</li>
            </ul>
          </nav>
          <button
            className={styles.logoutButton}
            onClick={() => {
              axios
                .post(
                  "https://localhost:8080/users/logout",
                  {},
                  { withCredentials: true }
                )
                .then(() => navigate("/login"))
                .catch((err) => console.error("Error during logout:", err));
            }}
          >
            Log Out
          </button>
        </aside>
      )}
      <div className={`${styles.mobileC} position-relative w-75 w-100`}>
        <div className={`w-100 ${styles.backgroundLayer}`}>
          <main className={styles.mainContent}>
          <div className="row">
  <div className="col-12 col-md-6">
    <Calendar
      onChange={setSelectedDate}
      value={selectedDate}
      maxDetail="month"
      minDetail="month"
    />
  </div>
  <div className="col-12 col-md-6">
    <h3 className="fs-4 mt-3">
      Bites and Delights on {selectedDate.toDateString()}! 🍽️
    </h3>
    {loading ? (
  <div className="d-flex justify-content-center align-items-center" style={{ height: "100px" }}>
    <Circles 
      height="80" 
      width="80" 
      color="#bce08a" 
      ariaLabel="spiral-loading" 
      visible={true} 
    />
  </div>
) : (
  <div className="daily-log-card">
    <div className="row justify-content-between">
      <div className="col-6">
        <div className={styles.macroCard}>
          <h5>Calories</h5>
          <p>
            {(dailyLog ? dailyLog.caloriesConsumed : 0).toFixed(2)} Kcal
          </p>
        </div>
      </div>
      <div className="col-6">
        <div className={styles.macroCard}>
          <h5>Protein</h5>
          <p>
            {(dailyLog ? dailyLog.proteinConsumed : 0).toFixed(2)} g
          </p>
        </div>
      </div>
    </div>
    <div className="row justify-content-between">
      <div className="col-6">
        <div className={styles.macroCard}>
          <h5>Carbohydrate</h5>
          <p>
            {(dailyLog ? dailyLog.carbsConsumed : 0).toFixed(2)} g
          </p>
        </div>
      </div>
      <div className="col-6">
        <div className={styles.macroCard}>
          <h5>Fats</h5>
          <p>{(dailyLog ? dailyLog.fatsConsumed : 0).toFixed(2)} g</p>
        </div>
      </div>
    </div>
    <h4>Meals:</h4>
    <div className={styles.mealsListContainer}>
      <ul className={styles.mealsList}>
        {mealsWithFoodItems && mealsWithFoodItems.length > 0 ? (
          mealsWithFoodItems.map((meal) => (
            <li key={meal.mealId} className={styles.mealItem}>
              <span
                role="img"
                aria-label="meal"
                className={styles.mealEmoji}
              >
                🍽️
              </span>
              {meal.name} -{" "}
              <span
                style={{ color: meal.isFavorite ? "green" : "gray" }}
              >
                {meal.isFavorite ? "❤️ Favorite" : "🖤 Not Favorite"}
              </span>
              <ul>
                {meal.foodItems && meal.foodItems.length > 0 ? (
                  meal.foodItems.map((foodItem) => (
                    <li key={foodItem.food_id}>
                      <span
                        role="img"
                        aria-label="food"
                        className={styles.foodEmoji}
                      >
                        🍴
                      </span>
                      {foodItem.name} ({foodItem.weight}g) -{" "}
                      <span>
                        Calories: {foodItem.calories || 0} kcal 🍔
                      </span>
                      , <span>Carbs: {foodItem.carbs || 0}g 🍞</span>,{" "}
                      <span>Proteins: {foodItem.proteins || 0}g 💪</span>,{" "}
                      <span>Fats: {foodItem.fats || 0}g 🥑</span>
                    </li>
                  ))
                ) : (
                  <li>No food items recorded for this meal.</li>
                )}
              </ul>
            </li>
          ))
        ) : (
          <li>No meals recorded for this date.</li>
        )}
      </ul>
    </div>
  </div>
)}
  </div>
</div>

          </main>
        </div>
      </div>
    </div>
  );
};

export default WeeklyLog;
