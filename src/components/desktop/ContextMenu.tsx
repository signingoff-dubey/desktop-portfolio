import React, { useState, useEffect, useRef } from 'react';
import { useWindows } from '../../context/WindowContext';

interface Props {
  x: number;
  y: number;
  onClose: () => void;
}

export default function ContextMenu({ x, y, onClose }: Props) {
  const { openWindow, closeWindow, windows } = useWindows();
  const menuRef = useRef<HTMLDivElement>(null);
  const [showGames, setShowGames] = useState(false);
  const [menuSize, setMenuSize] = useState({ width: 200, height: 350 });

  useEffect(() => {
    if (menuRef.current) {
      const rect = menuRef.current.getBoundingClientRect();
      setMenuSize({ width: rect.width, height: rect.height });
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleAction = (action: () => void) => {
    action();
    onClose();
  };

  const finalX = Math.max(0, Math.min(x, window.innerWidth - menuSize.width));
  const finalY = Math.max(0, Math.min(y, window.innerHeight - menuSize.height));

  const menuStyle: React.CSSProperties = {
    position: 'absolute',
    left: finalX,
    top: finalY,
    background: 'var(--color-window-bg, hsl(240 100% 27%))',
    border: '2px solid',
    borderColor: 'var(--color-border-light)',
    boxShadow: '4px 4px 0 rgba(0,0,0,0.5)',
    zIndex: 9999,
    minWidth: 200,
    padding: '4px 0',
    color: 'var(--color-phosphor-white)',
    fontSize: 15,
  };

  const itemStyle: React.CSSProperties = {
    padding: '6px 16px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  };

  const sepStyle: React.CSSProperties = {
    height: 1,
    background: 'var(--color-border-dark)',
    margin: '4px 8px',
  };

  return (
    <div ref={menuRef} style={menuStyle} onContextMenu={e => e.preventDefault()}>
      <div className="start-menu-item" style={itemStyle} onClick={() => handleAction(() => openWindow('files'))}>
        <span>📁</span> Open File Manager
      </div>
      <div className="start-menu-item" style={itemStyle} onClick={() => handleAction(() => openWindow('terminal'))}>
        <span>&gt;_</span> Open Terminal
      </div>
      <div className="start-menu-item" style={itemStyle} onClick={() => handleAction(() => openWindow('network'))}>
        <span>🌐</span> Network Monitor
      </div>
      <div className="start-menu-item" style={itemStyle} onClick={() => handleAction(() => openWindow('minesweeper'))}>
        <span>💣</span> Play Minesweeper
      </div>
      <div className="start-menu-item" style={itemStyle} onClick={() => handleAction(() => openWindow('resume'))}>
        <span>📄</span> View Resume
      </div>
      
      <div style={sepStyle} />
      
      <div className="start-menu-item" style={itemStyle} onClick={() => handleAction(() => {
        const idsToClose = windows.map(w => w.id);
        idsToClose.forEach(id => closeWindow(id));
      })}>
        <span>🔄</span> Refresh Desktop
      </div>
      
      <div 
        className="start-menu-item" 
        style={{ ...itemStyle, position: 'relative' }}
        onMouseEnter={() => setShowGames(true)}
        onMouseLeave={() => setShowGames(false)}
      >
        <span>🎮</span> Games <span style={{ marginLeft: 'auto' }}>▶</span>
        {showGames && (
          <div style={{
            position: 'absolute',
            left: finalX + menuSize.width > window.innerWidth ? 'auto' : '100%',
            right: finalX + menuSize.width > window.innerWidth ? '100%' : 'auto',
            top: -2,
            background: 'var(--color-window-bg, hsl(240 100% 27%))',
            border: '2px solid var(--color-border-light)',
            boxShadow: '4px 4px 0 rgba(0,0,0,0.5)',
            minWidth: 150,
            padding: '4px 0',
          }}>
            <div className="start-menu-item" style={itemStyle} onClick={(e) => { e.stopPropagation(); handleAction(() => openWindow('tetris')); }}>
              <span>🧱</span> Tetris
            </div>
            <div className="start-menu-item" style={itemStyle} onClick={(e) => { e.stopPropagation(); handleAction(() => openWindow('snake')); }}>
              <span>🐍</span> Snake
            </div>
            <div className="start-menu-item" style={itemStyle} onClick={(e) => { e.stopPropagation(); handleAction(() => openWindow('minesweeper')); }}>
              <span>💣</span> Minesweeper
            </div>
          </div>
        )}
      </div>

      <div className="start-menu-item" style={itemStyle} onClick={() => handleAction(() => openWindow('display'))}>
        <span>🖥️</span> Display Settings
      </div>

      <div style={sepStyle} />

      <div className="start-menu-item" style={itemStyle} onClick={() => handleAction(() => openWindow('about'))}>
        <span>ℹ️</span> About KABIR-OS
      </div>
    </div>
  );
}
