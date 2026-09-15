import React from 'react';
import { Link } from 'react-router-dom';

const Progress = () => {
  return (
    <>
      <header className="content-header">
        <div>
          <h1>Learning Achievements & Progress</h1>
          <p>Track completed courses and claim completion certificates.</p>
        </div>
      </header>

      <div className="workspace-main">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3>Modern JavaScript Architectural Patterns</h3>
            <span style={{ color: '#10b981', fontWeight: 600 }}>100% Completed</span>
          </div>
          <Link to="/student/certificate" className="btn btn-secondary">View Certificate</Link>
        </div>
      </div>
    </>
  );
};

export default Progress;