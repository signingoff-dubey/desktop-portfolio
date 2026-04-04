import { useState } from 'react';
import { useWindows } from '../../context/WindowContext';
import { useSettings } from '../../context/SettingsContext';
import { desktopIcons } from '../../data/desktopIcons';
import MobileAppPanel from './MobileAppPanel';
import { useViewCount } from '../../hooks/useViewCount';

// Map appId → display label for the mobile grid
const APP_LABELS: Record<string, string> = {
  terminal: 'Terminal',
  about: 'About Me',
  projects: 'Projects',
  skills: 'Skills',
  experience: 'Experience',
  achievements: 'Awards',
  timeline: 'Timeline',
  radar: 'Skill Radar',
  code: 'Code Lab',
  display: 'Display',
  files: 'Files',
  resume: 'Resume',
  contact: 'Contact',
  tetris: 'Tetris',
  snake: 'Snake',
  network: 'Network',
  minesweeper: 'Minesweeper',
};

export default function MobileLayout() {
  const { openWindow, windows } = useWindows();
  const { osStyle } = useSettings();
  const [activeAppId, setActiveAppId] = useState<string | null>(null);
  const { count, loading } = useViewCount();

  const isMac = osStyle === 'mac';

  // Find the currently active window data
  const activeWindow = activeAppId
    ? windows.find(w => w.appId === activeAppId)
    : null;

  const handleIconTap = (appId: string) => {
    // Ensure the window is opened in context so apps can use useWindows()
    openWindow(appId);
    setActiveAppId(appId);
  };

  const handleClose = () => {
    setActiveAppId(null);
  };

  return (
    <div
      className="crt-overlay"
      style={{
        width: '100vw',
        height: '100vh',
        background: 'var(--color-bsod-blue)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* ── Mobile Header ── */}
      <div
        style={{
          flexShrink: 0,
          background: 'var(--color-taskbar-bg)',
          borderBottom: '2px solid var(--color-border-light)',
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div
            style={{
              fontSize: isMac ? 17 : 20,
              color: 'var(--color-phosphor-green)',
              fontFamily: isMac ? 'inherit' : "'VT323', monospace",
              letterSpacing: isMac ? 0 : 1,
            }}
          >
            {isMac ? 'KABIR-OS' : '▶ KABIR-OS'}
          </div>
          <div style={{ fontSize: 12, color: 'hsl(0 0% 55%)', marginTop: 2 }}>
            UI/UX Designer · Student
          </div>
        </div>

        {/* Status indicator */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: '#14FF14',
                display: 'inline-block',
              }}
            />
            <span style={{ fontSize: 12, color: '#14FF14' }}>Available</span>
          </div>
          <span style={{ fontSize: 11, color: 'hsl(0 0% 45%)' }}>
            {loading ? '👁 …' : count !== null ? `👁 ${count.toLocaleString()} visits` : ''}
          </span>
        </div>
      </div>

      {/* ── App Grid ── */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px 16px 32px',
        }}
      >
        {/* Section label */}
        <div
          style={{
            fontSize: 12,
            color: 'hsl(0 0% 50%)',
            letterSpacing: 2,
            marginBottom: 16,
            textTransform: 'uppercase',
          }}
        >
          — Applications —
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 12,
          }}
        >
          {desktopIcons.map(ic => (
            <MobileIconTile
              key={ic.id}
              icon={ic.icon}
              label={APP_LABELS[ic.appId] ?? ic.label}
              onTap={() => handleIconTap(ic.appId)}
            />
          ))}
        </div>

        {/* Quick links */}
        <div
          style={{
            marginTop: 28,
            padding: '16px',
            background: 'var(--color-card-bg)',
            border: '1px solid var(--color-border-light)',
          }}
        >
          <div style={{ fontSize: 12, color: 'hsl(0 0% 50%)', marginBottom: 10, letterSpacing: 1 }}>
            QUICK LINKS
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <a
              href="https://linkedin.com/in/aryan-dubey-9b2271357/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'hsl(210 80% 45%)',
                color: 'white',
                textDecoration: 'none',
                padding: '6px 14px',
                fontSize: 13,
                borderRadius: 3,
              }}
            >
              🔗 LinkedIn
            </a>
            <a
              href="https://github.com/signingoff-dubey"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'hsl(0 0% 25%)',
                color: 'white',
                textDecoration: 'none',
                padding: '6px 14px',
                fontSize: 13,
                borderRadius: 3,
              }}
            >
              ⌥ GitHub
            </a>
          </div>
        </div>
      </div>

      {/* ── Full-Screen App Panel (slides up on tap) ── */}
      {activeAppId && (
        <MobileAppPanel
          appId={activeAppId}
          title={activeWindow?.title ?? activeAppId.toUpperCase()}
          onClose={handleClose}
        />
      )}
    </div>
  );
}

/* ── Reusable icon tile ── */
interface TileProps {
  icon: string;
  label: string;
  onTap: () => void;
}

function MobileIconTile({ icon, label, onTap }: TileProps) {
  const [pressed, setPressed] = useState(false);

  return (
    <button
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => { setPressed(false); onTap(); }}
      onPointerLeave={() => setPressed(false)}
      style={{
        background: pressed
          ? 'rgba(255,255,255,0.12)'
          : 'var(--color-card-bg)',
        border: '1.5px solid var(--color-border-light)',
        borderRadius: 4,
        padding: '14px 8px 10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        cursor: 'pointer',
        color: 'var(--color-phosphor-white)',
        transition: 'background 0.1s, border-color 0.1s',
        transform: pressed ? 'scale(0.96)' : 'scale(1)',
        WebkitTapHighlightColor: 'transparent',
        userSelect: 'none',
        width: '100%',
      }}
    >
      <span style={{ fontSize: 28, lineHeight: 1 }}>{icon}</span>
      <span
        style={{
          fontSize: 11,
          color: 'hsl(0 0% 75%)',
          textAlign: 'center',
          lineHeight: 1.3,
          wordBreak: 'break-word',
        }}
      >
        {label}
      </span>
    </button>
  );
}
