import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const AdminSignup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAdminSignup = (e) => {
    e.preventDefault();

    const adminData = { name, email, password, role: 'admin' };

    // Store administrator credentials and active session
    localStorage.setItem('ss_admin_account', JSON.stringify(adminData));
    localStorage.setItem('ss_active_user', JSON.stringify(adminData));

    // Redirect to Admin Dashboard
    navigate('/admin/dashboard');
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card" style={{ background: '#ffffff', padding: '2rem', borderRadius: '8px', borderTop: '4px solid #0f172a' }}>
        <h2 style={{ color: '#0f172a', marginBottom: '0.5rem' }}>Administrator Registration</h2>
        <p style={{ color: '#475569', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          Create an administrator account to oversee tracks and students.
        </p>

        <form onSubmit={handleAdminSignup}>
          <div className="form-group">
            <label style={{ color: '#0f172a', fontWeight: 600 }}>Full Name</label>
            <input 
              type="text" 
              placeholder="System Admin"
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>

          <div className="form-group">
            <label style={{ color: '#0f172a', fontWeight: 600 }}>Admin Email Address</label>
            <input 
              type="email" 
              placeholder="admin@studysphere.com"
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

          <button type="submit" className="btn btn-dark" style={{ width: '100%', marginTop: '1rem', background: '#0f172a', color: '#fff', padding: '0.75rem', border: 'none', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}>
            Complete Admin Registration
          </button>
        </form>

        <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.85rem', color: '#475569' }}>
          Already registered? <Link to="/auth/admin-login" style={{ color: '#2563eb', fontWeight: 600 }}>Admin Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default AdminSignup;