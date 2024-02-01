import { MdClear } from "react-icons/md";

const SearchInput = ({
  inputText,
  handleSearchChange,
  handleResetSearch,
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
    </div>
  );
};

export default SearchInput;
