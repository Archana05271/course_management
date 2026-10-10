const courses = require("../data/courses");

const getAllCourses = () => courses;

const getCourseById = (id) => courses.find(course => course.id === id);

// Add search query matcher
const searchCoursesQuery = (query) => {
  const searchTerm = query.toLowerCase();
  return courses.filter(course => 
    course.courseName.toLowerCase().includes(searchTerm) ||
    course.category.toLowerCase().includes(searchTerm) ||
    course.description.toLowerCase().includes(searchTerm)
  );
};

const createCourse = (courseData) => {
  const newCourse = {
    id: Date.now().toString(),
    ...courseData
  };
  courses.push(newCourse);
  return newCourse;
};

const updateCourse = (id, courseData) => {
  const index = courses.findIndex(course => course.id === id);
  if (index === -1) return null;

  courses[index] = {
    ...courses[index],
    ...courseData,
    id
  };
  return courses[index];
};

const deleteCourse = (id) => {
  const index = courses.findIndex(course => course.id === id);
  if (index === -1) return false;

  courses.splice(index, 1);
  return true;
};

module.exports = {
  getAllCourses,
  getCourseById,
  searchCoursesQuery,
  createCourse,
  updateCourse,
  deleteCourse
};