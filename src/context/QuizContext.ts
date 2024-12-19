import { createContext } from "react";

import { State, Action } from "../types";
import { initialState } from "./quizReducer";

interface QuizContextProps {
  state: State;
  dispatch: React.Dispatch<Action>;
}

const defaultState: QuizContextProps = {
  state: initialState,
  dispatch: () => {},
}

export const QuizContext = createContext<QuizContextProps>(defaultState);
