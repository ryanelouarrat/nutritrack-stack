import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ProgressBar, Modal, Button, Form } from "react-bootstrap";
import RecipeCard from "../food/RecipeCard"; // Import the RecipeCard component
import WeightProgress from "../food/WeightProgress"; // Assuming this component is already created

const DietTrackerLayout = () => {
  const [recipes, setRecipes] = useState([]);
  const [weightLogs, setWeightLogs] = useState([]);
  const [todaysLog, setTodaysLog] = useState({
    caloriesConsumed: 0,
    proteinConsumed: 0,
    carbsConsumed: 0,
    fatsConsumed: 0,
  });
  const [showModal, setShowModal] = useState(false);
  const [todayWeight, setTodayWeight] = useState(0);

  const today = new Date().toISOString().split("T")[0];
  const location = useLocation();
  const userId = location.state?.userId;
  const navigate = useNavigate();

  const goToFavorites = () => {
    navigate("/favorites", { state: { userId: userId } });
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `https://localhost:8080/users/${userId}`
        );
        setTodayWeight(response.data.weight || 0);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    const fetchWeightLogs = async () => {
      try {
        const response = await axios.get(
          `https://localhost:8080/dailylogs/user/${userId}/last30days`
        );
        setWeightLogs(response.data);
      } catch (error) {
        console.error("Error fetching weight logs:", error);
      }
    };

    const fetchDailyLog = async () => {
      try {
        const response = await axios.get(
          `https://localhost:8080/dailylogs/user/${userId}?date=${today}`
        );
        const dailyLog = response.data;
        if (dailyLog) {
          setTodaysLog({
            caloriesConsumed: dailyLog.caloriesConsumed || 0,
            proteinConsumed: dailyLog.proteinConsumed || 0,
            carbsConsumed: dailyLog.carbsConsumed || 0,
            fatsConsumed: dailyLog.fatsConsumed || 0,
          });
        }
      } catch (error) {
        console.error("Error fetching daily log data:", error);
      }
    };

    const fetchRecommendations = async () => {
      try {
        // Fetch the user profile data (target macros)
        const userProfileResponse = await axios.get(
          `https://localhost:8080/users/${userId}`
        );
        const profile = userProfileResponse.data.profile;

        // Fetch today's daily log data (consumed macros)
        const dailyLogResponse = await axios.get(
          `https://localhost:8080/dailylogs/user/${userId}?date=${today}`
        );
        const dailyLog = dailyLogResponse.data;

        // Fetch user's favorite food items
        const favoriteMealsResponse = await axios.get(
          `https://localhost:8080/meals/favorites/${userId}`
        );
        const favoriteMeals = favoriteMealsResponse.data;

        // Extract food items from favorite meals
        const favoriteFoods = favoriteMeals.flatMap((meal) =>
          meal.foodItems.map((food) => food.name)
        );

        // Calculate remaining macros
        const remainingMacros = {
          Calories: profile.targetCalories - (dailyLog.caloriesConsumed || 0),
          FatContent: profile.targetFats - (dailyLog.fatsConsumed || 0),
          CarbohydrateContent:
            profile.targetCarbs - (dailyLog.carbsConsumed || 0),
          ProteinContent:
            profile.targetProteins - (dailyLog.proteinConsumed || 0),
        };

        // Send the request to the recommendation service with real user data
        const response = await axios.post(
          "https://localhost:8080/recommendation/generate",
          {
            user_macros: remainingMacros,
            user_favorites: favoriteFoods, // Use actual favorite food items
          }
        );

        const sortedRecipes = response.data.sort((a, b) => (b.images ? 1 : -1)); // Prioritize recipes with images
        setRecipes(sortedRecipes);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };

    if (userId) {
      fetchUserData();
      fetchWeightLogs();
      fetchDailyLog();
      fetchRecommendations();
    }
  }, [userId]);

  if (!recipes) {
    return <div>Loading...</div>;
  }

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleWeightSubmit = async () => {
    try {
      const weightResponse = await axios.get(
        `https://localhost:8080/dailylogs/user/${userId}?date=${today}`
      );
      if (weightResponse.data) {
        let dailyLogId = weightResponse.data.id;
        const updatedLog = { ...weightResponse.data, weight: todayWeight };
        await axios.put(
          `https://localhost:8080/dailylogs/${dailyLogId}`,
          updatedLog
        );
      } else {
        const newLog = { userId: userId, date: today, weight: todayWeight };
        await axios.post(
          `https://localhost:8080/dailylogs/create?userId=${userId}`,
          newLog
        );
      }
      await axios.put(`https://localhost:8080/users/${userId}/weight`, null, {
        params: { weight: todayWeight },
      });
      setShowModal(false);
      window.location.reload();
    } catch (error) {
      console.error("Error handling weight data:", error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 bg-light p-3">
          <div className="text-center mb-3">
            <div
              className="rounded-circle bg-secondary mx-auto"
              style={{ width: "100px", height: "100px" }}
            ></div>
            <h5 className="mt-2">User Name</h5>{" "}
            {/* Replace with dynamic user name */}
          </div>
          <div className="list-group">
            <button className="list-group-item list-group-item-action">
              Today's Targets
            </button>
            <button
              className="list-group-item list-group-item-action"
              onClick={() =>
                navigate("/AddMeal", { state: { userId: userId } })
              }
            >
              Add a Meal
            </button>
            <button
              className="list-group-item list-group-item-action"
              onClick={handleShowModal}
            >
              Log Today's Weight
            </button>
            <button
              className="list-group-item list-group-item-action"
              onClick={() => navigate(`/weekly-log/${userId}`)}
            >
              Weekly Log
            </button>
            <button className="list-group-item list-group-item-action">
              Recipes
            </button>
            <button className="list-group-item list-group-item-action">
              <button onClick={goToFavorites}>View Favorite Meals</button>
            </button>
            <button className="list-group-item list-group-item-action">
              Settings
            </button>
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
          </div>
        </div>

        <div className="col-md-9 p-3">
          <div className="row mb-3">
            <div className="col">
              <blockquote className="blockquote">
                <p className="mb-0">
                  "Consistency is key to achieving your goals!"
                </p>
              </blockquote>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-8">
              <div className="card">
                <div className="card-header">
                  <h5 className="mb-0">Today's Targets</h5>
                </div>
                <div className="card-body">
                  <p>
                    <strong>Calories:</strong> {todaysLog.caloriesConsumed}/2500
                    kcal
                  </p>
                  <ProgressBar
                    now={(todaysLog.caloriesConsumed / 2500) * 100}
                    label={`${(
                      (todaysLog.caloriesConsumed / 2500) *
                      100
                    ).toFixed(0)}%`}
                  />

                  <p>
                    <strong>Proteins:</strong> {todaysLog.proteinConsumed}/150 g
                  </p>
                  <ProgressBar
                    now={(todaysLog.proteinConsumed / 150) * 100}
                    label={`${((todaysLog.proteinConsumed / 150) * 100).toFixed(
                      0
                    )}%`}
                  />

                  <p>
                    <strong>Carbohydrates:</strong> {todaysLog.carbsConsumed}
                    /250 g
                  </p>
                  <ProgressBar
                    now={(todaysLog.carbsConsumed / 250) * 100}
                    label={`${((todaysLog.carbsConsumed / 250) * 100).toFixed(
                      0
                    )}%`}
                  />

                  <p>
                    <strong>Fats:</strong> {todaysLog.fatsConsumed}/70 g
                  </p>
                  <ProgressBar
                    now={(todaysLog.fatsConsumed / 70) * 100}
                    label={`${((todaysLog.fatsConsumed / 70) * 100).toFixed(
                      0
                    )}%`}
                  />
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card">
                <div className="card-header">
                  <h5 className="mb-0">Weight Progress</h5>
                </div>
                <div className="card-body">
                  <p>
                    <strong>Current Weight:</strong>{" "}
                    {todayWeight || "Loading..."} kg
                  </p>
                  <button className="btn btn-primary" onClick={handleShowModal}>
                    Log Today's Weight
                  </button>
                </div>
              </div>
            </div>
            <WeightProgress weightLogs={weightLogs} />
          </div>

          <div className="row mb-3">
            <div className="col">
              <h5>Recommended Recipes</h5>
              <div className="d-flex flex-wrap">
                {recipes.map((recipe) => (
                  <RecipeCard key={recipe.name} recipe={recipe} />
                ))}
              </div>
            </div>
          </div>

          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Log Today's Weight</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formWeight">
                  <Form.Label>Enter Today's Weight (kg):</Form.Label>
                  <Form.Control
                    type="number"
                    value={todayWeight}
                    onChange={(e) => setTodayWeight(e.target.value)}
                    min="0"
                    step="0.1"
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
              <Button variant="primary" onClick={handleWeightSubmit}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default DietTrackerLayout;
