import React from 'react';
import { Link } from 'react-router-dom';

const CourseDetailsStudent = () => {
  return (
    <>
      <header className="content-header">
        <div>
          <h1>Modern JavaScript Architectural Patterns</h1>
          <p>Course overview, syllabus preview, and enrollment options.</p>
        </div>
      </header>

      <div className="workspace-main">
        <h3>About This Track</h3>
        <p style={{ margin: '1rem 0', color: '#475569' }}>
          Master scalable frontend software structures, design patterns, and clean architecture paradigms built for production environments.
        </p>
        <Link to="/student/enrollment-success" className="btn btn-primary">Enroll in Track</Link>
      </div>
    </>
  );
};

export default CourseDetailsStudent;