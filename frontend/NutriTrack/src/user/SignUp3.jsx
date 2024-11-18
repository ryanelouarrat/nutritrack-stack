import React, { useState } from 'react';
import styles from './styles/signup3.module.css';

const SignUp3 = ({ formData, handleChange, nextStep, prevStep }) => {
  const foods = [
    { name: 'Bread', icon: '🍞' },
    { name: 'Meat', icon: '🥩' },
    { name: 'Eggs', icon: '🥚' },
    { name: 'Chicken', icon: '🍗' },
    { name: 'Fruits', icon: '🍐' },
    { name: 'Vegetables', icon: '🥒' },
    { name: 'Nuts', icon: '🌰' },
  ];

  const [selectedFoods, setSelectedFoods] = useState([]);
  const [error, setError] = useState('');

  const handleFoodSelect = (food) => {
    setError(''); // Clear error on selection
    let updatedFoods;
    
    if (selectedFoods.includes(food)) {
      updatedFoods = selectedFoods.filter((item) => item !== food);
    } else {
      updatedFoods = [...selectedFoods, food];
    }
    
    setSelectedFoods(updatedFoods);
    handleChange('favoriteFood', updatedFoods.join(', ')); // Update formData with comma-separated values
  };

  const handleNextStep = (e) => {
    e.preventDefault(); // Prevent default if called on form submission
    if (selectedFoods.length < 2) {
      setError("Please select at least two favorite foods to help us tailor meal recommendations just for you.");
    } else {
      nextStep(e); // Pass the event to handleSubmit in SignupFlow
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
            style={{ cursor: 'pointer' }}
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
            onClick={handleNextStep}
            style={{ cursor: 'pointer' }}
          >
            <path
              fillRule="evenodd"
              d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
            />
          </svg>
        </div>
      </div>

      <h2>What About <strong>Your Favorite Food?</strong></h2>
      
      <div className="row justify-content-center">
        <div className="col-auto">
          <div className={styles.foodGrid}>
            {foods.map((food) => (
              <div
                key={food.name}
                className={`${styles.foodItem} ${selectedFoods.includes(food.name) ? styles.selected : ''}`}
                onClick={() => handleFoodSelect(food.name)}
              >
                <div className={styles.foodIcon}>{food.icon}</div>
                <div className={styles.foodName}>{food.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {error && <p className={styles.errorText}>{error}</p>}

      <div className="row justify-content-center">
        <button className={styles.customBtn} onClick={handleNextStep}>CONTINUE</button>
      </div>
    </div>
  );
};

export default SignUp3;
