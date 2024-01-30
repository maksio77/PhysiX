import { useContext, useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { replaceUnderscores } from "../../utils/repleceUnderscores";
import { SectionContext } from "../SectionContext";
import ErrorMessage from "../ErrorMessage";
import Spinner from "../Spinner";

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

  function doesPhraseExistInText(text, phrase) {
    return text.includes(phrase);
  }

  const content =
    sections && sections.length > 0 ? (
      <>
        <h2 className="text-4xl font-semibold mx-auto mt-28 text-primary">
          {theme.themeName}
        </h2>
        <div className="flex flex-col items-start max-w-screen-xl mx-auto">
          <Link
            to={`/sections/${param.section}`}
            className="mt-4 bg-primary text-white p-2 rounded-md text-left self-start"
          >
            Назад
          </Link>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 mb-8 w-full">
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
          </div>
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
