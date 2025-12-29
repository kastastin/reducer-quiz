import { useContext } from "react";

import { QuizContext } from "../QuizContext";

export const useQuiz = () => {
  const context = useContext(QuizContext);

  if (context === null) {
    throw new Error("useQuiz must be used within <QuizProvider />");
  }

  return context;
};
