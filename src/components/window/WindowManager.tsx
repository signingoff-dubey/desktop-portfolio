import React, { lazy, Suspense } from 'react';
import { useWindows } from '../../context/WindowContext';
import Window from './Window';
import { ErrorBoundary } from '../ErrorBoundary';

/* Eager-loaded lightweight apps */
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

/* Lazy-loaded heavier apps */
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

export default function WindowManager() {
  const { windows } = useWindows();

  return (
    <>
      {windows
        .filter(w => w.isOpen && !w.isMinimized)
        .map(w => {
          const EagerComp = APP_MAP[w.appId];
          const LazyComp = LAZY_MAP[w.appId];
          const Comp = EagerComp || LazyComp;

          if (!Comp) return null;

          const content = LazyComp && !EagerComp ? (
            <Suspense fallback={<div style={{ color: 'hsl(120 100% 54%)', padding: 20 }}>Loading...</div>}>
              <LazyComp />
            </Suspense>
          ) : (
            <Comp />
          );

          return (
            <Window
              key={w.id}
              id={w.id}
              title={w.title}
              isFocused={w.isFocused}
              zIndex={w.zIndex}
              position={w.position}
              size={w.size}
            >
              <ErrorBoundary>
                {content}
              </ErrorBoundary>
            </Window>
          );
        })}
    </>
  );
}
