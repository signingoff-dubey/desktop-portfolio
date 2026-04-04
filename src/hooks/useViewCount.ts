import { useState, useEffect } from 'react';

/**
 * Fetches (and increments) a real page-view counter via countapi.xyz.
 * Each unique browser session counts as one hit.
 * Returns { count, loading } — count is null until the fetch resolves.
 */
export function useViewCount(): { count: number | null; loading: boolean } {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Avoid double-counting on strict-mode double-mount:
    // Only fire if this session hasn't already counted.
    const SESSION_KEY = 'kabiros_counted';
    const alreadyCounted = sessionStorage.getItem(SESSION_KEY);

    const endpoint = alreadyCounted
      ? 'https://api.countapi.xyz/get/kabir-portfolio-os/visits'
      : 'https://api.countapi.xyz/hit/kabir-portfolio-os/visits';

    fetch(endpoint)
      .then(r => r.json())
      .then((data: { value: number }) => {
        setCount(data.value);
        if (!alreadyCounted) {
          sessionStorage.setItem(SESSION_KEY, '1');
        }
      })
      .catch(() => {
        // Silently fail — don't break the UI if the API is down
        setCount(null);
      })
      .finally(() => setLoading(false));
  }, []);

  return { count, loading };
}
