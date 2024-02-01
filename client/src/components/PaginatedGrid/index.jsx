import { useState } from "react";
import { replaceUnderscores } from "../../utils/repleceUnderscores";

const itemsPerPage = 6;

const PaginatedGrid = ({ theme, searchPhrase, isActive }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handleClickNext = () => {
    const pagesCount = theme.info.length / itemsPerPage
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
        <button className="w-1/2 px-2 border-2 border-secondary rounded-md text-white bg-primary hover:bg-secondary hover:text-primary" onClick={handleClickPrev}>
          Prev
        </button>
        <p className="text-xl m-2">{currentPage}</p>
        <button className="w-1/2 px-2 border-2 border-secondary rounded-md text-white bg-primary hover:bg-secondary hover:text-primary" onClick={handleClickNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginatedGrid;
