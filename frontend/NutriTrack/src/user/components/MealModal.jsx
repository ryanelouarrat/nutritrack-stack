import React from "react";
import { PolarArea } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend, RadialLinearScale } from "chart.js";
import styles from "../styles/MealModal.module.css";

Chart.register(ArcElement, Tooltip, Legend, RadialLinearScale);

function MealModal({ meal, onClose, onDelete }) {
  const chartData = {
    labels: ["Carbohydrates", "Proteins", "Fats"],
    datasets: [
      {
        label: "Macronutrient Breakdown",
        data: [meal.carbs, meal.protein, meal.fats],
        backgroundColor: ["#f87171", "#34d399", "#60a5fa"],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw || 0;
            const label = context.label || "";
            return `${label}: ${value}g`;
          },
        },
      },
    },
  };

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>{meal.name}</h2>
          <div className={styles.iconContainer}>
            {/* Delete Button */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              onClick={(e) => {
                e.stopPropagation(); // Prevent modal close on delete
                onDelete(meal.mealId);
              }}
              className={styles.iconButton}
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M14 3a.7.7 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671L2.037 3.225A.7.7 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2M3.215 4.207l1.493 8.957a1 1 0 0 0 .986.836h4.612a1 1 0 0 0 .986-.836l1.493-8.957C11.69 4.689 9.954 5 8 5s-3.69-.311-4.785-.793" />
            </svg>

            {/* Close Button */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
              onClick={onClose}
              className={styles.iconButton}
            >
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
            </svg>
          </div>
        </div>

        {/* Chart Section */}
        <div className="d-flex justify-content-center align-items-center">
          <div className={`${styles.chartContainer} d-flex justify-content-center`}>
            <PolarArea data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Food Items List */}
        <div className={styles.foodItemsContainer}>
          <h3>Food Items</h3>
          <ul className={styles.foodItemsList}>
            {meal.foodItems && meal.foodItems.length > 0 ? (
              meal.foodItems.map((item, index) => (
                <li key={index} className={styles.foodItem}>
                  <span className={styles.foodName}>{item.name}</span>
                  <span className={styles.foodWeight}>{item.weight} g</span>
                </li>
              ))
            ) : (
              <p>No food items available</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MealModal;
