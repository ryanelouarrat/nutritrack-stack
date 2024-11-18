import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://localhost:8080",
  withCredentials: true, // Allows cookies to be sent with each request
});

export default axiosInstance;
