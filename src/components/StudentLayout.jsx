import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const StudentLayout = () => {
  const studentLinks = [
    { path: '/student/dashboard', label: 'Dashboard', icon: '🏠' },
    { path: '/student/browse', label: 'Browse Courses', icon: '🔍' },
    { path: '/student/my-courses', label: 'My Courses', icon: '📚' },
    { path: '/student/progress', label: 'My Progress', icon: '📈' },
    { path: '/student/materials', label: 'Course Assets', icon: '📁' },
    { path: '/student/notifications', label: 'Notifications', icon: '🔔' }
  ];

  return (
    <div className="dashboard-body">
      <Navbar role="Student" />
      <div className="dashboard-wrapper">
        <Sidebar links={studentLinks} />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;