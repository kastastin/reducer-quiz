import type { Question as QuestionType } from "../types/quiz";

type AnswerOptionsProps = {
  question: QuestionType;
};

const AnswerOptions = ({ question }: AnswerOptionsProps) => {
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button key={option} onClick={() => console.log(index)} className="btn btn-option">
          {option}
        </button>
      ))}
    </div>
  );
};

export default AnswerOptions;
