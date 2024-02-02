import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { replaceUnderscores } from "../../utils/repleceUnderscores";
import { GrLinkNext } from "react-icons/gr";
import { GrLinkPrevious } from "react-icons/gr";

const itemsPerPage = 6;

const PaginatedGrid = ({ theme, searchPhrase, inputText }) => {
  let navigate = useNavigate();
  let { page, section } = useParams();
  const pagesCount = theme.info.length / itemsPerPage;

  const [currentPage, setCurrentPage] = useState(parseInt(page));
  const [isActive, setIsActive] = useState(true);

  const goToFirstPage = () => {
    setCurrentPage(1);
    navigate(`/sections/${section}/${theme.themeRoute}/${currentPage}`);
  };

  useEffect(() => {
    if (pagesCount + 1 <= currentPage || currentPage <=0)
      goToFirstPage();  

    window.history.pushState(null, "", currentPage);

    if (inputText && theme.info.length <=6)
      goToFirstPage();

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
