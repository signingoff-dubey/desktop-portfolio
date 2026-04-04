import React, { lazy, Suspense, useEffect } from 'react';
import { useSettings } from '../../context/SettingsContext';

/* ── Eager-loaded apps (same set as WindowManager) ── */
import Terminal from '../apps/Terminal';
import AboutMe from '../apps/AboutMe';
import Projects from '../apps/Projects';
import TechStack from '../apps/TechStack';
import Experience from '../apps/Experience';
import Achievements from '../apps/Achievements';
import CareerTimeline from '../apps/CareerTimeline';
import SkillsRadar from '../apps/SkillsRadar';
import CodePlayground from '../apps/CodePlayground';
import DisplaySettings from '../apps/DisplaySettings';
import FileManager from '../apps/FileManager';
import Resume from '../apps/Resume';
import Contact from '../apps/Contact';
import NetworkMonitor from '../apps/NetworkMonitor';
import Minesweeper from '../apps/Minesweeper';
import { ErrorBoundary } from '../ErrorBoundary';

/* ── Lazy-loaded heavier apps ── */
const Tetris = lazy(() => import('../apps/Tetris'));
const Snake = lazy(() => import('../apps/Snake'));

const APP_MAP: Record<string, React.ComponentType> = {
  terminal: Terminal,
  about: AboutMe,
  projects: Projects,
  skills: TechStack,
  experience: Experience,
  achievements: Achievements,
  timeline: CareerTimeline,
  radar: SkillsRadar,
  code: CodePlayground,
  display: DisplaySettings,
  files: FileManager,
  resume: Resume,
  contact: Contact,
  network: NetworkMonitor,
  minesweeper: Minesweeper,
};

const LAZY_MAP: Record<string, React.LazyExoticComponent<React.ComponentType> | undefined> = {
  tetris: Tetris,
  snake: Snake,
};

interface Props {
  appId: string;
  title: string;
  onClose: () => void;
}

export default function MobileAppPanel({ appId, title, onClose }: Props) {
  const { osStyle } = useSettings();
  const isMac = osStyle === 'mac';

  // Lock body scroll while panel is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  const EagerComp = APP_MAP[appId];
  const LazyComp = LAZY_MAP[appId];
  const Comp = EagerComp ?? LazyComp;

  const content = LazyComp && !EagerComp ? (
    <Suspense fallback={<div style={{ color: 'var(--color-phosphor-green)', padding: 20 }}>Loading…</div>}>
      <LazyComp />
    </Suspense>
  ) : Comp ? (
    <Comp />
  ) : (
    <div style={{ padding: 20, color: 'hsl(0 0% 60%)' }}>App not found.</div>
  );

  return (
    /* Backdrop */
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.55)',
        zIndex: 9000,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        animation: 'mobileBackdropIn 0.2s ease',
      }}
    >
      {/* Panel — stop clicks from closing */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'var(--color-window-bg)',
          borderTop: '2px solid var(--color-border-light)',
          borderLeft: isMac ? 'none' : '2px solid var(--color-border-light)',
          borderRight: isMac ? 'none' : '2px solid var(--color-border-light)',
          borderRadius: isMac ? '16px 16px 0 0' : '0',
          height: '88vh',
          display: 'flex',
          flexDirection: 'column',
          animation: 'mobilePanelIn 0.25s cubic-bezier(0.22,0.61,0.36,1)',
          overflow: 'hidden',
        }}
      >
        {/* Title bar */}
        <div
          style={{
            flexShrink: 0,
            background: isMac ? 'rgba(40,40,40,0.9)' : 'var(--color-title-bar)',
            padding: '10px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid var(--color-border-dark)',
            cursor: 'default',
            userSelect: 'none',
          }}
        >
          <span
            style={{
              color: 'white',
              fontSize: isMac ? 14 : 16,
              fontWeight: isMac ? 600 : 'normal',
              letterSpacing: isMac ? 0 : 0.5,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              flex: 1,
              marginRight: 12,
            }}
          >
            {title}
          </span>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              flexShrink: 0,
              width: isMac ? 14 : 20,
              height: isMac ? 14 : 20,
              borderRadius: isMac ? '50%' : 0,
              background: isMac ? '#ff5f56' : 'hsl(240 20% 75%)',
              border: isMac ? '1px solid #e0443e' : '1.5px solid',
              borderColor: isMac
                ? '#e0443e'
                : 'hsl(0 0% 95%) hsl(240 20% 30%) hsl(240 20% 30%) hsl(0 0% 95%)',
              color: isMac ? 'transparent' : 'black',
              cursor: 'pointer',
              fontSize: 11,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              lineHeight: 1,
            }}
          >
            {!isMac && '✕'}
          </button>
        </div>

        {/* Scrollable content */}
        <div
          style={{
            flex: 1,
            overflow: 'auto',
            padding: 16,
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <ErrorBoundary>
            {content}
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
}
