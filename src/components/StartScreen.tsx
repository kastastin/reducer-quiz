import { useContext } from "react";

import { QuizContext } from "../context/QuizContext";

export default function StartScreen() {
  const { state, dispatch } = useContext(QuizContext);
  
  const totalQuestions = state.questions.length;

  return (
    <div className="start">
      <h2>Welcome to the Quiz!</h2>
      <h3>{totalQuestions} questions to test your knowledge</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's start
      </button>
    </div>
  );
}
