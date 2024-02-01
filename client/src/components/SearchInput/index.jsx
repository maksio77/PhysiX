import { MdClear } from "react-icons/md";
import { Link } from "react-router-dom";

const SearchInput = ({
  inputText,
  handleSearchChange,
  handleResetSearch,
  searchResults,
}) => {
  return (
    <div className="flex w-full">
      <input
        value={inputText}
        onChange={handleSearchChange}
        type="text"
        placeholder="Введіть ключове слово"
        className="w-full p-2 border border-secondary rounded-md focus:outline-none focus:border-primary"
      />
      <button
        onClick={handleResetSearch}
        className="ml-2 p-2 border border-secondary rounded-md text-white bg-primary hover:bg-secondary hover:text-primary"
      >
        <MdClear />
      </button>

      {searchResults.length > 0 && (
        <ul className="absolute max-w-screen-xl mx-auto top-full left-0 bg-white mt-2 border border-secondary rounded-md py-2 px-4 shadow-md overflow-auto max-h-48 w-full z-10">
          {searchResults.map((result, index) => (
            <li
              key={index}
              className="mb-1 border p-2 border-secondary w-full rounded-xl"
            >
              <Link
                to={result.route}
                state={result.state}
                className="block text-black hover:text-primary w-full"
              >
                {result.text}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchInput;
