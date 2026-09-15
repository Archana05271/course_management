import React from 'react';

const Certificate = () => {
  return (
    <>
      <header className="content-header">
        <div>
          <h1>Verified Achievement Certificate</h1>
          <p>Official record of track completion.</p>
        </div>
        <button onClick={() => window.print()} className="btn btn-dark">Print / Download PDF</button>
      </header>

      <div className="workspace-main" style={{ textAlign: 'center', padding: '3rem 2rem', border: '8px double #e2e8f0' }}>
        <h2 style={{ fontSize: '2rem', letterSpacing: '2px', color: '#0f172a' }}>CERTIFICATE OF COMPLETION</h2>
        <p style={{ marginTop: '1rem', color: '#64748b' }}>This certificate is proudly presented to</p>
        <h3 style={{ fontSize: '1.75rem', color: '#2563eb', margin: '0.5rem 0' }}>Jane Student</h3>
        <p style={{ color: '#64748b', maxWidth: '500px', margin: '0 auto' }}>
          For successfully completing the comprehensive track in <strong>Modern JavaScript Architectural Patterns</strong>.
        </p>
        <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'space-around', fontSize: '0.85rem', color: '#64748b' }}>
          <div>
            <p><strong>Date Issued:</strong> September 2026</p>
          </div>
          <div>
            <p><strong>Issuer:</strong> StudySphere Platform</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Certificate;