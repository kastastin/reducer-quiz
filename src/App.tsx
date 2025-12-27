import { useEffect, useReducer, type Reducer } from "react";

import Main from "./components/layout/Main";
import Header from "./components/layout/Header";
import StartScreen from "./components/StartScreen";

import type { Quiz, QuizAction } from "./types/quiz";

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
        <StartScreen />
      </Main>
    </div>
  );
};

export default App;
