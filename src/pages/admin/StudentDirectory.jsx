import React from 'react';

const StudentDirectory = () => {
  const students = [
    { id: 1, name: 'Jane Student', email: 'jane@example.com', enrolledTrack: 'UI/UX Engineering Layouts', date: 'May 12, 2026' },
    { id: 2, name: 'John Doe', email: 'john@example.com', enrolledTrack: 'Javascript Architectural Patterns', date: 'Jun 04, 2026' }
  ];

  return (
    <>
      <header className="content-header">
        <div>
          <h1>Registered Student Directory</h1>
          <p>Audit active user enrollments, account timestamps, and registered emails.</p>
        </div>
      </header>

      <div className="workspace-main">
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Email Address</th>
                <th>Enrolled Track</th>
                <th>Registration Date</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={student.id}>
                  <td><strong>{student.name}</strong></td>
                  <td>{student.email}</td>
                  <td>{student.enrolledTrack}</td>
                  <td>{student.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default StudentDirectory;