import Loader from "./components/Loader";
import Main from "./components/layout/Main";
import Header from "./components/layout/Header";
import FecthingError from "./components/FecthingError";
import StartScreen from "./components/screens/StartScreen";
import FinishScreen from "./components/screens/FinishScreen";
import ActiveScreen from "./components/screens/ActiveScreen";

import { useQuiz } from "./features/quiz/hooks/useQuiz";

const App = () => {
  const { state } = useQuiz();
  const { status } = state;

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "error" && <FecthingError />}
        {status === "loading" && <Loader />}
        {status === "ready" && <StartScreen />}
        {status === "active" && <ActiveScreen />}
        {status === "finished" && <FinishScreen />}
      </Main>
    </div>
  );
};

export default App;
