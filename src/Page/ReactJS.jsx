import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ReactJS() {
  const ReactJSQuestions = [
  {
    question: "Which of the following is used to create a React component?",
    options: ["function", "class", "Both A and B", "None of these"],
    answer: "Both A and B",
  },
  {
    question: "What is the default state of a React component called?",
    options: ["props", "state", "context", "setState"],
    answer: "state",
  },
  {
    question: "Which method is used to render a React component to the DOM?",
    options: ["React.render()", "ReactDOM.render()", "renderComponent()", "ReactDOM.create()"],
    answer: "ReactDOM.render()",
  },
  {
    question: "How do you pass data from parent to child component?",
    options: ["props", "state", "context", "events"],
    answer: "props",
  },
  {
    question: "Which hook is used to manage state in functional components?",
    options: ["useState", "useEffect", "useContext", "useReducer"],
    answer: "useState",
  },
  {
    question: "Which hook is used to perform side effects in React?",
    options: ["useState", "useEffect", "useMemo", "useCallback"],
    answer: "useEffect",
  },
  {
    question: "Which attribute is used to define HTML classes in JSX?",
    options: ["class", "className", "class-id", "cls"],
    answer: "className",
  },
  {
    question: "What is a pure component in React?",
    options: [
      "A component without props",
      "A component without state",
      "A component that only renders props and prevents unnecessary re-render",
      "A component with internal methods"
    ],
    answer: "A component that only renders props and prevents unnecessary re-render",
  },
  {
    question: "How can you prevent a component from re-rendering unnecessarily?",
    options: ["useState", "shouldComponentUpdate", "componentDidMount", "useEffect"],
    answer: "shouldComponentUpdate",
  },
  {
    question: "Which feature of React improves performance by minimizing DOM manipulations?",
    options: ["Virtual DOM", "Context API", "Hooks", "JSX"],
    answer: "Virtual DOM",
  },
  {
    question: "Which hook is used to memorize expensive calculations in React?",
    options: ["useMemo", "useCallback", "useEffect", "useState"],
    answer: "useMemo",
  },
  {
    question: "Which hook returns a memoized callback in React?",
    options: ["useMemo", "useCallback", "useRef", "useEffect"],
    answer: "useCallback",
  },
  {
    question: "What is JSX in React?",
    options: [
      "A JavaScript function",
      "A syntax extension to write HTML in JS",
      "A type of hook",
      "A library for state management"
    ],
    answer: "A syntax extension to write HTML in JS",
  },
  {
    question: "Which hook is used to access DOM elements in React?",
    options: ["useState", "useEffect", "useRef", "useContext"],
    answer: "useRef",
  },
  {
    question: "How do you conditionally render a component in React?",
    options: ["if statements in JSX", "Ternary operators", "Logical AND (&&)", "All of the above"],
    answer: "All of the above",
  },
  {
    question: "Which lifecycle method is called after the component is mounted?",
    options: ["componentDidMount", "componentWillMount", "componentDidUpdate", "componentWillUnmount"],
    answer: "componentDidMount",
  },
  {
    question: "Which lifecycle method is called before a component is removed from the DOM?",
    options: ["componentWillUnmount", "componentDidMount", "componentDidUpdate", "getDerivedStateFromProps"],
    answer: "componentWillUnmount",
  },
  {
    question: "Which hook is used to share global data across components?",
    options: ["useContext", "useState", "useEffect", "useReducer"],
    answer: "useContext",
  },
  {
    question: "Which React feature is used for code splitting?",
    options: ["Suspense", "Fragments", "Hooks", "Props"],
    answer: "Suspense",
  },
  {
    question: "Which function is used to update the state in class components?",
    options: ["setState()", "updateState()", "changeState()", "modifyState()"],
    answer: "setState()",
  },
  {
    question: "Which statement is true about React keys?",
    options: [
      "Keys help React identify elements and optimize re-rendering",
      "Keys are optional for lists",
      "Keys can be duplicated in a list",
      "Keys must be strings"
    ],
    answer: "Keys help React identify elements and optimize re-rendering",
  },
  {
    question: "Which hook is used for complex state management in functional components?",
    options: ["useState", "useReducer", "useEffect", "useMemo"],
    answer: "useReducer",
  },
  {
    question: "Which statement is true about React fragments?",
    options: [
      "Fragments allow grouping multiple elements without extra DOM nodes",
      "Fragments replace divs completely",
      "Fragments are stateful components",
      "Fragments are hooks"
    ],
    answer: "Fragments allow grouping multiple elements without extra DOM nodes",
  },
  {
    question: "Which method is used to convert a React element into HTML?",
    options: ["ReactDOM.render()", "React.renderHTML()", "React.createElement()", "React.toHTML()"],
    answer: "ReactDOM.render()",
  },
  {
    question: "Which hook is used to optimize performance by memoizing components?",
    options: ["React.memo", "useMemo", "useCallback", "PureComponent"],
    answer: "React.memo",
  }
];


  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const navigate = useNavigate();

  const Total_TIME = 15 * 60;

  const [timeLeft, setTimeLeft] = useState(Total_TIME);

  useEffect(() => {
    if (showResult) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          setShowResult(true);
          sessionStorage.setItem("CPPScore", score);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showResult, score]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const currentQuestion = ReactJSQuestions[currentIndex];

  const handleOptionClick = (option) => {
    if (selectedOption) return;
    setSelectedOption(option);

    const isCorrect = option === currentQuestion.answer;
    if (isCorrect) setScore((prev) => prev + 1);

    setAnswers((prev) => {
      const copy = [...prev];
      copy[currentIndex] = {
        question: currentQuestion.question,
        selected: option,
        correct: currentQuestion.answer,
        isCorrect,
      };
      return copy;
    });
  };

  const handleNext = () => {
    setSelectedOption(answers[currentIndex + 1]?.selected || null);
    if (currentIndex + 1 < ReactJSQuestions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowResult(true);
      sessionStorage.setItem("ReactJSScore", score);
    }
  };

  const handlePrev = () => {
    if (currentIndex === 0) return;
    setCurrentIndex(currentIndex - 1);
    setSelectedOption(answers[currentIndex - 1]?.selected || null);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setAnswers([]);
    setShowResult(false);
    setTimeLeft(Total_TIME);
  };

  if (showResult) {
    const percentage = Math.round((score / ReactJSQuestions.length) * 100);

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-extrabold text-center mb-6">
            CPP Quiz Result
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-800 p-4 rounded-xl text-center">
              <p className="text-gray-400">Total</p>
              <p className="text-2xl font-bold">{ReactJSQuestions.length}</p>
            </div>
            <div className="bg-green-700 p-4 rounded-xl text-center">
              <p>Correct</p>
              <p className="text-2xl font-bold">{score}</p>
            </div>
            <div className="bg-red-700 p-4 rounded-xl text-center">
              <p>Wrong</p>
              <p className="text-2xl font-bold">
                {ReactJSQuestions.length - score}
              </p>
            </div>
            <div className="bg-indigo-700 p-4 rounded-xl text-center">
              <p>Score</p>
              <p className="text-2xl font-bold">{percentage}%</p>
            </div>
          </div>

          <div className="space-y-4">
            {answers.map((item, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl border ${
                  item.isCorrect
                    ? "bg-green-900/40 border-green-500"
                    : "bg-red-900/40 border-red-500"
                }`}
              >
                <p className="font-semibold mb-1">
                  Q{index + 1}. {item.question}
                </p>
                <p className="text-green-400">Correct: {item.correct}</p>
                <p className="text-red-400">Your Answer: {item.selected}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={handleRestart}
              className="bg-green-600 hover:bg-green-700 px-10 py-3 rounded-xl text-lg font-semibold shadow-lg mr-4"
            >
              Restart Quiz
            </button>

            <button
              onClick={() => navigate("/dashboard")}
              className="bg-indigo-600 hover:bg-indigo-700 px-10 py-3 rounded-xl text-lg font-semibold shadow-lg"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const progress = ((currentIndex + 1) / ReactJSQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-700 to-purple-900 flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur w-full max-w-2xl rounded-3xl shadow-2xl p-6">
        <div className="flex justify-between mb-3">
          <span className="font-semibold">Java Quiz</span>
          <span
            className={`px-3 py-1 rounded-full text-white ${
              timeLeft < 60 ? "bg-red-600 animate-pulse" : "bg-indigo-600"
            }`}
          >
            ⏱ {formatTime(timeLeft)}
          </span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div
            className="bg-indigo-600 h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        <h2 className="text-sm text-gray-500 mb-1">
          Question {currentIndex + 1} of {ReactJSQuestions.length}
        </h2>

        <p className="text-xl font-bold mb-6">{currentQuestion.question}</p>

        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => {
            let style =
              "border p-4 rounded-xl w-full text-left font-medium transition";

            if (selectedOption) {
              if (option === currentQuestion.answer) {
                style += " bg-green-500 text-white";
              } else if (option === selectedOption) {
                style += " bg-red-500 text-white";
              } else {
                style += " bg-gray-100";
              }
            } else {
              style += " hover:bg-indigo-100";
            }

            return (
              <button
                key={index}
                onClick={() => handleOptionClick(option)}
                className={style}
              >
                <span className="font-bold mr-3">
                  {["A", "B", "C", "D"][index]}.
                </span>
                {option}
              </button>
            );
          })}
        </div>

        {selectedOption && (
          <div className="flex gap-4 mt-6">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="w-1/2 bg-gray-400 text-white py-3 rounded-xl disabled:opacity-50"
            >
              Prev
            </button>

            <button
              onClick={handleNext}
              className="w-1/2 bg-indigo-600 text-white py-3 rounded-xl"
            >
              {currentIndex + 1 === ReactJSQuestions.length
                ? "Finish Quiz"
                : "Next "}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default  ReactJS;
