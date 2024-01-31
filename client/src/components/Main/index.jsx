import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { MdClear } from "react-icons/md";
import ErrorMessage from "../ErrorMessage";
import Spinner from "../Spinner";
import { searchInputText } from "../../utils/searchInputText";
import { SectionContext } from "../SectionContext";

const Main = () => {
  const { sections, error, loading } = useContext(SectionContext);

  const [searchResults, setSearchResults] = useState([]);
  const [inputText, setInputText] = useState("");
  const [themes, setThemes] = useState({});
  const [openTheme, setOpenTheme] = useState("");

  const findThemesByRouteName = (routeName, array) => {
    if (openTheme === routeName) {
      setOpenTheme("");
      setThemes([]);
      return;
    }

    const res = array.find((object) => object.routeName === routeName);
    setThemes(res?.themes || []);
    setOpenTheme(routeName);
  };

  const handleSearchChange = (e) => {
    setInputText(e.target.value);
    setSearchResults(searchInputText(sections, e.target.value));
  };

  const handleResetSearch = () => {
    setInputText("");
    setSearchResults([]);
  };

  const content =
    sections.length !== 0 ? (
      <>
        <div className="flex flex-wrap justify-center items-center gap-4 max-w-screen-xl mx-auto mt-28 mb-4 relative w-full">
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

        <div className="flex flex-wrap justify-center items-center gap-4 max-w-screen-xl mx-auto mt-4 mb-8 relative w-full z-0">
          {sections.map((section) => (
            <div
              key={section._id}
              className="bg-white rounded-xl overflow-hidden w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-4 shadow-md flex-grow"
            >
              <div className="relative">
                <img
                  src={section.img}
                  alt={section.img_alt}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="lg:text-lg sm:text-m font-semibold hover:text-primary w-full">
                    <button
                      onClick={() =>
                        findThemesByRouteName(section.routeName, sections)
                      }
                    >
                      {section.sectionName}
                    </button>
                  </h3>
                </div>
                {openTheme === section.routeName && themes.length > 0 && (
                  <div className="absolute right-0 top-16 bg-white border border-secondary rounded-xl p-2 shadow-md overflow-auto max-h-48 w-72 z-50">
                    <ul className="dropdown-content">
                      {themes.map((theme, index) => (
                        <li
                          key={index}
                          className="mb-1 border p-2 border-secondary rounded-xl"
                        >
                          <Link
                            to={`/sections/${section.routeName}/${theme.themeRoute}`}
                            style={{
                              alignSelf: "flex-start",
                              textDecoration: "none",
                            }}
                            className="sm:ml-10"
                          >
                            <h3 className="lg:text-lg sm:text-m font-semibold hover:text-primary w-full">
                              {theme.themeName}
                            </h3>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </>
    ) : null;

  const errorMessage = error ? <ErrorMessage message={error} /> : null;
  const spinner = loading ? <Spinner loading={loading} /> : null;

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-secondary">
      {errorMessage}
      {spinner}
      {content}
    </div>
  );
};

export default Main;
