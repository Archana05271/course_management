import React from 'react';
import { Link } from 'react-router-dom';

const EnrollmentSuccess = () => {
  return (
    <div className="workspace-main" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
      <h2>Enrollment Successful!</h2>
      <p style={{ color: '#64748b', margin: '0.5rem 0 1.5rem 0' }}>
        You are now registered for <strong>Modern JavaScript Architectural Patterns</strong>.
      </p>
      <Link to="/student/my-courses" className="btn btn-primary">Go to My Courses</Link>
    </div>
  );
};

export default EnrollmentSuccess;