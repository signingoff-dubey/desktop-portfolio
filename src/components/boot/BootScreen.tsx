import { useState, useEffect } from 'react';

interface Props {
  onComplete: () => void;
}

const BOOT_LINES = [
  'BIOS v3.14 - Aryan Dubey Systems Inc.',
  'Checking RAM......... 640KB OK',
  'Detecting drives......',
  'C:\\ - 500GB SSD [HEALTHY]',
  'D:\\ - Portfolio Archive [MOUNTED]',
  '',
  'Loading KABIR-OS Kernel..........',
  'Initializing network interfaces... OK',
  'Starting display driver... CRT_MODE ACTIVE',
  'Loading modules: [React] [Flutter] [Python] [Android]',
  'Loading AI subsystems: [TensorFlow] [Keras] [Scikit-learn]',
  '',
  '╔══════════════════════════════════════════════════════╗',
  '║                                                      ║',
  '║      KABIR-OS v1.0 - All Systems Operational         ║',
  '║                                                      ║',
  '╚══════════════════════════════════════════════════════╝',
  '',
];

export default function BootScreen({ onComplete }: Props) {
  const [lines, setLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'text' | 'loading' | 'done'>('text');

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < BOOT_LINES.length) {
        setLines(prev => [...prev, BOOT_LINES[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
        setPhase('loading');
      }
    }, 150);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (phase === 'loading') {
      const pInterval = setInterval(() => {
        setProgress(p => {
          const np = p + Math.floor(Math.random() * 15) + 5;
          if (np >= 100) {
            clearInterval(pInterval);
            setTimeout(() => setPhase('done'), 400);
            return 100;
          }
          return np;
        });
      }, 200);
      return () => clearInterval(pInterval);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'done') {
      onComplete();
    }
  }, [phase, onComplete]);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        background: 'black',
        color: '#14FF14',
        fontFamily: "'VT323', monospace",
        fontSize: '18px',
        padding: '40px',
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}
    >
      <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ flex: 1 }}>
          {lines.map((line, i) => (
            <div key={i} style={{ minHeight: '24px', whiteSpace: 'pre', fontFamily: "'VT323', monospace" }}>
              {line}
            </div>
          ))}
        </div>

        {phase !== 'text' && (
          <div style={{ marginTop: 'auto', marginBottom: '10vh' }}>
            <div style={{ 
              width: '100%', 
              height: 24, 
              border: '1px solid #14FF14', 
              padding: 2,
              marginBottom: 10 
            }}>
              <div style={{ 
                width: `${progress}%`, 
                height: '100%', 
                background: '#14FF14',
                transition: 'width 0.2s linear'
              }} />
            </div>
            <div style={{ textAlign: 'center' }}>
              LOADING... {progress}%
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
