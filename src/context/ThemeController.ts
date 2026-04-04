import type { ThemeType, WallpaperType, OsStyleType } from './SettingsContext';

export interface ThemePreset {
  id: string;
  label: string;
  theme: ThemeType;
  wallpaper: WallpaperType;
  osStyle: OsStyleType;
}

export const THEME_PRESETS: ThemePreset[] = [
  { id: 'retro', label: 'Retro Classic', theme: 'green-phosphor', wallpaper: 'cyber-rain', osStyle: 'retro' },
  { id: 'bsod', label: 'BSOD Pure', theme: 'green-phosphor', wallpaper: 'solid-color', osStyle: 'retro' },
  { id: 'mac', label: 'macOS Modern', theme: 'white', wallpaper: 'pixel-clouds', osStyle: 'mac' },
  { id: 'win11', label: 'Win 11 Aero', theme: 'white', wallpaper: 'geometry', osStyle: 'win11' },
  { id: 'matrix', label: 'The Matrix', theme: 'matrix', wallpaper: 'matrix-rain', osStyle: 'retro' },
  { id: 'vaporwave', label: 'Vaporwave', theme: 'vaporwave', wallpaper: 'retro-grid', osStyle: 'retro' },
];

export function applyPreset(
  presetId: string, 
  setTheme: (t: ThemeType) => void, 
  setWallpaper: (w: WallpaperType) => void, 
  setOsStyle: (s: OsStyleType) => void
) {
  const preset = THEME_PRESETS.find(p => p.id === presetId);
  if (preset) {
    setTheme(preset.theme);
    setWallpaper(preset.wallpaper);
    setOsStyle(preset.osStyle);
  }
}
