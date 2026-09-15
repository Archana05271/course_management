import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const StudentLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleStudentLogin = (e) => {
    e.preventDefault();

    const registeredStudent = JSON.parse(localStorage.getItem('ss_student_account'));

    // Check if account exists and credentials match
    if (!registeredStudent || registeredStudent.email !== email || registeredStudent.password !== password) {
      setError('Access Denied: Student account not registered. Please sign up first.');
      return;
    }

    // Store active user session
    localStorage.setItem('ss_active_user', JSON.stringify({ ...registeredStudent, role: 'student' }));

    // Redirect to Student Dashboard
    navigate('/student/dashboard');
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card" style={{ background: '#ffffff', padding: '2rem', borderRadius: '8px', borderTop: '4px solid #2563eb' }}>
        <h2 style={{ color: '#0f172a', marginBottom: '0.5rem' }}>Student Portal Login</h2>
        <p style={{ color: '#475569', fontSize: '0.9rem', marginBottom: '1rem' }}>
          Sign in to your student workspace.
        </p>

        {error && (
          <div style={{ padding: '0.75rem', background: '#fef2f2', border: '1px solid #fca5a5', color: '#991b1b', borderRadius: '6px', fontSize: '0.85rem', marginBottom: '1rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleStudentLogin}>
          <div className="form-group">
            <label style={{ color: '#0f172a', fontWeight: 600 }}>Email Address</label>
            <input 
              type="email" 
              placeholder="student@example.com"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>

          <div className="form-group">
            <label style={{ color: '#0f172a', fontWeight: 600 }}>Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', background: '#2563eb', color: '#fff', padding: '0.75rem', border: 'none', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}>
            Login as Student
          </button>
        </form>

        <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.85rem', color: '#475569' }}>
          Not enrolled yet? <Link to="/auth/signup" style={{ color: '#2563eb', fontWeight: 600 }}>Register as Student</Link>
        </p>
      </div>
    </div>
  );
};

export default StudentLogin;