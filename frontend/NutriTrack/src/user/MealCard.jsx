import React from 'react';
import { Doughnut } from "react-chartjs-2";

import styles from "../user/styles/Dashboard.module.css";

import leafImage from "../assets/leaf.svg";


const MealCard = ({ meal, formattedDate, totalNutrition }) => {
  const chartOptions = {
    plugins: {
      legend: { display: false },
    },
    maintainAspectRatio: false,
  };

  const chartData = (value, color) => ({
    labels: ["Consumed", "Remaining"],
    datasets: [
      {
        data: [value, Math.max(0, 100 - value)],
        backgroundColor: [color, "#e0e0e0"],
        borderWidth: 0,
        cutout: "70%",
      },
    ],
  });

  return (
    <div className="card mb-3 p-4 shadow-sm">
      <div className="card-body d-flex justify-content-between">
        {/* Meal Information */}
        <div>
          <h4 className="card-title text-capitalize">{meal.name}</h4>
          <p className="card-text">{formattedDate}</p>
        </div>

        {/* Macronutrient Spiral Charts with Numerical Values */}
        <div className="col-8 row justify-content-between">
          <div className="col-auto p-0" style={{ width: "25%", height: "40px" }}>
            <Doughnut data={chartData(totalNutrition.proteins, "#36A2EB")} options={chartOptions} />
            <p className={`text-center ${styles.macroText} mt-0 w-100`}>💪 Protein<br />{(totalNutrition.proteins).toFixed(1)}g</p>
          </div>
          <div className="col-auto p-0" style={{ width: "25%", height: "40px", whiteSpace: "p" }}>
            <Doughnut data={chartData(totalNutrition.carbs, "#FF6384")} options={chartOptions} />
            <p className={`text-center ${styles.macroText}  mt-0 w-100`}>🥖 Carbs <br />{(totalNutrition.carbs).toFixed(1)}g</p>
          </div>
          <div className="col-auto p-0" style={{ width: "15%", height: "40px" }}>
            <Doughnut data={chartData(totalNutrition.fats, "#FFCE56")} options={chartOptions} />
            <p className={`text-center ${styles.macroText} mt-0 w-100`}>🧈 Fats<br />{(totalNutrition.fats).toFixed(1)}g</p>
          </div>
          <div className="col-auto p-0" style={{ width: "35%", height: "40px" }}>
            <Doughnut data={chartData(totalNutrition.calories, "#4BC0C0")} options={chartOptions} />
            <p className={`text-center ${styles.macroText} mt-0 w-100`}>🔥 Calories<br />{(totalNutrition.calories).toFixed(1)} kcal</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealCard;