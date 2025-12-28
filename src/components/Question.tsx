import type { Dispatch } from "react";
import type { Question as QuestionType, Quiz, QuizAction } from "../types/quiz";

import AnswerOptions from "./AnswerOptions";

type QuestionProps = {
  question: QuestionType;
  answerIndex: Quiz["answerIndex"];
  dispatch: Dispatch<QuizAction>;
};

const Question = ({ question, answerIndex, dispatch }: QuestionProps) => {
  return (
    <div>
      <h4>{question.question}</h4>
      <AnswerOptions question={question} answerIndex={answerIndex} dispatch={dispatch} />
    </div>
  );
};

export default Question;
