import AnswerOptions from "./AnswerOptions";

import { useQuiz } from "../features/quiz/hooks/useQuiz";

const Question = () => {
  const { state } = useQuiz();
  const { questions, currentQuestionIndex } = state;

  const question = questions[currentQuestionIndex];

  return (
    <div>
      <h4>{question.question}</h4>
      <AnswerOptions question={question} />
    </div>
  );
};

export default Question;
