import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ManageCourses = () => {
  const [courses, setCourses] = useState([
    { id: 1, title: 'Introduction to UI/UX Engineering Layouts', category: 'Design Systems', status: 'Published' },
    { id: 2, title: 'Modern Javascript Architectural Patterns', category: 'Engineering', status: 'Published' }
  ]);

  const handleDelete = (id) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  return (
    <>
      <header className="content-header">
        <div>
          <h1>Manage Course Catalog</h1>
          <p>Control live courses, edit system parameters, or purge deprecated modules.</p>
        </div>
        <Link to="/admin/add-course" className="btn btn-primary">+ Create Course</Link>
      </header>

      <div className="workspace-main">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Course Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(course => (
              <tr key={course.id}>
                <td><strong>{course.title}</strong></td>
                <td>{course.category}</td>
                <td><span style={{ color: '#10b981', fontWeight: 600 }}>{course.status}</span></td>
                <td style={{ display: 'flex', gap: '0.5rem' }}>
                  <Link to="/admin/edit-course" className="btn btn-secondary" style={{ padding: '0.25rem 0.5rem' }}>Edit</Link>
                  <button onClick={() => handleDelete(course.id)} className="btn btn-secondary" style={{ padding: '0.25rem 0.5rem', color: '#ef4444' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ManageCourses;