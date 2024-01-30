import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { SectionContext } from "../SectionContext";
import ErrorMessage from "../ErrorMessage";
import Spinner from "../Spinner";

const Section = () => {
  const { sections, error, loading } = useContext(SectionContext);
  const [section, setSection] = useState({});

  const param = useParams();
  const sectionRouteName = param.section;

  useEffect(() => {
    const findObjectByRouteName = (routeName, array) => {
      return array.find((object) => object.routeName === routeName);
    };

    if (sections && sections.length > 0) {
      setSection(findObjectByRouteName(sectionRouteName, sections));
    }
  }, [sectionRouteName, sections]);

  const content =
    sections && sections.length > 0 ? (
      <>
        <h2 className="text-4xl font-semibold mx-auto mt-28 text-primary">
          {section.sectionName}
        </h2>
        <div className="flex flex-col items-start max-w-screen-xl mx-auto w-full">
          <Link
            to={`/`}
            className="mt-4 bg-primary text-white p-2 rounded-md text-left"
          >
            Назад
          </Link>
          <div className="flex flex-wrap justify-center items-center gap-4 mt-20 mb-8 w-full">
            {section.themes &&
              section.themes.map((theme) => (
                <div
                  key={theme._id}
                  className="bg-white rounded-lg overflow-hidden w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-4 shadow-md flex-grow"
                >
                  <div className="p-4">
                    <Link
                      to={`/sections/${param.section}/${theme.themeRoute}`}
                      style={{
                        alignSelf: "flex-start",
                        textDecoration: "none",
                      }}
                      className="sm: ml-10"
                    >
                      <h3 className="text-lg font-semibold hover:text-primary w-full">
                        {theme.themeName}
                      </h3>
                    </Link>
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
    <div className="min-h-screen flex flex-col justify-center items-center bg-secondary">
      {errorMessage}
      {spinner}
      {content}
    </div>
  );
};

export default Section;
