import React from 'react';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
  return (
    <>
      <header className="content-header">
        <div>
          <h1>Welcome Back, Student!</h1>
          <p>Track your active courses, learning progress, and overall statistics.</p>
        </div>
        <Link to="/student/browse" className="btn btn-primary">Explore Courses</Link>
      </header>

      <section className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon">📖</div>
          <div>
            <span style={{ color: '#64748b', fontSize: '0.85rem' }}>Enrolled Courses</span>
            <h3 style={{ fontSize: '1.5rem', margin: 0 }}>2 Tracks</h3>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon">🏆</div>
          <div>
            <span style={{ color: '#64748b', fontSize: '0.85rem' }}>Certificates Earned</span>
            <h3 style={{ fontSize: '1.5rem', margin: 0 }}>1 Awarded</h3>
          </div>
        </div>
      </section>
    </>
  );
};

export default StudentDashboard;