// backend/models/courseModel.js
export default class CourseModel {
  constructor(id, courseName, courseCode, instructor, category, status) {
    this.id = id || Date.now().toString();
    this.courseName = courseName;
    this.courseCode = courseCode;
    this.instructor = instructor;
    this.category = category;
    this.status = status || 'Active';
  }
}