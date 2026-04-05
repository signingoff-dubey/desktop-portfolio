import { useState, useRef, useCallback, useEffect } from 'react';
import { useWindows } from '../../context/WindowContext';
import { useSettings } from '../../context/SettingsContext';

interface WindowProps {
  id: string;
  title: string;
  isFocused: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
  children: React.ReactNode;
}

export default function Window({ id, title, isFocused, zIndex, position, size, children }: WindowProps) {
  const { closeWindow, minimizeWindow, focusWindow, updatePosition } = useWindows();
  const { osStyle } = useSettings();
  const [pos, setPos] = useState(position);
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setPos(position);
  }, [position]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    // Only drag from title bar
    const target = e.target as HTMLElement;
    if (target.closest('.win95-btn')) return;

    if (target.hasPointerCapture(e.pointerId)) {
      target.releasePointerCapture(e.pointerId);
    }

    dragging.current = true;
    offset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
    focusWindow(id);

    const handleMove = (ev: PointerEvent) => {
      if (!dragging.current) return;
      const newX = ev.clientX - offset.current.x;
      const newY = ev.clientY - offset.current.y;
      setPos({ x: Math.max(0, newX), y: Math.max(0, newY) });
    };

    const handleUp = () => {
      dragging.current = false;
      setPos(prev => {
        updatePosition(id, prev.x, prev.y);
        return prev;
      });
      document.removeEventListener('pointermove', handleMove);
      document.removeEventListener('pointerup', handleUp);
      document.removeEventListener('pointercancel', handleUp);
    };

    document.addEventListener('pointermove', handleMove);
    document.addEventListener('pointerup', handleUp);
    document.addEventListener('pointercancel', handleUp);
  }, [pos, id, focusWindow, updatePosition]);

  // ----- Conditional Styles for Engine -----
  const isMac = osStyle === 'mac';
  const isWin11 = osStyle === 'win11';

  const vw = typeof window !== 'undefined' ? window.innerWidth : 1000;
  const vh = typeof window !== 'undefined' ? window.innerHeight : 1000;
  const isMobile = vw <= 768;

  const safeWidth = isMobile ? vw - 10 : Math.min(size.width, vw - 20);
  const renderX = isMobile ? Math.max(5, Math.min(pos.x, vw - safeWidth - 5)) : pos.x;
  const renderY = isMobile ? Math.max(32, Math.min(pos.y, vh - 60)) : pos.y;

  let windowStyle: React.CSSProperties = {
    pointerEvents: 'auto',
    zIndex,
    width: safeWidth,
    maxWidth: '100%',
    minHeight: 60,
    maxHeight: isMobile ? vh - 80 : '85vh',
    display: 'flex',
    flexDirection: 'column',
    left: renderX,
    top: renderY,
  };

  if (isMac) {
    windowStyle = { ...windowStyle, background: 'rgba(30,30,30,0.65)', backdropFilter: 'blur(30px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, boxShadow: '0 20px 40px rgba(0,0,0,0.4)', color: 'white' };
  } else if (isWin11) {
    windowStyle = { ...windowStyle, background: 'rgba(20,20,20,0.7)', backdropFilter: 'blur(30px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, boxShadow: '0 8px 32px rgba(0,0,0,0.3)', color: 'white' };
  }

  let titleBarContent;
  if (isMac) {
    titleBarContent = (
      <div className={`win95-title-bar ${!isFocused ? 'inactive' : ''}`} onPointerDown={handlePointerDown} style={{ touchAction: 'none', cursor: 'move', background: 'transparent', color: 'white', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'center', position: 'relative', height: 28 }}>
        <div style={{ position: 'absolute', left: 12, top: 8, display: 'flex', gap: 8 }}>
          <button onClick={(e) => { e.stopPropagation(); closeWindow(id); }} style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f56', border: '1px solid #e0443e', cursor: 'pointer' }} />
          <button onClick={(e) => { e.stopPropagation(); minimizeWindow(id); }} style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e', border: '1px solid #dea123', cursor: 'pointer' }} />
          <button style={{ width: 12, height: 12, borderRadius: '50%', background: '#27c93f', border: '1px solid #1aab29', cursor: 'pointer' }} />
        </div>
        <span style={{ fontWeight: 600, fontSize: 13, alignSelf: 'center', opacity: isFocused ? 1 : 0.5 }}>{title.replace('.EXE', '')}</span>
      </div>
    );
  } else if (isWin11) {
    titleBarContent = (
      <div className={`win95-title-bar ${!isFocused ? 'inactive' : ''}`} onPointerDown={handlePointerDown} style={{ touchAction: 'none', cursor: 'move', background: 'transparent', color: 'white', display: 'flex', justifyContent: 'space-between', padding: '0 0 0 12px', height: 32 }}>
        <span style={{ fontSize: 12, alignSelf: 'center', opacity: isFocused ? 1 : 0.5 }}>{title}</span>
        <div style={{ display: 'flex' }}>
          <button onClick={(e) => { e.stopPropagation(); minimizeWindow(id); }} style={{ padding: '0 16px', background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', transition: 'background 0.2s' }}>─</button>
          <button onClick={(e) => { e.stopPropagation(); closeWindow(id); }} style={{ padding: '0 16px', background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', transition: 'background 0.2s' }}>✕</button>
        </div>
      </div>
    );
  } else {
    // Standard Retro
    titleBarContent = (
      <div className={`win95-title-bar ${!isFocused ? 'inactive' : ''}`} onPointerDown={handlePointerDown} style={{ touchAction: 'none', cursor: 'move' }}>
        <span className="title-text">{title}</span>
        <div style={{ display: 'flex', gap: 4 }}>
          <button className="win95-btn" onClick={(e) => { e.stopPropagation(); minimizeWindow(id); }} aria-label="Minimize">-</button>
          <button className="win95-btn" onClick={(e) => { e.stopPropagation(); closeWindow(id); }} aria-label="Close">X</button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={isMac || isWin11 ? "absolute" : "win95-window absolute"}
      style={windowStyle}
      onPointerDown={() => focusWindow(id)}
    >
      {titleBarContent}
      {/* Content */}
      <div style={{ flex: 1, overflow: 'auto', padding: isMac || isWin11 ? 0 : 12 }}>
        {children}
      </div>
    </div>
  );
}
