import { FaRegStar } from "react-icons/fa";
import { Link } from "react-router-dom";

//import { FaStar } from "react-icons/fa";

const Game = ({ question, onClickVariant, step, length, themeName }) => {
  const percentage = Math.round((step / length) * 100);

  return (
    <>
      <h2 className="text-xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-semibold mx-auto mt-24 text-primary px-2">
        {`Тестування за темою: ${themeName}`}
      </h2>
      <div className="progress h-4 rounded bg-gray-200 mx-4 sm: mt-10 sm:mx-8 md:mx-16 lg:mx-32 xl:mx-64 2xl:mx-96">
        <div
          style={{ width: `${percentage}%` }}
          className="progress__inner h-4 rounded bg-green-400"
        ></div>
      </div>
      <h1 className="sm: text-base lg:text-2xl font-bold mx-4 sm:mx-8 md:mx-16 lg:mx-32 xl:mx-64 2xl:mx-96 mb-4">
        {question.title}
      </h1>
      <div className="flex justify-between mx-4 sm:mx-8 md:mx-16 lg:mx-32 xl:mx-64 2xl:mx-96 mb-4">
        <Link
          to={`/tests`}
          className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg 2xl:text-lg mt-4 bg-primary text-white hover:bg-secondary hover:text-primary transition-all duration-200 ease-in-out p-2 text-left rounded-md mb-4"
        >
          Обрати тест
        </Link>

        <button className="mt-4 bg-white hover:bg-secondary hover:text-primary transition-all duration-200 ease-in-out text-primary sm:text-base p-2 text-right rounded-md mb-4">
          <FaRegStar size={20} />
        </button>
      </div>
      {question.image && (
        <div
          className="mb-4 mx-4 sm:mx-8 md:mx-16 lg:mx-32 xl:mx-64 2xl:mx-96"
          style={{ maxWidth: "90%" }}
        >
          <div
            dangerouslySetInnerHTML={{ __html: question.image }}
            className="mx-auto"
          />
        </div>
      )}
      <ul className="space-y-4 mb-10 mx-4 sm:mx-8 md:mx-16 lg:mx-32 xl:mx-64 2xl:mx-96">
        {question.variants.map((text, index) => {
          return (
            <li
              onClick={() => onClickVariant(index)}
              key={text}
              className="p-4 bg-white rounded-md shadow cursor-pointer hover:text-primary hover:bg-secondary"
            >
              {text}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Game;
