import { State, Action, Question } from "../types";

export const initialState: State = {
  questions: [],
  activeQuestionIndex: 0,
  selectedOptionIndex: null,
  points: 0,
  highscore: 0,
  secondsLeft: 180,
  status: "loading",
  error: "",
};

export function quizReducer(state: State, action: Action): State {
  switch (action.type) {
    case "start": {
      return { ...state, status: "active" };
    }

    case "finish": {
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    }

    case "restart": {
      return {
        ...initialState,
        questions: state.questions,
        highscore: state.highscore,
        status: "ready",
      };
    }

    case "received_data": {
      return {
        ...state,
        questions: action.payload as Question[],
        status: "ready",
      };
    }

    case "failed_data": {
      return { ...state, status: "error", error: action.payload as string };
    }

    case "set_selected_option": {
      const currentQuestion = state.questions[state.activeQuestionIndex];

      return {
        ...state,
        selectedOptionIndex: action.payload as number,
        points:
          action.payload === currentQuestion.correctOption
            ? state.points + currentQuestion.points
            : state.points,
      };
    }
    case "moved_to_next_question": {
      return {
        ...state,
        activeQuestionIndex: state.activeQuestionIndex + 1,
        selectedOptionIndex: null,
      };
    }

    case "tick": {
      return {
        ...state,
        secondsLeft: state.secondsLeft - 1,
        status: state.secondsLeft === 1 ? "finished" : state.status,
      };
    }

    default: {
      throw new Error(`Unknown type: ${action.type}`);
    }
  }
}
