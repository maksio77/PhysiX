import { useContext, useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { SectionContext } from "../../components/SectionContext";
import PaginatedGrid from "../../components/PaginatedGrid";
import ErrorMessage from "../../components/ErrorMessage";
import Spinner from "../../components/Spinner";

const Theme = () => {
  const { sections, error, loading } = useContext(SectionContext);

  const [theme, setTheme] = useState({});
  const [isActive, setIsActive] = useState(true);

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
            return theme;
          }
        }
      }
      return null;
    }

    if (sections && sections.length > 0) {
      setTheme(getObjectByThemeRoute(sections, themeRouteName));
    }
  }, [themeRouteName, sections]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsActive(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  const content =
    sections && sections.length > 0 ? (
      <>
        <h2 className="lg:text-4xl sm: text-xl font-semibold mx-auto mt-24 text-primary">
          {theme.themeName}
        </h2>
        <div className="flex flex-col items-start max-w-screen-xl mx-auto">
          <Link
            to={`/`}
            className="sm: text-xs lg:text-base mt-2 p-2 border-2 border-secondary rounded-md text-white bg-primary hover:bg-secondary hover:text-primary text-left self-start"
          >
            Назад
          </Link>
          {theme && theme.info && theme.info.length > 0 && (
            <PaginatedGrid
              theme={theme}
              searchPhrase={searchPhrase}
              isActive={isActive}
            />
          )}
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 mb-8 w-full">
            {theme.info &&
              theme.info.map((item) => (
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
                    <div className="text-xl">
                      {replaceUnderscores(item.text, item.formulas)}
                    </div>
                  </div>
                </div>
              ))}
          </div> */}
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
