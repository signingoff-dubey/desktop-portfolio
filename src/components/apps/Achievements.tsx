import { useState } from 'react';
import { achievements } from '../../data/achievements';

export default function Achievements() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const hackathons = achievements.filter(a => a.type === 'hackathon');
  const certs = achievements.filter(a => a.type === 'certification');

  if (selectedImage) {
    return (
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 50, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        <button onClick={() => setSelectedImage(null)} style={{ alignSelf: 'flex-end', background: 'transparent', border: '1px solid hsl(0 70% 60%)', color: 'hsl(0 70% 60%)', padding: '4px 16px', cursor: 'pointer', fontFamily: "'VT323', monospace", fontSize: 16, marginBottom: 10 }}>[X] CLOSE IMAGE</button>
        <img src={selectedImage} alt="Certificate Full" style={{ maxWidth: '100%', maxHeight: '85vh', objectFit: 'contain', border: '2px solid hsl(120 100% 54%)' }} />
      </div>
    );
  }

  return (
    <div style={{ fontSize: 15, lineHeight: 1.6 }}>
      <div style={{ color: 'hsl(120 100% 54%)', fontSize: 18, marginBottom: 16 }}>
        🏆 ACHIEVEMENTS &amp; AWARDS
      </div>

      {/* Hackathons */}
      <div style={{ color: 'hsl(0 0% 65%)', marginBottom: 8, fontSize: 14 }}>— HACKATHONS —</div>
      {hackathons.map((h, i) => (
        <div
          key={i}
          style={{
            background: 'hsl(240 100% 25%)',
            border: '1px solid hsl(240 60% 45%)',
            padding: '10px 14px',
            marginBottom: 8,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
            <div>
              <div style={{ color: 'hsl(60 100% 50%)', fontSize: 16 }}>{h.icon} {h.place}</div>
              <div style={{ color: 'white', fontSize: 15, marginTop: 2 }}>{h.title}</div>
              <div style={{ color: 'hsl(0 0% 55%)', fontSize: 12 }}>
                {h.organization}
              </div>
            </div>
            <div style={{ color: 'hsl(0 0% 60%)', fontSize: 14, flexShrink: 0 }}>{h.year}</div>
          </div>
          {h.image && (
            <div style={{ display: 'flex', gap: 10, marginTop: 10, flexWrap: 'wrap' }}>
              <img src={h.image} alt="Hackathon" onClick={() => setSelectedImage(h.image!)} style={{ maxHeight: 120, border: '1px solid #555', cursor: 'pointer' }} />
              {h.image2 && <img src={h.image2} alt="Hackathon Cert" onClick={() => setSelectedImage(h.image2!)} style={{ maxHeight: 120, border: '1px solid #555', cursor: 'pointer' }} />}
            </div>
          )}
        </div>
      ))}

      {/* Certifications */}
      <div style={{ color: 'hsl(0 0% 65%)', margin: '16px 0 8px', fontSize: 14 }}>— CERTIFICATIONS —</div>
      {certs.map((c, i) => (
        <div key={i} style={{ marginBottom: 12, paddingLeft: 4 }}>
          <div style={{ color: 'hsl(120 100% 54%)', fontWeight: 'bold' }}>
            ✓ {c.title}
          </div>
          <div style={{ color: 'hsl(0 0% 60%)', fontSize: 13, paddingLeft: 18 }}>{c.organization} ({c.year})</div>
          {c.credentialId && (
            <div style={{ color: 'hsl(0 0% 50%)', fontSize: 12, paddingLeft: 18 }}>Credential ID: {c.credentialId}</div>
          )}
          {c.image && (
            <div style={{ paddingLeft: 18, marginTop: 4 }}>
              <img src={c.image} alt="Certification" onClick={() => setSelectedImage(c.image!)} style={{ maxHeight: 80, border: '1px solid #444', cursor: 'pointer' }} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
