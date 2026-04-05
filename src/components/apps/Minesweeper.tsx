import { useState, useEffect, useCallback } from 'react';

type CellValue = number | 'mine';
type CellState = 'hidden' | 'revealed' | 'flagged';

interface Cell {
  value: CellValue;
  state: CellState;
}

const ROWS = 9;
const COLS = 9;
const MINES = 10;

export default function Minesweeper() {
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [minesLeft, setMinesLeft] = useState(MINES);
  const [firstClick, setFirstClick] = useState(true);

  const initGrid = useCallback(() => {
    const newGrid: Cell[][] = Array(ROWS).fill(null).map(() =>
      Array(COLS).fill(null).map(() => ({ value: 0, state: 'hidden' }))
    );
    setGrid(newGrid);
    setGameOver(false);
    setWin(false);
    setMinesLeft(MINES);
    setFirstClick(true);
  }, []);

  useEffect(() => {
    initGrid();
  }, [initGrid]);

  const placeMines = (firstRow: number, firstCol: number, currentGrid: Cell[][]) => {
    let minesPlaced = 0;
    while (minesPlaced < MINES) {
      const r = Math.floor(Math.random() * ROWS);
      const c = Math.floor(Math.random() * COLS);
      if (currentGrid[r][c].value !== 'mine' && (r !== firstRow || c !== firstCol)) {
        currentGrid[r][c].value = 'mine';
        minesPlaced++;
      }
    }

    // Calculate numbers
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (currentGrid[r][c].value === 'mine') continue;
        let count = 0;
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const nr = r + dr, nc = c + dc;
            if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && currentGrid[nr][nc].value === 'mine') {
              count++;
            }
          }
        }
        currentGrid[r][c].value = count;
      }
    }
  };

  const reveal = (r: number, c: number) => {
    if (gameOver || win || grid[r][c].state !== 'hidden') return;

    const newGrid = [...grid.map(row => [...row])];

    if (firstClick) {
      placeMines(r, c, newGrid);
      setFirstClick(false);
    }

    if (newGrid[r][c].value === 'mine') {
      // Game Over
      newGrid.forEach(row => row.forEach(cell => {
        if (cell.value === 'mine') cell.state = 'revealed';
      }));
      setGrid(newGrid);
      setGameOver(true);
      return;
    }

    const floodFill = (row: number, col: number) => {
      if (row < 0 || row >= ROWS || col < 0 || col >= COLS) return;
      if (newGrid[row][col].state !== 'hidden') return;

      newGrid[row][col].state = 'revealed';
      if (newGrid[row][col].value === 0) {
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            floodFill(row + dr, col + dc);
          }
        }
      }
    };

    floodFill(r, c);
    setGrid(newGrid);
    checkWin(newGrid);
  };

  const flag = (e: React.MouseEvent, r: number, c: number) => {
    e.preventDefault();
    if (gameOver || win || grid[r][c].state === 'revealed') return;

    const newGrid = [...grid.map(row => [...row])];
    const cell = newGrid[r][c];
    
    if (cell.state === 'hidden' && minesLeft > 0) {
      cell.state = 'flagged';
      setMinesLeft(m => m - 1);
    } else if (cell.state === 'flagged') {
      cell.state = 'hidden';
      setMinesLeft(m => m + 1);
    }
    setGrid(newGrid);
  };

  const checkWin = (currentGrid: Cell[][]) => {
    let unrevealed = 0;
    currentGrid.forEach(row => row.forEach(c => {
      if (c.state !== 'revealed') unrevealed++;
    }));
    if (unrevealed === MINES) {
      setWin(true);
      setMinesLeft(0);
    }
  };

  const getNumberColor = (num: number) => {
    const colors = ['#0000FF', '#007B00', '#FF0000', '#00007B', '#7B0000', '#007B7B', '#000000', '#7B7B7B'];
    return colors[num - 1] || 'black';
  };

  return (
    <div style={{ padding: 10, background: 'var(--color-window-bg)', border: '2px solid', borderColor: 'var(--color-border-light) var(--color-border-dark) var(--color-border-dark) var(--color-border-light)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', background: 'black', color: 'red', padding: '4px 8px', boxSizing: 'border-box', fontFamily: 'monospace', fontSize: 24, marginBottom: 10, border: '2px solid', borderColor: 'var(--color-border-dark) var(--color-border-light) var(--color-border-light) var(--color-border-dark)' }}>
        <span>{minesLeft.toString().padStart(3, '0')}</span>
        <button 
          onClick={initGrid}
          style={{ cursor: 'pointer', fontSize: 20, padding: 0, width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {win ? '😎' : gameOver ? '😵' : '🙂'}
        </button>
        <span>{/* Timer normally goes here */}000</span>
      </div>

      <div style={{ border: '3px solid', borderColor: 'var(--color-border-dark) var(--color-border-light) var(--color-border-light) var(--color-border-dark)', background: 'var(--color-window-bg)' }}>
        {grid.map((row, r) => (
          <div key={r} style={{ display: 'flex' }}>
            {row.map((cell, c) => (
              <div
                key={`${r}-${c}`}
                onClick={() => reveal(r, c)}
                onContextMenu={(e) => flag(e, r, c)}
                style={{
                  width: 24,
                  height: 24,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: 14,
                  cursor: 'pointer',
                  userSelect: 'none',
                  background: 'var(--color-window-bg)',
                  border: cell.state === 'revealed' ? '1px solid var(--color-border-dark)' : '2px solid',
                  borderColor: cell.state === 'revealed' ? 'var(--color-border-dark)' : 'var(--color-border-light) var(--color-border-dark) var(--color-border-dark) var(--color-border-light)',
                  color: cell.state === 'revealed' && typeof cell.value === 'number' ? getNumberColor(cell.value) : 'var(--color-phosphor-white)'
                }}
              >
                {cell.state === 'flagged' ? '🚩' : 
                 cell.state === 'revealed' ? (
                   cell.value === 'mine' ? '💣' : (cell.value > 0 ? cell.value : '')
                 ) : ''}
              </div>
            ))}
          </div>
        ))}
      </div>

      <button 
        onClick={initGrid}
        style={{ 
          marginTop: 12, 
          background: 'var(--color-taskbar-bg)', 
          color: 'var(--color-phosphor-white)', 
          border: '1px solid var(--color-border-light)', 
          padding: '6px 16px', 
          cursor: 'pointer', 
          fontFamily: "'VT323', monospace", 
          fontSize: 16
        }}
      >
        RESTART
      </button>
    </div>
  );
}
