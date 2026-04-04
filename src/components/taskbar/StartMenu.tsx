import { useWindows } from '../../context/WindowContext';

const MENU_ITEMS = [
  { label: 'Terminal', icon: '▶', appId: 'terminal' },
  { label: 'File Manager', icon: '📁', appId: 'files' },
  { label: 'Projects', icon: '📦', appId: 'projects' },
  { label: 'Experience', icon: '📋', appId: 'experience' },
  { label: 'About Me', icon: '👤', appId: 'about' },
  { label: 'Tech Stack', icon: '⚙️', appId: 'skills' },
  { label: 'Skills Radar', icon: '📊', appId: 'radar' },
  { label: 'Certifications', icon: '🏆', appId: 'achievements' },
  { label: 'Resume', icon: '📄', appId: 'resume' },
  { label: 'Code Playground', icon: '💻', appId: 'code' },
  { label: 'Career Timeline', icon: '📅', appId: 'timeline' },
  { label: 'Display Settings', icon: '🖥️', appId: 'display' },
  { label: 'Tetris', icon: '🎮', appId: 'tetris' },
];

interface Props {
  onClose: () => void;
}

export default function StartMenu({ onClose }: Props) {
  const { openWindow } = useWindows();

  const handleClick = (appId: string) => {
    openWindow(appId);
    onClose();
  };

  return (
    <div
      className="start-menu"
      style={{
        position: 'fixed',
        bottom: 42,
        left: 4,
        width: 220,
        maxHeight: 'calc(100vh - 60px)',
        overflow: 'auto',
        zIndex: 9500,
      }}
    >
      {/* Header */}
      <div style={{
        padding: '8px 12px',
        borderBottom: '1px solid hsl(240 60% 50%)',
        color: 'white',
        fontSize: 14,
        letterSpacing: 1,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}>
        <span style={{ fontSize: 14 }}>≡</span>
        <span>PY-OS START</span>
      </div>

      {/* Items */}
      {MENU_ITEMS.map(item => (
        <div
          key={item.appId}
          className="start-menu-item"
          onClick={() => handleClick(item.appId)}
        >
          <span style={{ fontSize: 16, width: 24, textAlign: 'center' }}>{item.icon}</span>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}
