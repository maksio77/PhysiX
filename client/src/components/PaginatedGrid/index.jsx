import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { replaceUnderscores } from "../../utils/repleceUnderscores";
import { GrLinkNext } from "react-icons/gr";
import { GrLinkPrevious } from "react-icons/gr";
import usePhysixService from "../../services/PhysixService";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMessage";

const itemsPerPage = 6;

const PaginatedGrid = ({ theme, searchPhrase, inputText }) => {
  let navigate = useNavigate();
  let { page, section } = useParams();
  const pagesCount = theme.info.length / itemsPerPage;

  const token = localStorage.getItem("token");
  const {
    loading,
    error,
    addFavoriteArticle,
    removeFavoriteArticle,
    getFavoriteArticlesIDS,
  } = usePhysixService();

  const [currentPage, setCurrentPage] = useState(parseInt(page));
  const [isActive, setIsActive] = useState(true);
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

  const goToFirstPage = () => {
    setCurrentPage(1);
    navigate(`/sections/${section}/${theme.themeRoute}/${currentPage}`);
  };

  useEffect(() => {
    if (pagesCount + 1 <= currentPage || currentPage <= 0) goToFirstPage();

    window.history.pushState(null, "", currentPage);

    if (inputText && theme.info.length <= 6) goToFirstPage();
  }, [currentPage, inputText]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsActive(false);
    }, 60000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleClickNext = () => {
    if (pagesCount > currentPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleClickPrev = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const paginatedItems = theme.info.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  function doesPhraseExistInText(text, phrase) {
    return text.includes(phrase);
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 m-2 w-full">
        {paginatedItems.map((item) => (
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
                    <FaRegStar
                      onClick={() => handleAddFavorite(item)}
                      size={20}
                    />
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
        ))}
      </div>
      <div className="flex justify-between mb-4">
        <button
          className={`flex items-center w-1/2 px-2 border-2 border-secondary rounded-md ${
            currentPage !== 1
              ? "text-white bg-primary hover:bg-secondary hover:text-primary"
              : "bg-secondary text-primary cursor-default"
          }`}
          onClick={handleClickPrev}
        >
          <GrLinkPrevious />
          <div className="flex-grow flex justify-center">Попередня</div>
        </button>
        <p className="text-xl m-2">{currentPage}</p>
        <button
          className={`flex items-center w-1/2 px-2 border-2 border-secondary rounded-md ${
            pagesCount > currentPage
              ? "text-white bg-primary hover:bg-secondary hover:text-primary"
              : "bg-secondary text-primary cursor-default"
          }`}
          onClick={handleClickNext}
        >
          <div className="flex-grow flex justify-center">Наступна</div>
          <GrLinkNext />
        </button>
      </div>
    </div>
  );
};

export default PaginatedGrid;
