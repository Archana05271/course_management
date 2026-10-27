import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authApi } from '../../api/authApi';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authApi.login({ email, password });
      
      // Save token and role to sessionStorage for Admin
      const token = response.data?.token || response.token;
      const role = response.data?.user?.role || response.data?.admin?.role || 'admin';
      
      if (token) {
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('role', role);
      }

      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid admin email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleLogin} className="auth-form">
        <h2>Admin Login - StudySphere</h2>
        {error && <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
        
        <div className="form-group">
          <label>Admin Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>

        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? 'Logging in...' : 'Admin Login'}
        </button>

        <p style={{ marginTop: '15px', textAlign: 'center' }}>
          Back to <Link to="/auth/student-login">Student Login</Link>
        </p>
      </form>
    </div>
  );
}