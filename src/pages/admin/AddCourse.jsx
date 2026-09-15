import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const AddCourse = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Engineering');

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/admin/courses');
  };

  return (
    <>
      <header className="content-header">
        <div>
          <h1>Create New Course Track</h1>
          <p>Register new curriculum records for live student enrolment.</p>
        </div>
      </header>

      <div className="admin-form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Course Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="e.g. Fullstack Microservices Architecture" />
          </div>
          <div className="form-group">
            <label>Domain Category Classification</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="Engineering">Engineering</option>
              <option value="Design Systems">Design Systems</option>
              <option value="Data Science">Data Science</option>
            </select>
          </div>
          <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
            <Link to="/admin/courses" className="btn btn-secondary">Cancel</Link>
            <button type="submit" className="btn btn-primary">Save and Publish Track</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddCourse;