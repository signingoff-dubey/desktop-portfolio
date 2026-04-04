import { useState } from 'react';

const DEFAULT_CODE = `// Write JavaScript here!
// Press RUN to execute.

console.log("Hello from PY-OS! 🖥️");

const greet = (name) => \`Welcome, \${name}!\`;
console.log(greet("Visitor"));`;

export default function CodePlayground() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [output, setOutput] = useState<string[]>([]);

  const runCode = () => {
    try {
      const iframe = document.createElement('iframe');
      // Create empty opaque origin (blocks localStorage, parent DOM, cookies)
      iframe.setAttribute('sandbox', 'allow-scripts');
      iframe.style.display = 'none';
      
      const htmlString = `
        <script>
          const logs = [];
          console.log = (...args) => logs.push(args.map(String).join(' '));
          console.error = (...args) => logs.push('ERROR: ' + args.map(String).join(' '));
          console.warn = (...args) => logs.push('WARN: ' + args.map(String).join(' '));
          
          window.addEventListener('message', (event) => {
             // Basic origin check (even opaque origins dispatch messages)
             try {
                eval(event.data);
                event.source.postMessage({ type: 'output', logs }, '*');
             } catch (err) {
                event.source.postMessage({ type: 'error', error: err.message || String(err) }, '*');
             }
          });
        </script>
      `;
      iframe.srcdoc = htmlString;
      document.body.appendChild(iframe);

      const handleMessage = (event: MessageEvent) => {
        if (event.data?.type === 'output') {
          setOutput(event.data.logs.length ? event.data.logs : ['(No output)']);
        } else if (event.data?.type === 'error') {
          setOutput(['Error: ' + event.data.error]);
        }
        if (document.body.contains(iframe)) document.body.removeChild(iframe);
        window.removeEventListener('message', handleMessage);
      };
      
      window.addEventListener('message', handleMessage);
      
      iframe.onload = () => {
         iframe.contentWindow?.postMessage(code, '*');
      };

      // 2000ms execution timeout to catch infinite while(true) loops
      setTimeout(() => {
        if (document.body.contains(iframe)) {
          setOutput(['Error: Execution timed out (Possible infinite loop).']);
          document.body.removeChild(iframe);
          window.removeEventListener('message', handleMessage);
        }
      }, 2000);

    } catch (err: unknown) {
      setOutput([`Error: ${err instanceof Error ? err.message : String(err)}`]);
    }
  };

  return (
    <div style={{ fontSize: 14, display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ color: 'hsl(120 100% 54%)', marginBottom: 8, fontSize: 15 }}>
        CODE_PLAYGROUND.JS — WRITE &amp; RUN JAVASCRIPT
      </div>

      <textarea
        value={code}
        onChange={e => setCode(e.target.value)}
        style={{
          flex: 1,
          minHeight: 140,
          background: 'hsl(240 100% 20%)',
          color: 'hsl(0 0% 88%)',
          border: '1px solid hsl(240 60% 45%)',
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
          style={{
            background: 'hsl(120 60% 30%)',
            color: 'white',
            border: '1px solid hsl(120 60% 45%)',
            padding: '4px 16px',
            cursor: 'pointer',
            fontFamily: "'VT323', monospace",
            fontSize: 15,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          ▶ RUN
        </button>
        <button
          onClick={() => { setOutput([]); setCode(DEFAULT_CODE); }}
          style={{
            background: 'hsl(240 100% 27%)',
            color: 'hsl(0 0% 75%)',
            border: '1px solid hsl(240 60% 45%)',
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
          background: 'hsl(240 100% 18%)',
          border: '1px solid hsl(240 60% 40%)',
          padding: 8,
          maxHeight: 120,
          overflow: 'auto',
        }}>
          {output.map((line, i) => (
            <div key={i} style={{ color: line.startsWith('Error') ? 'hsl(0 70% 60%)' : 'hsl(0 0% 85%)' }}>
              {line}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
