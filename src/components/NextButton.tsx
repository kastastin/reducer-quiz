import type { Dispatch } from "react";
import type { Quiz, QuizAction } from "../types/quiz";

type NextButtonProps = {
  answerIndex: Quiz["answerIndex"];
  dispatch: Dispatch<QuizAction>;
};

const NextButton = ({ answerIndex, dispatch }: NextButtonProps) => {
  if (answerIndex === null) {
    return null;
  }

  return (
    <button onClick={() => dispatch({ type: "nextQuestion" })} className="btn btn-ui">
      Next
    </button>
  );
};

export default NextButton;
