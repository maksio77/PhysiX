import { useState, useCallback } from "react";
import axios from "axios";

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback( async () => {
    setLoading(true);
    try {
      const url = `http://localhost:4000/api/sections`;
      const { data } = await axios.get(url);

      if(!data.ok){
        throw new Error(`Could not fetch ${url}, status: ${data.status}`);
      }

      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      setError(error.message);
      throw error;
    }
  },[]);

  const clearError = useCallback(() => setError(null), []);

  return { loading, request, error, clearError };
};
