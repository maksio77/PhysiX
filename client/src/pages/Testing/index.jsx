import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaRegStar } from "react-icons/fa";
import usePhysixService from "../../services/PhysixService";
import ErrorMessage from "../../components/ErrorMessage";
import Spinner from "../../components/Spinner";

//import { FaStar } from "react-icons/fa";

function Result({ correct, restart, length }) {
  const token = localStorage.getItem("token");
  const { addPoints, error, loading } = usePhysixService();

  const handleFinish = () => {
    addPoints(correct, token);
  };

  const handleRestart = () => {
    addPoints(correct, token);
    restart();
  };

  const content = (
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
      <Link
        to={`/tests`}
        className="mt-4 px-8 py-2 text-white bg-primary rounded hover:bg-secondary hover:text-primary transition-all duration-200 ease-in-out"
        onClick={handleFinish}
      >
        Обрати тест
      </Link>
    </>
  );

  const errorMessage = error ? <ErrorMessage message={error} /> : null;
  const spinner = loading ? <Spinner loading={loading} /> : null;

  return (
    <div className="flex flex-col items-center justify-center">
      {content}
      {errorMessage}
      {spinner}
    </div>
  );
}

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

function Testing() {
  const { state } = useLocation();

  const [questions, setQuestions] = useState(null);
  const [step, setStep] = useState(0);
  const [correct, setCorrect] = useState(0);
  const question = questions && questions[step];

  useEffect(() => {
    if (state?.tests) {
      setQuestions(state.tests);
    }
  }, [state]);

  const onClickVariant = (index) => {
    setStep(step + 1);

    if (index === questions[step].correct) {
      setCorrect(correct + 1);
    }
  };

  const restart = () => {
    setStep(step - questions.length);
    setCorrect(0);
  };

  if (!questions) return null;

  return (
    <div className="flex min-h-[91vh] flex-col max-w-screen justify-center bg-secondary">
      {step !== questions.length ? (
        <Game
          step={step}
          question={question}
          onClickVariant={onClickVariant}
          length={questions.length}
          themeName={state.themeName}
        />
      ) : (
        <Result restart={restart} correct={correct} length={questions.length} />
      )}
    </div>
  );
}

export default Testing;
