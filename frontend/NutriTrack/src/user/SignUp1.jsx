import React, { useState } from "react";
import styles from "./styles/signup1.module.css";

const CustomForm = ({ formData, handleChange, nextStep }) => {
  const [errors, setErrors] = useState({});

  const handleLocalChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined })); // Clear specific error on input change
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First Name is required";
    if (!formData.lastName) newErrors.lastName = "Last Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        nextStep();
      } catch (error) {
        console.error("Error advancing to the next step:", error);
        setErrors({ submit: "An unexpected error occurred. Please try again." });
      }
    }
  };

  return (
    <div className={styles["custom-container"]}>
      <div className={"row"}>
        <div className={"col-auto"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-left"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
            />
          </svg>
        </div>
        <div className={"col"}>
          <div className={styles["custom-progress-bar"]}>
            <div className={styles["custom-progress"]}></div>
          </div>
        </div>
        <div className={"col-auto"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-right"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
            />
          </svg>
        </div>
      </div>

      <h2>
        Tell us more about <strong>You:</strong>
      </h2>
      <form className={styles["signup1"]} onSubmit={handleSubmit}>
        <div className="row justify-content-evenly">
          <div className="col-auto">
            <div className={styles["custom-form-group"]}>
              <label htmlFor="first-name">First Name:</label>
              <input
                type="text"
                id="first-name"
                name="firstName"
                value={formData.firstName}
                onChange={handleLocalChange}
                placeholder="First Name"
              />
              {errors.firstName && (
                <span className={styles["error-text"]}>{errors.firstName}</span>
              )}
            </div>

            <div className={styles["custom-form-group"]}>
              <label htmlFor="last-name">Last Name:</label>
              <input
                type="text"
                id="last-name"
                name="lastName"
                value={formData.lastName}
                onChange={handleLocalChange}
                placeholder="Last Name"
              />
              {errors.lastName && (
                <span className={styles["error-text"]}>{errors.lastName}</span>
              )}
            </div>

            <div className={styles["custom-form-group"]}>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleLocalChange}
                placeholder="Email"
              />
              {errors.email && (
                <span className={styles["error-text"]}>{errors.email}</span>
              )}
            </div>

            <div className={styles["custom-form-group"]}>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleLocalChange}
                placeholder="Password"
              />
              {errors.password && (
                <span className={styles["error-text"]}>{errors.password}</span>
              )}
            </div>
          </div>
          <div className={`col-auto ${styles.bottom}`}>
            <div className={styles["custom-form-group"]}>
              <label htmlFor="confirm-password">Password Confirmation:</label>
              <input
                type="password"
                id="confirm-password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleLocalChange}
                placeholder="Password Confirmation"
              />
              {errors.confirmPassword && (
                <span className={styles["error-text"]}>
                  {errors.confirmPassword}
                </span>
              )}
            </div>
          </div>
        </div>

        <button type="submit" className={styles["custom-btn"]}>
          NEXT
        </button>
      </form>
    </div>
  );
};

export default CustomForm;
