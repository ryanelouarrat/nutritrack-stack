import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "../config/axiosConfig";
import CustomForm from './SignUp1';
import Signup2 from './SignUp2';
import SignUp3 from './SignUp3';

const SignupFlow = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Pre-fill formData with data from GoogleAuthHandler if available
  const [formData, setFormData] = useState({
    firstName: location.state?.signupName?.split(" ")[0] || '',
    lastName: location.state?.signupName?.split(" ")[1] || '',
    email: location.state?.signupEmail || '',
    password: '',
    confirmPassword: '',
    height: 0,
    heightUnit: 'cm',
    weight: 0,
    weightUnit: 'kg',
    goal: '',
    profile: {
      age: 0,
      dateOfBirth: '',
      gender: '',
      activityLevel: '',
      favoriteItems: ''
    }
  });
  
  const [step, setStep] = useState(1);

  const handleChange = (name, value, isProfileField = false) => {
    if (isProfileField) {
      setFormData((prevData) => ({
        ...prevData,
        profile: {
          ...prevData.profile,
          [name]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  

  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const prevStep = () => setStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userResponse = await axios.post('https://localhost:8080/users/register', { ...formData });
      navigate('/dashboard', { state: { userId: userResponse.data.id } });
      console.log("User created successfully");
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <>
      {step === 1 && (
        <CustomForm formData={formData} handleChange={handleChange} nextStep={nextStep} />
      )}
      {step === 2 && (
        <Signup2 formData={formData} handleChange={handleChange} nextStep={nextStep} prevStep={prevStep} />
      )}
      {step === 3 && (
        <SignUp3 formData={formData} handleChange={handleChange} nextStep={handleSubmit} prevStep={prevStep} />
      )}
    </>
  );
};

export default SignupFlow;
