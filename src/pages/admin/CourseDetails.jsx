import React from 'react';
import { Link } from 'react-router-dom';

const CourseDetails = () => {
  return (
    <>
      <header className="content-header">
        <div>
          <h1>System Structure: Introduction to UI/UX Engineering</h1>
          <p>Inspect structural asset configurations and module node maps.</p>
        </div>
        <Link to="/admin/edit-course" className="btn btn-dark">Edit Parameters</Link>
      </header>

      <div className="workspace-main">
        <h3>Configured Modules</h3>
        <ul style={{ marginTop: '1rem', paddingLeft: '1.25rem', lineHeight: '1.8' }}>
          <li>Module 1: Layout Fundamentals & Spatial Grids</li>
          <li>Module 2: Responsive Fluid Mechanics</li>
          <li>Module 3: Design Tokens & Systems</li>
        </ul>
      </div>
    </>
  );
};

export default CourseDetails;