import { Link } from "react-router-dom";

function Result({
  correct,
  restart,
  length,
  backRoute,
  spinner,
  errorMessage,
}) {
  const handleRestart = () => {
    restart();
  };

  const content = spinner ? null : (
    <>
      {errorMessage ? null : (
        <>
          <img
            className="w-24 h-24 mb-2"
            src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png"
            alt="congratulations"
          />
          <h2 className="text-xl mb-10 text-gray-800">
            Ви відповіли правильно {correct} з {length}
          </h2>
          <button
            className="px-8 py-2 text-white bg-primary rounded hover:bg-secondary hover:text-primary transition-all duration-200 ease-in-out"
            onClick={handleRestart}
          >
            Спробувати ще раз
          </button>
        </>
      )}
      <Link
        to={`${backRoute.link}`}
        className="my-4 px-8 py-2 text-white bg-primary rounded hover:bg-secondary hover:text-primary transition-all duration-200 ease-in-out"
      >
        {backRoute.routeText}
      </Link>
    </>
  );

  return (
    <div className="flex flex-col items-center justify-center">
      {content}
      {spinner}
      {errorMessage}
    </div>
  );
}

export default Result;
