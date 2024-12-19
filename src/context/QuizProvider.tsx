import { useReducer } from "react";

import { QuizContext } from "./QuizContext";
import { initialState, quizReducer } from "./quizReducer";

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
}
