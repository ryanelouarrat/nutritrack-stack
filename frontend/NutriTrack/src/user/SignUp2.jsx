import React, { useState } from "react";
import styles from "./styles/signup2.module.css";

const Signup2 = ({ formData, handleChange, nextStep, prevStep }) => {
  const [errors, setErrors] = useState({});

  const handleLocalChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "dateOfBirth") {
      const age = calculateAge(value);
      handleChange("age", age); // Update age in formData with calculated age
    }
  
    handleChange(name, value); // Update other form fields
    setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined })); // Clear specific error on input change
  };
  

  // Function to calculate age based on the date of birth
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // Adjust if birth month or day hasn't occurred yet this year
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of Birth is required";
    if (!formData.weight) newErrors.weight = "Weight is required";
    if (!formData.height) newErrors.height = "Height is required";
    if (!formData.activityLevel) newErrors.activityLevel = "Activity level is required";
    if (!formData.goal) newErrors.goal = "Goal is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      nextStep();
    }
  };

  return (
    <div className={styles["custom-container"]}>
      <div className="row">
        <div className="col-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-left"
            viewBox="0 0 16 16"
            onClick={prevStep}
            style={{ cursor: "pointer" }}
          >
            <path
              fillRule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
            />
          </svg>
        </div>
        <div className="col">
          <div className={styles["custom-progress-bar"]}>
            <div className={styles["custom-progress"]}></div>
          </div>
        </div>
        <div className="col-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-right"
            viewBox="0 0 16 16"
            onClick={handleSubmit}
            style={{ cursor: "pointer" }}
          >
            <path
              fillRule="evenodd"
              d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
            />
          </svg>
        </div>
      </div>

      <h2> 
        Tell us more about <strong>Your health</strong>:
      </h2>
      <div className="row justify-content-center">
        <div className={`${styles.cntn} col-7 `}>
          <div className={styles.formSection}>
            {/* Date of Birth */}
            <div className={styles.inputRow}>
              <div className={styles.inputLabel}>Date of Birth:</div>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleLocalChange}
                className={styles.inputField}
              />
              {errors.dateOfBirth && <span className={styles.errorText}>{errors.dateOfBirth}</span>}
            </div>

            {/* Weight */}
            <div className={styles.inputRow}>
              <div className={styles.inputLabel}>Weight:</div>
              <div className={`row ${styles.selectContainer}`}>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleLocalChange}
                  className={`col-auto ${styles.inputField}`}
                  placeholder="Enter weight"
                />
                <select
                  name="weightUnit"
                  value={formData.weightUnit}
                  onChange={handleLocalChange}
                  className={`col-auto ${styles.unitDropdown}`}
                >
                  <option value="kg">kg</option>
                  <option value="lbs">lbs</option>
                </select>
              </div>
              {errors.weight && <span className={styles.errorText}>{errors.weight}</span>}
            </div>

            {/* Height */}
            <div className={styles.inputRow}>
              <div className={styles.inputLabel}>Height:</div>
              <div className={`row ${styles.selectContainer}`}>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleLocalChange}
                  className={`col-auto ${styles.inputField}`}
                  placeholder="Enter height"
                />
                <select
                  name="heightUnit"
                  value={formData.heightUnit}
                  onChange={handleLocalChange}
                  className={`col-auto ${styles.unitDropdown}`}
                >
                  <option value="cm">cm</option>
                  <option value="ft">ft</option>
                </select>
              </div>
              {errors.height && <span className={styles.errorText}>{errors.height}</span>}
            </div>

            {/* Activity Level */}
            <div className={styles.inputRow}>
              <div className={styles.inputLabel}>Activity level:</div>
              <select
                name="activityLevel"
                value={formData.activityLevel}
                onChange={handleLocalChange}
                className={styles.dropdown}
              >
                <option value="">Select Activity Level</option>
                <option value="sedentary">Sedentary (Little to no exercise)</option>
                <option value="lightly_active">Light (Exercise 1-3 days/week)</option>
                <option value="moderately_active">Moderate (Exercise 3-5 days/week)</option>
                <option value="very_active">Active (Exercise 6-7 days/week)</option>
                <option value="extra_active">Extra Active (Very hard exercise/physical job)</option>
              </select>
              {errors.activityLevel && <span className={styles.errorText}>{errors.activityLevel}</span>}
            </div>

            {/* Goal */}
            <div className={styles.inputRow}>
              <div className={styles.inputLabel}>Goal:</div>
              <select
                name="goal"
                value={formData.goal}
                onChange={handleLocalChange}
                className={styles.dropdown}
              >
                <option value="">Select Goal</option>
                <option value="weight_loss">Weight Loss</option>
                <option value="maintenance">Maintenance</option>
                <option value="bulking">Bulking</option>
              </select>
              {errors.goal && <span className={styles.errorText}>{errors.goal}</span>}
            </div>

            {/* Gender */}
            <div className={styles.inputRow}>
              <div className={styles.inputLabel}>Gender:</div>
              <div className={styles.genderOptions}>
                <div className="row justify-content-between w-100">
                  <div className="col-auto">
                    <label className={styles.genderOption}>
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={formData.gender === "male"}
                        onChange={handleLocalChange}
                      />
                      Male
                    </label>
                  </div>
                  <div className="col-auto">
                    <label className={styles.genderOption}>
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={formData.gender === "female"}
                        onChange={handleLocalChange}
                      />
                      Female
                    </label>
                  </div>
                </div>
                {errors.gender && <span className={styles.errorText}>{errors.gender}</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <button className={styles.customBtn} onClick={handleSubmit}>
          NEXT
        </button>
      </div>
    </div>
  );
};

export default Signup2;
