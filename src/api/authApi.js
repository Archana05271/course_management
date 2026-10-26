import apiClient from "./client";

export const authApi = {
  async register(userData) {
    const response = await apiClient.post("/auth/register", userData);
    return response.data;
  },

  async login(credentials) {
    const response = await apiClient.post("/auth/login", credentials);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("student", JSON.stringify(response.data.student));
    }
    return response.data;
  },

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("student");
  },
};