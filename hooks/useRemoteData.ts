import { useCallback, useEffect, useState } from "react";

export type RemoteState<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
};

export function useRemoteData<T>(url: string | null, intervalMs = 0): RemoteState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(Boolean(url));
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
    if (!url) return;
    setLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
      setData((await response.json()) as T);
      setError(null);
    } catch (value) {
      setError(value instanceof Error ? value : new Error("Request failed"));
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    void refresh();
    if (!intervalMs || !url) return;
    const timer = window.setInterval(() => void refresh(), intervalMs);
    return () => window.clearInterval(timer);
  }, [intervalMs, refresh, url]);

  return { data, loading, error, refresh };
}
