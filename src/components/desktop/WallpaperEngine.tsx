import { useEffect, useRef } from 'react';
import { useSettings } from '../../context/SettingsContext';

export default function WallpaperEngine() {
  const { wallpaper } = useSettings();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || wallpaper === 'none' || wallpaper === 'solid-color' || wallpaper === 'retro-grid') return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let timeoutId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    if (wallpaper === 'matrix-rain' || wallpaper === 'binary') {
      const chars = wallpaper === 'binary' ? '01' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';
      const fontSize = 16;
      const columns = canvas.width / fontSize;
      const drops: number[] = [];
      for (let x = 0; x < columns; x++) drops[x] = 1;

      const draw = () => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#0f0';
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
          const text = chars.charAt(Math.floor(Math.random() * chars.length));
          ctx.fillText(text, i * fontSize, drops[i] * fontSize);
          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }
        timeoutId = window.setTimeout(() => {
          animationId = requestAnimationFrame(draw);
        }, 45); // ~22fps for classic matrix feel and lower CPU usage
      };
      draw();
    } else if (wallpaper === 'cyber-rain') {
      const raindrops: {x: number, y: number, speed: number, len: number, color: string}[] = [];
      for (let i = 0; i < 150; i++) {
        raindrops.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          speed: Math.random() * 2.5 + 2.5,
          len: Math.random() * 20 + 20,
          color: Math.random() > 0.5 ? 'rgba(0, 255, 255, 0.8)' : 'rgba(255, 0, 255, 0.8)'
        });
      }

      const draw = () => {
        ctx.fillStyle = 'rgba(10, 0, 20, 0.3)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.lineWidth = 2;

        for (let i = 0; i < raindrops.length; i++) {
          const drop = raindrops[i];
          ctx.strokeStyle = drop.color;
          ctx.beginPath();
          ctx.moveTo(drop.x, drop.y);
          ctx.lineTo(drop.x, drop.y + drop.len);
          ctx.stroke();

          drop.y += drop.speed;
          if (drop.y > canvas.height) {
            drop.y = -drop.len;
            drop.x = Math.random() * canvas.width;
          }
        }
        timeoutId = window.setTimeout(() => {
          animationId = requestAnimationFrame(draw);
        }, 33); // ~30fps
      };
      draw();
    } else if (wallpaper === 'geometry') {
      const shapes: {x: number, y: number, vx: number, vy: number, sides: number, size: number, rot: number, vrot: number, color: string}[] = [];
      const colors = ['rgba(0, 255, 255, 0.5)', 'rgba(255, 0, 255, 0.5)', 'rgba(255, 255, 0, 0.5)', 'rgba(0, 255, 0, 0.5)'];
      for (let i = 0; i < 20; i++) {
        shapes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          sides: Math.floor(Math.random() * 4) + 3, // 3 to 6 sides
          size: Math.random() * 30 + 20,
          rot: Math.random() * Math.PI * 2,
          vrot: (Math.random() - 0.5) * 0.02,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }

      const draw = () => {
        ctx.fillStyle = 'rgba(10, 10, 15, 1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.lineWidth = 1.5;

        for (let i = 0; i < shapes.length; i++) {
          const s = shapes[i];
          ctx.strokeStyle = s.color;
          ctx.beginPath();
          for (let j = 0; j < s.sides; j++) {
            const angle = s.rot + (j * 2 * Math.PI / s.sides);
            const px = s.x + Math.cos(angle) * s.size;
            const py = s.y + Math.sin(angle) * s.size;
            if (j === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.stroke();

          s.x += s.vx;
          s.y += s.vy;
          s.rot += s.vrot;

          if (s.x < -s.size) s.x = canvas.width + s.size;
          if (s.x > canvas.width + s.size) s.x = -s.size;
          if (s.y < -s.size) s.y = canvas.height + s.size;
          if (s.y > canvas.height + s.size) s.y = -s.size;
        }
        timeoutId = window.setTimeout(() => {
          animationId = requestAnimationFrame(draw);
        }, 33);
      };
      draw();
    } else if (wallpaper === 'pixel-clouds') {
      const clouds: {x: number, y: number, speed: number, blocks: {bx: number, by: number, w: number, h: number}[]}[] = [];
      for (let i = 0; i < 12; i++) {
        const blocks = [];
        const numBlocks = Math.floor(Math.random() * 5) + 3;
        for (let j = 0; j < numBlocks; j++) {
          blocks.push({
            bx: (Math.random() - 0.5) * 80,
            by: (Math.random() - 0.5) * 40,
            w: Math.random() * 60 + 40,
            h: Math.random() * 30 + 20
          });
        }
        clouds.push({
          x: Math.random() * canvas.width,
          y: Math.random() * (canvas.height / 2),
          speed: Math.random() * 0.25 + 0.1,
          blocks
        });
      }

      const draw = () => {
        ctx.fillStyle = '#5bc0eb';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        for (let i = 0; i < clouds.length; i++) {
          const c = clouds[i];
          c.blocks.forEach(b => {
             // draw blocky pixelated shape
             ctx.fillRect(Math.floor((c.x + b.bx)/10)*10, Math.floor((c.y + b.by)/10)*10, Math.floor(b.w/10)*10, Math.floor(b.h/10)*10);
          });
          
          c.x += c.speed;
          if (c.x > canvas.width + 100) {
            c.x = -150;
            c.y = Math.random() * (canvas.height / 2);
          }
        }
        timeoutId = window.setTimeout(() => {
          animationId = requestAnimationFrame(draw);
        }, 33);
      };
      draw();
    } else if (wallpaper === 'starfield') {
      const numStars = 200;
      const stars: {x: number, y: number, z: number}[] = [];
      for (let i=0; i<numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width * 2 - canvas.width,
          y: Math.random() * canvas.height * 2 - canvas.height,
          z: Math.random() * canvas.width
        });
      }
      
      const draw = () => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = 'white';
        const cx = canvas.width/2;
        const cy = canvas.height/2;
        
        for (let i=0; i<numStars; i++) {
          stars[i].z -= 1;
          if (stars[i].z <= 0) {
            stars[i].z = canvas.width;
            stars[i].x = Math.random() * canvas.width * 2 - canvas.width;
            stars[i].y = Math.random() * canvas.height * 2 - canvas.height;
          }
          
          const x = cx + stars[i].x / stars[i].z * 100;
          const y = cy + stars[i].y / stars[i].z * 100;
          const s = 1.5 * (1 - stars[i].z / canvas.width);
          
          ctx.beginPath();
          ctx.arc(x, y, s, 0, Math.PI * 2);
          ctx.fill();
        }
        timeoutId = window.setTimeout(() => {
          animationId = requestAnimationFrame(draw);
        }, 33);
      }
      draw();
    }

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
      clearTimeout(timeoutId);
    };
  }, [wallpaper]);

  if (wallpaper === 'none') return null;

  if (wallpaper === 'solid-color') {
    return (
      <div style={{
        position: 'absolute', inset: 0,
        background: 'var(--color-bg-override, var(--color-bsod-blue))',
        zIndex: 0, pointerEvents: 'none'
      }} />
    );
  }

  if (wallpaper === 'retro-grid') {
    return (
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(transparent 95%, rgba(255, 0, 255, 0.5) 100%), linear-gradient(90deg, transparent 95%, rgba(255, 0, 255, 0.5) 100%)',
        backgroundSize: '40px 40px',
        backgroundColor: '#0a001a',
        zIndex: 0, pointerEvents: 'none',
        transform: 'perspective(500px) rotateX(60deg) scale(2.5) translateY(-50px)',
        transformOrigin: 'top',
        boxShadow: 'inset 0 0 100px black',
        overflow: 'hidden'
      }} />
    );
  }

  return (
    <canvas 
      ref={canvasRef} 
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}
    />
  );
}
