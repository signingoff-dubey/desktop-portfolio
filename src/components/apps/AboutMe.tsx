
export default function AboutMe() {
  return (
    <div style={{ fontSize: 16, lineHeight: 1.6 }}>
      {/* Banner */}
      <div style={{ marginBottom: 16 }}>
        <img 
          src="/images/my image (banner size rectangle).jpg" 
          alt="Banner" 
          style={{ width: '100%', height: 120, objectFit: 'cover', border: '1px solid hsl(0 0% 60%)' }} 
        />
      </div>

      {/* Header */}
      <div style={{ display: 'flex', gap: 20, marginBottom: 16 }}>
        <img 
          src="/images/my image.jpg" 
          alt="Aryan Dubey" 
          style={{
            width: 80, height: 90,
            objectFit: 'cover',
            border: '1px solid hsl(0 0% 60%)',
            background: 'hsl(0 0% 80%)'
          }} 
        />
        <div>
          <h2 style={{ color: 'white', fontSize: 22, fontWeight: 'normal', marginBottom: 8 }}>ARYAN DUBEY</h2>
          <p style={{ color: 'hsl(0 0% 75%)', fontSize: 15 }}>
            Innovative UI/UX Designer and incoming B.Tech/B.S. dual degree student. Proven track record leading extensive QA operations and designing immersive experiences at Hearthborn Studios.
          </p>
        </div>
      </div>

      {/* Education */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ color: 'white', fontSize: 17, marginBottom: 6 }}>Education:</div>
        <div style={{ paddingLeft: 12 }}>
          <div style={{ color: 'hsl(0 0% 85%)' }}>&gt; B.Tech Hons — R.V. University (2025-2029)</div>
          <div style={{ color: 'hsl(0 0% 85%)' }}>&gt; B.S. Data Science &amp; AI — IIT Madras (2025-2029)</div>
        </div>
      </div>

      {/* Contact */}
      <div>
        <div style={{ paddingLeft: 12 }}>
          <div style={{ color: 'hsl(0 0% 85%)' }}>&gt; LinkedIn: /in/aryan-dubey-9b2271357/</div>
          <div style={{ color: 'hsl(0 0% 85%)' }}>&gt; GitHub: /signingoff-dubey</div>
          <div style={{ color: 'hsl(0 0% 85%)' }}>&gt; Node: Bengaluru, India</div>
        </div>
      </div>
    </div>
  );
}
