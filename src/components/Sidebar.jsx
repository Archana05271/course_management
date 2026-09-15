import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ links = [] }) => {
  return (
    <aside className="sidebar">
      <nav className="sidebar-menu" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '1rem' }}>
        {links.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            className={({ isActive }) => (isActive ? 'menu-item active' : 'menu-item')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', borderRadius: '6px', textDecoration: 'none', color: '#475569' }}
          >
            <span>{link.icon}</span>
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;