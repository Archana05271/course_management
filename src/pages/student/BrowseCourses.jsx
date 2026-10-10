import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BrowseCourses = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  // Fetch all courses on initial page load
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/v1/courses');
      setCourses(response.data.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching courses:", err);
    }
  };

  // Search handler connected to your backend 404 route
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      fetchCourses();
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/api/v1/courses/search?query=${searchTerm}`);
      setCourses(response.data.data);
      setError(null);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setCourses([]); // Clear course grid
        setError(err.response.data.message); // Displays "Subject is out of the box or unavailable."
      }
    }
  };

  return (
    <div className="browse-courses-container" style={{ padding: '2rem' }}>
      <h2>Browse Courses</h2>
      
      {/* Search Bar Form */}
      <form onSubmit={handleSearch} style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.5rem' }}>
        <input 
          type="text" 
          placeholder="Search subjects (e.g., Python, QuantumPhysics)..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '0.6rem', width: '60%', borderRadius: '6px', border: '1px solid #cbd5e1' }}
        />
        <button type="submit" style={{ padding: '0.6rem 1.2rem', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
          Search
        </button>
      </form>

      {/* 404 / Error Message Banner */}
      {error && (
        <div style={{ padding: '1rem', backgroundColor: '#fee2e2', color: '#b91c1c', borderRadius: '6px', marginBottom: '1rem', border: '1px solid #fca5a5' }}>
          {error}
        </div>
      )}

      {/* Course Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
        {courses.map((course) => (
          <div key={course.id} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem', background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#1e293b' }}>{course.courseName}</h3>
            <p style={{ margin: '0.2rem 0', color: '#64748b' }}><strong>Code:</strong> {course.courseCode}</p>
            <p style={{ margin: '0.2rem 0', color: '#64748b' }}><strong>Instructor:</strong> {course.instructor}</p>
            <p style={{ margin: '0.2rem 0', color: '#64748b' }}><strong>Category:</strong> {course.category}</p>
            <p style={{ marginTop: '0.5rem', color: '#334155' }}>{course.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseCourses;