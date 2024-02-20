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

  const getTopTen = async () => {
    const res = await request("users/top");
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
        `tests/addFavoriteTest`,
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
        `tests/removeFavoriteTest`,
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
      return await request(`tests/favoriteTestsIDS`, "GET", null, headers);
    },
    [request]
  );

  const addFavoriteArticle = useCallback(
    async (article, token) => {
      const headers = {
        "Content-Type": "application/json",
        "x-access-token": token,
      };
      return await request(
        `sections/addFavoriteArticle`,
        "POST",
        JSON.stringify({ article }),
        headers
      );
    },
    [request]
  );

  const removeFavoriteArticle = useCallback(
    async (articleId, token) => {
      const headers = {
        "Content-Type": "application/json",
        "x-access-token": token,
      };
      return await request(
        `sections/removeFavoriteArticle`,
        "POST",
        JSON.stringify({ articleId }),
        headers
      );
    },
    [request]
  );

  const getFavoriteArticlesIDS = useCallback(
    async (token) => {
      const headers = {
        "Content-Type": "application/json",
        "x-access-token": token,
      };
      return await request(
        `sections/favoriteArticlesIDS`,
        "GET",
        null,
        headers
      );
    },
    [request]
  );

  const getCurrentUser = useCallback(
    async (token) => {
      const headers = {
        "Content-Type": "application/json",
        "x-access-token": token,
      };
      return await request(`users/currentUser`, "GET", null, headers);
    },
    [request]
  );

  const getFavoriteItems = useCallback(
    async (token) => {
      const headers = {
        "Content-Type": "application/json",
        "x-access-token": token,
      };
      return await request(`users/userFavoriteItems`, "GET", null, headers);
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
    getTopTen,
    getCurrentUser,
    addFavoriteArticle,
    removeFavoriteArticle,
    getFavoriteArticlesIDS,
    getFavoriteItems
  };
};

export default usePhysixService;
