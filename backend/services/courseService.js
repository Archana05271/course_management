import coursesData from '../data/courses.js';

let courses = [...coursesData];

export function getAllCourses() {
  return courses;
}

export function findCourseById(id) {
  return courses.find(c => c.id === id);
}

export function addNewCourse(courseData) {
  const newCourse = {
    id: Date.now().toString(),
    ...courseData,
    createdAt: new Date().toISOString()
  };
  courses.push(newCourse);
  return newCourse;
}

export function updateExistingCourse(id, courseData) {
  const index = courses.findIndex(c => c.id === id);
  if (index === -1) return null;
  courses[index] = { ...courses[index], ...courseData };
  return courses[index];
}

export function removeCourse(id) {
  const exists = courses.some(c => c.id === id);
  if (!exists) return false;
  courses = courses.filter(c => c.id !== id);
  return true;
}