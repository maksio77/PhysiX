import { useState, useCallback, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import usePhysixService from "../../services/PhysixService";
import { UserContext } from "../../contexts/UserContext";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMessage";
import CommentList from "../CommentList";

const Game = ({
  question,
  step,
  length,
  themeName,
  selectedAnswer,
  onClickVariant,
  onNext,
  onSelected,
  backRoute,
}) => {
  const token = localStorage.getItem("token");
  const {
    loading,
    clearError,
    error,
    addFavoriteTest,
    removeFavoriteTest,
    getFavoriteTestIDS,
    addComment,
    getComments,
  } = usePhysixService();
  const { user } = useContext(UserContext);

  const [favoriteTests, setFavoriteTests] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);

  const handleNewCommentChange = (e) => {
    const value = e.target.value;
    const words = value.split(" ");
    const formattedWords = words.filter((word) => word.trim() !== " ");
    const formattedValue = formattedWords.join(" ");
    setNewComment(formattedValue);
  };

  const handleAddComment = async (event) => {
    event.preventDefault();
    try {
      const newCommentObj = {
        text: newComment,
        username: `${user.firstName} ${user.lastName}`,
        createdAt: new Date(),
      };
      await addComment(
        newCommentObj.username,
        question._id,
        newCommentObj.text
      );
      setNewComment("");
      handleGetComments();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleGetComments = useCallback(async () => {
    try {
      const res = await getComments(question._id);
      setComments(res);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  }, [question._id]);

  useEffect(() => {
    const interval = setInterval(() => {
      handleGetComments();
    }, 20000);
    handleGetComments();
    return () => clearInterval(interval);
  }, [handleGetComments]);

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
          to={`${backRoute.link}`}
          className="text-sm sm:text-base shadow md:text-lg lg:text-lg xl:text-lg 2xl:text-lg mt-4 bg-primary text-white hover:bg-secondary hover:text-primary transition-all duration-200 ease-in-out p-2 text-left rounded-md mb-4"
        >
          {backRoute.routeText}
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
                ? "bg-emerald-300"
                : "bg-rose-300"
              : selectedAnswer !== null
              ? "opacity-50 cursor-not-allowed"
              : "hover:text-primary hover:bg-secondary"
          } ${isCorrect && selectedAnswer !== null ? "bg-emerald-300" : ""}`;
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
      <div className="flex justify-end mx-4 sm:mx-8 md:mx-16 lg:mx-32 xl:mx-64 2xl:mx-96">
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
          {step + 1 === length ? "Завершити" : "Наступне"}
        </button>
      </div>
      <div className="items-center mx-auto w-full sm:w-2/3 md:w-3/4 lg:w-full xl:w-2/3 2xl:w-3/4">
        <h4 className="text-xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-semibold mx-auto mt-4 text-center">
          Потрібна допомога? Запитай у інших!
        </h4>
        <div className="flex justify-center mt-4">
          <textarea
            className="w-2/3 sm:w-2/3 md:w-2/3 lg:w-2/3 xl:w-2/3 2xl:w-2/3 h-12 sm:h-16 md:h-18 lg:h-18 xl:h-20 2xl:h-25 bg-white border-2 border-primary rounded py-2 px-4 mx-2"
            placeholder="Опиши проблему"
            value={newComment}
            onChange={handleNewCommentChange}
          ></textarea>
        </div>
        <div className="flex justify-center mt-4">
          <button
            className={`${
              newComment.length < 2
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-primary"
            } text-white font-semibold px-4 py-2 rounded mb-2`}
            onClick={handleAddComment}
            disabled={newComment.length < 2}
          >
            Додати
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center w-full mb-4">
        <CommentList comments={comments} />
      </div>
    </>
  );
};

export default Game;
