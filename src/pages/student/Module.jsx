import React from 'react';
import { Link } from 'react-router-dom';

const Module = () => {
  return (
    <>
      <header className="content-header">
        <div>
          <h1>Module 1: Modular State Architecture</h1>
          <p>Detailed breakdown of state structures and data flow.</p>
        </div>
        <Link to="/student/video" className="btn btn-primary">Start Video</Link>
      </header>

      <div className="workspace-main">
        <h3>Module Overview</h3>
        <p style={{ color: '#475569', marginTop: '0.5rem' }}>
          This module covers the core concepts of decoupling components from global state containers using modern design patterns.
        </p>
      </div>
    </>
  );
};

export default Module;