import { useEffect } from "react";

import { Question } from "./types";
import useStatus from "./hooks/useStatus";
import useDispatch from "./hooks/useDispatch";

import Main from "./components/Main";
import Timer from "./components/Timer";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import Header from "./components/Header";
import Progress from "./components/Progress";
import CustomError from "./components/Error";
import NextButton from "./components/NextButton";
import StartScreen from "./components/StartScreen";
import FinishScreen from "./components/FinishScreen";
import QuestionCard from "./components/QuestionCard";

export default function App() {
  const status = useStatus();
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData(url: string): Promise<void> {
      try {
        const res = await fetch(url);

        if (!res.ok) {
          throw new Error("Network response error.");
        }

        const data: Question[] = await res.json();
        dispatch({ type: "received_data", payload: data });
      } catch (error) {
        dispatch({
          type: "failed_data",
          payload: error instanceof Error ? error.message : "Unknown error",
        });
      }
    }
    fetchData("http://localhost:8000/questions");
  }, [dispatch]);

  return (
    <div className="app">
      <Header />

      <Main>
        {status === "error" && <CustomError />}
        {status === "loading" && <Loader />}
        {status === "ready" && <StartScreen />}
        {status === "finished" && <FinishScreen />}
        {status === "active" && (
          <>
            <Progress />
            <QuestionCard />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}
      </Main>
    </div>
  );
}
