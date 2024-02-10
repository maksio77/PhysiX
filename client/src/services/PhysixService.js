import { useCallback } from "react";
import { useHttp } from "../hooks/http.hook";

const usePhysixService = () => {
  const { loading, error, clearError, request } = useHttp();

  const getAllSections = async () => {
    const res = await request("sections");
    return res;
  };

  const getAllTests = async () => {
    const res = await request("tests");
    return res;
  };

  const addPoints = useCallback(
    async (points, token) => {
      const headers = {
        "Content-Type": "application/json",
        "x-access-token": token,
      };
      return await request(
        "users/addPoints",
        "POST",
        JSON.stringify({ points }),
        headers
      );
    },
    [request]
  );

  const addFavoriteTest = useCallback(
    async (test, token) => {
      const headers = {
        "Content-Type": "application/json",
        "x-access-token": token,
      };
      return await request(
        `users/addFavoriteTest`,
        "POST",
        JSON.stringify({ test }),
        headers
      );
    },
    [request]
  );

  const removeFavoriteTest = useCallback(
    async (testId, token) => {
      const headers = {
        "Content-Type": "application/json",
        "x-access-token": token,
      };
      return await request(
        `users/removeFavoriteTest`,
        "POST",
        JSON.stringify({ testId }),
        headers
      );
    },
    [request]
  );

  const getFavoriteTestIDS = useCallback(
    async (token) => {
      const headers = {
        "Content-Type": "application/json",
        "x-access-token": token,
      };
      return await request(`users/favoriteTestsIDS`, "GET", null, headers);
    },
    [request]
  );

  return {
    loading,
    error,
    clearError,
    getAllSections,
    getAllTests,
    addPoints,
    addFavoriteTest,
    removeFavoriteTest,
    getFavoriteTestIDS,
  };
};

export default usePhysixService;
