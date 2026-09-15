import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleAdminLogin = (e) => {
    e.preventDefault();

    const registeredAdmin = JSON.parse(localStorage.getItem('ss_admin_account'));

    // Verify account exists and credentials match
    if (!registeredAdmin || registeredAdmin.email !== email || registeredAdmin.password !== password) {
      setError('Access Denied: Admin account not registered. Please sign up first.');
      return;
    }

    // Set active user session
    localStorage.setItem('ss_active_user', JSON.stringify({ ...registeredAdmin, role: 'admin' }));

    // Redirect to Admin Dashboard
    navigate('/admin/dashboard');
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card" style={{ background: '#ffffff', padding: '2rem', borderRadius: '8px', borderTop: '4px solid #0f172a' }}>
        <h2 style={{ color: '#0f172a', marginBottom: '0.5rem' }}>Administrator Login</h2>
        <p style={{ color: '#475569', fontSize: '0.9rem', marginBottom: '1rem' }}>
          Sign in to manage StudySphere learning paths and operations.
        </p>

        {error && (
          <div style={{ padding: '0.75rem', background: '#fef2f2', border: '1px solid #fca5a5', color: '#991b1b', borderRadius: '6px', fontSize: '0.85rem', marginBottom: '1rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleAdminLogin}>
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
            Login as Administrator
          </button>
        </form>

        <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.85rem', color: '#475569' }}>
          Not registered as an admin? <Link to="/auth/admin-signup" style={{ color: '#2563eb', fontWeight: 600 }}>Register Administrator Account</Link>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;