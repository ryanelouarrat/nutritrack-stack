import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";

const WeeklyLog = () => {
  const { userId } = useParams(); // Retrieve userId from the URL
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dailyLog, setDailyLog] = useState(null);
  const [mealsWithFoodItems, setMealsWithFoodItems] = useState([]); // To store meals and their food items

  // Fetch daily log for the selected date
  useEffect(() => {
    if (userId) {
      const fetchDailyLog = async () => {
        try {
          // Fetch daily log details
          const logResponse = await axios.get(
            `https://localhost:8080/dailylogs/user/${userId}`,
            {
              params: { date: selectedDate.toISOString().split("T")[0] },
              withCredentials: true,
            }
          );
          setDailyLog(logResponse.data);

          // Fetch meals only for the selected date
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
                {
                  withCredentials: true,
                }
              );
              return { ...meal, foodItems: foodItemsResponse.data };
            })
          );
          setMealsWithFoodItems(mealsWithItems);
        } catch (error) {
          console.error("Error fetching data", error);
          setDailyLog(null);
          setMealsWithFoodItems([]);
        }
      };

      fetchDailyLog();
    }
  }, [selectedDate, userId]);

  return (
    <div>
      <h2>Weekly Log</h2>
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        maxDetail="month"
        minDetail="month"
      />
      {dailyLog ? (
        <div className="daily-log-card">
          <h3>Log for {selectedDate.toDateString()}</h3>
          <p>
            <strong>Calories Consumed:</strong> {dailyLog.caloriesConsumed}
          </p>
          <p>
            <strong>Protein:</strong> {dailyLog.proteinConsumed}g
          </p>
          <p>
            <strong>Carbs:</strong> {dailyLog.carbsConsumed}g
          </p>
          <p>
            <strong>Fats:</strong> {dailyLog.fatsConsumed}g
          </p>
          <p>
            <strong>Weight:</strong> {dailyLog.weight}kg
          </p>
          <h4>Meals:</h4>
          <ul>
            {mealsWithFoodItems && mealsWithFoodItems.length > 0 ? (
              mealsWithFoodItems.map((meal) => (
                <li key={meal.mealId}>
                  {meal.name} - Favorite: {meal.isFavorite ? "Yes" : "No"}
                  <ul>
                    {meal.foodItems && meal.foodItems.length > 0 ? (
                      meal.foodItems.map((foodItem) => (
                        <li key={foodItem.food_id}>
                          {foodItem.name} - Calories: {foodItem.calories} kcal,
                          Carbs: {foodItem.carbs}g, Proteins:{" "}
                          {foodItem.proteins}g, Fats: {foodItem.fats}g, Weight:{" "}
                          {foodItem.weight}g
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
      ) : (
        <p>No log available for {selectedDate.toDateString()}</p>
      )}
    </div>
  );
};

export default WeeklyLog;
