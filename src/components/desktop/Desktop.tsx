import { useState } from 'react';
import DesktopIconGrid from './DesktopIconGrid';
import WindowManager from '../window/WindowManager';
import Taskbar from '../taskbar/Taskbar';
import Clippy from '../clippy/Clippy';
import ContextMenu from './ContextMenu';
import WallpaperEngine from './WallpaperEngine';

export default function Desktop() {
  const [contextMenu, setContextMenu] = useState<{x: number, y: number} | null>(null);

  const handleContextMenu = (e: React.MouseEvent | any) => {
    if ((e.target as HTMLElement).closest('.win95-window, .taskbar, .clippy-window')) {
      return; // Do not override context menu if clicking inside a window/taskbar
    }
    e.preventDefault();
    setContextMenu({ x: e.pageX, y: e.pageY });
  };

  return (
    <div
      className="crt-overlay"
      onContextMenu={handleContextMenu}
      style={{
        width: '100vw',
        height: '100vh',
        background: 'transparent',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top Bar */}
      <div
        className="top-bar"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: '0 16px',
          gap: 16,
          zIndex: 8000,
          fontSize: 13,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#14FF14', display: 'inline-block' }} />
          <span style={{ color: '#14FF14' }}>Available for opportunities</span>
        </div>
        <a
          href="https://linkedin.com/in/aryan-dubey-9b2271357/"
          target="_blank"
          rel="noopener noreferrer"
          referrerPolicy="no-referrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: 'hsl(210 80% 45%)',
            padding: '2px 10px',
            borderRadius: 3,
            color: 'white',
            textDecoration: 'none',
            fontSize: 12,
          }}
        >
          🔗 LinkedIn
        </a>
      </div>

      {/* Wallpaper Layer */}
      <WallpaperEngine />

      {/* Window area */}
      <div style={{ position: 'absolute', top: 32, left: 0, right: 0, bottom: 40, zIndex: 10, pointerEvents: 'none' }}>
        <WindowManager />
      </div>

      {/* Desktop Icons */}
      <DesktopIconGrid />

      {/* Clippy */}
      <Clippy />

      {/* Taskbar */}
      <Taskbar />

      {/* Global Context Menu */}
      {contextMenu && (
        <ContextMenu x={contextMenu.x} y={contextMenu.y} onClose={() => setContextMenu(null)} />
      )}
    </div>
  );
}
