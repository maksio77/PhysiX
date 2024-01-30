import { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { replaceUnderscores } from "../../utils/repleceUnderscores";

const Theme = () => {
  const [isActive, setIsActive] = useState(true);
  const param = useParams();
  const { section, info, themeName, searchPhrase } = useLocation().state;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsActive(false);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  function doesPhraseExistInText(text, phrase) {
    return text.includes(phrase);
  }

  return (
    <div className="min-h-screen flex flex-col justify-center bg-secondary">
      <h2 className="text-4xl font-semibold mx-auto mt-28 text-primary">
        {themeName}
      </h2>
      <div className="flex flex-col items-start max-w-screen-xl mx-auto">
        <Link
          to={`/sections/${param.section}`}
          state={{ section: section }}
          className="mt-4 bg-primary text-white p-2 rounded-md text-left self-start"
        >
          Назад
        </Link>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 mb-8 w-full">
          {info.map((item) => (
            <div
              key={item._id}
              className={`bg-${
                doesPhraseExistInText(item.text, searchPhrase) && isActive
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
    </div>
  );
};

export default Theme;
