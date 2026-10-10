import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch all courses from the backend server
  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/v1/courses');
      setCourses(response.data.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching courses:", err);
      setError("Failed to load courses from backend.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Handle Delete CRUD Operation
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await axios.delete(`http://localhost:5000/api/v1/courses/${id}`);
        // Refresh course list after deletion
        fetchCourses();
      } catch (err) {
        alert("Failed to delete course: " + (err.response?.data?.message || err.message));
      }
    }
  };

  // Handle Edit CRUD Navigation
  const handleEdit = (course) => {
    navigate('/admin/edit-course', { state: { course } });
  };

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div>
          <h2>Manage Course Catalog</h2>
          <p style={{ color: '#64748b', margin: 0 }}>
            Control live courses, edit system parameters, or purge deprecated modules.
          </p>
        </div>
        <button 
          onClick={() => navigate('/admin/add-course')}
          style={{ padding: '0.6rem 1.2rem', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          + Create Course
        </button>
      </div>

      {loading && <p>Loading catalog from server...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && (
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                <th style={{ padding: '1rem', color: '#475569', fontSize: '0.85rem' }}>COURSE TITLE</th>
                <th style={{ padding: '1rem', color: '#475569', fontSize: '0.85rem' }}>CATEGORY</th>
                <th style={{ padding: '1rem', color: '#475569', fontSize: '0.85rem' }}>STATUS</th>
                <th style={{ padding: '1rem', color: '#475569', fontSize: '0.85rem' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {courses.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ padding: '1.5rem', textAlign: 'center', color: '#64748b' }}>
                    No courses available. Click "+ Create Course" to add one!
                  </td>
                </tr>
              ) : (
                courses.map((course) => (
                  <tr key={course.id || course._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '1rem', fontWeight: 'bold', color: '#1e293b' }}>
                      {course.courseName || course.title}
                    </td>
                    <td style={{ padding: '1rem', color: '#475569' }}>
                      {course.category || 'General'}
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ color: '#16a34a', fontWeight: 'bold', background: '#f0fdf4', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>
                        {course.status || 'Published'}
                      </span>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <button 
                        onClick={() => handleEdit(course)}
                        style={{ padding: '0.3rem 0.8rem', marginRight: '0.5rem', background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: 'pointer' }}
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(course.id || course._id)}
                        style={{ padding: '0.3rem 0.8rem', background: '#fef2f2', color: '#dc2626', border: '1px solid #fca5a5', borderRadius: '4px', cursor: 'pointer' }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageCourses;