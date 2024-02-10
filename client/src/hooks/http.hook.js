import { useState, useCallback } from "react";

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const clearError = useCallback(() => setError(null), []);

  const request = useCallback( async (type, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {
    setLoading(true);
    try {
      const url = `http://localhost:4000/api/${type}`;
      const response = (await fetch(url, {method,body,headers}));

      if(!response.ok){
        throw new Error(`Could not fetch ${url}, status: ${response.status}`);
      }
      
      clearError();
      const data = await response.json();

      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      setError(error.message);
      throw error;
    }
  },[]);

  const addPoints = useCallback(async (points, token) => {
    const headers = {
      "Content-Type": "application/json",
      "x-access-token": token,
    };
    return await request('users/addPoints', 'POST', JSON.stringify({points}), headers);
  }, [request]);

  // const addToFavorites = useCallback(async (testId, token) => {
  //   const headers = {
  //     "Content-Type": "application/json",
  //     "x-access-token": token,
  //   };
  //   return await request(`users/favorites/add`, 'POST', JSON.stringify({testId}), headers);
  // }, [request]);

  return { loading, request, addPoints, error, clearError };
};
