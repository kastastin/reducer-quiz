import { useEffect, useState } from "react";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const StartScreen = () => {
  const [questions, setQuestions] = useState(null);

  useEffect(() => {
    async function fetchQuestions() {
      const res = await fetch("http://localhost:8001/questions");
      const data = await res.json();

      await sleep(3000);

      setQuestions(data);
    }

    fetchQuestions();
  }, []);

  console.log(questions);

  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>15 questions to test your React mastery</h3>
      <button className="btn btn-ui" onClick={() => console.log("Start quiz")}>
        Let's start
      </button>
    </div>
  );
};

export default StartScreen;
