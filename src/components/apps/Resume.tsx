export default function Resume() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="resume-container" style={{ fontSize: 15, lineHeight: 1.6, padding: '10px 20px', color: 'hsl(0 0% 85%)', background: 'var(--color-window-bg)' }}>
      {/* NO-PRINT HEADER / ACTIONS */}
      <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, borderBottom: '1px solid hsl(240 60% 45%)', paddingBottom: 12 }}>
        <div style={{ fontSize: 18, color: 'white' }}>📄 RESUME.PDF</div>
        <button
          onClick={handlePrint}
          style={{
            background: 'hsl(120 60% 30%)',
            color: 'white',
            padding: '6px 20px',
            border: '1px solid hsl(120 60% 45%)',
            cursor: 'pointer',
            fontFamily: "'VT323', monospace",
            fontSize: 16,
          }}
        >
          🖨️ Print / Save PDF
        </button>
      </div>

      {/* PRINTABLE RESUME CONTENT */}
      <div className="printable-resume">
        <h1 style={{ color: 'white', fontSize: 28, marginBottom: 4 }}>Aryan Dubey (Kabir)</h1>
        <div style={{ color: 'hsl(120 100% 54%)', fontSize: 16, marginBottom: 16 }}>
          Software Engineer & AI Enthusiast | Bengaluru, India<br/>
          kabir.aryandubey@gmail.com | github.com/signingoff-dubey
        </div>

        <h2 style={{ color: 'var(--color-log-yellow)', borderBottom: '1px solid var(--color-border-dark)', marginTop: 20, marginBottom: 10, paddingBottom: 4 }}>[ EDUCATION ]</h2>
        <div style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'white' }}>
            <span><strong>IIT Madras</strong> — B.S. in Data Science and AI</span>
            <span>May 2025 - 2029</span>
          </div>
        </div>
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'white' }}>
            <span><strong>R.V. University Bengaluru</strong> — B.Tech (Hons)</span>
            <span>Current</span>
          </div>
        </div>
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'white' }}>
            <span><strong>St. Xavier's High School Durgapur</strong></span>
            <span>2023 - 2025</span>
          </div>
        </div>

        <h2 style={{ color: 'var(--color-log-yellow)', borderBottom: '1px solid var(--color-border-dark)', marginTop: 20, marginBottom: 10, paddingBottom: 4 }}>[ EXPERIENCE ]</h2>
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'white' }}>
            <span><strong>UI/UX Designer</strong> @ Hearthborn Studios</span>
            <span>July 2025 - Present</span>
          </div>
          <ul style={{ paddingLeft: 20, marginTop: 4 }}>
            <li>Designing intuitive and dynamic user interfaces focused on enhanced interaction.</li>
          </ul>
        </div>
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'white' }}>
            <span><strong>Testing Manager</strong> (Freelance / Contract)</span>
            <span>Past</span>
          </div>
          <ul style={{ paddingLeft: 20, marginTop: 4 }}>
            <li>Led a team of 20 testers for widespread Android application testing.</li>
            <li>Ensured backward compatibility natively across OS skins spanning from 2011 to 2023.</li>
          </ul>
        </div>

        <h2 style={{ color: 'var(--color-log-yellow)', borderBottom: '1px solid var(--color-border-dark)', marginTop: 20, marginBottom: 10, paddingBottom: 4 }}>[ SKILLS ]</h2>
        <p><strong>Languages & Frameworks:</strong> Java, Python, Kotlin, C/C++, Flutter, React</p>
        <p><strong>Domains:</strong> Android Development, Machine Learning, AI Research, UI/UX</p>
      </div>
    </div>
  );
}
