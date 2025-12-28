import { useEffect, useReducer, type Reducer } from "react";

import Loader from "./components/Loader";
import Main from "./components/layout/Main";
import Header from "./components/layout/Header";
import StartScreen from "./components/StartScreen";
import FecthingError from "./components/FecthingError";

import type { Quiz, QuizAction } from "./types/quiz";

// const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const initialState: Quiz = {
  questions: [],
  status: "loading",
};

const reducer: Reducer<Quiz, QuizAction> = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return { ...state, status: "ready", questions: action.payload };
    case "dataFailed":
      return { ...state, status: "error" };
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
      // .then(() => sleep(3000))
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch(() => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {quiz.status === "error" && <FecthingError />}
        {quiz.status === "loading" && <Loader />}
        {quiz.status === "ready" && <StartScreen totalQuestions={totalQuestions} />}
      </Main>
    </div>
  );
};

export default App;
