import { useState, useEffect } from 'react';
import { useWindows } from '../../context/WindowContext';
import { useSettings } from '../../context/SettingsContext';
import StartMenu from './StartMenu';
import { useViewCount } from '../../hooks/useViewCount';

const TAB_LABELS: Record<string, string> = {
  terminal: 'TERM',
  about: 'INFO',
  projects: 'PROJ',
  skills: 'SKILLS',
  experience: 'LOGS',
  achievements: 'AWARDS',
  timeline: 'TIMELINE',
  radar: 'RADAR',
  code: 'CODE',
  display: 'DISPLAY',
  files: 'FILES',
  resume: 'RESUME',
  contact: 'CONTACT',
  tetris: 'TETRIS',
  snake: 'SNAKE',
  minesweeper: 'MINES',
};

export default function Taskbar() {
  const { windows, toggleMinimize } = useWindows();
  const { osStyle } = useSettings();
  const [time, setTime] = useState('');
  const [startOpen, setStartOpen] = useState(false);
  const { count, loading } = useViewCount();

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const h = now.getHours() % 12 || 12;
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
      setTime(`${h}:${m}:${s} ${ampm}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const openWindows = windows.filter(w => w.isOpen);

  const isMac = osStyle === 'mac';
  const isWin11 = osStyle === 'win11';

  if (isMac) {
    return (
      <div style={{ position: 'fixed', bottom: 12, left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 9000, pointerEvents: 'none' }}>
        <div style={{ background: 'rgba(50,50,50,0.4)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: '6px 12px', display: 'flex', gap: 12, alignItems: 'center', pointerEvents: 'auto', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
          {openWindows.map(w => (
            <div key={w.id} onClick={() => toggleMinimize(w.id)} style={{ width: 44, height: 44, borderRadius: 10, background: w.isFocused && !w.isMinimized ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s', border: '1px solid rgba(255,255,255,0.05)', position: 'relative' }}>
              <span style={{ fontSize: 24 }}>{w.icon || '📄'}</span>
              {!w.isMinimized && <div style={{ position: 'absolute', bottom: -5, width: 4, height: 4, borderRadius: '50%', background: 'white' }} />}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isWin11) {
    return (
      <>
        {startOpen && <StartMenu onClose={() => setStartOpen(false)} />}
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: 48, background: 'rgba(20,20,20,0.75)', backdropFilter: 'blur(25px)', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9000, color: 'white', gap: 8 }}>
          <button onClick={() => setStartOpen(p => !p)} style={{ width: 40, height: 40, borderRadius: 4, background: startOpen ? 'rgba(255,255,255,0.1)' : 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}>
             <span style={{ fontSize: 22, color: '#00a4ef' }}>❖</span>
          </button>
          {openWindows.map(w => (
            <button key={w.id} onClick={() => toggleMinimize(w.id)} style={{ width: 40, height: 40, borderRadius: 4, background: w.isFocused && !w.isMinimized ? 'rgba(255,255,255,0.1)' : 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', transition: 'background 0.2s' }}>
              <span style={{ fontSize: 20 }}>{w.icon || '📄'}</span>
              {w.isFocused && !w.isMinimized && <div style={{ position: 'absolute', bottom: 2, width: 16, height: 3, borderRadius: 2, background: '#00a4ef' }} />}
              {(w.isMinimized || !w.isFocused) && <div style={{ position: 'absolute', bottom: 2, width: 8, height: 3, borderRadius: 2, background: 'gray' }} />}
            </button>
          ))}
          <div style={{ position: 'absolute', right: 16, display: 'flex', gap: 12, alignItems: 'center' }}>
            <span style={{ fontSize: 13 }}>{time}</span>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {startOpen && <StartMenu onClose={() => setStartOpen(false)} />}
      <div
        className="taskbar"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: 40,
          display: 'flex',
          alignItems: 'center',
          padding: '0 4px',
          gap: 4,
          zIndex: 9000,
        }}
      >
        {/* START button */}
        <button
          onClick={() => setStartOpen(p => !p)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '3px 12px',
            background: startOpen ? 'hsl(240 100% 33%)' : 'hsl(240 100% 27%)',
            border: '1.5px solid',
            borderColor: startOpen
              ? 'hsl(240 100% 15%) hsl(240 60% 60%) hsl(240 60% 60%) hsl(240 100% 15%)'
              : 'hsl(240 60% 60%) hsl(240 100% 15%) hsl(240 100% 15%) hsl(240 60% 60%)',
            color: 'white',
            cursor: 'pointer',
            fontFamily: "'VT323', monospace",
            fontSize: 15,
            fontWeight: 'bold',
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: 14 }}>≡</span> START
        </button>

        {/* Window tabs — short labels like the reference */}
        <div style={{ display: 'flex', gap: 3, flex: 1, overflow: 'hidden' }}>
          {openWindows.map(w => (
            <button
              key={w.id}
              className={`taskbar-tab ${w.isFocused && !w.isMinimized ? 'active' : ''}`}
              onClick={() => toggleMinimize(w.id)}
            >
              {TAB_LABELS[w.appId] || w.appId.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0, paddingRight: 8 }}>
          <span style={{ fontSize: 14, color: 'hsl(0 0% 70%)' }}>🔊</span>
          <span style={{ fontSize: 13, color: 'hsl(0 0% 75%)' }}>
            {loading ? '👁 …' : count !== null ? `👁 ${count.toLocaleString()} views` : '👁 —'}
          </span>
          <span style={{ fontSize: 14, color: 'hsl(120 100% 54%)', minWidth: 90, textAlign: 'right' }}>{time}</span>
        </div>
      </div>
    </>
  );
}
