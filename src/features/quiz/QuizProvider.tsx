import { useEffect, useMemo, useReducer } from "react";

import { initialQuizState, quizReducer } from "./quizReducer";
import { QuizContext } from "./QuizContext";

export const QuizProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(quizReducer, initialQuizState);

  const totalQuestions = state.questions.length;
  const maxPossiblePoints = useMemo(
    () => state.questions.reduce((acc, curr) => acc + curr.points, 0),
    [state.questions],
  );

  useEffect(() => {
    fetch("http://localhost:8001/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch(() => dispatch({ type: "dataFailed" }));
  }, []);

  const value = useMemo(
    () => ({ state, totalQuestions, maxPossiblePoints, dispatch }),
    [state, totalQuestions, maxPossiblePoints],
  );

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};
