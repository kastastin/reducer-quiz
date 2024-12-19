import { useContext } from "react";
import { QuizContext } from "../context/QuizContext";

export default function NextButton() {
  const { state, dispatch } = useContext(QuizContext);

  const { questions, activeQuestionIndex, selectedOptionIndex } = state;

  const hasAnswered = selectedOptionIndex !== null;
  const isFinalQuestion = activeQuestionIndex === questions.length - 1;

  if (!hasAnswered) return null;

  return (
    <button
      className="btn btn-ui btn--next"
      onClick={() =>
        dispatch({
          type: isFinalQuestion ? "finish" : "moved_to_next_question",
        })
      }
    >
      {isFinalQuestion ? "Finish" : "Next"}
    </button>
  );
}
