import { useState, useEffect } from "react";
import Header from "./components/Header";
import Key from "./components/Key";
import { AiOutlineCalculator } from "react-icons/ai";
import "./index.css";
const usedKeyCodes = [
  48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103,
  104, 105, 8, 13, 190, 187, 189, 191, 56, 111, 106, 107, 109,
];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const operators = ["-", "+", "*", "/"];
function App() {
  const [showTime, setShowTime] = useState("");
  useEffect(() => {
    const timer = setInterval(() => {
      const date = new Date();
      setShowTime(
        date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const [expression, setExression] = useState("");
  const [result, setResult] = useState("");

  const handleClick = (keyCode, key) => {
    if (!keyCode) return;
    if (!usedKeyCodes.includes(keyCode)) return;

    if (numbers.includes(key)) {
      if (key === "0") {
        if (expression.length === 0) return;
      }
      calculateResult(expression + key);
      setExression(expression + key);
    } else if (operators.includes(key)) {
      if (!expression) return;

      const lastChar = expression.slice(-1);
      if (operators.includes(lastChar)) return;
      if (lastChar === ".") return;

      setExression(expression + key);
    } else if (key === ".") {
      if (!expression) return;
      const lastChar = expression.slice(-1);
      if (!numbers.includes(lastChar)) return;

      setExression(expression + key);
    } else if (keyCode === 8) {
      if (!expression) return;
      calculateResult(expression.slice(0, -1));
      setExression(expression.slice(0, -1));
    } else if (keyCode === 13) {
      if (!expression) return;
      calculateResult(expression);
    }
  };

  const calculateResult = (exp) => {
    if (!exp) {
      setResult("");
      return;
    }
    const lastChar = exp.slice(-1);
    if (!numbers.includes(lastChar)) exp = exp.slice(0, -1);

    const answer = eval(exp).toFixed(2) + "";
    setResult(answer);
  };
  return (
    <>
      <div className="heading">
        <AiOutlineCalculator size={70} />
        <h1>calculator</h1>
      </div>
      <div
        className="app"
        tabIndex="0"
        onKeyDown={(event) => handleClick(event.keyCode, event.key)}
      >
        <div className="app_calc">
          <div className="app_calc_navbar">
            <div className="app_calc_navbar_time">
              <span className="time">{showTime}</span>
            </div>
          </div>
          <Header expression={expression} result={result} />
          <Key handleClick={handleClick} />
        </div>
      </div>
    </>
  );
}

export default App;
