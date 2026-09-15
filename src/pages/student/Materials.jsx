import React from 'react';

const Materials = () => {
  const assets = [
    { name: 'JavaScript Patterns CheatSheet.pdf', size: '1.2 MB' },
    { name: 'Architecture Blueprint Source.zip', size: '4.5 MB' }
  ];

  return (
    <>
      <header className="content-header">
        <div>
          <h1>Course Assets & Downloads</h1>
          <p>Access downloadable guides, project files, and code repositories.</p>
        </div>
      </header>

      <div className="workspace-main">
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {assets.map((asset, idx) => (
            <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid #e2e8f0' }}>
              <span>📄 <strong>{asset.name}</strong> <small style={{ color: '#64748b' }}>({asset.size})</small></span>
              <button className="btn btn-secondary" style={{ padding: '0.25rem 0.5rem' }}>Download</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Materials;