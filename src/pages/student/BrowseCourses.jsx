import React, { useState, useEffect } from 'react';
import { courseService } from '../../api/courseService';

export default function BrowseCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchCourses() {
      try {
        const data = await courseService.getAllCourses();
        setCourses(data);
      } catch (err) {
        setError('Failed to load courses from server.');
      } finally {
        setLoading(false);
      }
    }
    fetchCourses();
  }, []);

  if (loading) return <div className="loading">Loading courses...</div>;
  if (error) return <div className="error" style={{ color: 'red' }}>{error}</div>;

  return (
    <div className="browse-courses-container">
      <h2>Browse Available Courses</h2>
      <div className="course-grid">
        {courses.map((course) => (
          <div key={course.id || course._id} className="course-card">
            <h3>{course.courseName}</h3>
            <span className="badge">{course.category}</span>
            <p>{course.description}</p>
            <button className="btn-enroll">Enroll Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}