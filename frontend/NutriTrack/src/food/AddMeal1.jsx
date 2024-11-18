import React, { useState,useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../config/axiosConfig";
import axios1 from "axios";

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
  const initialUserId = localStorage.getItem("userId"); // Get userId directly from localStorage

  // State Variables
  const [userId, setUserId] = useState(initialUserId);
  const [profile, setProfile] = useState(null);
  const [mealCategory, setMealCategory] = useState("");
  const [query, setQuery] = useState("");
  const [foodItems, setFoodItems] = useState([]);
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteMeals, setFavoriteMeals] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownVisible(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  // Detect screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768); // Mobile threshold
    handleResize(); // Check on component mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // Fetch Profile Data
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get("https://backend-vmt0.onrender.com/users/me", {
          withCredentials: true,
        });
        const { id, ...profileData } = response.data;
        setUserId(id); // Set the userId from the response
        setProfile(profileData); // Set profile data excluding userId
      } catch (error) {
        console.error("Error fetching profile data", error);
        navigate("/login");
      }
    };

    fetchProfileData();
  }, [navigate]);

  // Fetch Favorite Meals
  useEffect(() => {
    const fetchFavoriteMeals = async () => {
      try {
        const response = await axios.get(
          `https://backend-vmt0.onrender.com/meals/favorites/${userId}`
        );
        setFavoriteMeals(response.data);
      } catch (error) {
        console.error("Error fetching favorite meals", error);
      }
    };

    if (userId) {
      fetchFavoriteMeals();
    }
  }, [userId]);

  // Fetch Favorite Meals
  useEffect(() => {
    const fetchFavoriteMeals = async () => {
      try {
        const response = await axios.get(
          `https://backend-vmt0.onrender.com/meals/favorites/${userId}`
        );
        setFavoriteMeals(response.data);
      } catch (error) {
        console.error("Error fetching favorite meals", error);
      }
    };

    if (userId) {
      fetchFavoriteMeals();
    }
  }, [userId]);

  // Handle Search Input
  const handleSearch = async (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);

    if (searchQuery.length > 2) {
      try {
        const response = await axios1.get(
          `https://trackapi.nutritionix.com/v2/search/instant/?query=${searchQuery}`,
          {
            headers: {
              "Content-Type": "application/json",
              "x-app-id": "5f12ccfa",
              "x-app-key": "694a59a56b4b4b27e840bdc1656f7674",
            },
          }
        );
        setFoodItems(response.data.common);
      } catch (error) {
        console.error("Error fetching food data", error);
      }
    } else {
      setFoodItems([]);
    }
  };

  // Handle Favorite Meal Selection
  const handleFavoriteMealSelect = async (mealId) => {
    if (!mealId) return;

    try {
      const response = await axios.get(
        `https://backend-vmt0.onrender.com/meals/${mealId}/fooditems`
      );
      const fetchedFoodItems = response.data;

      const formattedFoodItems = fetchedFoodItems.map((foodItem) => ({
        food_name: foodItem.name,
        nf_calories: foodItem.calories,
        nf_protein: foodItem.proteins,
        nf_total_carbohydrate: foodItem.carbs,
        nf_total_fat: foodItem.fats,
        serving_weight_grams: foodItem.weight,
        original_nutrition: {
          nf_calories: foodItem.calories,
          nf_protein: foodItem.proteins,
          nf_total_carbohydrate: foodItem.carbs,
          nf_total_fat: foodItem.fats,
          serving_weight_grams: foodItem.weight,
        },
        serving_qty_input: foodItem.weight,
        serving_unit_input: "g",
      }));

      const uniqueFoodItems = formattedFoodItems.filter(
        (newItem) =>
          !selectedFoods.some(
            (existingItem) => existingItem.food_name === newItem.food_name
          )
      );

      setSelectedFoods((prevFoods) => [...prevFoods, ...uniqueFoodItems]);

      // Reset Favorite Meal Selection
      document.getElementById("favoriteMeals").selectedIndex = 0;
    } catch (error) {
      console.error("Error fetching food items for favorite meal", error);
    }
  };

  // Handle Food Selection from Search
  const handleFoodSelect = async (foodItem) => {
    try {
      const response = await axios1.post(
        "https://trackapi.nutritionix.com/v2/natural/nutrients",
        { query: foodItem.food_name },
        {
          headers: {
            "Content-Type": "application/json",
            "x-app-id": "5f12ccfa",
            "x-app-key": "694a59a56b4b4b27e840bdc1656f7674",
          },
        }
      );

      const foodData = response.data.foods[0];
      foodData.serving_qty_input = foodData.serving_qty;
      foodData.serving_unit_input = foodData.serving_unit;
      foodData.original_nutrition = {
        nf_calories: foodData.nf_calories,
        nf_protein: foodData.nf_protein,
        nf_total_carbohydrate: foodData.nf_total_carbohydrate,
        nf_total_fat: foodData.nf_total_fat,
        serving_weight_grams: foodData.serving_weight_grams,
      };

      setSelectedFoods((prevFoods) => [...prevFoods, foodData]);
      setQuery("");
      setFoodItems([]);
    } catch (error) {
      console.error("Error fetching nutrition data", error);
    }
  };

  // Handle Serving Size Change
  const handleServingChange = (index, field, value) => {
    const updatedFoods = [...selectedFoods];
    const foodItem = updatedFoods[index];

    if (field === "serving_weight_grams") {
      const parsedValue = parseFloat(value);
      foodItem.serving_weight_grams =
        !isNaN(parsedValue) && parsedValue > 0 ? parsedValue : 1;
    }

    const { original_nutrition: original } = foodItem;

    const originalServingWeight = parseFloat(original.serving_weight_grams);
    if (isNaN(originalServingWeight) || originalServingWeight <= 0) {
      console.error("Invalid original serving weight:", originalServingWeight);
      return;
    }

    const factor = foodItem.serving_weight_grams / originalServingWeight;

    foodItem.nf_calories = isNaN(original.nf_calories)
      ? "0"
      : (original.nf_calories * factor).toFixed(2);
    foodItem.nf_protein = isNaN(original.nf_protein)
      ? "0"
      : (original.nf_protein * factor).toFixed(2);
    foodItem.nf_total_carbohydrate = isNaN(original.nf_total_carbohydrate)
      ? "0"
      : (original.nf_total_carbohydrate * factor).toFixed(2);
    foodItem.nf_total_fat = isNaN(original.nf_total_fat)
      ? "0"
      : (original.nf_total_fat * factor).toFixed(2);

    setSelectedFoods(updatedFoods);
  };

  // Handle Food Deletion
  const handleFoodDelete = (index) => {
    setSelectedFoods((prevFoods) => prevFoods.filter((_, i) => i !== index));
  };

  // Handle Form Submission
  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!mealCategory) {
      alert("Please select a meal category.");
      return;
    }

    const mealData = {
      name: mealCategory,
      date: new Date(),
      user: { id: userId },
      isFavorite,
    };

    try {
      // Create the meal
      const mealResponse = await axios.post(
        "https://backend-vmt0.onrender.com/meals",
        mealData
      );
      const createdMeal = mealResponse.data;

      // Prepare food items
      const foodItemsData = selectedFoods.map((foodItem) => ({
        name: foodItem.food_name,
        calories: foodItem.nf_calories,
        proteins: foodItem.nf_protein,
        carbs: foodItem.nf_total_carbohydrate,
        fats: foodItem.nf_total_fat,
        weight: foodItem.serving_weight_grams,
        meal: { mealId: createdMeal.mealId },
      }));

      // Create food items
      await Promise.all(
        foodItemsData.map((foodItemData) =>
          axios.post("https://backend-vmt0.onrender.com/fooditems", foodItemData)
        )
      );

      const dateString = new Date().toISOString().split("T")[0];
      console.log(dateString);
      let dailyLogId;

      // Fetch or Create Daily Log
      const dailyLogResponse = await axios.get(
        `https://backend-vmt0.onrender.com/dailylogs/user/${userId}?date=${dateString}`
      );

      if (dailyLogResponse.data && dailyLogResponse.data.id) {
        console.log("log found");
        // Update existing daily log
        const existingLog = dailyLogResponse.data;
        dailyLogId = existingLog.id;

        const updatedLog = {
          ...existingLog,
          caloriesConsumed: parseFloat(
            (
              existingLog.caloriesConsumed +
              foodItemsData.reduce(
                (sum, item) => sum + parseFloat(item.calories),
                0
              )
            ).toFixed(2)
          ),
          proteinConsumed: parseFloat(
            (
              existingLog.proteinConsumed +
              foodItemsData.reduce(
                (sum, item) => sum + parseFloat(item.proteins),
                0
              )
            ).toFixed(2)
          ),
          carbsConsumed: parseFloat(
            (
              existingLog.carbsConsumed +
              foodItemsData.reduce(
                (sum, item) => sum + parseFloat(item.carbs),
                0
              )
            ).toFixed(2)
          ),
          fatsConsumed: parseFloat(
            (
              existingLog.fatsConsumed +
              foodItemsData.reduce(
                (sum, item) => sum + parseFloat(item.fats),
                0
              )
            ).toFixed(2)
          ),
        };

        await axios.put(
          `https://backend-vmt0.onrender.com/dailylogs/${dailyLogId}`,
          updatedLog
        );
      } else {
        // Create new daily log
        console.log("creating log");
        const newDailyLog = {
          date: dateString,
          user: { id: userId },
          caloriesConsumed: parseFloat(
            foodItemsData.reduce(
              (sum, item) => sum + parseFloat(item.calories),
              0
            )
          ),
          proteinConsumed: parseFloat(
            foodItemsData.reduce(
              (sum, item) => sum + parseFloat(item.proteins),
              0
            )
          ),
          carbsConsumed: parseFloat(
            foodItemsData.reduce((sum, item) => sum + parseFloat(item.carbs), 0)
          ),
          fatsConsumed: parseFloat(
            foodItemsData.reduce((sum, item) => sum + parseFloat(item.fats), 0)
          ),
        };

        const createdLogResponse = await axios.post(
          `https://backend-vmt0.onrender.com/dailylogs/create?userId=${userId}`,
          newDailyLog
        );

        dailyLogId = createdLogResponse.data.id;
      }

      // Associate meal with daily log
      await axios.post(`https://backend-vmt0.onrender.com/dailylogs/${dailyLogId}/meals`, [
        createdMeal.mealId,
      ]);

      // Reset Form
      setSelectedFoods([]);
      setMealCategory("");
      setIsFavorite(false);
    } catch (error) {
      console.error("Error saving meal, food items, or logging meal", error);
    }

    // Navigate back to dashboard
    navigate("/dashboard");
  };

  const totalMacros = selectedFoods.reduce(
    (totals, foodItem) => ({
      calories: totals.calories + parseFloat(foodItem.nf_calories || 0),
      protein: totals.protein + parseFloat(foodItem.nf_protein || 0),
      carbs: totals.carbs + parseFloat(foodItem.nf_total_carbohydrate || 0),
      fats: totals.fats + parseFloat(foodItem.nf_total_fat || 0),
    }),
    { calories: 0, protein: 0, carbs: 0, fats: 0 }
  );
  return (
    <div className={styles.dashboardContainer}>
      {isMobile ? (
        <ResponsiveNavbar
          profile={profile}
          leafImage={leafImage}
          navigate={navigate}
          handleLogout={() => {
            axios
              .post(
                "https://backend-vmt0.onrender.com/users/logout",
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
                  "https://backend-vmt0.onrender.com/users/logout",
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

      <div className="position-relative w-75 w-100">
        <div className={styles.backgroundLayer}>
          <main className={styles.mainContent}>
            <header className={`${styles.header} mb-0`}>
              <h1>Got a new culinary masterpiece? Log that meal!</h1>
            </header>

            <div className="container mt-4">
              <form
                className="row justify-content-between"
                onSubmit={handleSubmit}
              >
                {/* Left Column */}
                <div
                  className={`col-12 py-3 mb-2 col-md-6  ${styles.mobileFullHeight}`}
                >
                  {" "}
                  {/* Food Search */}
                  <div className="form-group mt-0" ref={dropdownRef}>
      <label htmlFor="foodSearch">Search for a Food Item</label>
      <input
        type="text"
        className="form-control"
        id="foodSearch"
        placeholder="Enter food name"
        value={query}
        onChange={handleSearch}
        onFocus={() => setIsDropdownVisible(true)}
      />
      {isDropdownVisible && foodItems.length > 0 && (
        <div className={styles.selection}>
          <ul
            style={{
              listStyleType: "none",
              padding: 0,
              margin: 0,
            }}
          >
            {foodItems.map((item) => (
              <li
                key={item.food_name}
                onClick={() => handleFoodSelect(item)}
                style={{
                  cursor: "pointer",
                  background: "#ffffff",
                  borderRadius: "8px",
                  padding: "10px",
                  marginBottom: "8px",
                  boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.02)";
                  e.currentTarget.style.boxShadow =
                    "0px 4px 8px rgba(0, 0, 0, 0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0px 2px 6px rgba(0, 0, 0, 0.1)";
                }}
              >
                {item.photo?.thumb && (
                  <img
                    src={item.photo.thumb}
                    alt={item.food_name}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "5px",
                      marginRight: "10px",
                    }}
                  />
                )}
                <div>
                  <strong style={{ fontSize: "0.9em", color: "#333" }}>
                    {item.food_name}
                  </strong>
                  <br />
                  <small style={{ color: "#666" }}>
                    {item.tags?.item || "N/A"}
                  </small>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
                  {/* Favorite Meals Selection */}
                  <div className="form-group mt-3">
                    <label htmlFor="favoriteMeals">
                      Select from Favorite Meals
                    </label>
                    <select
                      className={`${styles.favoriteInput}`}
                      id="favoriteMeals"
                      onChange={(e) => handleFavoriteMealSelect(e.target.value)}
                    >
                      <option value="">Choose a Favorite Meal</option>
                      {favoriteMeals.map((meal) => (
                        <option key={meal.mealId} value={meal.mealId}>
                          <strong>{meal.name}</strong> -{" "}
                          {new Date(meal.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* Search Results */}
                  {/* Selected Foods */}
                  <h5 className={styles.h5title}>Selected Foods:</h5>
                  <div
                    className={`${styles.selectedFood}`}
                    style={{
                      maxHeight: "300px",
                      overflowY: "auto",
                      padding: "15px",
                      borderRadius: "10px",
                      background: "#f9f9f9",
                      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    {selectedFoods.length > 0 ? (
                      <ul className={`${styles.ulFood} list-group`}>
                        {selectedFoods.map((foodItem, index) => (
                          <li
                            key={`${foodItem.food_name}-${index}`}
                            className="position-relative"
                            style={{
                              padding: "15px",
                              marginBottom: "10px",
                              display: "flex",
                              alignItems: "center",
                              backgroundColor: "#fff",
                              borderRadius: "8px",
                              boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.05)",
                              transition: "transform 0.2s",
                            }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.transform = "scale(1.02)")
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.transform = "scale(1)")
                            }
                          >
                            <button
                              type="button"
                              className="btn-close position-absolute top-0 end-0"
                              aria-label="Remove"
                              onClick={() => handleFoodDelete(index)}
                              style={{ fontSize: "12px", opacity: 0.8 }}
                            ></button>
                            <div style={{ flex: 1 }}>
                              <h5 style={{ margin: 0, color: "#333" }}>
                                {foodItem.food_name} 🍽️
                              </h5>
                              <div style={{ fontSize: "14px", color: "#666" }}>
                                <span>
                                  🔥 Calories: {foodItem.nf_calories} kcal
                                </span>{" "}
                                <br />
                                <span>
                                  💪 Protein: {foodItem.nf_protein} g
                                </span>{" "}
                                <br />
                                <span>
                                  🥖 Carbs: {foodItem.nf_total_carbohydrate} g
                                </span>{" "}
                                <br />
                                <span>🧈 Fats: {foodItem.nf_total_fat} g</span>
                              </div>
                            </div>
                            <div
                              style={{
                                marginLeft: "15px",
                                textAlign: "center",
                                color: "#666",
                              }}
                            >
                              <small style={{ fontWeight: "bold" }}>
                                Serving Size:
                              </small>{" "}
                              <br />
                              <input
                                type="number"
                                value={foodItem.serving_weight_grams}
                                onChange={(e) =>
                                  handleServingChange(
                                    index,
                                    "serving_weight_grams",
                                    e.target.value
                                  )
                                }
                                style={{
                                  width: "60px",
                                  padding: "5px",
                                  fontSize: "14px",
                                  textAlign: "center",
                                  marginTop: "8px",
                                  borderRadius: "4px",
                                  border: "1px solid #ddd",
                                }}
                              />
                              <small> g</small>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p
                        style={{
                          textAlign: "center",
                          color: "#888",
                          padding: "20px 0",
                        }}
                      >
                        🍽️ Start adding some food items to your list! 💪
                      </p>
                    )}
                  </div>
                  {/* Submit and Favorite Buttons */}
                  <div className="d-flex justify-content-between align-items-center mt-2 d-none d-md-flex">
                    <button type="submit" className="btn btn-primary">
                      Add Meal
                    </button>
                    <button
                      type="button"
                      style={{
                        width: "10%",
                        display: "inline-block",
                        backgroundColor: isFavorite ? "#007bff" : "#f8f9fa",
                        border: "none",
                        color: isFavorite ? "#fff" : "#007bff",
                        textAlign: "center",
                        padding: "8px",
                        borderRadius: "5px",
                        cursor: "pointer",
                        marginLeft: "5px",
                        transition: "background-color 0.3s ease",
                      }}
                      onClick={() => setIsFavorite(!isFavorite)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill={isFavorite ? "#fff" : "#007bff"}
                      >
                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Right Column */}
                <div className={`col-12 col-md-6  ${styles.mobileFullHeight}`}>
                  {/* Macro Nutrients Display */}
                  <div>
                    {/* Macro Summary */}
                    <div className="row justify-content-between">
                      <div className="col-6">
                        <div className={styles.macroCard}>
                          <h5>Calories</h5>
                          <p>{totalMacros.calories.toFixed(2)} Kcal</p>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className={styles.macroCard}>
                          <h5>Protein</h5>
                          <p>{totalMacros.protein.toFixed(2)} g</p>
                        </div>
                      </div>
                    </div>
                    <div className="row justify-content-between">
                      <div className="col-6">
                        <div className={styles.macroCard}>
                          <h5>Carbohydrate</h5>
                          <p>{totalMacros.carbs.toFixed(2)} g</p>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className={styles.macroCard}>
                          <h5>Fats</h5>
                          <p>{totalMacros.fats.toFixed(2)} g</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Meal Category Selection */}
                  <div className="form-group mt-3">
                    <label>Select Meal Category</label>
                    <div className={styles.mealCategoryContainer}>
                      {["breakfast", "lunch", "dinner", "snack"].map(
                        (category) => (
                          <div
                            key={category}
                            className={`${styles.mealCategory} ${
                              mealCategory === category ? styles.active : ""
                            }`}
                            onClick={() => setMealCategory(category)}
                          >
                            <span
                              role="img"
                              aria-label={
                                category.charAt(0).toUpperCase() +
                                category.slice(1)
                              }
                              className={styles.emojiIcon}
                            >
                              {category === "breakfast" && "🥐"}
                              {category === "lunch" && "🍔"}
                              {category === "dinner" && "🥗"}
                              {category === "snack" && "🥨"}
                            </span>
                            <p>
                              {category.charAt(0).toUpperCase() +
                                category.slice(1)}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-center mt-4 mb-4 d-md-none">
                  <button type="submit" className="btn btn-primary w-100">
                    Add Meal
                  </button>
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default WeeklyLog;
