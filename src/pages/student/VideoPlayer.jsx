import React from 'react';
import { Link } from 'react-router-dom';

const VideoPlayer = () => {
  return (
    <>
      <header className="content-header">
        <div>
          <h1>Lesson: Modular State Architecture</h1>
          <p>Modern JavaScript Architectural Patterns • Module 1</p>
        </div>
        <Link to="/student/content" className="btn btn-secondary">Back to Content</Link>
      </header>

      <div className="workspace-main">
        <div className="video-player-frame">
          <iframe 
            src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
            title="Course Video Player"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default VideoPlayer;