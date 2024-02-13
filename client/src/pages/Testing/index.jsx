import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Result from "../../components/Result";
import Game from "../../components/Game";

function Testing() {
  const { state } = useLocation();

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

  return (
    <div className="flex min-h-[91vh] flex-col max-w-screen justify-center bg-secondary">
      {step !== questions.length ? (
        <Game
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
        <Result restart={restart} correct={correct} length={questions.length} />
      )}
    </div>
  );
}

export default Testing;
