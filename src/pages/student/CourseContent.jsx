import React from 'react';
import { Link } from 'react-router-dom';

const CourseContent = () => {
  return (
    <>
      <header className="content-header">
        <div>
          <h1>Modern JavaScript Architectural Patterns</h1>
          <p>Curriculum structure and active lesson modules.</p>
        </div>
      </header>

      <div className="workspace-main">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: '#f8fafc', borderRadius: '6px' }}>
            <div>
              <h4 style={{ margin: 0 }}>Module 1: Modular State Architecture</h4>
              <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', color: '#64748b' }}>Video Lecture • 18 mins</p>
            </div>
            <Link to="/student/video" className="btn btn-primary">Watch Lesson</Link>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: '#f8fafc', borderRadius: '6px' }}>
            <div>
              <h4 style={{ margin: 0 }}>Module 2: Asynchronous Event Loops</h4>
              <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', color: '#64748b' }}>Video Lecture • 24 mins</p>
            </div>
            <Link to="/student/video" className="btn btn-secondary">Watch Lesson</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseContent;