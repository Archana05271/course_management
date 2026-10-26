import apiClient from "./client";

export const courseService = {
  async getAllCourses() {
    const response = await apiClient.get("/courses");
    return response.data.data; // Matches your backend response structure
  },

  async getCourseById(id) {
    const response = await apiClient.get(`/courses/${id}`);
    return response.data.data;
  },

  async createCourse(courseData) {
    const response = await apiClient.post("/courses", courseData);
    return response.data;
  },
};