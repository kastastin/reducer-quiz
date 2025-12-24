import Main from "./components/layout/Main";
import Header from "./components/layout/Header";
import StartScreen from "./components/StartScreen";

const App = () => {
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
