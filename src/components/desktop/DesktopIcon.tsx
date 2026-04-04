import { useWindows } from '../../context/WindowContext';

interface Props {
  icon: string;
  label: string;
  appId: string;
}

export default function DesktopIcon({ icon, label, appId }: Props) {
  const { openWindow } = useWindows();

  return (
    <div
      className="desktop-icon"
      onClick={() => openWindow(appId)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: 72,
        padding: '6px 4px',
        gap: 2,
      }}
    >
      <div style={{ fontSize: 32, lineHeight: 1, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {icon}
      </div>
      <span style={{ fontSize: 12, textAlign: 'center', color: 'white', textShadow: '1px 1px 2px rgba(0,0,0,0.7)', lineHeight: 1.2 }}>
        {label}
      </span>
    </div>
  );
}
