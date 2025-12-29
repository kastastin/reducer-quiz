import { useQuiz } from "../features/quiz/hooks/useQuiz";

const Progress = () => {
  const { state, totalQuestions, maxPossiblePoints } = useQuiz();
  const { currentQuestionIndex, answerIndex, points } = state;

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
