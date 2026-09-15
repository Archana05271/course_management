import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const AdminLayout = () => {
  const adminLinks = [
    { path: '/admin/dashboard', label: 'Console', icon: '📊' },
    { path: '/admin/courses', label: 'Manage Courses', icon: '📖' },
    { path: '/admin/add-course', label: 'Add Course', icon: '➕' },
    { path: '/admin/students', label: 'Student Directory', icon: '👥' },
    { path: '/admin/notifications', label: 'System Logs', icon: '🔔' }
  ];

  return (
    <div className="dashboard-body">
      <Navbar role="Administrator" />
      <div className="dashboard-wrapper">
        <Sidebar links={adminLinks} />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;