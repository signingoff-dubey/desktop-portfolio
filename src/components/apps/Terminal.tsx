import React, { useState, useEffect, useRef, useCallback } from 'react';

const BOOT_LINES: { text: string; type: string }[] = [
  { text: '', type: 'blank' },
  { text: 'root@kabir:~$ cat welcome_message.txt', type: 'command' },
  { text: 'Welcome to KABIR-OS [Version 1.0.2025]', type: 'output' },
  { text: '(c) Aryan Dubey. All rights reserved.', type: 'output' },
  { text: '', type: 'blank' },
  { text: 'System Status: ONLINE', type: 'status' },
  { text: 'Memory: 640KB OK', type: 'output' },
  { text: 'Role: UI/UX Designer @ Hearthborn Studios', type: 'output' },
  { text: 'Location: Bengaluru, India', type: 'output' },
  { text: '', type: 'blank' },
  { text: 'root@kabir:~$ sh ./init_portfolio.sh', type: 'command' },
  { text: 'Portfolio initialized successfully! ✓', type: 'success' },
  { text: '', type: 'blank' },
  { text: "Type 'help' for commands. Shortcuts: Ctrl+T, Ctrl+E, Alt+F4. Try hidden commands! 🍪", type: 'hint' },
];

const COMMANDS: Record<string, string[]> = {
  help: [
    'Available commands:',
    '  help        - Show this help message',
    '  about       - About Aryan Dubey',
    '  skills      - Technical skills',
    '  experience  - Work experience',
    '  projects    - Project portfolio',
    '  contact     - Contact information',
    '  clear       - Clear terminal',
    '  ls          - List files',
    '  neofetch    - System info',
    '  whoami      - Current user',
    '',
    'Easter eggs: Try sudo, rm -rf, hack, matrix, hello',
  ],
  about: [
    '═══ ABOUT ME ═══',
    'Name: Aryan Dubey (Kabir)',
    'Role: UI/UX Designer @ Hearthborn Studios',
    'Education: B.Tech Hons - R.V. University (2025-2029)',
    '           B.S. Data Science & AI - IIT Madras (2025-2029)',
    'Location: Bengaluru, India',
    '',
    'Innovative UI/UX Designer with testing experience and',
    'app development background across devices and OS versions.',
  ],
  skills: [
    '═══ TECH STACK ═══',
    '[Core Langs] Java, Python, Kotlin, C, C++',
    '[App Dev]    Android Development, Flutter, React',
    '[AI]         Machine Learning, Data Science',
    '[Design&QA]  UI/UX Design, Device Testing',
  ],
  experience: [
    '═══ EXPERIENCE LOG ═══',
    '',
    '[JULY 2025 - PRESENT]',
    'Hearthborn Studios — UI/UX Designer',
    '> Designed user interfaces and elevated user experiences.',
    '',
    '[PREVIOUS]',
    'Quality Assurance Team — Testing Manager',
    '> Led a team of 20 testers for rigorous Android app testing.',
    '> Ensured app worked seamlessly across various OS skins (2011-2023).',
  ],
  projects: [
    '═══ PROJECTS ═══',
    '1. vuln-detect-rag            - Vulnerability detection RAG system',
    '2. Handwritten Letter Classifier - ANN-based recognition',
    '3. Heart Failure Prediction   - EDA & ML prediction modeling',
    '4. Brain Tumor Detection      - CNN based medical imaging',
    '5. Crucial Space              - OmniContext for Android',
    '6. Emotion-based Music        - AI emotion-reactive music player',
    '7. namma-connect              - Hyperlocal social app',
    '8. Opacity Controller         - UI/UX interaction tool',
  ],
  contact: [
    '═══ CONTACT ═══',
    'GitHub:   /signingoff-dubey',
    'LinkedIn: /in/aryan-dubey-9b2271357/',
    'Location: Bengaluru, India',
  ],
  ls: [
    'welcome_message.txt  init_portfolio.sh  ABOUT_ME.info',
    'projects/            skills.cfg         resume.exe',
    'experience.log       certs.log          contact.vcf',
    'career_timeline.exe'
  ],
  neofetch: [
    '        ██████████          root@kabir',
    '      ██          ██        ─────────────',
    '    ██    ██████    ██      OS: KABIR-OS v1.0',
    '    ██  ██████████  ██      Host: Portfolio',
    '    ██  ██████████  ██      Kernel: React 19',
    '    ██    ██████    ██      Shell: VT323',
    '      ██          ██        Theme: BSOD Blue',
    '        ██████████          CPU: Caffeine-Powered',
    '                            Memory: 640KB (enough)',
  ],
  whoami: ['root@kabir (Aryan Dubey)'],
  sudo: ['Nice try! You don\'t have permission. This isn\'t your terminal. 😏'],
  'rm -rf': ['🚨 ABORT ABORT! Just kidding... no files were harmed. 😅'],
  hack: [
    'INITIATING HACK SEQUENCE...',
    '████████████████████████ 100%',
    'ACCESS GRANTED',
    '',
    'Just kidding. Please don\'t hack anything. 🙃',
  ],
  matrix: [
    '01001000 01100101 01101100 01101100 01101111',
    'Wake up, Neo...',
    'The Matrix has you...',
    'Follow the white rabbit. 🐇',
  ],
  hello: ['Hello there! 👋 Welcome to my portfolio terminal.'],
};

