import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditCourse = () => {
  const [courseData, setCourseData] = useState({
    courseName: '',
    courseCode: '',
    instructor: '',
    duration: '',
    category: '',
    description: '',
    status: 'Active'
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams(); // Or pass course ID via state/props

  useEffect(() => {
    // If you pass course ID via router params or location state, fetch it here
    // Example: fetchCourseDetails();
  }, [id]);

  const handleChange = (e) => {
    setCourseData({
      ...courseData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Replace with your target course ID or prop ID
      const courseId = id || "1"; 
      await axios.put(`http://localhost:5000/api/v1/courses/${courseId}`, courseData);
      alert("Course updated successfully!");
      navigate('/admin/courses');
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Edit Subject / Course</h2>
      {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
      
      <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label>Course Name:</label>
          <input 
            type="text" 
            name="courseName" 
            value={courseData.courseName} 
            onChange={handleChange} 
            required 
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        <div>
          <label>Course Code:</label>
          <input 
            type="text" 
            name="courseCode" 
            value={courseData.courseCode} 
            onChange={handleChange} 
            required 
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        <div>
          <label>Instructor:</label>
          <input 
            type="text" 
            name="instructor" 
            value={courseData.instructor} 
            onChange={handleChange} 
            required 
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        <div>
          <label>Duration:</label>
          <input 
            type="text" 
            name="duration" 
            value={courseData.duration} 
            onChange={handleChange} 
            required 
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        <div>
          <label>Category:</label>
          <input 
            type="text" 
            name="category" 
            value={courseData.category} 
            onChange={handleChange} 
            required 
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        <div>
          <label>Description:</label>
          <textarea 
            name="description" 
            value={courseData.description} 
            onChange={handleChange} 
            rows="4" 
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{ padding: '0.75rem', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          {loading ? 'Updating...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default EditCourse;