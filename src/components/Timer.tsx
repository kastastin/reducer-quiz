import { useContext, useEffect } from "react";
import { QuizContext } from "../context/QuizContext";

export default function Timer() {
  const { state, dispatch } = useContext(QuizContext);

  const minutes = Math.floor(state.secondsLeft / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (state.secondsLeft % 60).toString().padStart(2, "0");
  const formattedTime = `${minutes}:${seconds}`;

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);
    return () => clearInterval(timer);
  }, [dispatch]);

  return (
    <div className={`timer ${state.secondsLeft <= 3 ? "timer--red" : ""}`}>
      {formattedTime}
    </div>
  );
}
