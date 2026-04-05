
const FILES = [
  { name: 'welcome_message.txt', size: '1.2 KB', type: 'TXT' },
  { name: 'init_portfolio.sh', size: '0.8 KB', type: 'SH' },
  { name: 'about.md', size: '2.1 KB', type: 'MD' },
  { name: 'resume.pdf', size: '145 KB', type: 'PDF' },
  { name: 'skills.cfg', size: '0.5 KB', type: 'CFG' },
  { name: 'experience.log', size: '3.4 KB', type: 'LOG' },
  { name: 'achievements.txt', size: '1.8 KB', type: 'TXT' },
  { name: 'contact.vcf', size: '0.3 KB', type: 'VCF' },
  { name: 'projects/', size: '—', type: 'DIR' },
  { name: 'assets/', size: '—', type: 'DIR' },
];

export default function FileManager() {
  return (
    <div style={{ fontSize: 14 }}>
      <div style={{ color: 'hsl(120 100% 54%)', marginBottom: 8 }}>
        C:\Users\Kabir\Portfolio\
      </div>

      {/* Header */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 80px 50px',
        padding: '4px 8px',
        borderBottom: '1px solid hsl(240 60% 45%)',
        color: 'hsl(0 0% 65%)',
        fontSize: 13,
      }}>
        <span>Name</span>
        <span>Size</span>
        <span>Type</span>
      </div>

      {/* Files */}
      {FILES.map((f, i) => (
        <div
          key={i}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 80px 50px',
            padding: '3px 8px',
            cursor: 'pointer',
            color: f.type === 'DIR' ? 'hsl(60 100% 50%)' : 'hsl(0 0% 85%)',
          }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-title-bar)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
        >
          <span>{f.type === 'DIR' ? '📁 ' : '📄 '}{f.name}</span>
          <span style={{ color: 'hsl(0 0% 55%)' }}>{f.size}</span>
          <span style={{ color: 'hsl(0 0% 55%)' }}>{f.type}</span>
        </div>
      ))}

      <div style={{ color: 'hsl(0 0% 45%)', fontSize: 12, marginTop: 12 }}>
        {FILES.length} items | Free Space: 512 KB
      </div>
    </div>
  );
}
