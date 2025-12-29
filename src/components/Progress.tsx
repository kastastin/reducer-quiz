import type { Quiz } from "../types/quiz";

type ProgressProps = {
  totalQuestions: number;
  currentQuestionIndex: number;
  answerIndex: Quiz["answerIndex"];
  points: number;
  maxPossiblePoints: number;
};

const Progress = ({ totalQuestions, currentQuestionIndex, answerIndex, points, maxPossiblePoints }: ProgressProps) => {
  return (
    <header className="progress">
      <progress max={totalQuestions} value={currentQuestionIndex + Number(answerIndex !== null)}></progress>
      <p>
        Question <strong>{currentQuestionIndex + 1}</strong> / {totalQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </header>
  );
};

export default Progress;
