import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const EditCourse = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('Introduction to UI/UX Engineering Layouts');
  const [category, setCategory] = useState('Design Systems');

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/admin/courses');
  };

  return (
    <>
      <header className="content-header">
        <div>
          <h1>Edit Course Parameters</h1>
          <p>Update live course information and domain details.</p>
        </div>
      </header>

      <div className="admin-form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Course Title</label>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Domain Category Classification</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="Design Systems">Design Systems</option>
              <option value="Engineering">Engineering</option>
            </select>
          </div>
          <div className="form-actions-right" style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
            <Link to="/admin/courses" className="btn btn-secondary">Cancel</Link>
            <button type="submit" className="btn btn-dark">Update Course Asset</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditCourse;