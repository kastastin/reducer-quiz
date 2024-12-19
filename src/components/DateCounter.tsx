import { useReducer } from "react";

export default function DateCounter() {
  const [count, dispatch] = useReducer(reducer, initialState);

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count.count);

  function dec() {
    dispatch({ type: "dec" });
  }

  function inc() {
    dispatch({ type: "inc" });
  }

  function defineStep(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: "setStep", payload: Number(e.target.value) });
  }

  function defineCount(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: "setCount", payload: Number(e.target.value) });
  }

  function reset() {
    dispatch({ type: "reset" });
  }

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={count.step}
          onChange={defineStep}
        />
        <span>{count.step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count.count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

function reducer(
  state: InitialState,
  action: { type: string; payload?: number }
): InitialState {
  switch (action.type) {
    case "inc": {
      return { ...state, count: state.count + state.step };
    }
    case "dec": {
      return { ...state, count: state.count - state.step };
    }
    case "setCount": {
      return { ...state, count: action.payload ?? state.count };
    }
    case "setStep": {
      return { ...state, step: action.payload ?? state.step };
    }
    case "reset": {
      return initialState;
    }
    default: {
      throw new Error(`Unknown type: ${action.type}`);
    }
  }
}

interface InitialState {
  count: number;
  step: number;
}

const initialState: InitialState = { count: 0, step: 1 };
