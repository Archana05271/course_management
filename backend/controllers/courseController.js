const {
  getAllCourses,
  getCourseById,
  searchCoursesQuery,
  createCourse,
  updateCourse,
  deleteCourse
} = require("../services/courseService");

const getCourses = (req, res) => {
  const courses = getAllCourses();
  res.status(200).json({ success: true, count: courses.length, data: courses });
};

const getCourse = (req, res) => {
  const course = getCourseById(req.params.id);
  if (!course) {
    return res.status(404).json({ success: false, message: "Course not found" });
  }
  res.status(200).json({ success: true, data: course });
};

// Search controller with 404 out-of-the-box handling
const searchCourses = (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ success: false, message: "Search query parameter is required" });
  }

  const results = searchCoursesQuery(query);

  if (results.length === 0) {
    return res.status(404).json({
      success: false,
      message: `No courses found matching '${query}'. Subject is out of the box or unavailable.`
    });
  }

  res.status(200).json({
    success: true,
    count: results.length,
    data: results
  });
};

const addCourse = (req, res) => {
  const newCourse = createCourse(req.body);
  res.status(201).json({ success: true, message: "Course created successfully", data: newCourse });
};

const editCourse = (req, res) => {
  const updatedCourse = updateCourse(req.params.id, req.body);
  if (!updatedCourse) {
    return res.status(404).json({ success: false, message: "Course not found" });
  }
  res.status(200).json({ success: true, message: "Course updated successfully", data: updatedCourse });
};

const removeCourse = (req, res) => {
  const deleted = deleteCourse(req.params.id);
  if (!deleted) {
    return res.status(404).json({ success: false, message: "Course not found" });
  }
  res.status(200).json({ success: true, message: "Course deleted successfully" });
};

module.exports = {
  getCourses,
  getCourse,
  searchCourses,
  addCourse,
  editCourse,
  removeCourse
};