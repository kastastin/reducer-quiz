export type Quiz = {
  questions: Question[];
  status: Status;
  currentQuestionIndex: number;
};

export type QuizAction =
  | { type: "dataReceived"; payload: Quiz["questions"] }
  | { type: "dataFailed" }
  | { type: "start" };

export type Question = {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
};

type Status = "loading" | "ready" | "active" | "finished" | "error";
