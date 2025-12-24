import { useReducer, type ChangeEvent } from "react";

type Counter = {
  step: number;
  count: number;
};

type CounterAction =
  | { type: "reset" }
  | { type: "setStep"; value: Counter["step"] }
  | { type: "setCount"; value: Counter["count"] }
  | { type: "increaseCounter" }
  | { type: "decreaseCounter" };

const initialCounter = { step: 1, count: 0 };

const counterReducer = (state: Counter, action: CounterAction) => {
  switch (action.type) {
    case "reset":
      return initialCounter;
    case "setStep":
      return { ...state, step: action.value };
    case "setCount":
      return { ...state, count: action.value };
    case "increaseCounter":
      return { ...state, count: state.count + state.step };
    case "decreaseCounter":
      return { ...state, count: state.count - state.step };
    default:
      throw new Error("Unknown action");
  }
};

const DateCounter = () => {
  const [counter, dispatch] = useReducer(counterReducer, initialCounter);

  const setStep = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "setStep", value: Number(e.currentTarget.value) });
  };

  const setCount = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "setCount", value: Number(e.currentTarget.value) });
  };

  const resetCounter = () => dispatch({ type: "reset" });
  const increaseCounter = () => dispatch({ type: "increaseCounter" });
  const decreaseCounter = () => dispatch({ type: "decreaseCounter" });

  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + counter.count);

  return (
    <div className="counter">
      <div>
        <input type="range" min="0" max="10" value={counter.step} onChange={setStep} />
        <span>{counter.step}</span>
      </div>

      <div>
        <button onClick={decreaseCounter}>-</button>
        <input value={counter.count} onChange={setCount} />
        <button onClick={increaseCounter}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={resetCounter}>Reset</button>
      </div>
    </div>
  );
};

export default DateCounter;
