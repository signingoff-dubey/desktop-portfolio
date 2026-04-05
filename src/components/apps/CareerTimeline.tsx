import { timeline } from '../../data/timeline';

export default function CareerTimeline() {
  return (
    <div style={{ fontSize: 15, lineHeight: 1.5 }}>
      <div style={{ color: 'var(--color-phosphor-green)', fontSize: 18, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
        📅 CAREER TIMELINE
      </div>

      <div style={{ position: 'relative', paddingLeft: 28 }}>
        {/* Vertical line */}
        <div className="timeline-line" />

        {timeline.map((entry, i) => (
          <div key={i} style={{ position: 'relative', marginBottom: 28, paddingLeft: 8 }}>
            {/* Dot */}
            <div
              className="timeline-dot"
              style={{ position: 'absolute', left: -28 }}
            />

            {/* Date */}
            <div style={{ color: 'var(--color-phosphor-green)', fontSize: 13, marginBottom: 2 }}>
              {entry.icon} {entry.dateRange}
            </div>

            {/* Title */}
            <div style={{ color: 'var(--color-phosphor-white)', fontSize: 19, marginBottom: 2 }}>
              {entry.title}
            </div>

            {/* Org */}
            <div style={{ color: 'var(--color-phosphor-white)', opacity: 0.55, fontSize: 14 }}>
              {entry.organization}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
