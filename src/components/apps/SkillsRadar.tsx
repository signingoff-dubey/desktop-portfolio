import { useRef, useEffect } from 'react';

const SKILLS_DATA = [
  { label: 'Frontend', value: 90 },
  { label: 'Backend', value: 82 },
  { label: 'AI/ML', value: 75 },
  { label: 'DevOps', value: 70 },
  { label: 'Testing', value: 78 },
  { label: 'System Design', value: 80 },
];

export default function SkillsRadar() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H / 2;
    const R = Math.min(W, H) / 2 - 40;
    const n = SKILLS_DATA.length;
    const angleStep = (Math.PI * 2) / n;

    ctx.clearRect(0, 0, W, H);

    // Grid rings
    for (let ring = 1; ring <= 4; ring++) {
      const r = (R * ring) / 4;
      ctx.beginPath();
      for (let i = 0; i <= n; i++) {
        const a = i * angleStep - Math.PI / 2;
        const x = cx + r * Math.cos(a);
        const y = cy + r * Math.sin(a);
        if (i === 0) ctx.moveTo(x, y); 
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = 'hsla(240, 60%, 55%, 0.4)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Spokes
    for (let i = 0; i < n; i++) {
      const a = i * angleStep - Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + R * Math.cos(a), cy + R * Math.sin(a));
      ctx.strokeStyle = 'hsla(240, 60%, 55%, 0.3)';
      ctx.stroke();
    }

    // Data polygon
    ctx.beginPath();
    for (let i = 0; i <= n; i++) {
      const idx = i % n;
      const a = idx * angleStep - Math.PI / 2;
      const r = (R * SKILLS_DATA[idx].value) / 100;
      const x = cx + r * Math.cos(a);
      const y = cy + r * Math.sin(a);
      if (i === 0) ctx.moveTo(x, y); 
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = 'hsla(120, 100%, 54%, 0.15)';
    ctx.fill();
    ctx.strokeStyle = 'hsl(120, 100%, 54%)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Data points + Labels
    for (let i = 0; i < n; i++) {
      const a = i * angleStep - Math.PI / 2;
      const r = (R * SKILLS_DATA[i].value) / 100;
      const x = cx + r * Math.cos(a);
      const y = cy + r * Math.sin(a);

      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = 'hsl(120, 100%, 54%)';
      ctx.fill();

      // Label
      const lx = cx + (R + 22) * Math.cos(a);
      const ly = cy + (R + 22) * Math.sin(a);
      ctx.font = "14px 'VT323', monospace";
      ctx.fillStyle = 'hsl(0, 0%, 85%)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${SKILLS_DATA[i].label} (${SKILLS_DATA[i].value}%)`, lx, ly);
    }
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ color: 'hsl(120 100% 54%)', fontSize: 16, marginBottom: 12 }}>SKILLS RADAR</div>
      <canvas ref={canvasRef} width={380} height={340} style={{ maxWidth: '100%', height: 'auto' }} />
    </div>
  );
}
