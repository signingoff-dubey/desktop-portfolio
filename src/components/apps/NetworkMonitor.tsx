import { useState, useEffect } from 'react';

interface Repo {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  html_url: string;
  updated_at: string;
}

const GITHUB_USERNAME = 'signingoff-dubey';

export default function NetworkMonitor() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchGithub() {
      try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        
        if (mounted) {
          // Filter out forks and grab top 6 recently updated
          const topRepos = data
            .filter((r: { fork: boolean }) => !r.fork)
            .slice(0, 8);
          setRepos(topRepos);
          setError(null);
        }
      } catch (err: unknown) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Connection Refused');
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchGithub();
    return () => { mounted = false; };
  }, []);

  return (
    <div style={{ fontSize: 13, display: 'flex', flexDirection: 'column', height: '100%', fontFamily: "'VT323', monospace" }}>
      <div style={{ borderBottom: '1px solid hsl(240 60% 50%)', paddingBottom: 6, marginBottom: 12, display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ color: 'hsl(120 100% 54%)' }}>PING api.github.com (140.82.112.4)</span>
        <span style={{ color: 'hsl(0 0% 65%)' }}>PORT: 443 [HTTPS]</span>
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {loading && <div className="cursor-blink" style={{ color: 'hsl(60 100% 50%)' }}>Establishing secure connection...</div>}
        
        {error && <div style={{ color: 'hsl(0 100% 60%)' }}>[ERROR] PACKET LOSS: {error}</div>}

        {!loading && !error && repos.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 10 }}>
            {repos.map(r => (
              <a 
                key={r.id}
                href={r.html_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block',
                  textDecoration: 'none',
                  background: 'hsl(240 100% 22%)',
                  border: '1px solid hsl(240 60% 45%)',
                  padding: 10,
                  transition: 'background 0.2s',
                  color: 'inherit'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = 'hsl(240 100% 30%)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'hsl(240 100% 22%)'}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ color: 'white', fontSize: 15 }}>{r.name}</span>
                  <span style={{ color: 'hsl(60 100% 50%)' }}>★ {r.stargazers_count}   ⑂ {r.forks_count}</span>
                </div>
                <div style={{ color: 'hsl(0 0% 70%)', marginBottom: 6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {r.description || 'No description provided.'}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'hsl(120 100% 54%)', fontSize: 11 }}>
                  <span>{r.language || 'Mixed'}</span>
                  <span>UPDATED: {new Date(r.updated_at).toLocaleDateString()}</span>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
