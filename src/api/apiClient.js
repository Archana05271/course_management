import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5000/api/v1", // Adjust to your backend port
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach JWT token to every request
apiClient.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token") || localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;