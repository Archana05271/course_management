const express = require("express");
const {
  getCourses,
  getCourse,
  searchCourses,
  addCourse,
  editCourse,
  removeCourse
} = require("../controllers/courseController");
const validateCourse = require("../middleware/courseValidation");

const router = express.Router();

router.get("/", getCourses);
router.get("/search", searchCourses); // MUST be placed above /:id
router.get("/:id", getCourse);
router.post("/", validateCourse, addCourse);
router.put("/:id", editCourse);
router.delete("/:id", removeCourse);

module.exports = router;