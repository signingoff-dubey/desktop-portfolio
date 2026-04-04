import { useState, useEffect, useRef, useCallback } from 'react';

const GRID = 20;
const CELL = 18;
const SPEED = 120;

type Point = { x: number; y: number };
type Dir = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

function randomFood(snake: Point[]): Point {
  let food: Point;
  do {
    food = { x: Math.floor(Math.random() * GRID), y: Math.floor(Math.random() * GRID) };
  } while (snake.some(s => s.x === food.x && s.y === food.y));
  return food;
}

export default function Snake() {
  const [snake, setSnake] = useState<Point[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Point>({ x: 15, y: 10 });
  const [dir, setDir] = useState<Dir>('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [running, setRunning] = useState(true);
  const dirRef = useRef(dir);

  useEffect(() => { dirRef.current = dir; }, [dir]);

  const tick = useCallback(() => {
    if (gameOver || !running) return;
    setSnake(prev => {
      const head = { ...prev[0] };
      switch (dirRef.current) {
        case 'UP': head.y--; break;
        case 'DOWN': head.y++; break;
        case 'LEFT': head.x--; break;
        case 'RIGHT': head.x++; break;
      }

      // Wall collision
      if (head.x < 0 || head.x >= GRID || head.y < 0 || head.y >= GRID) {
        setGameOver(true);
        setRunning(false);
        return prev;
      }

      // Self collision
      if (prev.some(s => s.x === head.x && s.y === head.y)) {
        setGameOver(true);
        setRunning(false);
        return prev;
      }

      const newSnake = [head, ...prev];

      // Eat food
      if (head.x === food.x && head.y === food.y) {
        setScore(s => s + 10);
        setFood(randomFood(newSnake));
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [food, gameOver, running]);

  useEffect(() => {
    if (running && !gameOver) {
      const id = setInterval(tick, SPEED);
      return () => clearInterval(id);
    }
  }, [tick, running, gameOver]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (gameOver) return;
      const opposites: Record<Dir, Dir> = { UP: 'DOWN', DOWN: 'UP', LEFT: 'RIGHT', RIGHT: 'LEFT' };
      const keyMap: Record<string, Dir> = { ArrowUp: 'UP', ArrowDown: 'DOWN', ArrowLeft: 'LEFT', ArrowRight: 'RIGHT' };
      const newDir = keyMap[e.key];
      if (newDir && newDir !== opposites[dirRef.current]) {
        e.preventDefault();
        setDir(newDir);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [gameOver]);

  const restart = () => {
    const initial = [{ x: 10, y: 10 }];
    setSnake(initial);
    setFood(randomFood(initial));
    setDir('RIGHT');
    setScore(0);
    setGameOver(false);
    setRunning(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <div style={{ color: 'var(--color-log-yellow)', fontSize: 16 }}>Score: {score}</div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${GRID}, ${CELL}px)`,
        gridTemplateRows: `repeat(${GRID}, ${CELL}px)`,
        border: '2px solid var(--color-border-light)',
        background: 'var(--color-card-bg)',
        position: 'relative',
      }}>
        {Array.from({ length: GRID * GRID }).map((_, i) => {
          const x = i % GRID;
          const y = Math.floor(i / GRID);
          const isSnake = snake.some(s => s.x === x && s.y === y);
          const isHead = snake[0]?.x === x && snake[0]?.y === y;
          const isFood = food.x === x && food.y === y;

          return (
            <div key={i} style={{
              width: CELL, height: CELL,
              background: isHead ? '#FFFFFF' : isSnake ? '#14FF14' : isFood ? '#FF4444' : 'transparent',
              border: (isSnake || isFood) ? '1px solid rgba(0,0,0,0.2)' : '1px solid var(--color-border-dark)',
            }} />
          );
        })}
      </div>

      {gameOver && (
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: 'hsl(0 70% 60%)', fontSize: 18, marginBottom: 8 }}>GAME OVER</div>
          <button onClick={restart} style={{ 
            background: 'var(--color-taskbar-bg)', color: 'var(--color-phosphor-white)', border: '1px solid var(--color-border-light)', 
            padding: '4px 12px', cursor: 'pointer', fontFamily: "'VT323', monospace", fontSize: 16
          }}>
            RESTART
          </button>
        </div>
      )}

      <div style={{ color: 'var(--color-phosphor-white)', fontSize: 12 }}>Arrow keys to play</div>
    </div>
  );
}
