// src/food/WeightProgress.jsx

import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import styles from "./WeightProgress.module.css"; // Create and adjust this CSS module as needed

// Register Chart.js components
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

function WeightProgress({ weightLogs }) {
  const data = {
    labels: weightLogs.map((log) => log.date), // Ensure each log has a 'date' field
    datasets: [
      {
        label: "Weight (kg)",
        data: weightLogs.map((log) => log.weight), // Ensure each log has a 'weight' field
        fill: false,
        borderColor: "#3b82f6",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  return (
    <div className={styles.weightProgressContainer}>
      <Line data={data} options={options} />
    </div>
  );
}

export default WeightProgress;
