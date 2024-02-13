import { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import usePhysixService from "../../services/PhysixService";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMessage";

const Game = ({
  question,
  step,
  length,
  themeName,
  selectedAnswer,
  onClickVariant,
  onNext,
  onSelected,
}) => {
  const token = localStorage.getItem("token");
  const {
    loading,
    clearError,
    error,
    addFavoriteTest,
    removeFavoriteTest,
    getFavoriteTestIDS,
  } = usePhysixService();

  const [favoriteTests, setFavoriteTests] = useState([]);

  const getFavorite = useCallback(async () => {
    try {
      const res = await getFavoriteTestIDS(token);
      setFavoriteTests(res);
    } catch (error) {
      console.error("Error fetching favorite tests:", error);
    }
  }, [token]);

  useEffect(() => {
    getFavorite();
  }, [getFavorite]);

  const handleAddFavorite = async () => {
    try {
      await addFavoriteTest(question, token);
      getFavorite();
    } catch (error) {
      console.error("Error adding favorite test:", error);
    }
  };

  const handleRemoveFavorite = async () => {
    try {
      await removeFavoriteTest(question._id, token);
      getFavorite();
    } catch (error) {
      console.error("Error removing favorite test:", error);
    }
  };

  const errorMessage = error ? <ErrorMessage message={error} /> : null;
  const spinner = loading ? <Spinner size={20} loading={loading} /> : null;
  const star = favoriteTests.includes(question._id) ? (
    <FaStar onClick={handleRemoveFavorite} size={20} />
  ) : (
    <FaRegStar onClick={handleAddFavorite} size={20} />
  );

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
          className="text-sm sm:text-base shadow md:text-lg lg:text-lg xl:text-lg 2xl:text-lg mt-4 bg-primary text-white hover:bg-secondary hover:text-primary transition-all duration-200 ease-in-out p-2 text-left rounded-md mb-4"
        >
          Обрати тест
        </Link>

        <button className="mt-4 bg-white shadow hover:bg-secondary hover:text-primary transition-all duration-200 ease-in-out text-primary sm:text-base p-2 text-right rounded-md mb-4">
          {!errorMessage && !loading ? star : null}
          {errorMessage}
          {spinner}
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
      <ul className="space-y-4 mb-5 mx-4 sm:mx-8 md:mx-16 lg:mx-32 xl:mx-64 2xl:mx-96">
        {question.variants.map((text, index) => {
          const isCorrect = index === question.correct;
          const isSelected = index === selectedAnswer;
          const className = `p-4 bg-white rounded-md shadow cursor-pointer ${
            isSelected
              ? isCorrect
                ? "bg-green-200"
                : "bg-red-200"
              : selectedAnswer !== null
              ? "opacity-50 cursor-not-allowed"
              : "hover:text-primary hover:bg-secondary"
          }`;
          return (
            <li
              onClick={() => {
                if (selectedAnswer === null) {
                  onClickVariant(index);
                  onSelected(index);
                  clearError();
                }
              }}
              key={text}
              className={className}
            >
              {text}
            </li>
          );
        })}
      </ul>
      <div className="flex justify-between mx-4 sm:mx-8 md:mx-16 lg:mx-32 xl:mx-64 2xl:mx-96">
        <div className="flex justify-start">
          <button
            onClick={() => {
              clearError();
            }}
            className="mb-5 p-2 bg-primary text-white rounded-md shadow hover:bg-secondary hover:text-primary text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg 2xl:text-lg"
          >
            Попереднє запитання
          </button>
        </div>
        <div className="flex justify-end">
          <button
            onClick={() => {
              clearError();
              onNext();
            }}
            disabled={selectedAnswer === null}
            className={`mb-5 p-2 text-white rounded-md shadow text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg 2xl:text-lg ${
              selectedAnswer === null
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-primary hover:bg-secondary hover:text-primary cursor-pointer"
            }`}
          >
            Наступне запитання
          </button>
        </div>
      </div>
    </>
  );
};

export default Game;
