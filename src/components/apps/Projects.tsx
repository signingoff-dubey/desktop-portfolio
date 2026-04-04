import { useState } from 'react';
import { projects } from '../../data/projects';

export default function Projects() {
  const [selected, setSelected] = useState<string | null>(null);
  const proj = selected ? projects.find(p => p.id === selected) : null;

  if (proj) {
    return (
      <div style={{ fontSize: 15, lineHeight: 1.6 }}>
        <button
          onClick={() => setSelected(null)}
          style={{
            background: 'transparent', border: '1px solid hsl(240 60% 50%)',
            color: 'hsl(120 100% 54%)', padding: '4px 12px', cursor: 'pointer',
            fontFamily: "'VT323', monospace", fontSize: 14, marginBottom: 12,
          }}
        >
          ← Back to Projects
        </button>
        <h3 style={{ color: 'white', fontSize: 20, marginBottom: 4 }}>{proj.icon} {proj.title}</h3>
        <p style={{ color: 'hsl(0 0% 60%)', marginBottom: 12 }}>{proj.subtitle}</p>
        <p style={{ color: 'hsl(0 0% 85%)', marginBottom: 16 }}>{proj.description}</p>

        {(proj.repoUrl || proj.demoUrl) && (
          <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
            {proj.repoUrl && (
              <a href={proj.repoUrl} target="_blank" rel="noopener noreferrer" style={{
                background: 'hsl(240 100% 25%)', color: 'hsl(120 100% 54%)',
                border: '1px solid hsl(120 100% 54%)', padding: '4px 12px',
                textDecoration: 'none', cursor: 'pointer'
              }}>⚲ VIEW SOURCE</a>
            )}
            {proj.demoUrl && (
              <a href={proj.demoUrl} target="_blank" rel="noopener noreferrer" style={{
                background: 'hsl(120 100% 25%)', color: 'white',
                border: '1px solid hsl(120 100% 54%)', padding: '4px 12px',
                textDecoration: 'none', cursor: 'pointer'
              }}>▶ LIVE DEMO</a>
            )}
          </div>
        )}

        <div style={{ marginBottom: 12 }}>
          <span style={{ color: 'hsl(120 100% 54%)' }}>[Tech Stack]</span>
          <div style={{ color: 'hsl(0 0% 85%)', paddingLeft: 12, marginTop: 4 }}>
            {proj.techStack.join(', ')}
          </div>
        </div>

        {proj.metrics && (
          <div>
            <span style={{ color: 'hsl(60 100% 50%)' }}>[Impact]</span>
            {proj.metrics.map((m, i) => (
              <div key={i} style={{ color: 'hsl(0 0% 85%)', paddingLeft: 12 }}>&gt; {m}</div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <p style={{ color: 'hsl(0 0% 65%)', fontSize: 14, marginBottom: 12 }}>
        Click a project to view the full case study:
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 10 }}>
        {projects.map(p => (
          <div
            key={p.id}
            className="project-card"
            onClick={() => setSelected(p.id)}
          >
            <div style={{ fontSize: 24, marginBottom: 6 }}>{p.icon}</div>
            <div style={{ color: 'white', fontSize: 15, fontWeight: 'normal', marginBottom: 2 }}>{p.title}</div>
            <div style={{ color: 'hsl(0 0% 55%)', fontSize: 12 }}>{p.subtitle}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
