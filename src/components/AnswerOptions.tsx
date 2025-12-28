import type { Dispatch } from "react";
import type { Question as QuestionType, Quiz, QuizAction } from "../types/quiz";

type AnswerOptionsProps = {
  question: QuestionType;
  answerIndex: Quiz["answerIndex"];
  dispatch: Dispatch<QuizAction>;
};

const AnswerOptions = ({ question, answerIndex, dispatch }: AnswerOptionsProps) => {
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
