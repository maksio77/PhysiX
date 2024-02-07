import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { TestContext } from "../../components/TestContext";
import ErrorMessage from "../../components/ErrorMessage";
import Spinner from "../../components/Spinner";

export default function TestThemes() {
  const { tests, error, loading } = useContext(TestContext);

  const content =
    tests && tests.length > 0 ? (
      <>
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
          <ul className="flex flex-wrap justify-center items-center gap-4 mt-20 mb-8 w-full list-disc">
            {tests &&
              tests.map((item) => (
                <li
                  key={item._id}
                  className="bg-white rounded-lg overflow-hidden w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-4 shadow-md flex-grow"
                >
                  <div className="p-4">
                    <h3 className="text-lg font-semibold hover:text-primary w-full">
                      {item.sectionName}
                    </h3>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </>
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
