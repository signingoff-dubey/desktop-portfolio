import { useSettings, type ThemeType, type OsStyleType, type WallpaperType } from '../../context/SettingsContext';

const themes: { id: ThemeType; label: string; bg: string; terminalRowBg: string; terminalRowText: string }[] = [
  { id: 'green-phosphor', label: 'Blue Aqua', bg: 'var(--color-dark-blue)', terminalRowBg: 'var(--color-dark-blue)', terminalRowText: 'var(--color-phosphor-green)' },
  { id: 'amber', label: 'Amber', bg: '#100a00', terminalRowBg: '#100a00', terminalRowText: '#ffb000' },
  { id: 'white', label: 'White', bg: '#18181b', terminalRowBg: '#27272a', terminalRowText: '#e4e4e7' },
  { id: 'matrix', label: 'Matrix', bg: '#000000', terminalRowBg: '#001a00', terminalRowText: '#00ff41' },
];

const wallpapers: { id: WallpaperType; label: string; icon: string; cols: number }[] = [
  { id: 'matrix-rain', label: 'Matrix Rain', icon: '🟢', cols: 1 },
  { id: 'starfield', label: 'Starfield', icon: '✨', cols: 1 },
  { id: 'retro-grid', label: 'Retro Grid', icon: '🌆', cols: 1 },
  { id: 'pixel-clouds', label: 'Pixel Clouds', icon: '☁️', cols: 1 },
  { id: 'cyber-rain', label: 'Cyber Rain', icon: '🌧️', cols: 1 },
  { id: 'binary', label: '01 Binary', icon: '01', cols: 1 },
  { id: 'geometry', label: 'Geometry', icon: '🔷', cols: 1 },
  { id: 'solid-color', label: 'Solid Color', icon: '⬛', cols: 1 },
  { id: 'none', label: 'None', icon: '🚫', cols: 1 },
];

const OS_STYLES: { id: OsStyleType; label: string }[] = [
  { id: 'retro', label: 'KABIR-OS 95' },
  { id: 'mac', label: 'macOS Modern' },
  { id: 'win11', label: 'Windows 11' },
];

import { THEME_PRESETS, applyPreset } from '../../context/ThemeController';

