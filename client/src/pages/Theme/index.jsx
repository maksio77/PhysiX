import { useContext, useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { SectionContext } from "../../components/SectionContext";
import PaginatedGrid from "../../components/PaginatedGrid";
import ErrorMessage from "../../components/ErrorMessage";
import Spinner from "../../components/Spinner";
import SearchInput from "../../components/SearchInput";
import { GrLinkNext } from "react-icons/gr";

const Theme = () => {
  const { sections, error, loading } = useContext(SectionContext);

  const [sectionName, setSectionName] = useState("");
  const [theme, setTheme] = useState({});
  const [originalData, setOriginalData] = useState({});
  const [inputText, setInputText] = useState("");

  const param = useParams();
  const themeRouteName = param.theme;

  const locationState = useLocation().state;
  const searchPhrase =
    locationState && locationState.searchPhrase
      ? locationState.searchPhrase
      : "";

  useEffect(() => {
    function getObjectByThemeRoute(array, themeRoute) {
      for (let item of array) {
        for (let theme of item.themes) {
          if (theme.themeRoute === themeRoute) {
            setSectionName(item.sectionName);
            return theme;
          }
        }
      }
      return null;
    }

    if (sections && sections.length > 0) {
      const res = getObjectByThemeRoute(sections, themeRouteName);
      setTheme(res);
      setOriginalData(res);
    }
  }, [themeRouteName, sections]);

  const filterByInput = (array, text) => {
    const lowerCaseText = text.toLowerCase();
    return array.filter((obj) => {
      for (let key in obj) {
        if (String(obj[key]).toLowerCase().includes(lowerCaseText)) {
          return true;
        }
      }
      return false;
    });
  };

  const handleSearchChange = (e) => {
    setInputText(e.target.value);

    if (e.target.value === "") {
      setTheme(originalData);
    } else {
      const res = filterByInput(theme.info, e.target.value);
      if (res.length > 0) {
        setTheme({ ...theme, info: res });
      }
    }
  };

  const handleResetSearch = () => {
    setInputText("");
    setTheme(originalData);
  };

  const content =
    sections && sections.length > 0 ? (
      <>
        <h2 className="lg:text-4xl sm: text-xl font-semibold mx-auto mt-24 text-primary">
          {sectionName} <GrLinkNext className="inline" /> {theme.themeName}
        </h2>

        <div className="flex flex-col items-start max-w-screen-xl mx-auto">
          <div className="flex w-full lg:mt-8 sm: mt-2 space-x-4">
            <Link
              to={`/`}
              className="flex-initial sm:text-xs lg:text-base p-2 border-2 border-secondary rounded-md text-white bg-primary hover:bg-secondary hover:text-primary text-left self-start"
            >
              Назад
            </Link>
            <SearchInput
              className="flex-grow w-full"
              inputText={inputText}
              handleSearchChange={handleSearchChange}
              handleResetSearch={handleResetSearch}
            />
          </div>

          {theme && theme.info && theme.info.length > 0 && (
            <PaginatedGrid
              theme={theme}
              searchPhrase={searchPhrase}
              inputText={inputText}
            />
          )}
        </div>
      </>
    ) : null;

  const errorMessage = error ? <ErrorMessage message={error} /> : null;
  const spinner = loading ? <Spinner loading={loading} /> : null;

  return (
    <div className="min-h-screen flex mx-auto flex-col justify-center items-center bg-secondary">
      {errorMessage}
      {spinner}
      {content}
    </div>
  );
};

export default Theme;
