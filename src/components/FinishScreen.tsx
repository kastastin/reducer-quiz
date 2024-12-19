import { useContext } from "react";
import { QuizContext } from "../context/QuizContext";

export default function FinishScreen() {
  const { state, dispatch } = useContext(QuizContext);

  const { questions, points, highscore } = state;

  const maxPoints = questions.reduce(
    (acc, question) => acc + question.points,
    0
  );

  const percentScored = Math.ceil((points / maxPoints) * 100);

  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> out of {maxPoints} ({percentScored}
        %)
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart
      </button>
    </>
  );
}
