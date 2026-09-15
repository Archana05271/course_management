import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import AdminLayout from './components/AdminLayout';
import StudentLayout from './components/StudentLayout';

// Auth Pages
import StudentLogin from './pages/auth/StudentLogin';
import StudentSignup from './pages/auth/StudentSignup';
import AdminLogin from './pages/auth/AdminLogin';
import AdminSignup from './pages/auth/AdminSignup';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageCourses from './pages/admin/ManageCourses';
import AddCourse from './pages/admin/AddCourse';
import EditCourse from './pages/admin/EditCourse';
import CourseDetails from './pages/admin/CourseDetails';
import StudentDirectory from './pages/admin/StudentDirectory';
import Notifications from './pages/admin/Notifications';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import BrowseCourses from './pages/student/BrowseCourses';
import MyCourses from './pages/student/MyCourses';
import CourseDetailsStudent from './pages/student/CourseDetailsStudent';
import CourseContent from './pages/student/CourseContent';
import Module from './pages/student/Module';
import VideoPlayer from './pages/student/VideoPlayer';
import Materials from './pages/student/Materials';
import Progress from './pages/student/Progress';
import Certificate from './pages/student/Certificate';
import EnrollmentSuccess from './pages/student/EnrollmentSuccess';
import NotificationsStudent from './pages/student/NotificationsStudent';

// Global Stylesheet Imports
import './css/style.css';
import './css/admin.css';
import './css/auth.css';
import './css/courses.css';
import './css/learning.css';
import './css/student.css';
import './css/responsive.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default Landing Redirect */}
        <Route path="/" element={<Navigate to="/auth/login" replace />} />

        {/* Authentication Routes */}
        <Route path="/auth/login" element={<StudentLogin />} />
        <Route path="/auth/signup" element={<StudentSignup />} />
        <Route path="/auth/admin-login" element={<AdminLogin />} />
        <Route path="/auth/admin-signup" element={<AdminSignup />} />

        {/* Admin Portal Section */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="courses" element={<ManageCourses />} />
          <Route path="add-course" element={<AddCourse />} />
          <Route path="edit-course" element={<EditCourse />} />
          <Route path="course-details" element={<CourseDetails />} />
          <Route path="students" element={<StudentDirectory />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>

        {/* Student Portal Section */}
        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<Navigate to="/student/dashboard" replace />} />
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="browse" element={<BrowseCourses />} />
          <Route path="my-courses" element={<MyCourses />} />
          <Route path="course-details" element={<CourseDetailsStudent />} />
          <Route path="content" element={<CourseContent />} />
          <Route path="module" element={<Module />} />
          <Route path="video" element={<VideoPlayer />} />
          <Route path="materials" element={<Materials />} />
          <Route path="progress" element={<Progress />} />
          <Route path="certificate" element={<Certificate />} />
          <Route path="enrollment-success" element={<EnrollmentSuccess />} />
          <Route path="notifications" element={<NotificationsStudent />} />
        </Route>

        {/* Fallback Wildcard Route */}
        <Route path="*" element={<Navigate to="/auth/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;