import { useState, useEffect, useCallback } from "react";
import { replaceUnderscores } from "../../utils/repleceUnderscores";
import usePhysixService from "../../services/PhysixService";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMessage";

const ArticleItem = ({ item, searchPhrase, isActive }) => {
  const token = localStorage.getItem("token");
  const {
    loading,
    error,
    addFavoriteArticle,
    removeFavoriteArticle,
    getFavoriteArticlesIDS,
  } = usePhysixService();

  const [favoriteArticles, setFavoriteArticles] = useState([]);

  const getFavorite = useCallback(async () => {
    try {
      const res = await getFavoriteArticlesIDS(token);
      setFavoriteArticles(res);
    } catch (error) {
      console.error("Error fetching favorite tests:", error);
    }
  }, [token]);

  useEffect(() => {
    getFavorite();
  }, [getFavorite]);

  const handleAddFavorite = async (article) => {
    try {
      await addFavoriteArticle(article, token);
      getFavorite();
    } catch (error) {
      console.error("Error adding favorite test:", error);
    }
  };

  const handleRemoveFavorite = async (articleID) => {
    try {
      await removeFavoriteArticle(articleID, token);
      getFavorite();
    } catch (error) {
      console.error("Error removing favorite test:", error);
    }
  };

  const errorMessage = error ? <ErrorMessage message={error} /> : null;
  const spinner = loading ? <Spinner size={20} loading={loading} /> : null;

  function doesPhraseExistInText(text, phrase) {
    return text.includes(phrase);
  }

  return (
    <div
      key={item._id}
      className={`bg-${
        searchPhrase &&
        doesPhraseExistInText(item.text, searchPhrase) &&
        isActive
          ? "primary text-white"
          : "white"
      } rounded-lg overflow-hidden shadow-md`}
    >
      <div className="p-8">
        <button className="mt-4 bg-white shadow hover:bg-secondary hover:text-primary transition-all duration-200 ease-in-out text-primary sm:text-base p-2 text-right rounded-md mb-4">
          {!errorMessage && !loading ? (
            favoriteArticles.includes(item._id) ? (
              <FaStar
                onClick={() => handleRemoveFavorite(item._id)}
                size={20}
              />
            ) : (
              <FaRegStar onClick={() => handleAddFavorite(item)} size={20} />
            )
          ) : null}
          {errorMessage}
          {spinner}
        </button>
        <div className="lg:text-xl">
          {replaceUnderscores(item.text, item.formulas)}
        </div>
      </div>
    </div>
  );
};

export default ArticleItem;
