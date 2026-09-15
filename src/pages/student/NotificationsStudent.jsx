import React from 'react';

const NotificationsStudent = () => {
  return (
    <>
      <header className="content-header">
        <div>
          <h1>Notifications & Reminders</h1>
          <p>Updates on your active courses and platform announcements.</p>
        </div>
      </header>

      <div className="workspace-main">
        <div style={{ padding: '1rem', borderLeft: '4px solid #2563eb', background: '#f8fafc', borderRadius: '4px' }}>
          <h4 style={{ margin: 0 }}>New Resource Uploaded</h4>
          <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', color: '#64748b' }}>
            New exercise files added to Modern JavaScript Architectural Patterns.
          </p>
        </div>
      </div>
    </>
  );
};

export default NotificationsStudent;