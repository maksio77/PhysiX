import { useContext, useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import SearchInput from "../../components/SearchInput";
import ErrorMessage from "../../components/ErrorMessage";
import Spinner from "../../components/Spinner";
import { searchInputText } from "../../utils/searchInputText";
import { SectionContext } from "../../components/SectionContext";
import usePhysixService from "../../services/PhysixService";
import { MdSignalWifiConnectedNoInternet4 } from "react-icons/md";

const Main = () => {
  const { sections, error, loading } = useContext(SectionContext);
  const { getTopTen } = usePhysixService();

  const [searchResults, setSearchResults] = useState([]);
  const [inputText, setInputText] = useState("");
  const [themes, setThemes] = useState({});
  const [openTheme, setOpenTheme] = useState("");
  const [tableData, setTableData] = useState([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    function handleNetworkChange() {
      setIsOnline(navigator.onLine);
    }

    window.addEventListener("online", handleNetworkChange);
    window.addEventListener("offline", handleNetworkChange);

    return () => {
      window.removeEventListener("online", handleNetworkChange);
      window.removeEventListener("offline", handleNetworkChange);
    };
  }, []);

  const getTable = useCallback(async () => {
    try {
      const res = await getTopTen();
      setTableData(res);
    } catch (error) {
      console.error("Error fetching favorite tests:", error);
    }
  }, []);

  useEffect(() => {
    getTable();
  }, [getTable]);

  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setOpenTheme(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
        {isOnline ? (
          <div className="flex flex-wrap justify-center items-center gap-4 max-w-screen-xl mx-auto mt-24 mb-4 relative w-full">
            <table className="table-auto w-full">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="py-3 px-4 text-left text-lg font-medium">
                    Користувач
                  </th>
                  <th className="py-3 px-4 text-right text-lg font-medium">
                    Кількість очок
                  </th>
                </tr>
              </thead>
            </table>
            <div className="flex flex-wrap justify-center items-center gap-4 max-w-screen-xl mx-auto mb-4 relative w-full h-40 overflow-y-auto">
              <table className="table-auto w-full">
                <tbody>
                  {tableData.map((item, index) => (
                    <tr key={index} className="border-b border-gray-200">
                      <td className="py-3 px-4 text-left text-base">
                        {item.firstName} {item.lastName}
                      </td>
                      <td className="py-3 px-4 text-right text-base">
                        {item.points}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-primary mt-24 mb-2">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-center">
              Немає з'єднання з мережею
            </h2>
            <div className="flex items-center justify-center bg-primary rounded-full p-4">
              <MdSignalWifiConnectedNoInternet4 size={60} color="#fff" />
            </div>
          </div>
        )}

        <div className="flex flex-wrap justify-center items-center gap-4 max-w-screen-xl mx-auto mt-4 mb-4 relative w-full">
          <SearchInput
            inputText={inputText}
            handleSearchChange={handleSearchChange}
            handleResetSearch={handleResetSearch}
          />

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
                      ref={buttonRef}
                      onClick={() =>
                        findThemesByRouteName(section.routeName, sections)
                      }
                    >
                      {section.sectionName}
                    </button>
                  </h3>
                </div>
                {openTheme === section.routeName && themes.length > 0 && (
                  <div
                    ref={dropdownRef}
                    className="absolute right-0 top-16 bg-white border border-secondary rounded-xl p-2 shadow-md overflow-auto max-h-48 w-72 z-50"
                  >
                    <ul className="dropdown-content">
                      {themes.map((theme, index) => (
                        <li
                          key={index}
                          className="mb-1 border p-2 border-secondary rounded-xl"
                        >
                          <Link
                            to={`/sections/${section.routeName}/${theme.themeRoute}/1`}
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
    <div className="min-h-[91vh] flex flex-col justify-center items-center bg-secondary">
      {errorMessage}
      {spinner}
      {content}
    </div>
  );
};

export default Main;
