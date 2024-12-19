import { useContext } from "react";

import { QuizContext } from "../context/QuizContext";

export default function Progress() {
  const { state } = useContext(QuizContext);

  const {
    questions,
    activeQuestionIndex: questionNumber,
    selectedOptionIndex,
    points
  } = state;

  const totalQuestions = questions.length;
  const hasAnswered = selectedOptionIndex !== null;
  const maxPoints = questions.reduce(
    (acc, question) => acc + question.points,
    0
  );

  return (
    <header className="progress">
      <progress
        max={totalQuestions}
        value={questionNumber + Number(hasAnswered)} // Add 1 if the user has answered
      ></progress>
      <p>
        Question <strong>{questionNumber + 1}</strong> / {totalQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {maxPoints}
      </p>
    </header>
  );
}
