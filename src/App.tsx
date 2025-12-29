import { useEffect, useReducer, type Reducer } from "react";

import Timer from "./components/Timer";
import Loader from "./components/Loader";
import Main from "./components/layout/Main";
import Progress from "./components/Progress";
import Question from "./components/Question";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import NextButton from "./components/NextButton";
import StartScreen from "./components/StartScreen";
import FinishScreen from "./components/FinishScreen";
import FecthingError from "./components/FecthingError";

import type { Quiz, QuizAction } from "./types/quiz";

const SECS_PER_QUESTION = 30;

const initialState: Quiz = {
  questions: [],
  status: "loading",
  currentQuestionIndex: 0,
  answerIndex: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

const reducer: Reducer<Quiz, QuizAction> = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return { ...state, status: "ready", questions: action.payload };

    case "dataFailed":
      return { ...state, status: "error" };

    case "start":
      return { ...state, status: "active", secondsRemaining: state.questions.length * SECS_PER_QUESTION };

    case "setAnswerIndex": {
      const question = state.questions[state.currentQuestionIndex];
      const isAnswerCorrect = action.payload === question.correctOption;

      return {
        ...state,
        answerIndex: action.payload,
        points: isAnswerCorrect ? state.points + question.points : state.points,
      };
    }

    case "nextQuestion":
      return { ...state, currentQuestionIndex: state.currentQuestionIndex + 1, answerIndex: null };

    case "finish":
      return {
        ...state,
        status: "finished",
        highscore: state.points > state.highscore ? state.points : state.highscore,
      };

    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" };

    case "tick": {
      if (state.secondsRemaining === null) {
        return state;
      }

      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    }

    default:
      throw new Error("Unknown action");
  }
};

const App = () => {
  const [quiz, dispatch] = useReducer(reducer, initialState);

  const totalQuestions = quiz.questions.length;
  const maxPossiblePoints = quiz.questions.reduce((acc, curr) => acc + curr.points, 0);

  useEffect(() => {
    fetch("http://localhost:8001/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch(() => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {quiz.status === "error" && <FecthingError />}
        {quiz.status === "loading" && <Loader />}
        {quiz.status === "ready" && <StartScreen totalQuestions={totalQuestions} dispatch={dispatch} />}
        {quiz.status === "active" && (
          <>
            <Progress
              totalQuestions={totalQuestions}
              currentQuestionIndex={quiz.currentQuestionIndex}
              answerIndex={quiz.answerIndex}
              points={quiz.points}
              maxPossiblePoints={maxPossiblePoints}
            />

            <Question
              question={quiz.questions[quiz.currentQuestionIndex]}
              answerIndex={quiz.answerIndex}
              dispatch={dispatch}
            />

            <Footer>
              <Timer secondsRemaining={quiz.secondsRemaining!} dispatch={dispatch} />

              <NextButton
                currentQuestionIndex={quiz.currentQuestionIndex}
                totalQuestions={totalQuestions}
                answerIndex={quiz.answerIndex}
                dispatch={dispatch}
              />
            </Footer>
          </>
        )}
        {quiz.status === "finished" && (
          <FinishScreen
            points={quiz.points}
            maxPossiblePoints={maxPossiblePoints}
            highscore={quiz.highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
};

export default App;
