import React from 'react';

const Notifications = () => {
  return (
    <>
      <header className="content-header">
        <div>
          <h1>System Operational Alerts & Logs</h1>
          <p>Review system level triggers, course publication updates, and admin activity.</p>
        </div>
      </header>

      <div className="workspace-main">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ padding: '1rem', borderLeft: '4px solid #10b981', backgroundColor: '#f8fafc', borderRadius: '4px' }}>
            <h4 style={{ margin: 0 }}>New Course Track Provisioned</h4>
            <p style={{ margin: '0.25rem 0 0 0', color: '#64748b', fontSize: '0.9rem' }}>
              "Modern Javascript Architectural Patterns" was set to Live status by Admin.
            </p>
          </div>
          <div style={{ padding: '1rem', borderLeft: '4px solid #3b82f6', backgroundColor: '#f8fafc', borderRadius: '4px' }}>
            <h4 style={{ margin: 0 }}>Batch Enrollment Milestone Reached</h4>
            <p style={{ margin: '0.25rem 0 0 0', color: '#64748b', fontSize: '0.9rem' }}>
              System surpassed 1,200 active registered users.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notifications;