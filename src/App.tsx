import { useState } from 'react';
import { WindowProvider, useWindows } from './context/WindowContext';
import { SettingsProvider, useSettings } from './context/SettingsContext';
import LandingScreen from './components/landing/LandingScreen';
import Desktop from './components/desktop/Desktop';
import BootScreen from './components/boot/BootScreen';

function AppInner() {
  const { bootMode } = useSettings();
  const [showDesktop, setShowDesktop] = useState(false);
  const { openWindow } = useWindows();

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
