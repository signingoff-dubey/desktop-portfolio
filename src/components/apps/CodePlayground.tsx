import { useState, useRef, useEffect, useCallback } from 'react';

const DEFAULT_CODE = `// Write JavaScript here!
// Press RUN to execute.

console.log("Hello from KABIR-OS! 🖥️");

const greet = (name) => \`Welcome, \${name}!\`;
console.log(greet("Visitor"));`;

export default function CodePlayground() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [output, setOutput] = useState<string[]>([]);
  const [running, setRunning] = useState(false);
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
      }
    };
  }, []);

  const runCode = useCallback(() => {
    if (running) return;
    setRunning(true);

    if (workerRef.current) {
      workerRef.current.terminate();
    }

    const workerBlob = new Blob(
      [
        `
        const logs = [];
        const _log = (...args) => logs.push(args.map(String).join(' '));
        const _error = (...args) => logs.push('ERROR: ' + args.map(String).join(' '));
        const _warn = (...args) => logs.push('WARN: ' + args.map(String).join(' '));

        self.console = { log: _log, error: _error, warn: _warn, info: _log, debug: _log };

        self.onmessage = (e) => {
          try {
            eval(e.data);
            self.postMessage({ type: 'output', logs: logs.length ? logs : ['(No output)'] });
          } catch (err) {
            self.postMessage({ type: 'error', error: err.message || String(err) });
          }
        };
        `,
      ],
      { type: 'application/javascript' }
    );

    const workerUrl = URL.createObjectURL(workerBlob);
    const worker = new Worker(workerUrl);
    workerRef.current = worker;

    worker.onmessage = (e: MessageEvent) => {
      if (e.data?.type === 'output') {
        setOutput(e.data.logs);
      } else if (e.data?.type === 'error') {
        setOutput(['Error: ' + e.data.error]);
      }
      worker.terminate();
      workerRef.current = null;
      URL.revokeObjectURL(workerUrl);
      setRunning(false);
    };

    worker.onerror = (err) => {
      setOutput(['Error: ' + err.message]);
      worker.terminate();
      workerRef.current = null;
      URL.revokeObjectURL(workerUrl);
      setRunning(false);
    };

    const timeout = setTimeout(() => {
      if (workerRef.current) {
        setOutput(['Error: Execution timed out (Possible infinite loop).']);
        worker.terminate();
        workerRef.current = null;
        URL.revokeObjectURL(workerUrl);
        setRunning(false);
      }
    }, 2000);

    worker.postMessage(code);

    return () => clearTimeout(timeout);
  }, [code, running]);

  return (
    <div style={{ fontSize: 14, display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ color: 'var(--color-phosphor-green)', marginBottom: 8, fontSize: 15 }}>
        CODE_PLAYGROUND.JS — WRITE &amp; RUN JAVASCRIPT
      </div>

      <textarea
        value={code}
        onChange={e => setCode(e.target.value)}
        style={{
          flex: 1,
          minHeight: 140,
          background: 'var(--color-dark-blue)',
          color: 'var(--color-phosphor-white)',
          border: '1px solid var(--color-border-light)',
          padding: 10,
          fontFamily: "'VT323', monospace",
          fontSize: 15,
          resize: 'none',
          outline: 'none',
        }}
        spellCheck={false}
      />

      <div style={{ display: 'flex', gap: 8, margin: '8px 0' }}>
        <button
          onClick={runCode}
          disabled={running}
          style={{
            background: running ? 'hsl(60 60% 20%)' : 'hsl(120 60% 30%)',
            color: 'white',
            border: '1px solid hsl(120 60% 45%)',
            padding: '4px 16px',
            cursor: running ? 'wait' : 'pointer',
            fontFamily: "'VT323', monospace",
            fontSize: 15,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          {running ? '⏳ RUNNING...' : '▶ RUN'}
        </button>
        <button
          onClick={() => { setOutput([]); setCode(DEFAULT_CODE); }}
          style={{
            background: 'var(--color-window-bg)',
            color: 'var(--color-phosphor-white)',
            border: '1px solid var(--color-border-light)',
            padding: '4px 16px',
            cursor: 'pointer',
            fontFamily: "'VT323', monospace",
            fontSize: 15,
          }}
        >
          CLEAR
        </button>
      </div>

      {output.length > 0 && (
        <div style={{
          background: 'var(--color-dark-blue)',
          border: '1px solid var(--color-border-dark)',
          padding: 8,
          maxHeight: 120,
          overflow: 'auto',
        }}>
          {output.map((line, i) => (
            <div key={i} style={{ color: line.startsWith('Error') ? 'hsl(0 70% 60%)' : 'var(--color-phosphor-white)' }}>
              {line}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
