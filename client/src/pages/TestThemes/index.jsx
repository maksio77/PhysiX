import { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { TestContext } from "../../components/TestContext";
import ErrorMessage from "../../components/ErrorMessage";
import Spinner from "../../components/Spinner";

export default function TestThemes() {
  const { tests, error, loading } = useContext(TestContext);

  const [activeSection, setActiveSection] = useState(null);
  const sectionRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (sectionRef.current && !sectionRef.current.contains(event.target)) {
        setActiveSection(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const content =
    tests && tests.length > 0 ? (
      <div className="mt-28 flex flex-col justify-center sm: mx-2 items-center">
        <h2 className="text-4xl font-semibold mx-auto text-primary">
          Тестування за темами та розділами
        </h2>
        <div className="flex flex-col items-start max-w-screen-xl mx-auto w-full">
          <Link
            to={`/`}
            className="mt-4 bg-primary text-white p-2 rounded-md text-left"
          >
            Назад
          </Link>
          <ul
            className="flex flex-wrap justify-center items-center gap-4 mt-20 mb-8 w-full list-disc"
            ref={sectionRef}
          >
            {tests &&
              tests.map((item, index) => (
                <li
                  key={item._id}
                  className="bg-white rounded-lg overflow-hidden w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-4 shadow-md flex-grow"
                >
                  <div
                    className="p-4"
                    onClick={() =>
                      setActiveSection(activeSection === index ? null : index)
                    }
                  >
                    <h3 className="text-lg font-semibold hover:text-primary w-full cursor-pointer">
                      {item.sectionName}
                    </h3>
                    {activeSection === index && (
                      <ul className="bg-secondary mt-2 py-2 rounded shadow-lg">
                        {item.themes.map((theme) => (
                          <li
                            key={theme.themeName}
                            className="px-4 py-2 hover:bg-gray-200"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Link
                              to={`/tests/${theme.themeRoute}`}
                              state={{ tests: theme.tests, themeName: theme.themeName }}
                            >
                              {theme.themeName}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    ) : null;

  const errorMessage = error ? <ErrorMessage message={error} /> : null;
  const spinner = loading ? <Spinner loading={loading} /> : null;

  return (
    <div className="flex min-h-[91vh] flex-col justify-center items-center bg-secondary">
      {errorMessage}
      {spinner}
      {content}
    </div>
  );
}
