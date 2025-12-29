import type { Reducer } from "react";

import type { Quiz, QuizAction } from "./quiz.types";

const SECS_PER_QUESTION = 30;

export const initialQuizState: Quiz = {
  questions: [],
  status: "loading",
  currentQuestionIndex: 0,
  answerIndex: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

export const quizReducer: Reducer<Quiz, QuizAction> = (state, action) => {
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
      return { ...initialQuizState, questions: state.questions, status: "ready" };

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
