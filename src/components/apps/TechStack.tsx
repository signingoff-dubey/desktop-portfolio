import { skills } from '../../data/skills';

export default function TechStack() {
  return (
    <div style={{ fontSize: 16, lineHeight: 1.7 }}>
      <div style={{ color: 'var(--color-phosphor-green)', fontSize: 18, marginBottom: 16 }}>LOADED_MODULES</div>
      {skills.map(s => (
        <div key={s.category} style={{ marginBottom: 16 }}>
          <div style={{ color: 'var(--color-phosphor-green)' }}>[{s.category}]</div>
          <div style={{ color: 'var(--color-phosphor-white)', opacity: 0.85, paddingLeft: 24 }}>
            {s.items.join(', ')}
          </div>
        </div>
      ))}
    </div>
  );
}
