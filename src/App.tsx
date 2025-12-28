import { useEffect, useReducer, type Reducer } from "react";

import Loader from "./components/Loader";
import Main from "./components/layout/Main";
import Question from "./components/Question";
import Header from "./components/layout/Header";
import StartScreen from "./components/StartScreen";
import FecthingError from "./components/FecthingError";

import type { Quiz, QuizAction } from "./types/quiz";

const initialState: Quiz = {
  questions: [],
  status: "loading",
  currentQuestionIndex: 0,
};

const reducer: Reducer<Quiz, QuizAction> = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return { ...state, status: "ready", questions: action.payload };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    default:
      throw new Error("Unknown action");
  }
};

const App = () => {
  const [quiz, dispatch] = useReducer(reducer, initialState);

  const totalQuestions = quiz.questions.length;

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
        {quiz.status === "active" && <Question question={quiz.questions[quiz.currentQuestionIndex]} />}
      </Main>
    </div>
  );
};

export default App;
