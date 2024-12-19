import { useContext } from "react";
import { QuizContext } from "../context/QuizContext";

export default function Options() {
  const { state, dispatch } = useContext(QuizContext);

  const { questions, activeQuestionIndex, selectedOptionIndex } = state;

  const currentQuestion = questions[activeQuestionIndex];

  const hasAnswered = selectedOptionIndex !== null;

  return (
    <div className="options">
      {currentQuestion.options.map((option, index) => {
        const selectedOption = index === selectedOptionIndex;
        const isAnswerCorrect = index === currentQuestion.correctOption;

        return (
          <button
            key={option}
            className={`
              btn btn-option
              ${selectedOption ? "answer" : ""}
              ${hasAnswered ? (isAnswerCorrect ? "correct" : "wrong") : ""}
            `}
            disabled={hasAnswered}
            onClick={() =>
              dispatch({ type: "set_selected_option", payload: index })
            }
          >
            <span>{option}</span>
            {hasAnswered && selectedOption && (
              <span>{isAnswerCorrect ? "✅" : "❌"}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
