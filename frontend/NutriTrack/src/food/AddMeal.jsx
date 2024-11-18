import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const MealForm = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the location object
  const initialUserId = location.state?.userId; // Access userId from state
  const [userIdr, setUserId] = useState(initialUserId);
  console.log(userIdr);
  const [mealCategory, setMealCategory] = useState("");
  const [query, setQuery] = useState("");
  const [foodItems, setFoodItems] = useState([]);
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteMeals, setFavoriteMeals] = useState([]);

  useEffect(() => {
    const fetchFavoriteMeals = async () => {
      try {
        const response = await axios.get(
          `https://localhost:8080/meals/favorites/${userIdr}`
        );
        setFavoriteMeals(response.data);
      } catch (error) {
        console.error("Error fetching favorite meals", error);
      }
    };

    fetchFavoriteMeals();
  }, [userIdr]);

  const handleSearch = async (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);

    if (searchQuery.length > 2) {
      try {
        const response = await axios.get(
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
    }
  };
  const handleFavoriteMealSelect = async (mealId) => {
    if (!mealId) return;

    try {
      // Fetch the food items associated with the selected favorite meal
      const response = await axios.get(
        `https://localhost:8080/meals/${mealId}/fooditems`
      );
      const foodItems = response.data;

      // Convert the food items to match the format of selectedFoods
      const formattedFoodItems = foodItems.map((foodItem) => ({
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
        serving_unit_input: "g", // Assuming grams as the unit
      }));

      // Filter out duplicates
      const uniqueFoodItems = formattedFoodItems.filter(
        (newItem) =>
          !selectedFoods.some(
            (existingItem) => existingItem.food_name === newItem.food_name
          )
      );

      // Add the selected favorite meal's food items to selectedFoods
      setSelectedFoods((prevFoods) => [...prevFoods, ...uniqueFoodItems]);

      // Clear the favorite meal selection
      document.getElementById("favoriteMeals").selectedIndex = 0;
    } catch (error) {
      console.error("Error fetching food items for favorite meal", error);
    }
  };

  const handleFoodSelect = async (foodItem) => {
    try {
      const response = await axios.post(
        "https://trackapi.nutritionix.com/v2/natural/nutrients",
        {
          query: foodItem.food_name,
        },
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
      setSelectedFoods([...selectedFoods, foodData]);
      setQuery("");
      setFoodItems([]);
    } catch (error) {
      console.error("Error fetching nutrition data", error);
    }
  };
  const handleServingChange = (index, field, value) => {
    const updatedFoods = [...selectedFoods];
    const foodItem = updatedFoods[index];

    if (field === "serving_weight_grams") {
      const parsedValue = parseFloat(value);
      foodItem.serving_weight_grams =
        !isNaN(parsedValue) && parsedValue > 0 ? parsedValue : 1;
    }

    const originalNutrients = foodItem.original_nutrition;

    // Ensure the original serving weight is a valid number greater than 0
    console.log(foodItem.original_nutrition);
    const originalServingWeight = parseFloat(
      originalNutrients.serving_weight_grams
    );
    if (isNaN(originalServingWeight) || originalServingWeight <= 0) {
      console.error("Invalid original serving weight:", originalServingWeight);
      return;
    }

    const factor = foodItem.serving_weight_grams / originalServingWeight;

    foodItem.nf_calories = isNaN(originalNutrients.nf_calories)
      ? "0"
      : (originalNutrients.nf_calories * factor).toFixed(2);
    foodItem.nf_protein = isNaN(originalNutrients.nf_protein)
      ? "0"
      : (originalNutrients.nf_protein * factor).toFixed(2);
    foodItem.nf_total_carbohydrate = isNaN(
      originalNutrients.nf_total_carbohydrate
    )
      ? "0"
      : (originalNutrients.nf_total_carbohydrate * factor).toFixed(2);
    foodItem.nf_total_fat = isNaN(originalNutrients.nf_total_fat)
      ? "0"
      : (originalNutrients.nf_total_fat * factor).toFixed(2);

    setSelectedFoods(updatedFoods);
  };

  const handleFoodDelete = (index) => {
    const updatedFoods = selectedFoods.filter((_, i) => i !== index);
    setSelectedFoods(updatedFoods);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const mealData = {
      name: mealCategory,
      date: new Date(),
      user: { id: userIdr },
      isFavorite: isFavorite,
    };

    try {
      // Create the meal
      const mealResponse = await axios.post(
        "https://localhost:8080/meals",
        mealData
      );
      const createdMeal = mealResponse.data;

      // Prepare food items associated with the created meal
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
          axios.post("https://localhost:8080/fooditems", foodItemData)
        )
      );

      const dateString = new Date().toISOString().split("T")[0];
      let dailyLogId;
      let updatedLog;

      // Fetch daily log by userId and date
      const dailyLogResponse = await axios.get(
        `https://localhost:8080/dailylogs/user/${userIdr}?date=${dateString}`
      );

      if (dailyLogResponse.data && dailyLogResponse.data.id) {
        // If daily log exists, update it
        const existingLog = dailyLogResponse.data;
        dailyLogId = existingLog.id;

        // Add new nutrients to the existing values
        updatedLog = {
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

        // Update the existing daily log with the new nutrients
        await axios.put(
          `https://localhost:8080/dailylogs/${dailyLogId}`,
          updatedLog
        );
      } else {
        // If daily log does not exist, create a new one
        const newDailyLog = {
          date: dateString,
          user: { id: userIdr }, // Use embedded user object
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
          `https://localhost:8080/dailylogs/create?userId=${userIdr}`,
          newDailyLog
        );

        dailyLogId = createdLogResponse.data.id;
      }

      // Log the meal into the DailyLogs
      await axios.post(`https://localhost:8080/dailylogs/${dailyLogId}/meals`, [
        createdMeal.mealId,
      ]);

      // Reset the form after success
      setSelectedFoods([]);
      setMealCategory("");
    } catch (error) {
      console.error("Error saving meal, food items, or logging meal", error);
    }

    // Navigate back to dashboard
    navigate("/dashboard", { state: { userId: userIdr } });
  };

  return (
    <div className="container mt-4">
      <h2>Add a Meal</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="mealCategory">Select Meal Category</label>
          <select
            className="form-control"
            id="mealCategory"
            value={mealCategory}
            onChange={(e) => setMealCategory(e.target.value)}
          >
            <option value="">Choose...</option>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="snack">Snack</option>
          </select>
        </div>

        <div className="form-group mt-3">
          <label htmlFor="foodSearch">Search for a Food Item</label>
          <input
            type="text"
            className="form-control"
            id="foodSearch"
            placeholder="Enter food name"
            value={query}
            onChange={handleSearch}
          />
        </div>

        {foodItems.length > 0 && (
          <ul className="list-group mt-2">
            {foodItems.map((item) => (
              <li
                key={item.food_name}
                className="list-group-item list-group-item-action"
                onClick={() => handleFoodSelect(item)}
                style={{ cursor: "pointer" }}
              >
                <div>
                  <strong>{item.food_name}</strong> <br />
                  <img
                    src={item.photo.thumb}
                    alt={item.food_name}
                    style={{ width: "50px" }}
                  />{" "}
                  <br />
                  <small>Category: {item.tags?.item || "N/A"}</small>
                </div>
              </li>
            ))}
          </ul>
        )}

        {selectedFoods.length > 0 && (
          <div className="mt-3">
            <h5>Selected Foods:</h5>
            <ul className="list-group">
              {selectedFoods.map((foodItem, index) => (
                <li
                  key={`${foodItem.food_name}-${index}`}
                  className="list-group-item position-relative"
                >
                  <button
                    type="button"
                    className="btn-close position-absolute top-0 end-0"
                    aria-label="Close"
                    onClick={() => handleFoodDelete(index)}
                  ></button>
                  <strong>{foodItem.food_name}</strong> <br />
                  <small>Calories: {foodItem.nf_calories} kcal</small> <br />
                  <small>Proteins: {foodItem.nf_protein} g</small> <br />
                  <small>Carbs: {foodItem.nf_total_carbohydrate} g</small>{" "}
                  <br />
                  <small>Fats: {foodItem.nf_total_fat} g</small> <br />
                  <small>
                    Serving Size:{" "}
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
                      style={{ width: "60px", marginRight: "5px" }}
                    />
                    grams
                  </small>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="form-check mt-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="isFavorite"
            checked={isFavorite}
            onChange={(e) => setIsFavorite(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="isFavorite">
            Mark as Favorite
          </label>
        </div>
        <div className="col-6">
          {/* Search Bar */}
          <div className={styles.searchBarContainer}>
            <input
              type="text"
              className={styles.searchBar}
              placeholder="Search"
              value={query}
              onChange={handleSearch}
            />
          </div>

          {/* Select from Favorites Button */}
          <button
            className={styles.selectFromFavorites}
            onClick={toggleFavoritesDropdown}
          >
            Select from Favorites
            <span className={styles.dropdownIcon}>▼</span>
          </button>

          {/* Favorites Dropdown (dynamic) */}
          {showFavoritesDropdown && (
            <div className={styles.dropdownMenu}>
              {favoriteMeals.length > 0 ? (
                favoriteMeals.map((meal) => (
                  <div
                    key={meal.mealId}
                    className={styles.dropdownItem}
                    onClick={() => handleFavoriteMealSelect(meal.mealId)}
                  >
                    {meal.name} - {meal.date}
                  </div>
                ))
              ) : (
                <div className={styles.dropdownItem}>
                  No favorite meals available
                </div>
              )}
            </div>
          )}

          {/* Food Item Placeholder (dynamic) */}
          {foodItems.length > 0 && (
            <div className={styles.foodItemContainer}>
              <div className={styles.foodItemPlaceholder}>
                <p>image place holder</p>
              </div>
              <div className={styles.foodItemDetails}>
                <p>food items</p>
                <ul>
                  {foodItems.map((item) => (
                    <li
                      key={item.food_name}
                      onClick={() => handleFoodSelect(item)}
                    >
                      {item.food_name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Add Meal Button with Favorite Icon */}
          <div className={styles.addMealContainer}>
            <button
              type="button"
              className={styles.addMealButton}
              onClick={addMeal}
            >
              Add Meal
            </button>
            <button
              type="button"
              className={styles.favoriteIconButton}
              onClick={() => setIsFavorite(!isFavorite)}
            >
              {isFavorite ? "★" : "☆"}
            </button>
          </div>
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Save Meal
        </button>
      </form>
    </div>
  );
};

export default MealForm;
