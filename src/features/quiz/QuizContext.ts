import { createContext } from "react";

import type { Quiz, QuizAction } from "./quiz.types";

type QuizContextValue = {
  state: Quiz;
  totalQuestions: number;
  maxPossiblePoints: number;
  dispatch: React.Dispatch<QuizAction>;
};

export const QuizContext = createContext<QuizContextValue | null>(null);
