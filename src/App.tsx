import { useState, useEffect } from 'react';
import { WindowProvider, useWindows } from './context/WindowContext';
import { SettingsProvider, useSettings } from './context/SettingsContext';
import { ViewCountProvider } from './context/ViewCountContext';
import LandingScreen from './components/landing/LandingScreen';
import Desktop from './components/desktop/Desktop';
import BootScreen from './components/boot/BootScreen';

function AppInner() {
  const { bootMode } = useSettings();
  const [showDesktop, setShowDesktop] = useState(false);
  const { openWindow } = useWindows();
  const [pendingApp, setPendingApp] = useState<string | null>(null);

  const [bootCompleted, setBootCompleted] = useState(bootMode === 'fast');

  useEffect(() => {
    if (showDesktop && pendingApp) {
      openWindow(pendingApp);
      setPendingApp(null);
    }
  }, [showDesktop, pendingApp, openWindow]);

  const handleEnter = () => {
    setShowDesktop(true);
  };

  const handlePlayTetris = () => {
    setShowDesktop(true);
    setPendingApp('tetris');
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
        <ViewCountProvider>
          <AppInner />
        </ViewCountProvider>
      </WindowProvider>
    </SettingsProvider>
  );
}
