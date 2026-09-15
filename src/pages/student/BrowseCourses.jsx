import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const BrowseCourses = () => {
  const [courses] = useState([
    { id: 1, title: 'Modern JavaScript Architectural Patterns', category: 'Engineering', level: 'Intermediate' },
    { id: 2, title: 'UI/UX Design Systems & Micro-Interactions', category: 'Design', level: 'Beginner' },
    { id: 3, title: 'Applied Data Science with Python', category: 'Data Science', level: 'Advanced' }
  ]);

  return (
    <>
      <header className="content-header">
        <div>
          <h1>Browse Course Catalog</h1>
          <p>Explore available tracks and enroll in new learning paths.</p>
        </div>
      </header>

      <div className="course-grid">
        {courses.map(course => (
          <div key={course.id} className="course-card">
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#2563eb', textTransform: 'uppercase' }}>{course.category}</span>
              <h3 style={{ margin: '0.5rem 0' }}>{course.title}</h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Level: {course.level}</p>
            </div>
            <div style={{ marginTop: '1.5rem' }}>
              <Link to="/student/course-details" className="btn btn-primary" style={{ width: '100%', textAlign: 'center' }}>View Details</Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default BrowseCourses;