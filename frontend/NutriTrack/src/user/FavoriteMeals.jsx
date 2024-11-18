// src/user/FavoriteMeals.jsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../config/axiosConfig";

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
const FavoriteMeals = () => {
  const navigate = useNavigate();
  const [favoriteMeals, setFavoriteMeals] = useState([]);
  const [profile, setProfile] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768); // Mobile threshold
    handleResize(); // Check on component mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // Fetch user profile and favorite meals
  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileResponse = await axios.get(
          "https://localhost:8080/users/me",
          {
            withCredentials: true,
          }
        );
        setProfile(profileResponse.data);
        const userId = profileResponse.data.id;

        const response = await axios.get(
          `https://localhost:8080/meals/favorites/${userId}`
        );
        setFavoriteMeals(response.data || []);
      } catch (error) {
        console.error("Error fetching favorite meals", error);
        if (error.response?.status === 403) {
          navigate("/login");
        }
      }
    };

    fetchData();
  }, [navigate]);
  const handleLogout = () => {
    axios
      .post("https://localhost:8080/users/logout", {}, { withCredentials: true })
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
        <div className={`${styles.backgroundLayer} ${styles.fav}`}>
          <div className={`${styles.mainContent}`}>
            <div className="container mt-4">
              <div className="row">
                <div className="col-12">
                  <h3>Your Favorite Meals</h3>
                  <p className={styles.txtF}>
                    Here are some of your favorite meals to enjoy and add to
                    your daily logs.
                  </p>
                </div>

                <div className="col-12 mt-3">
                  {favoriteMeals.length > 0 ? (
                    <div
                     
                      className={styles.mealList}
                    >
                      <ul className={styles.mealList}>
                        {favoriteMeals.map((meal) => (
                          <li key={meal.mealId} className={styles.mealItem}>
                            <span
                              role="img"
                              aria-label="meal"
                              className={styles.mealEmoji}
                            >
                              🍲
                            </span>
                            <strong>{meal.name}</strong> -{" "}
                            {new Date(meal.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                            <ul>
                              {meal.foodItems.map((foodItem) => (
                                <li key={foodItem.food_id}>
                                  {foodItem.name} ({foodItem.weight}g) -
                                  Calories: {foodItem.calories || 0} kcal,
                                  Carbs: {foodItem.carbs || 0}g, Proteins:{" "}
                                  {foodItem.proteins || 0}g, Fats:{" "}
                                  {foodItem.fats || 0}g
                                </li>
                              ))}
                            </ul>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p>
                      No favorite meals recorded yet. Start adding some to your
                      list!
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoriteMeals;
