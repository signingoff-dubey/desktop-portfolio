import { useState } from 'react';
import { WindowProvider, useWindows } from './context/WindowContext';
import { SettingsProvider, useSettings } from './context/SettingsContext';
import LandingScreen from './components/landing/LandingScreen';
import Desktop from './components/desktop/Desktop';
import MobileLayout from './components/mobile/MobileLayout';
import BootScreen from './components/boot/BootScreen';
import { useIsMobile } from './hooks/useIsMobile';

function AppInner() {
  const { bootMode } = useSettings();
  const [showDesktop, setShowDesktop] = useState(false);
  const { openWindow } = useWindows();
  const isMobile = useIsMobile();

  const [bootCompleted, setBootCompleted] = useState(bootMode === 'fast');

  const handleEnter = () => {
    setShowDesktop(true);
  };

  const handlePlayTetris = () => {
    setShowDesktop(true);
    setTimeout(() => openWindow('tetris'), 100);
  };

  if (!bootCompleted && bootMode === 'full') {
    return <BootScreen onComplete={() => setBootCompleted(true)} />;
  }

  if (!showDesktop) {
    return <LandingScreen onEnter={handleEnter} onPlayTetris={handlePlayTetris} />;
  }

  // On phone-sized screens render a touch-friendly layout instead of the
  // draggable windowed desktop which is unusable at <768 px.
  if (isMobile) {
    return <MobileLayout />;
  }

  return <Desktop />;
}

export default function App() {
  return (
    <SettingsProvider>
      <WindowProvider>
        <AppInner />
      </WindowProvider>
    </SettingsProvider>
  );
}
