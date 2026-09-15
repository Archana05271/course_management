import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.svg';

const Navbar = ({ role = 'Student' }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/auth/login');
  };

  return (
    <header className="top-navbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <img src={logo} alt="StudySphere Logo" style={{ width: '32px', height: '32px' }} />
        <Link to="/" style={{ fontSize: '1.25rem', fontWeight: 'bold', textDecoration: 'none', color: '#0f172a' }}>
          Study<span style={{ color: '#2563eb' }}>Sphere</span>
        </Link>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ fontSize: '0.875rem', color: '#64748b' }}>Role: <strong>{role}</strong></span>
        <button onClick={handleLogout} className="btn btn-secondary">Sign Out</button>
      </div>
    </header>
  );
};

export default Navbar;