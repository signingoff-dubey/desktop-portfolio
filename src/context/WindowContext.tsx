import { createContext, useContext, useState, useRef, useCallback, type ReactNode } from 'react';
import type { WindowState } from '../types';

const WINDOW_CONFIGS: Record<string, { title: string; icon: string; defaultSize: { width: number; height: number }; defaultPosition: { x: number; y: number } }> = {
  terminal:     { title: 'TERMINAL_V1.0.EXE', icon: '>_', defaultSize: { width: 700, height: 480 }, defaultPosition: { x: 40, y: 50 } },
  about:        { title: 'ABOUT_ME.INFO', icon: '👤', defaultSize: { width: 420, height: 450 }, defaultPosition: { x: 180, y: 80 } },
  projects:     { title: './PROJECTS/CASE_STUDIES', icon: '📦', defaultSize: { width: 580, height: 480 }, defaultPosition: { x: 160, y: 60 } },
  skills:       { title: 'TECH_STACK.CFG', icon: '⚙️', defaultSize: { width: 440, height: 460 }, defaultPosition: { x: 280, y: 40 } },
  experience:   { title: 'SYSTEM_LOGS.TXT', icon: '📋', defaultSize: { width: 480, height: 500 }, defaultPosition: { x: 60, y: 70 } },
  achievements: { title: 'ACHIEVEMENTS.EXE', icon: '🏆', defaultSize: { width: 460, height: 520 }, defaultPosition: { x: 140, y: 30 } },
  timeline:     { title: 'CAREER_TIMELINE.EXE', icon: '📅', defaultSize: { width: 420, height: 500 }, defaultPosition: { x: 200, y: 50 } },
  radar:        { title: 'SKILLS_RADAR.EXE', icon: '📊', defaultSize: { width: 440, height: 440 }, defaultPosition: { x: 220, y: 60 } },
  code:         { title: 'CODE_PLAYGROUND.JS', icon: '💻', defaultSize: { width: 520, height: 440 }, defaultPosition: { x: 120, y: 80 } },
  display:      { title: 'DISPLAY_SETTINGS', icon: '🖥️', defaultSize: { width: 380, height: 340 }, defaultPosition: { x: 260, y: 100 } },
  files:        { title: 'FILE_MANAGER', icon: '📁', defaultSize: { width: 480, height: 400 }, defaultPosition: { x: 100, y: 60 } },
  resume:       { title: 'RESUME.PDF', icon: '📄', defaultSize: { width: 400, height: 460 }, defaultPosition: { x: 180, y: 40 } },
  tetris:       { title: 'TETRIS.EXE', icon: '🎮', defaultSize: { width: 340, height: 520 }, defaultPosition: { x: 300, y: 30 } },
  snake:        { title: 'SNAKE.EXE', icon: '🐍', defaultSize: { width: 400, height: 440 }, defaultPosition: { x: 240, y: 50 } },
  contact:      { title: 'CONTACT.EXE', icon: '📧', defaultSize: { width: 400, height: 380 }, defaultPosition: { x: 200, y: 80 } },
  network:      { title: 'NETWORK_MONITOR.EXE', icon: '🌐', defaultSize: { width: 480, height: 400 }, defaultPosition: { x: 90, y: 50 } },
  minesweeper:  { title: 'MINESWEEPER.EXE', icon: '💣', defaultSize: { width: 280, height: 350 }, defaultPosition: { x: 150, y: 150 } },
  gallery:      { title: 'IMAGE_GALLERY', icon: '🖼️', defaultSize: { width: 640, height: 480 }, defaultPosition: { x: 120, y: 70 } },
};

/**
 * Clamp a window's spawn position so it's never fully off-screen.
 * Accounts for the top bar (32px) and taskbar (40px).
 */
function clampPosition(
  x: number,
  y: number,
  width: number,
  height: number,
): { x: number; y: number } {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const TOPBAR = 32;
  const TASKBAR = 40;
  const MARGIN = 40; // keep at least this many px visible

  const clampedX = Math.max(0, Math.min(x, vw - Math.min(width, MARGIN)));
  const clampedY = Math.max(TOPBAR, Math.min(y, vh - TASKBAR - Math.min(height, MARGIN)));
  return { x: clampedX, y: clampedY };
}

interface WindowContextType {
  windows: WindowState[];
  openWindow: (appId: string) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  toggleMinimize: (id: string) => void;
  updatePosition: (id: string, x: number, y: number) => void;
}

const WindowContext = createContext<WindowContextType | null>(null);

export function WindowProvider({ children }: { children: ReactNode }) {
  const [windows, setWindows] = useState<WindowState[]>([]);
  // useRef keeps zCounter stable across HMR cycles — avoids phantom z-index drift
  const zCounter = useRef(10);

  const openWindow = useCallback((appId: string) => {
    setWindows(prev => {
      const existing = prev.find(w => w.appId === appId);
      if (existing) {
        zCounter.current++;
        return prev.map(w =>
          w.appId === appId
            ? { ...w, isOpen: true, isMinimized: false, isFocused: true, zIndex: zCounter.current }
            : { ...w, isFocused: false }
        );
      }
      const config = WINDOW_CONFIGS[appId];
      if (!config) return prev;
      zCounter.current++;
      const jitter = prev.length * 20;
      const spawnX = config.defaultPosition.x + jitter;
      const spawnY = config.defaultPosition.y + jitter;
      const { x, y } = clampPosition(spawnX, spawnY, config.defaultSize.width, config.defaultSize.height);
      const newWindow: WindowState = {
        id: `win-${appId}-${Date.now()}`,
        appId,
        title: config.title,
        isOpen: true,
        isMinimized: false,
        isFocused: true,
        zIndex: zCounter.current,
        position: { x, y },
        size: config.defaultSize,
        icon: config.icon,
      };
      return [...prev.map(w => ({ ...w, isFocused: false })), newWindow];
    });
  }, []);

  const closeWindow = useCallback((id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w =>
      w.id === id ? { ...w, isMinimized: true, isFocused: false } : w
    ));
  }, []);

  const focusWindow = useCallback((id: string) => {
    zCounter.current++;
    setWindows(prev => prev.map(w =>
      w.id === id ? { ...w, isFocused: true, zIndex: zCounter.current } : { ...w, isFocused: false }
    ));
  }, []);

  const toggleMinimize = useCallback((id: string) => {
    setWindows(prev => {
      const win = prev.find(w => w.id === id);
      if (!win) return prev;
      if (win.isMinimized) {
        zCounter.current++;
        return prev.map(w =>
          w.id === id ? { ...w, isMinimized: false, isFocused: true, zIndex: zCounter.current } : { ...w, isFocused: false }
        );
      }
      if (win.isFocused) {
        return prev.map(w =>
          w.id === id ? { ...w, isMinimized: true, isFocused: false } : w
        );
      }
      zCounter.current++;
      return prev.map(w =>
        w.id === id ? { ...w, isFocused: true, zIndex: zCounter.current } : { ...w, isFocused: false }
      );
    });
  }, []);

  const updatePosition = useCallback((id: string, x: number, y: number) => {
    setWindows(prev => prev.map(w =>
      w.id === id ? { ...w, position: { x, y } } : w
    ));
  }, []);

  return (
    <WindowContext.Provider value={{ windows, openWindow, closeWindow, minimizeWindow, focusWindow, toggleMinimize, updatePosition }}>
      {children}
    </WindowContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useWindows() {
  const ctx = useContext(WindowContext);
  if (!ctx) throw new Error('useWindows must be inside WindowProvider');
  return ctx;
}