export default function DisplaySettings() {
  const { theme, wallpaper, bootMode, osStyle, setTheme, setWallpaper, setBootMode, setOsStyle } = useSettings();

  const handleReset = () => {
    setTheme('green-phosphor');
    setWallpaper('none');
    setBootMode('full');
    setOsStyle('retro');
  };

  return (
    <div style={{ fontSize: 13, lineHeight: 1.5, padding: '4px' }}>
      <div style={{ color: 'var(--color-phosphor-green)', fontSize: 16, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span>⚙️</span> DISPLAY SETTINGS
      </div>

      {/* MASTER PRESETS SECTION */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ 
          color: 'var(--color-phosphor-green)', 
          marginBottom: 10, 
          display: 'flex', 
          alignItems: 'center',
          gap: 8,
          textTransform: 'uppercase'
        }}>
          <span style={{flex: 1, height: 1, background: 'var(--color-phosphor-green)'}} />
          MASTER PRESETS (CHANGES ALL)
          <span style={{flex: 1, height: 1, background: 'var(--color-phosphor-green)'}} />
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {THEME_PRESETS.map((preset: { id: string, label: string }) => (
             <div
               key={preset.id}
               onClick={() => applyPreset(preset.id, setTheme, setWallpaper, setOsStyle)}
               style={{
                 border: '1px solid var(--color-border-light)',
                 padding: '8px',
                 textAlign: 'center',
                 cursor: 'pointer',
                 transition: 'background 0.2s',
               }}
             >
               {preset.label}
             </div>
          ))}
        </div>
      </div>

      {/* THEME SECTION */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ 
          color: 'var(--color-phosphor-green)', 
          marginBottom: 10, 
          display: 'flex', 
          alignItems: 'center',
          gap: 8,
          textTransform: 'uppercase'
        }}>
          <span style={{flex: 1, height: 1, background: 'var(--color-phosphor-green)'}} />
          THEME
          <span style={{flex: 1, height: 1, background: 'var(--color-phosphor-green)'}} />
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {themes.map(t => {
            const isSelected = theme === t.id;
            return (
              <div 
                key={t.id} 
                onClick={() => setTheme(t.id)}
                style={{ 
                  border: `1px solid ${isSelected ? 'var(--color-phosphor-green)' : 'var(--color-border-light)'}`,
                  padding: 8,
                  cursor: 'pointer',
                  background: isSelected ? 'rgba(20, 255, 20, 0.05)' : 'transparent',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8
                }}
              >
                {/* Mini terminal preview */}
                <div style={{
                  height: 40,
                  background: t.bg,
                  border: '1px solid currentColor',
                  borderColor: isSelected ? 'var(--color-phosphor-green)' : 'var(--color-border-light)',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <div style={{ height: 8, background: '#ccc', borderBottom: '1px solid black', display: 'flex', alignItems: 'center', paddingLeft: 4, fontSize: 6, color: 'black' }}>
                    TERMINAL
                  </div>
                  <div style={{ 
                    flex: 1, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    background: t.terminalRowBg, 
                    color: t.terminalRowText,
                    fontSize: 8 
                  }}>
                    root@py:~$
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: isSelected ? 'var(--color-phosphor-green)' : 'var(--color-phosphor-white)' }}>
                  <div style={{ 
                    width: 10, height: 10, borderRadius: '50%',
                    border: `1px solid ${isSelected ? 'var(--color-phosphor-green)' : 'currentColor'}`,
                    background: isSelected ? 'var(--color-phosphor-green)' : 'transparent'
                  }} />
                  {t.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* WALLPAPER SECTION */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ 
          color: 'var(--color-phosphor-green)', 
          marginBottom: 10, 
          display: 'flex', 
          alignItems: 'center',
          gap: 8,
          textTransform: 'uppercase'
        }}>
          <span style={{flex: 1, height: 1, background: 'var(--color-phosphor-green)'}} />
          WALLPAPER
          <span style={{flex: 1, height: 1, background: 'var(--color-phosphor-green)'}} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {wallpapers.map(w => {
            const isSelected = wallpaper === w.id;
            return (
              <div 
                key={w.id}
                onClick={() => setWallpaper(w.id)}
                style={{
                  border: `1px solid ${isSelected ? 'var(--color-phosphor-green)' : 'var(--color-border-light)'}`,
                  padding: '12px 6px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 8,
                  cursor: 'pointer',
                  background: isSelected ? 'rgba(20, 255, 20, 0.05)' : 'transparent',
                  color: isSelected ? 'var(--color-phosphor-green)' : 'var(--color-phosphor-white)'
                }}
              >
                <div style={{ fontSize: 20 }}>{w.icon === '01' ? <span style={{fontSize: 14}}>01</span> : w.icon}</div>
                <div style={{ fontSize: 11, textAlign: 'center' }}>{w.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* BOOT MODE SECTION */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ 
          color: 'var(--color-phosphor-green)', 
          marginBottom: 10, 
          display: 'flex', 
          alignItems: 'center',
          gap: 8,
          textTransform: 'uppercase'
        }}>
          <span style={{flex: 1, height: 1, background: 'var(--color-phosphor-green)'}} />
          BOOT MODE
          <span style={{flex: 1, height: 1, background: 'var(--color-phosphor-green)'}} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div>Current: <span style={{ color: 'var(--color-phosphor-green)' }}>{bootMode}</span></div>
          <button 
            onClick={() => setBootMode(bootMode === 'full' ? 'fast' : 'full')}
            className="win95-btn"
            style={{ padding: '0 8px', height: 20, width: 'auto' }}
          >
            TOGGLE
          </button>
          <button 
            onClick={handleReset}
            className="win95-btn"
            style={{ padding: '0 8px', height: 20, width: 'auto', marginLeft: 'auto' }}
          >
            RESET ALL
          </button>
        </div>
      </div>

      {/* OS ENGINE SECTION */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ 
          color: 'var(--color-phosphor-green)', 
          marginBottom: 10, 
          display: 'flex', 
          alignItems: 'center',
          gap: 8,
          textTransform: 'uppercase'
        }}>
          <span style={{flex: 1, height: 1, background: 'var(--color-phosphor-green)'}} />
          SYSTEM INTERFACE STYLE
          <span style={{flex: 1, height: 1, background: 'var(--color-phosphor-green)'}} />
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
          {OS_STYLES.map(om => {
             const isSelected = osStyle === om.id;
             return (
               <div
                 key={om.id}
                 onClick={() => setOsStyle(om.id as OsStyleType)}
                 style={{
                   border: `1px solid ${isSelected ? 'var(--color-phosphor-green)' : 'var(--color-border-light)'}`,
                   padding: '10px',
                   textAlign: 'center',
                   cursor: 'pointer',
                   background: isSelected ? 'rgba(20, 255, 20, 0.05)' : 'transparent',
                   color: isSelected ? 'var(--color-phosphor-green)' : 'var(--color-phosphor-white)'
                 }}
               >
                 {om.label}
               </div>
             )
          })}
        </div>
      </div>

      <div style={{ color: 'hsl(0 0% 45%)', fontSize: 11, marginTop: 'auto', borderTop: '1px solid var(--color-border-light)', paddingTop: 8 }}>
        All preferences saved to localStorage.
      </div>
    </div>
  );
}
