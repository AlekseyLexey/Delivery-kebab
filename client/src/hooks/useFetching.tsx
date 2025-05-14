import { useState } from "react";

export const useFetching = (callback) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetching = async (...args) => {
    try {
      setLoading(true);
      setError(null);
      const res = await callback(...args);
      return res;
    } catch ({ message }) {
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return [fetching, loading, error];
};
