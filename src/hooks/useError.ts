import { useContext } from "react";

import { QuizContext } from "../context/QuizContext";

export default function useError() {
  const context = useContext(QuizContext);

  return context.state.error;
}
