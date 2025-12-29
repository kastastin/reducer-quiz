import { useQuiz } from "../features/quiz/hooks/useQuiz";

import type { Question } from "../features/quiz/quiz.types";

const AnswerOptions = ({ question }: { question: Question }) => {
  const { state, dispatch } = useQuiz();
  const { answerIndex } = state;

  const hasAnswered = answerIndex !== null;

  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          key={option}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: "setAnswerIndex", payload: index })}
          className={`btn btn-option
            ${index === answerIndex ? "answer" : ""}
            ${hasAnswered && (index === question.correctOption ? "correct" : "wrong")}`}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default AnswerOptions;
