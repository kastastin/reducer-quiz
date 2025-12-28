import type { Question as QuestionType } from "../types/quiz";

import AnswerOptions from "./AnswerOptions";

type QuestionProps = {
  question: QuestionType;
};

const Question = ({ question }: QuestionProps) => {
  return (
    <div>
      <h4>{question.question}</h4>
      <AnswerOptions question={question} />
    </div>
  );
};

export default Question;
