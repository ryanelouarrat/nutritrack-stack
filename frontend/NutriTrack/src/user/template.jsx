import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

import styles from "../user/styles/Dashboard.module.css";

import leafImage from "../assets/leaf.svg";
import { Doughnut } from "react-chartjs-2";

const localizer = momentLocalizer(moment);

const WeeklyLog = () => {
  
  return (
    <div className={styles.dashboardContainer}>
      <aside className={styles.sidebar}>
 <h2>
          {" "}
          {profile ? profile.name : "Full Name"}
          <img
            className={styles.leaf}
            src={leafImage}
            alt="Leaf Icon"
            width="100"
            height="100"
          />
        </h2>
        <p>{profile ? profile.email : "email"}</p>
        <nav>
          <ul>
            <li className={styles.active}>Dashboard</li>
            <li
              onClick={() =>
                navigate("/weekly-log", {
                  state: { userId: userId, profile: profile },
                })
              }
            >
              Weekly Log
            </li>

            <li
              onClick={() =>
                navigate("/AddMeal", { state: { userId: userId } })
              }
            >
              Add a Meal
            </li>
            <li onClick={"/Weight Progress"}>Weight Progress</li>
            <li onClick={"/kkk"}>Favorite Meals</li>
            <li onClick={() => navigate("/accountsettings")}>Account</li>
          </ul>
        </nav>
        <button
          className={styles.logoutButton}
          onClick={() => {
            localStorage.removeItem("token");
localStorage.removeItem("userId");
            navigate("/login");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            className={styles.logoutIcon}
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"
            />
            <path
              fillRule="evenodd"
              d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"
            />
          </svg>
          Log Out
        </button>
      </aside>
      <div className="position-relative w-100">
        <div className={styles.backgroundLayer}>
          <main className={styles.mainContent}>
            <header className={styles.header}>
              <h1>Add a Meal</h1>
            </header>
            <div
              className={`${styles.mainWidgets} row justify-content-between`}
            >

             </div>
                
            </div>
          </main>
        </div>
      </div>

     

    </div>
  );
};

export default WeeklyLog;
