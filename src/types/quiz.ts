type Question = {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
};

type Status = "loading" | "ready" | "active" | "finished" | "error";

export type Quiz = {
  questions: Question[];
  status: Status;
};

export type QuizAction =
  | { type: "dataReceived"; payload: Quiz["questions"] }
  | { type: "dataFailed" }
