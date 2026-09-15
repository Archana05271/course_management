import React from 'react';
import { Link } from 'react-router-dom';

const MyCourses = () => {
  return (
    <>
      <header className="content-header">
        <div>
          <h1>My Enrolled Courses</h1>
          <p>Continue your ongoing learning paths and review completed modules.</p>
        </div>
      </header>

      <div className="workspace-main">
        <div className="active-course-row">
          <div>
            <h3>Modern JavaScript Architectural Patterns</h3>
            <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Progress: 65% Completed</p>
          </div>
          <Link to="/student/content" className="btn btn-primary">Continue Learning</Link>
        </div>
      </div>
    </>
  );
};

export default MyCourses;