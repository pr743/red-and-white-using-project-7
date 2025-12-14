import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function JavaScript() {
  const javaScriptQuestions = [
  {
    question: "Which of the following is a correct way to declare a variable in JavaScript?",
    options: ["var x;", "let x;", "const x;", "All of the above"],
    answer: "All of the above",
  },
  {
    question: "Which of these is a JavaScript data type?",
    options: ["Number", "String", "Boolean", "All of the above"],
    answer: "All of the above",
  },
  {
    question: "Which method converts a JSON string to a JavaScript object?",
    options: ["JSON.parse()", "JSON.stringify()", "JSON.convert()", "JSON.toObject()"],
    answer: "JSON.parse()",
  },
  {
    question: "Which method converts a JavaScript object to a JSON string?",
    options: ["JSON.stringify()", "JSON.parse()", "JSON.convert()", "JSON.toString()"],
    answer: "JSON.stringify()",
  },
  {
    question: "Which of the following is a JavaScript loop?",
    options: ["for", "while", "do...while", "All of the above"],
    answer: "All of the above",
  },
  {
    question: "Which operator is used for strict equality comparison in JavaScript?",
    options: ["=", "==", "===", "!="],
    answer: "===",
  },
  {
    question: "Which keyword is used to define a function in JavaScript?",
    options: ["function", "func", "def", "method"],
    answer: "function",
  },
  {
    question: "Which of the following is used to handle exceptions in JavaScript?",
    options: ["try...catch", "if...else", "switch", "for loop"],
    answer: "try...catch",
  },
  {
    question: "Which JavaScript keyword declares a constant?",
    options: ["const", "let", "var", "fixed"],
    answer: "const",
  },
  {
    question: "Which method adds an element to the end of an array?",
    options: ["push()", "pop()", "shift()", "unshift()"],
    answer: "push()",
  },
  {
    question: "Which method removes the last element from an array?",
    options: ["pop()", "push()", "shift()", "unshift()"],
    answer: "pop()",
  },
  {
    question: "Which method adds an element to the beginning of an array?",
    options: ["unshift()", "shift()", "push()", "pop()"],
    answer: "unshift()",
  },
  {
    question: "Which method removes the first element from an array?",
    options: ["shift()", "unshift()", "pop()", "push()"],
    answer: "shift()",
  },
  {
    question: "Which of the following is a JavaScript framework/library?",
    options: ["ReactJS", "Angular", "Vue.js", "All of the above"],
    answer: "All of the above",
  },
  {
    question: "What is the type of NaN in JavaScript?",
    options: ["number", "string", "undefined", "object"],
    answer: "number",
  },
  {
    question: "Which method can be used to combine two arrays?",
    options: ["concat()", "merge()", "combine()", "attach()"],
    answer: "concat()",
  },
  {
    question: "Which method checks if an array includes a certain element?",
    options: ["includes()", "has()", "contains()", "exists()"],
    answer: "includes()",
  },
  {
    question: "Which keyword is used to create a class in JavaScript?",
    options: ["class", "function", "object", "def"],
    answer: "class",
  },
  {
    question: "Which method is used to create a new array with results of a function on each element?",
    options: ["map()", "forEach()", "filter()", "reduce()"],
    answer: "map()",
  },
  {
    question: "Which method is used to filter elements of an array based on a condition?",
    options: ["filter()", "map()", "reduce()", "some()"],
    answer: "filter()",
  },
  {
    question: "Which method executes a function on each element of an array without returning a new array?",
    options: ["forEach()", "map()", "filter()", "reduce()"],
    answer: "forEach()",
  },
  {
    question: "Which method reduces an array to a single value?",
    options: ["reduce()", "map()", "filter()", "forEach()"],
    answer: "reduce()",
  },
  {
    question: "Which of the following is a valid way to define an arrow function?",
    options: ["() => {}", "function() {}", "=> {}", "func() => {}"],
    answer: "() => {}",
  },
  {
    question: "Which of these keywords is used to refer to the current object?",
    options: ["this", "self", "current", "obj"],
    answer: "this",
  },
  {
    question: "Which of the following can be used to set a timer in JavaScript?",
    options: ["setTimeout()", "setInterval()", "Both A and B", "None of these"],
    answer: "Both A and B",
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
          sessionStorage.setItem("javaScriptScore", score);
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

  const currentQuestion = javaScriptQuestions[currentIndex];

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
    if (currentIndex + 1 < javaScriptQuestions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowResult(true);
      sessionStorage.setItem("javaScriptScore", score);
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
    const percentage = Math.round((score / javaScriptQuestions.length) * 100);

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-extrabold text-center mb-6">
            javaScript Quiz Result
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-800 p-4 rounded-xl text-center">
              <p className="text-gray-400">Total</p>
              <p className="text-2xl font-bold">{javaScriptQuestions.length}</p>
            </div>
            <div className="bg-green-700 p-4 rounded-xl text-center">
              <p>Correct</p>
              <p className="text-2xl font-bold">{score}</p>
            </div>
            <div className="bg-red-700 p-4 rounded-xl text-center">
              <p>Wrong</p>
              <p className="text-2xl font-bold">
                {javaScriptQuestions.length - score}
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

  const progress = ((currentIndex + 1) / javaScriptQuestions.length) * 100;

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
          Question {currentIndex + 1} of {javaScriptQuestions.length}
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
              {currentIndex + 1 === javaScriptQuestions.length
                ? "Finish Quiz"
                : "Next "}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default JavaScript;
