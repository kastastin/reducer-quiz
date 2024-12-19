import { useContext } from "react";

import { QuizContext } from "../context/QuizContext";

export default function useStatus() {
  const context = useContext(QuizContext);

  return context.state.status;
}
