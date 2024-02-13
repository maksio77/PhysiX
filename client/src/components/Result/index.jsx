import { Link } from "react-router-dom";
import usePhysixService from "../../services/PhysixService";
import ErrorMessage from "../ErrorMessage";
import Spinner from "../Spinner";

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
        Обрати тему
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

export default Result;
