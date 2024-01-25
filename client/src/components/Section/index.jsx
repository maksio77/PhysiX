import { useParams, Link, useLocation } from "react-router-dom";

const Section = () => {
  const param = useParams();
  const { section } = useLocation().state;

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h2 className="text-4xl font-semibold mx-auto mt-28">{section.sectionName}</h2>
      <div className="flex flex-col items-start max-w-screen-xl mx-auto w-full">
        <Link
          to={`/`}
          className="mt-4 bg-white p-2 rounded-md text-left self-start"
        >
          Назад
        </Link>
        <div className="flex flex-wrap justify-center items-center gap-4 mt-20 mb-8 w-full">
          {section.themes.map((theme) => (
            <div
              key={theme._id}
              className="bg-white rounded-lg overflow-hidden w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-4 shadow-md flex-grow"
            >
              <div className="p-4">
                <Link
                  to={`/sections/${param.section}/${theme.themeRoute}`}
                  state={{section: section, info: theme.info, themeName: theme.themeName}}
                  style={{
                    alignSelf: "flex-start",
                    textDecoration: "none",
                  }}
                  className="sm: ml-10"
                >
                  <h3 className="text-lg font-semibold">{theme.themeName}</h3>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Section;
