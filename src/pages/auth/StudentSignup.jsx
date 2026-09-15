import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const StudentSignup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleStudentSignup = (e) => {
    e.preventDefault();

    const studentData = { name, email, password, role: 'student' };

    // Save registered student account and set active user session
    localStorage.setItem('ss_student_account', JSON.stringify(studentData));
    localStorage.setItem('ss_active_user', JSON.stringify(studentData));

    // Redirect to Student Dashboard
    navigate('/student/dashboard');
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card" style={{ background: '#ffffff', padding: '2rem', borderRadius: '8px', borderTop: '4px solid #2563eb' }}>
        <h2 style={{ color: '#0f172a', marginBottom: '0.5rem' }}>Student Account Registration</h2>
        <p style={{ color: '#475569', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          Create your account to access course tracks and materials.
        </p>

        <form onSubmit={handleStudentSignup}>
          <div className="form-group">
            <label style={{ color: '#0f172a', fontWeight: 600 }}>Full Name</label>
            <input 
              type="text" 
              placeholder="Your Full Name"
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>

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
            Complete Student Registration
          </button>
        </form>

        <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.85rem', color: '#475569' }}>
          Already registered? <Link to="/auth/login" style={{ color: '#2563eb', fontWeight: 600 }}>Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default StudentSignup;