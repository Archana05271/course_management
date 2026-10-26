import * as courseService from "../services/courseService.js";

export function getAllCourses(req, res, next) {
  try {
    const courses = courseService.getAllCourses();
    return res.status(200).json({
      success: true,
      data: courses,
    });
  } catch (error) {
    next(error);
  }
}

export function getCourseById(req, res, next) {
  try {
    const course = courseService.findCourseById(req.params.id);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    next(error);
  }
}

export function createCourse(req, res, next) {
  try {
    const newCourse = courseService.addNewCourse(req.body);
    return res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: newCourse,
    });
  } catch (error) {
    next(error);
  }
}

export function updateCourse(req, res, next) {
  try {
    const updated = courseService.updateExistingCourse(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Course not found to update",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: updated,
    });
  } catch (error) {
    next(error);
  }
}

export function deleteCourse(req, res, next) {
  try {
    const deleted = courseService.removeCourse(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Course not found to delete",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}