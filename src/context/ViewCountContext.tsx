import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface ViewCountContextType {
  count: number | null;
  loading: boolean;
}

const ViewCountContext = createContext<ViewCountContextType | null>(null);

export function ViewCountProvider({ children }: { children: ReactNode }) {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
        setCount(null);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <ViewCountContext.Provider value={{ count, loading }}>
      {children}
    </ViewCountContext.Provider>
  );
}

export function useViewCount(): ViewCountContextType {
  const ctx = useContext(ViewCountContext);
  if (!ctx) throw new Error('useViewCount must be inside ViewCountProvider');
  return ctx;
}
