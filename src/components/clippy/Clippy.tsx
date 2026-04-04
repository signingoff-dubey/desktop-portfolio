import { useState, useEffect } from 'react';
import { clippyTips } from '../../data/clippyTips';

export default function Clippy() {
  const [visible, setVisible] = useState(false);
  const [tipIdx, setTipIdx] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  // Appear after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-cycle tips
  useEffect(() => {
    if (!visible || dismissed) return;
    const id = setInterval(() => {
      setTipIdx(prev => (prev + 1) % clippyTips.length);
    }, 15000);
    return () => clearInterval(id);
  }, [visible, dismissed]);

  if (!visible || dismissed) return null;

  const tip = clippyTips[tipIdx];

  return (
    <div
      className="clippy-window"
      style={{
        position: 'fixed',
        bottom: 50,
        right: 16,
        width: 280,
        zIndex: 8500,
      }}
    >
      {/* Title bar */}
      <div className="clippy-title-bar">
        <span style={{ color: 'white', fontSize: 12 }}>📎 Clippy</span>
        <div style={{ display: 'flex', gap: 2 }}>
          <button
            className="win95-btn"
            style={{ width: 16, height: 16, fontSize: 10 }}
            onClick={() => setVisible(false)}
          >
            _
          </button>
          <button
            className="win95-btn"
            style={{ width: 16, height: 16, fontSize: 10 }}
            onClick={() => setDismissed(true)}
          >
            ✕
          </button>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '10px 12px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
        <span style={{ fontSize: 28, flexShrink: 0 }}>📎</span>
        <div style={{ fontSize: 13, lineHeight: 1.4 }}>
          {tip.message} {tip.emoji}
        </div>
      </div>

      {/* Buttons */}
      <div style={{ padding: '4px 12px 8px', display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
        <button
          className="clippy-btn"
          onClick={() => setTipIdx(prev => (prev + 1) % clippyTips.length)}
        >
          Next Tip
        </button>
        <button
          className="clippy-btn"
          onClick={() => setDismissed(true)}
        >
          Go Away
        </button>
      </div>
    </div>
  );
}
