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
            background: 'transparent', border: '1px solid var(--color-border-light)',
            color: 'var(--color-phosphor-green)', padding: '4px 12px', cursor: 'pointer',
            fontFamily: "'VT323', monospace", fontSize: 14, marginBottom: 12,
          }}
        >
          ← Back to Projects
        </button>
        <h3 style={{ color: 'var(--color-phosphor-white)', fontSize: 20, marginBottom: 4 }}>{proj.icon} {proj.title}</h3>
        <p style={{ color: 'var(--color-phosphor-white)', opacity: 0.6, marginBottom: 12 }}>{proj.subtitle}</p>
        <p style={{ color: 'var(--color-phosphor-white)', opacity: 0.85, marginBottom: 16 }}>{proj.description}</p>

        {(proj.repoUrl || proj.demoUrl) && (
          <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
            {proj.repoUrl && (
              <a href={proj.repoUrl} target="_blank" rel="noopener noreferrer" style={{
                background: 'var(--color-dark-blue)', color: 'var(--color-phosphor-green)',
                border: '1px solid var(--color-phosphor-green)', padding: '4px 12px',
                textDecoration: 'none', cursor: 'pointer'
              }}>⚲ VIEW SOURCE</a>
            )}
            {proj.demoUrl && (
              <a href={proj.demoUrl} target="_blank" rel="noopener noreferrer" style={{
                background: 'color-mix(in srgb, var(--color-phosphor-green) 15%, transparent)', color: 'var(--color-phosphor-white)',
                border: '1px solid var(--color-phosphor-green)', padding: '4px 12px',
                textDecoration: 'none', cursor: 'pointer'
              }}>▶ LIVE DEMO</a>
            )}
          </div>
        )}

        <div style={{ marginBottom: 12 }}>
          <span style={{ color: 'var(--color-phosphor-green)' }}>[Tech Stack]</span>
          <div style={{ color: 'var(--color-phosphor-white)', opacity: 0.85, paddingLeft: 12, marginTop: 4 }}>
            {proj.techStack.join(', ')}
          </div>
        </div>

        {proj.metrics && (
          <div>
            <span style={{ color: 'var(--color-log-yellow)' }}>[Impact]</span>
            {proj.metrics.map((m, i) => (
              <div key={i} style={{ color: 'var(--color-phosphor-white)', opacity: 0.85, paddingLeft: 12 }}>&gt; {m}</div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <p style={{ color: 'var(--color-phosphor-white)', opacity: 0.65, fontSize: 14, marginBottom: 12 }}>
        Click a project to view the full case study:
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 10 }}>
        {projects.map(p => (
          <div
            key={p.id}
            className="project-card"
            onClick={() => setSelected(p.id)}
          >
            <div style={{ fontSize: 24, marginBottom: 6 }}>{p.icon}</div>
            <div style={{ color: 'var(--color-phosphor-white)', fontSize: 15, fontWeight: 'normal', marginBottom: 2 }}>{p.title}</div>
            <div style={{ color: 'var(--color-phosphor-white)', opacity: 0.55, fontSize: 12 }}>{p.subtitle}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
