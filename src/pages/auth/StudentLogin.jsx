import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Make sure Link is imported
import { authApi } from '../../api/authApi';

export default function StudentLogin() {
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
      await authApi.login({ email, password });
      navigate('/student/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleLogin} className="auth-form">
        <h2>Student Login - StudySphere</h2>
        {error && <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
        
        <div className="form-group">
          <label>Email Address</label>
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
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {/* Navigation link to move to the Register page */}
        <p style={{ marginTop: '15px', textAlign: 'center' }}>
          Don't have an account? <Link to="/auth/signup">Register here</Link>
        </p>
      </form>
    </div>
  );
}