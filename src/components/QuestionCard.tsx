import Options from "./Options";

import { QuizContext } from "../context/QuizContext";
import { useContext } from "react";

export default function QuestionCard() {
  const { state } = useContext(QuizContext);

  const { questions, activeQuestionIndex } = state;

  const currentQuestion = questions[activeQuestionIndex];

  return (
    <div>
      <h4>{currentQuestion.question}</h4>
      <Options />
    </div>
  );
}
