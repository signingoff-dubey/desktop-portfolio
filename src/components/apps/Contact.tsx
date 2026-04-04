
export default function Contact() {
  return (
    <div style={{ fontSize: 15, lineHeight: 1.7 }}>
      <div style={{ color: 'hsl(120 100% 54%)', fontSize: 18, marginBottom: 16 }}>
        📧 CONTACT
      </div>

      <div style={{ marginBottom: 16 }}>
        <div style={{ color: 'hsl(0 0% 80%)', marginBottom: 6 }}>
          Interested in working together? Reach out:
        </div>
      </div>

      <div style={{ marginBottom: 10 }}>
        <span style={{ color: 'hsl(120 100% 54%)' }}>GitHub: </span>
        <a href="https://github.com/signingoff-dubey" target="_blank" rel="noopener noreferrer" referrerPolicy="no-referrer" style={{ color: 'hsl(0 0% 85%)', textDecoration: 'underline' }}>
          /signingoff-dubey
        </a>
      </div>

      <div style={{ marginBottom: 10 }}>
        <span style={{ color: 'hsl(120 100% 54%)' }}>LinkedIn: </span>
        <a href="https://linkedin.com/in/aryan-dubey-9b2271357/" target="_blank" rel="noopener noreferrer" referrerPolicy="no-referrer" style={{ color: 'hsl(0 0% 85%)', textDecoration: 'underline' }}>
          /in/aryan-dubey-9b2271357/
        </a>
      </div>

      <div style={{ marginBottom: 10 }}>
        <span style={{ color: 'hsl(120 100% 54%)' }}>Email: </span>
        <a href="mailto:kabir.aryandubey@gmail.com" style={{ color: 'hsl(0 0% 85%)', textDecoration: 'underline' }}>
          kabir.aryandubey@gmail.com
        </a>
      </div>

      <div style={{ marginBottom: 10 }}>
        <span style={{ color: 'hsl(120 100% 54%)' }}>Location: </span>
        <span style={{ color: 'hsl(0 0% 85%)' }}>Bengaluru, India</span>
      </div>

      <div style={{ color: 'hsl(0 0% 45%)', fontSize: 13, marginTop: 20, borderTop: '1px solid hsl(240 60% 40%)', paddingTop: 8 }}>
        Response time: Usually within 24 hours
      </div>
    </div>
  );
}
