export interface State {
  questions: Question[];
  activeQuestionIndex: number;
  selectedOptionIndex: number | null;
  points: number;
  highscore: number;
  secondsLeft: number;
  status: "loading" | "error" | "ready" | "active" | "finished";
  error: string;
}

export interface Action {
  type: string;
  payload?: Question[] | string | number;
}

export interface Question {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
}
