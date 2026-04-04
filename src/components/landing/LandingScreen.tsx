
const ASCII_NAME = `
 _  __    _    ____ ___ ____  
| |/ /   / \\  | __ )_ _|  _ \\ 
| ' /   / _ \\ |  _ \\| || |_) |
| . \\  / ___ \\| |_) | ||  _ < 
|_|\\_\\/_/   \\_\\____/___|_| \\_\\
`.trim();

interface Props {
  onEnter: () => void;
  onPlayTetris: () => void;
}

export default function LandingScreen({ onEnter, onPlayTetris }: Props) {
  return (
    <div
      className="crt-overlay"
      style={{
        width: '100vw',
        height: '100vh',
        background: 'hsl(240 100% 33%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div className="landing-card" style={{ padding: '48px 56px', maxWidth: 520, width: '90%', textAlign: 'center' }}>
        {/* ASCII Art Name */}
        <pre className="ascii-art" style={{
          color: 'hsl(120 100% 54%)',
          fontSize: 'clamp(6px, 1.8vw, 9px)',
          lineHeight: 1.15,
          marginBottom: 24,
        }}>
          {ASCII_NAME}
        </pre>

        {/* Subtitle */}
        <h2 style={{ color: 'white', fontSize: 22, fontWeight: 'normal', marginBottom: 8 }}>
          Welcome to KABIR-OS v1.0
        </h2>
        <p style={{ color: 'hsl(0 0% 60%)', fontSize: 16, marginBottom: 36 }}>
          UI/UX Designer • B.Tech / B.S. Student • Hearthborn Studios
        </p>

        {/* Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button className="landing-btn" onClick={onEnter}>
            ▶ EXPLORE PORTFOLIO
          </button>
          <button className="landing-btn" onClick={onPlayTetris}>
            🎮 PLAY TETRIS
          </button>
        </div>

        <p style={{ color: 'hsl(0 0% 50%)', fontSize: 13, marginTop: 20 }}>
          You can switch anytime using the taskbar
        </p>
      </div>
    </div>
  );
}
