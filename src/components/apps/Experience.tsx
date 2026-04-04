import { experience } from '../../data/experience';

export default function Experience() {
  return (
    <div style={{ fontSize: 16, lineHeight: 1.6 }}>
      <div style={{ color: 'white', fontSize: 18, marginBottom: 16 }}>EXPERIENCE_LOG</div>
      {experience.map(exp => (
        <div key={exp.id} style={{ marginBottom: 20 }}>
          <div style={{ color: 'hsl(60 100% 50%)', fontSize: 15, marginBottom: 4 }}>
            [{exp.dateRange}]
          </div>
          <div style={{ color: 'white', fontSize: 17, marginBottom: 6 }}>
            {exp.company} — {exp.role}
          </div>
          {exp.highlights.map((h, i) => (
            <div key={i} style={{ color: 'hsl(0 0% 80%)', paddingLeft: 8 }}>
              &gt; {h}
            </div>
          ))}
          <div style={{ color: 'hsl(0 0% 55%)', paddingLeft: 8, marginTop: 4, fontSize: 14 }}>
            &gt; {exp.techUsed.join(', ')}
          </div>
        </div>
      ))}
    </div>
  );
}
