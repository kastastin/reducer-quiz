import { useEffect, useRef, type Dispatch } from "react";
import type { Quiz, QuizAction } from "../types/quiz";

type NextButtonProps = {
  currentQuestionIndex: number;
  totalQuestions: number;
  answerIndex: Quiz["answerIndex"];
  dispatch: Dispatch<QuizAction>;
};

const NextButton = ({ currentQuestionIndex, totalQuestions, answerIndex, dispatch }: NextButtonProps) => {
  const btnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (answerIndex !== null) {
      btnRef.current?.focus();
    }
  }, [answerIndex]);

  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  const goNext = () => dispatch({ type: isLastQuestion ? "finish" : "nextQuestion" });

  if (answerIndex === null) {
    return null;
  }

  return (
    <button
      ref={btnRef}
      type="button"
      onClick={goNext}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          goNext();
        }
      }}
      className="btn btn-ui"
    >
      {isLastQuestion ? "Finish" : "Next"}
    </button>
  );
};

export default NextButton;
