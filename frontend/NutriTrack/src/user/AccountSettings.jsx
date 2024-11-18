import React, { useState, useEffect } from "react";
import axios from "../config/axiosConfig";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";

import styles from "../user/styles/Dashboard.module.css";

import leafImage from "../assets/leaf.svg";
const ResponsiveNavbar = ({ profile, leafImage, navigate, handleLogout }) => {
  return (
    <nav className={`${styles.bgGreen} navbar fixed-top`}>
      <div className={`${styles.bgGreen} container-fluid`}>
        <a
          className={`${styles.nava} navbar-brand d-flex w-75 align-items-center`}
          href="#"
        >
          <img src={leafImage} alt="Leaf Icon" className={styles.leaf} />
          <span className="ms-2">{profile ? profile.name : "Full Name"}</span>
        </a>
        <button
          className={`${styles.navbarTog} navbar-toggler`}
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="offcanvas offcanvas-start"
          tabIndex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              <img src={leafImage} alt="Leaf Icon" className={styles.leaf} />
              {profile ? profile.name : "Full Name"}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className={`${styles.bgGreen} offcanvas-body`}>
            <p>{profile ? profile.email : "email"}</p>
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li
                className={`nav-item ${styles.active}`}
                onClick={() => {
                  const offcanvasElement =
                    document.getElementById("offcanvasNavbar");
                  if (offcanvasElement) {
                    const offcanvas =
                      bootstrap.Offcanvas.getInstance(offcanvasElement) ||
                      new bootstrap.Offcanvas(offcanvasElement);

                    // Add event listener to wait for offcanvas to close
                    offcanvasElement.addEventListener(
                      "hidden.bs.offcanvas",
                      () => {
                        navigate("/dashboard");
                      }
                    );

                    offcanvas.hide(); // Close the offcanvas
                  } else {
                    navigate("/dashboard"); // Fallback if offcanvas is not found
                  }
                }}
              >
                <a className="nav-link text-white active" href="#">
                  Dashboard
                </a>
              </li>
              <li
                className="nav-item"
                onClick={() => {
                  const offcanvasElement =
                    document.getElementById("offcanvasNavbar");
                  if (offcanvasElement) {
                    const offcanvas =
                      bootstrap.Offcanvas.getInstance(offcanvasElement) ||
                      new bootstrap.Offcanvas(offcanvasElement);

                    offcanvasElement.addEventListener(
                      "hidden.bs.offcanvas",
                      () => {
                        navigate("/weekly-log");
                      }
                    );

                    offcanvas.hide();
                  } else {
                    navigate("/weekly-log");
                  }
                }}
              >
                <a className="nav-link text-white" href="#">
                  Weekly Log
                </a>
              </li>
              <li
                className="nav-item"
                onClick={() => {
                  const offcanvasElement =
                    document.getElementById("offcanvasNavbar");
                  if (offcanvasElement) {
                    const offcanvas =
                      bootstrap.Offcanvas.getInstance(offcanvasElement) ||
                      new bootstrap.Offcanvas(offcanvasElement);

                    offcanvasElement.addEventListener(
                      "hidden.bs.offcanvas",
                      () => {
                        navigate("/AddMeal");
                      }
                    );

                    offcanvas.hide();
                  } else {
                    navigate("/AddMeal");
                  }
                }}
              >
                <a className="nav-link text-white" href="#">
                  Add a Meal
                </a>
              </li>
              <li
                className="nav-item"
                onClick={() => {
                  const offcanvasElement =
                    document.getElementById("offcanvasNavbar");
                  if (offcanvasElement) {
                    const offcanvas =
                      bootstrap.Offcanvas.getInstance(offcanvasElement) ||
                      new bootstrap.Offcanvas(offcanvasElement);

                    offcanvasElement.addEventListener(
                      "hidden.bs.offcanvas",
                      () => {
                        navigate("/weightProgress");
                      }
                    );

                    offcanvas.hide();
                  } else {
                    navigate("/weightProgress");
                  }
                }}
              >
                <a className="nav-link text-white" href="#">
                  Weight Progress
                </a>
              </li>
              <li
                className="nav-item"
                onClick={() => {
                  const offcanvasElement =
                    document.getElementById("offcanvasNavbar");
                  if (offcanvasElement) {
                    const offcanvas =
                      bootstrap.Offcanvas.getInstance(offcanvasElement) ||
                      new bootstrap.Offcanvas(offcanvasElement);

                    offcanvasElement.addEventListener(
                      "hidden.bs.offcanvas",
                      () => {
                        navigate("/favorites");
                      }
                    );

                    offcanvas.hide();
                  } else {
                    navigate("/favorites");
                  }
                }}
              >
                <a className="nav-link text-white" href="#">
                  Favorite Meals
                </a>
              </li>
              <li
                className="nav-item"
                onClick={() => {
                  const offcanvasElement =
                    document.getElementById("offcanvasNavbar");
                  if (offcanvasElement) {
                    const offcanvas =
                      bootstrap.Offcanvas.getInstance(offcanvasElement) ||
                      new bootstrap.Offcanvas(offcanvasElement);

                    offcanvasElement.addEventListener(
                      "hidden.bs.offcanvas",
                      () => {
                        navigate("/accountsettings");
                      }
                    );

                    offcanvas.hide();
                  } else {
                    navigate("/accountsettings");
                  }
                }}
              >
                <a className="nav-link text-white" href="#">
                  Account
                </a>
              </li>
            </ul>
            <button
              className={`btn btn-outline-danger w-100 mt-3 ${styles.logoutButton}`}
              onClick={handleLogout}
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
const AccountSettings = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: "",
    goal: "",
    activityLevel: "",
    favoriteItems: "",
  });
  const [initialProfile, setInitialProfile] = useState({});
  const [favoriteFoods, setFavoriteFoods] = useState([]);
  const [customFood, setCustomFood] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const handleLogout = () => {
    axios
      .post("https://backend-vmt0.onrender.com/users/logout", {}, { withCredentials: true })
      .then(() => navigate("/login"))
      .catch((err) => console.error("Error during logout:", err));
  };
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768); // Mobile threshold
    handleResize(); // Check on component mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const activityLevels = [
    { value: "sedentary", label: "Sedentary (Little to no exercise)" },
    { value: "lightly_active", label: "Light (Exercise 1-3 days/week)" },
    { value: "moderately_active", label: "Moderate (Exercise 3-5 days/week)" },
    { value: "very_active", label: "Active (Exercise 6-7 days/week)" },
    {
      value: "extra_active",
      label: "Extra Active (Very hard exercise/physical job)",
    },
  ];

  const goals = [
    { value: "weight_loss", label: "Weight Loss" },
    { value: "maintenance", label: "Maintenance" },
    { value: "bulking", label: "Bulking" },
  ];

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const profileResponse = await axios.get(
          "https://backend-vmt0.onrender.com/users/me",
          { withCredentials: true }
        );
        const profileData = profileResponse.data.profile;

        const fetchedProfile = {
          name: profileResponse.data.name,
          goal: profileData.goal || "",
          email: profileResponse.data.email,
          activityLevel: profileData.activityLevel || "",
          favoriteItems: profileData.favoriteItems || "",
        };

        setProfile(fetchedProfile);
        setInitialProfile(fetchedProfile); // Store initial data
        setFavoriteFoods(
          profileData.favoriteItems.split(",").map((item) => item.trim())
        );
      } catch (error) {
        console.error("Error fetching profile", error);
        if (error.response?.status === 403) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleCustomFoodAdd = () => {
    if (customFood && !favoriteFoods.includes(customFood)) {
      setFavoriteFoods([...favoriteFoods, customFood]);
      setCustomFood("");
    }
  };

  const handleFoodDelete = (food) => {
    setFavoriteFoods(favoriteFoods.filter((item) => item !== food));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedProfile = {};

    // Compare each field with initial data and only add changed fields
    if (profile.name !== initialProfile.name)
      updatedProfile.name = profile.name;
    if (profile.goal !== initialProfile.goal)
      updatedProfile.goal = profile.goal;
    if (profile.activityLevel !== initialProfile.activityLevel)
      updatedProfile.activityLevel = profile.activityLevel;
    const favoriteItemsString = favoriteFoods.join(", ");
    if (favoriteItemsString !== initialProfile.favoriteItems)
      updatedProfile.favoriteItems = favoriteItemsString;

    // Only send update if there are changes
    if (Object.keys(updatedProfile).length === 0) {
      alert("No changes to save.");
      setLoading(false);
      return;
    }

    try {
      await axios.put("https://backend-vmt0.onrender.com/users/update", updatedProfile, {
        withCredentials: true,
      });
      alert("Profile updated successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating profile", error);
      alert("There was an error updating your profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordModalShow = () => setShowPasswordModal(true);
  const handlePasswordModalClose = () => {
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setPasswordError("");
    setShowPasswordModal(false);
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangePassword = async () => {
    const { currentPassword, newPassword, confirmPassword } = passwordData;

    if (newPassword !== confirmPassword) {
      setPasswordError("New password and confirmation do not match.");
      return;
    }

    try {
      await axios.put(
        "https://backend-vmt0.onrender.com/users/changePassword",
        { currentPassword, newPassword },
        { withCredentials: true }
      );
      alert("Password changed successfully!");
      handlePasswordModalClose();
    } catch (error) {
      setPasswordError("Error changing password. Please try again.");
      console.error("Error changing password", error);
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      {isMobile ? (
        <ResponsiveNavbar
          profile={profile}
          leafImage={leafImage}
          navigate={navigate}
          handleLogout={handleLogout}
        />
      ) : (
        <aside className={styles.sidebar}>
          <h2>
            {profile ? profile.name : "Full Name"}
            <img className={styles.leaf} src={leafImage} alt="Leaf Icon" />
          </h2>
          <p>{profile ? profile.email : "email"}</p>
          <nav>
            <ul>
              <li
                className={styles.active}
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </li>
              <li onClick={() => navigate("/weekly-log")}>Weekly Log</li>
              <li onClick={() => navigate("/AddMeal")}>Add a Meal</li>
              <li onClick={() => navigate("/weightProgress")}>
                Weight Progress
              </li>
              <li onClick={() => navigate("/favorites")}>Favorite Meals</li>
              <li onClick={() => navigate("/accountsettings")}>Account</li>
            </ul>
          </nav>
          <button className={styles.logoutButton} onClick={handleLogout}>
            Log Out
          </button>
        </aside>
      )}
      <div className={`position-relative ${isMobile ? "w-100" : "w-75"}`}>
        <div className={`${styles.backgroundLayer} ${styles.fav}`}>
          <div className={styles.mainContent}>
            <header className={`${styles.header} mb-0`}>
              <h1>Account Settings</h1>
            </header>

            <div className={styles.container}>
              {loading ? (
                <div className={styles.loadingContainer}>
                  <div className={styles.loader}></div>
                  <p>Loading...</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={profile.name}
                      onChange={handleInputChange}
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="goal">Goal</label>
                    <select
                      id="goal"
                      name="goal"
                      value={profile.goal}
                      onChange={handleInputChange}
                      className={styles.select}
                    >
                      <option value="">Select Goal</option>
                      {goals.map((goal) => (
                        <option key={goal.value} value={goal.value}>
                          {goal.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="activityLevel">Activity Level</label>
                    <select
                      id="activityLevel"
                      name="activityLevel"
                      value={profile.activityLevel}
                      onChange={handleInputChange}
                      className={styles.select}
                    >
                      <option value="">Select Activity Level</option>
                      {activityLevels.map((level) => (
                        <option key={level.value} value={level.value}>
                          {level.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label>Favorite Foods</label>
                    <div className={`${styles.foodTags} overflow-auto`}>
                      {favoriteFoods.map((food, index) => (
                        <span key={index} className={styles.foodTag}>
                          {food}
                          <button
                            type="button"
                            className={styles.deleteButton}
                            onClick={() => handleFoodDelete(food)}
                            aria-label={`Delete ${food}`}
                          >
                            &times;
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="customFood">
                      Add a Custom Favorite Food
                    </label>
                    <div className={styles.customFoodContainer}>
                      <input
                        type="text"
                        id="customFood"
                        value={customFood}
                        onChange={(e) => setCustomFood(e.target.value)}
                        className={styles.input}
                        placeholder="Enter a custom food"
                      />
                      <button
                        type="button"
                        onClick={handleCustomFoodAdd}
                        className={styles.addButton}
                        disabled={!customFood.trim()}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-plus-lg"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div
                    className={`${styles.buttonGroup}  row justify-content-between`}
                  >
                    <button
                      type="submit"
                      className={`${styles.saveButton} col-5`}
                      disabled={loading}
                    >
                      {loading ? "Saving..." : "Save Changes"}
                    </button>
                    <button
                      type="button"
                      onClick={handlePasswordModalShow}
                      className={`${styles.passwordButton} col-5`}
                    >
                      Change Password
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      <Modal
        show={showPasswordModal}
        onHide={handlePasswordModalClose}
        dialogClassName="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Current Password</Form.Label>
              <Form.Control
                type="password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
              />
            </Form.Group>
            {passwordError && (
              <p className="text-danger mt-2">{passwordError}</p>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handlePasswordModalClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleChangePassword}>
            Change Password
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AccountSettings;
