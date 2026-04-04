import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export type ThemeType = 'green-phosphor' | 'amber' | 'white' | 'matrix' | 'vaporwave';
export type WallpaperType = 'matrix-rain' | 'starfield' | 'retro-grid' | 'pixel-clouds' | 'cyber-rain' | 'binary' | 'geometry' | 'solid-color' | 'none';
export type BootModeType = 'full' | 'fast';
export type OsStyleType = 'retro' | 'mac' | 'win11';

interface SettingsContextType {
  theme: ThemeType;
  wallpaper: WallpaperType;
  bootMode: BootModeType;
  osStyle: OsStyleType;
  setTheme: (t: ThemeType) => void;
  setWallpaper: (w: WallpaperType) => void;
  setBootMode: (b: BootModeType) => void;
  setOsStyle: (s: OsStyleType) => void;
}

const SettingsContext = createContext<SettingsContextType | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeType>(() => {
    return (localStorage.getItem('theme') as ThemeType) || 'matrix';
  });
  
  const [wallpaper, setWallpaper] = useState<WallpaperType>(() => {
    return (localStorage.getItem('wallpaper') as WallpaperType) || 'matrix-rain';
  });
  
  const [bootMode, setBootMode] = useState<BootModeType>(() => (localStorage.getItem('pyos_bootmode') as BootModeType) || 'full');
  
  const [osStyle, setOsStyle] = useState<OsStyleType>(() => {
    return (localStorage.getItem('osStyle') as OsStyleType) || 'retro';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    localStorage.setItem('wallpaper', wallpaper);
    localStorage.setItem('osStyle', osStyle);
    
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-os', osStyle);
  }, [theme, wallpaper, osStyle]);

  useEffect(() => {
    localStorage.setItem('pyos_bootmode', bootMode);
  }, [bootMode]);

  return (
    <SettingsContext.Provider value={{ theme, wallpaper, bootMode, osStyle, setTheme, setWallpaper, setBootMode, setOsStyle }}>
      {children}
    </SettingsContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used inside SettingsProvider');
  return ctx;
}
