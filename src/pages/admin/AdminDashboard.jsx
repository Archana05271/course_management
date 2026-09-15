import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <>
      <header className="content-header">
        <div>
          <h1>Admin Command Console</h1>
          <p>System operational stats, user enrollments, and course status updates.</p>
        </div>
        <Link to="/admin/add-course" className="btn btn-primary">+ Add New Course</Link>
      </header>

      <section className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon">📚</div>
          <div>
            <span style={{ color: '#64748b', fontSize: '0.85rem' }}>Active Courses</span>
            <h3 style={{ fontSize: '1.5rem', margin: 0 }}>14 Tracks</h3>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon">👥</div>
          <div>
            <span style={{ color: '#64748b', fontSize: '0.85rem' }}>Total Students</span>
            <h3 style={{ fontSize: '1.5rem', margin: 0 }}>1,240 Users</h3>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminDashboard;