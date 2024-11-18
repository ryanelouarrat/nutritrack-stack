import React, { useState } from 'react';
import axios from "../config/axiosConfig"; 
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    height: 0,
    heightUnit: 'cm',
    weight: 0,
    weightUnit: 'kg',
    goal: '',
    age: 0,
    gender: '',
    activityLevel: ''
  });

  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const convertHeightToCm = (height, unit) => {
    return unit === 'feet' ? height * 30.48 : height; // Convert feet to cm
  };

  const convertWeightToKg = (weight, unit) => {
    return unit === 'lbs' ? weight * 0.453592 : weight; // Convert lbs to kg
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert height and weight to cm and kg
    const heightInCm = convertHeightToCm(formData.height, formData.heightUnit);
    const weightInKg = convertWeightToKg(formData.weight, formData.weightUnit);

    // Prepare the data for the User
    const userData = {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      password: formData.password,
      height: heightInCm,
      weight: weightInKg,
      goal: formData.goal,
      profile: {
        age: formData.age,
        gender: formData.gender,
        activityLevel: formData.activityLevel,
        targetCalories: 0,
        targetProteins: 0,
        targetCarbs: 0,
        targetFats: 0,
      }
    };

    // BMR and Calories Calculation
    const bmr = (formData.gender === "female") 
      ? (10 * userData.weight) + (6.25 * userData.height) - (5 * userData.profile.age) - 161
      : (10 * userData.weight) + (6.25 * userData.height) - (5 * userData.profile.age) + 5;

    const activityFactors = {
      sedentary: 1.2,
      lightly_active: 1.375,
      moderately_active: 1.55,
      very_active: 1.725,
      extra_active: 1.9
    };

    const totalCalories = bmr * activityFactors[userData.profile.activityLevel];

    switch (userData.goal) {
      case "weight_loss":
        userData.profile.targetCalories = totalCalories - 500; // Caloric deficit
        break;
      case "maintenance":
        userData.profile.targetCalories = totalCalories;
        break;
      case "bulking":
        userData.profile.targetCalories = totalCalories + 500; // Caloric surplus
        break;
      default:
        console.log("Unknown goal:", userData.goal);
        break;
    }

    // Macro Calculation
    userData.profile.targetProteins = (0.3 * userData.profile.targetCalories) / 4;
    userData.profile.targetCarbs = (0.5 * userData.profile.targetCalories) / 4;
    userData.profile.targetFats = (0.2 * userData.profile.targetCalories) / 9;

    try {
      // Send the User data
      const userResponse = await axios.post('https://localhost:8080/users', userData);

      // After successfully creating user, redirect to the dashboard with the user data
      navigate('/dashboard', { state: { userId: userResponse.data.id } });
      console.log("hello")

    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h3 className="mb-4 text-center">User Form</h3>
          <form onSubmit={handleSubmit}>
            {/* First Name */}
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter First Name"
              />
            </div>

            {/* Last Name */}
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter Last Name"
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Email"
              />
            </div>

            {/* Password and Confirm Password */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter Password"
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
              />
            </div>

            {/* Height with Unit Selection */}
            <div className="form-group">
              <label htmlFor="height">Height</label>
              <div className="row">
                <div className="col">
                  <input
                    type="number"
                    className="form-control"
                    id="height"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    placeholder="Enter Height"
                  />
                </div>
                <div className="col">
                  <select
                    className="form-control"
                    id="heightUnit"
                    name="heightUnit"
                    value={formData.heightUnit}
                    onChange={handleChange}
                  >
                    <option value="cm">cm</option>
                    <option value="feet">feet</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Weight with Unit Selection */}
            <div className="form-group">
              <label htmlFor="weight">Weight</label>
              <div className="row">
                <div className="col">
                  <input
                    type="number"
                    className="form-control"
                    id="weight"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    placeholder="Enter Weight"
                  />
                </div>
                <div className="col">
                  <select
                    className="form-control"
                    id="weightUnit"
                    name="weightUnit"
                    value={formData.weightUnit}
                    onChange={handleChange}
                  >
                    <option value="kg">kg</option>
                    <option value="lbs">lbs</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Age */}
            <div className="form-group">
              <label htmlFor="age">Age</label>
              <input
                type="number"
                className="form-control"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter Age"
              />
            </div>

            {/* Gender */}
            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select
                className="form-control"
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            {/* Activity Level */}
            <div className="form-group">
              <label htmlFor="activityLevel">Activity Level</label>
              <select
                className="form-control"
                id="activityLevel"
                name="activityLevel"
                value={formData.activityLevel}
                onChange={handleChange}
              >
                <option value="">Select Activity Level</option>
                <option value="sedentary">Sedentary (Little to no exercise)</option>
                <option value="lightly_active">Light (Exercise 1-3 days/week)</option>
                <option value="moderately_active">Moderate (Exercise 3-5 days/week)</option>
                <option value="very_active">Active (Exercise 6-7 days/week)</option>
                <option value="extra_active">Extra Active (Very hard exercise/physical job)</option>
              </select>
            </div>

            {/* Goal */}
            <div className="form-group">
              <label htmlFor="goal">Goal</label>
              <select
                className="form-control"
                id="goal"
                name="goal"
                value={formData.goal}
                onChange={handleChange}
              >
                <option value="">Select Goal</option>
                <option value="weight_loss">Weight Loss</option>
                <option value="maintenance">Maintenance</option>
                <option value="bulking">Bulking</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary mt-3">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup; // Default export
