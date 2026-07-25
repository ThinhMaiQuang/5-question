import { useCallback, useEffect, useState } from "react";

export function useFetch<T>(initialUrl: string, initialData: T) {
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchedData, setFetchedData] = useState<T | null>(initialData);
  const [url, setUrl] = useState<string>(initialUrl);

  const fetchData = useCallback(
    async (url: string, onSuccess?: (result: T) => void) => {
      if (!url) return;
      setIsFetching(true);
      setError(null);
      try {
        const response = await fetch(url);
        const resData = await response.json();
        setFetchedData(resData);
        if (onSuccess) {
          onSuccess(resData);
        }
      } catch (error) {
        setError("Failed to fetch.");
      } finally {
        setIsFetching(false);
      }
    },
    []
  );

  useEffect(() => {
    if (url) {
      fetchData(url);
    }
  }, [url, fetchData]);

  return {
    isFetching,
    fetchedData,
    error,
    fetchData,
    setFetchedData,
    setUrl,
  };
}
