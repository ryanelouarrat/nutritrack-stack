import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://backend-vmt0.onrender.com",
  withCredentials: true, // Allows cookies to be sent with each request
});

export default axiosInstance;
