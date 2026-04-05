import { useState, useRef, useEffect, useCallback } from 'react';

const ROWS = 20;
const COLS = 10;
const CELL = 20;

const PIECES = [
  { shape: [[1,1,1,1]], color: '#14FF14' },           // I
  { shape: [[1,1],[1,1]], color: '#FFFF00' },          // O
  { shape: [[0,1,0],[1,1,1]], color: '#FF00FF' },      // T
  { shape: [[1,0],[1,0],[1,1]], color: '#FFA500' },     // L
  { shape: [[0,1],[0,1],[1,1]], color: '#0088FF' },     // J
  { shape: [[0,1,1],[1,1,0]], color: '#00FF88' },       // S
  { shape: [[1,1,0],[0,1,1]], color: '#FF4444' },       // Z
];

type Board = (string | null)[][];

function createBoard(): Board {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(null));
}

function randomPiece() {
  const p = PIECES[Math.floor(Math.random() * PIECES.length)];
  return { shape: p.shape.map(r => [...r]), color: p.color, x: 3, y: 0 };
}

function rotate(shape: number[][]) {
  const rows = shape.length, cols = shape[0].length;
  const rotated: number[][] = [];
  for (let c = 0; c < cols; c++) {
    rotated.push([]);
    for (let r = rows - 1; r >= 0; r--) {
      rotated[c].push(shape[r][c]);
    }
  }
  return rotated;
}

function collides(board: Board, shape: number[][], x: number, y: number) {
  for (let r = 0; r < shape.length; r++) {
    for (let c = 0; c < shape[r].length; c++) {
      if (!shape[r][c]) continue;
      const nx = x + c, ny = y + r;
      if (nx < 0 || nx >= COLS || ny >= ROWS) return true;
      if (ny >= 0 && board[ny][nx]) return true;
    }
  }
  return false;
}

function merge(board: Board, shape: number[][], x: number, y: number, color: string): Board {
  const nb = board.map(r => [...r]);
  for (let r = 0; r < shape.length; r++) {
    for (let c = 0; c < shape[r].length; c++) {
      if (shape[r][c] && y + r >= 0) {
        nb[y + r][x + c] = color;
      }
    }
  }
  return nb;
}

function clearRows(board: Board): { board: Board; cleared: number } {
  const nb = board.filter(r => r.some(c => !c));
  const cleared = ROWS - nb.length;
  while (nb.length < ROWS) nb.unshift(Array(COLS).fill(null));
  return { board: nb, cleared };
}

export default function Tetris() {
  const [board, setBoard] = useState(createBoard);
  const [piece, setPiece] = useState(randomPiece);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [running, setRunning] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  const boardRef = useRef(board);
  useEffect(() => { boardRef.current = board; }, [board]);

  const drop = useCallback(() => {
    if (gameOver || !running) return;
    setPiece(prev => {
      if (!collides(boardRef.current, prev.shape, prev.x, prev.y + 1)) {
        return { ...prev, y: prev.y + 1 };
      }
      const newBoard = merge(boardRef.current, prev.shape, prev.x, prev.y, prev.color);
      const { board: cleared, cleared: count } = clearRows(newBoard);
      setBoard(cleared);
      setScore(s => s + count * 100 + 10);
      const next = randomPiece();
      if (collides(cleared, next.shape, next.x, next.y)) {
        setGameOver(true);
        setRunning(false);
      }
      return next;
    });
  }, [gameOver, running]);

  useEffect(() => {
    if (running && !gameOver) {
      intervalRef.current = setInterval(drop, 500);
    }
    return () => clearInterval(intervalRef.current);
  }, [drop, running, gameOver]);

  const handleAction = useCallback((action: string) => {
    if (gameOver || !running) return;
    setPiece(prev => {
      switch (action) {
        case 'ArrowLeft':
          return collides(boardRef.current, prev.shape, prev.x - 1, prev.y) ? prev : { ...prev, x: prev.x - 1 };
        case 'ArrowRight':
          return collides(boardRef.current, prev.shape, prev.x + 1, prev.y) ? prev : { ...prev, x: prev.x + 1 };
        case 'ArrowDown':
          return collides(boardRef.current, prev.shape, prev.x, prev.y + 1) ? prev : { ...prev, y: prev.y + 1 };
        case 'ArrowUp': {
          const rotated = rotate(prev.shape);
          return collides(boardRef.current, rotated, prev.x, prev.y) ? prev : { ...prev, shape: rotated };
        }
        default: return prev;
      }
    });
  }, [gameOver, running]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
        handleAction(e.key);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleAction]);

  const restart = () => {
    setBoard(createBoard());
    setPiece(randomPiece());
    setScore(0);
    setGameOver(false);
    setRunning(true);
  };

  // Render board
  const display = board.map(r => [...r]);
  if (!gameOver) {
    for (let r = 0; r < piece.shape.length; r++) {
      for (let c = 0; c < piece.shape[r].length; c++) {
        if (piece.shape[r][c] && piece.y + r >= 0 && piece.y + r < ROWS) {
          display[piece.y + r][piece.x + c] = piece.color;
        }
      }
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <div style={{ color: 'var(--color-log-yellow)', fontSize: 16 }}>Score: {score}</div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${COLS}, ${CELL}px)`,
        gridTemplateRows: `repeat(${ROWS}, ${CELL}px)`,
        border: '2px solid var(--color-border-light)',
        background: 'var(--color-card-bg)',
        position: 'relative',
      }}>
        {display.flat().map((cell, i) => (
          <div key={i} style={{
            width: CELL, height: CELL,
            background: cell || 'transparent',
            border: cell ? '1px solid rgba(0,0,0,0.3)' : '1px solid var(--color-border-dark)',
          }} />
        ))}
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

      <div style={{ color: 'var(--color-phosphor-white)', fontSize: 13, marginTop: 4 }}>Touch or Arrow keys to play</div>

      {/* Mobile Controls */}
      <div className="no-print" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 44px)', gap: 8, marginTop: 4, justifyContent: 'center' }}>
        <div />
        <button 
          onPointerDown={(e) => { e.preventDefault(); handleAction('ArrowUp'); }} 
          style={{ background: 'var(--color-card-bg)', border: '1.5px solid var(--color-border-light)', color: 'white', height: 44, borderRadius: 4, cursor: 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>↑</button>
        <div />
        <button 
          onPointerDown={(e) => { e.preventDefault(); handleAction('ArrowLeft'); }} 
          style={{ background: 'var(--color-card-bg)', border: '1.5px solid var(--color-border-light)', color: 'white', height: 44, borderRadius: 4, cursor: 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>←</button>
        <button 
          onPointerDown={(e) => { e.preventDefault(); handleAction('ArrowDown'); }} 
          style={{ background: 'var(--color-card-bg)', border: '1.5px solid var(--color-border-light)', color: 'white', height: 44, borderRadius: 4, cursor: 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>↓</button>
        <button 
          onPointerDown={(e) => { e.preventDefault(); handleAction('ArrowRight'); }} 
          style={{ background: 'var(--color-card-bg)', border: '1.5px solid var(--color-border-light)', color: 'white', height: 44, borderRadius: 4, cursor: 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>→</button>
      </div>
    </div>
  );
}
