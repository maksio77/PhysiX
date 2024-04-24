import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Result from "../../components/Result";
import Game from "../../components/Game";
import usePhysixService from "../../services/PhysixService";
import ErrorMessage from "../../components/ErrorMessage";
import Spinner from "../../components/Spinner";

function Testing() {
  const token = localStorage.getItem("token");
  const { state } = useLocation();
  const { addPoints, loading, error } = usePhysixService();

  const [questions, setQuestions] = useState(null);
  const [step, setStep] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const question = questions && questions[step];

  useEffect(() => {
    if (state?.tests) {
      setQuestions(state.tests);
    }
  }, [state]);

  const onSelected = (index) => {
    setSelectedAnswer(index);
  };

  const onNext = () => {
    setSelectedAnswer(null);
    setStep(step + 1);
    window.scrollTo(0, 0);

    if (step + 1 === questions.length) {
      addPoints(correct, token);
    }
  };

  const onClickVariant = (index) => {
    if (selectedAnswer === null) {
      if (index === questions[step].correct) {
        setCorrect(correct + 1);
      }
      setSelectedAnswer(index);
    }
  };

  const restart = () => {
    setStep(step - questions.length);
    setCorrect(0);
  };

  if (!questions) return null;

  const errorMessage = error ? <ErrorMessage message={error} /> : null;
  const spinner = loading ? <Spinner loading={loading} /> : null;

  return (
    <div className="flex min-h-[91vh] flex-col max-w-screen justify-center bg-secondary">
      {step !== questions.length ? (
        <Game
          backRoute={state.backRoute}
          step={step}
          question={question}
          length={questions.length}
          themeName={state.themeName}
          onClickVariant={onClickVariant}
          onNext={onNext}
          onSelected={onSelected}
          selectedAnswer={selectedAnswer}
        />
      ) : (
        <Result
          restart={restart}
          correct={correct}
          length={questions.length}
          backRoute={state.backRoute}
          spinner={spinner}
          errorMessage={errorMessage}
        />
      )}
    </div>
  );
}

export default Testing;
