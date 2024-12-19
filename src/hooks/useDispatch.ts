import { useContext } from "react";

import { QuizContext } from "../context/QuizContext";

export default function useDispatch() {
  const context = useContext(QuizContext);

  return context.dispatch;
}