function getColor(type: string): string {
  switch (type) {
    case 'command': return 'var(--color-phosphor-green)';
    case 'success': return 'var(--color-phosphor-green)';
    case 'status': return 'var(--color-phosphor-green)';
    case 'error': return 'hsl(0 70% 60%)';
    case 'hint': return 'var(--color-phosphor-white)';
    default: return 'var(--color-phosphor-white)';
  }
}

export default function Terminal() {
  const [lines, setLines] = useState<{ text: string; type: string }[]>([]);
  const [input, setInput] = useState('');
  const [bootDone, setBootDone] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const bootIdxRef = useRef(0);

  useEffect(() => {
    bootIdxRef.current = 0;

    const id = setInterval(() => {
      const idx = bootIdxRef.current;
      if (idx < BOOT_LINES.length) {
        const line = BOOT_LINES[idx];
        if (line) {
          setLines(prev => [...prev, { text: line.text, type: line.type }]);
        }
        bootIdxRef.current = idx + 1;
      } else {
        clearInterval(id);
        setBootDone(true);
      }
    }, 120);

    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  useEffect(() => {
    if (bootDone) inputRef.current?.focus();
  }, [bootDone]);

  const runCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newLines: { text: string; type: string }[] = [
      { text: `root@kabir:~$ ${cmd}`, type: 'command' },
    ];

    if (trimmed === 'clear') {
      setLines([]);
      return;
    }

    const output = COMMANDS[trimmed];
    if (output) {
      output.forEach(l => newLines.push({ text: l, type: 'output' }));
    } else if (trimmed) {
      newLines.push({ text: `bash: ${trimmed}: command not found. Type 'help' for available commands.`, type: 'error' });
    }

    setLines(prev => [...prev, ...newLines]);
    setHistory(prev => [cmd, ...prev]);
    setHistIdx(-1);
  }, []);

  const handleKey = (e: React.KeyboardEvent) => {
    e.stopPropagation();
    if (e.key === 'Enter') {
      runCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const newIdx = Math.min(histIdx + 1, history.length - 1);
        setHistIdx(newIdx);
        setInput(history[newIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIdx > 0) {
        const newIdx = histIdx - 1;
        setHistIdx(newIdx);
        setInput(history[newIdx]);
      } else {
        setHistIdx(-1);
        setInput('');
      }
    }
  };

  return (
    <div
      style={{ height: '100%', display: 'flex', flexDirection: 'column', cursor: 'text' }}
      onClick={() => inputRef.current?.focus()}
    >
      <div style={{ flex: 1, overflow: 'auto', fontSize: 16, lineHeight: 1.5 }}>
        {/* ASCII header */}
        <pre style={{ color: 'var(--color-phosphor-green)', fontSize: 10, lineHeight: 1.1, marginBottom: 8, whiteSpace: 'pre' }}>
{` _  __    _    ____ ___ ____  
| |/ /   / \\  | __ )_ _|  _ \\ 
| ' /   / _ \\ |  _ \\| || |_) |
| . \\  / ___ \\| |_) | ||  _ < 
|_|\\_\\/_/   \\_\\____/___|_| \\_\\`}
        </pre>

        {lines.map((line, i) => (
          <div key={i} style={{ color: getColor(line.type), minHeight: 20 }}>
            {line.text || '\u00A0'}
          </div>
        ))}

        {/* Input line */}
        {bootDone && (
          <div style={{ display: 'flex', alignItems: 'center', color: 'var(--color-phosphor-green)' }}>
            <span>root@kabir:~$&nbsp;</span>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'var(--color-phosphor-green)',
                fontFamily: "'VT323', monospace",
                fontSize: 16,
                caretColor: 'var(--color-phosphor-green)',
              }}
              autoFocus
              spellCheck={false}
            />
          </div>
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
