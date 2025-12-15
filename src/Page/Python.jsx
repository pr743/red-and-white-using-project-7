import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Python() {
    const PythonQuestions = [
  {
    question: "Which keyword is used to define a function in Python?",
    options: ["func", "def", "function", "define"],
    answer: "def",
  },
  {
    question: "Which symbol is used for comments in Python?",
    options: ["//", "#", "/* */", "<!-- -->"],
    answer: "#",
  },
  {
    question: "What is the output of `print(2 + 3 * 4)`?",
    options: ["20", "14", "24", "None of these"],
    answer: "14",
  },
  {
    question: "Which data type is immutable in Python?",
    options: ["list", "set", "tuple", "dict"],
    answer: "tuple",
  },
  {
    question: "How do you start a for loop in Python?",
    options: ["for i = 1 to 5:", "for i in range(5):", "foreach i in 5:", "loop i from 0 to 4"],
    answer: "for i in range(5):",
  },
  {
    question: "Which function is used to get input from user in Python?",
    options: ["scan()", "input()", "read()", "get()"],
    answer: "input()",
  },
  {
    question: "What is the correct way to import a module in Python?",
    options: ["include math", "import math", "using math", "require math"],
    answer: "import math",
  },
  {
    question: "Which operator is used for exponentiation in Python?",
    options: ["^", "**", "%", "//"],
    answer: "**",
  },
  {
    question: "What does `len()` function do in Python?",
    options: ["Returns type", "Returns length", "Deletes element", "Converts to string"],
    answer: "Returns length",
  },
  {
    question: "Which of these is a Python boolean value?",
    options: ["Yes", "No", "True", "1"],
    answer: "True",
  },

  {
    question: "Which of these is a Python boolean value?",
    options: ["Yes", "No", "True", "1"],
    answer: "True",
  },

  {
    question: "What is the correct way to create a list in Python?",
    options: ["[]", "()", "{}", "<>"],
    answer: "[]",
  },

  {
    question: "Which keyword is used for conditional statements in Python?",
    options: ["if", "when", "case", "cond"],
    answer: "if",
  },
  {
    question: "Which method adds an element at the end of a list?",
    options: ["add()", "append()", "insert()", "push()"],
    answer: "append()",
  },
  {
    question: "What does `str()` function do in Python?",
    options: ["Converts to string", "Converts to integer", "Converts to float", "Checks string type"],
    answer: "Converts to string",
  },

   {
    question: "Which keyword is used to handle exceptions in Python?",
    options: ["catch", "try", "except", "error"],
    answer: "except",
  },

  {
    question: "Which data type stores key-value pairs in Python?",
    options: ["list", "tuple", "dict", "set"],
    answer: "dict",
  },
  {
    question: "Which of these loops is used to iterate until a condition is false?",
    options: ["for", "while", "do-while", "loop"],
    answer: "while",
  },
  {
    question: "How do you create a set in Python?",
    options: ["{}", "[]", "set()", "tuple()"],
    answer: "set()",
  },
  {
    question: "Which operator checks equality in Python?",
    options: ["=", "==", "===", "!="],
    answer: "==",
  },
  {
    question: "Which keyword is used to define a class in Python?",
    options: ["class", "def", "object", "type"],
    answer: "class",
  },
  {
    question: "Which of these is NOT a Python data type?",
    options: ["list", "integer", "float", "array"],
    answer: "array",
  },
  {
    question: "Which method removes an item from a list by value?",
    options: ["delete()", "remove()", "pop()", "discard()"],
    answer: "remove()",
  },
  {
    question: "What is the output of `bool(0)` in Python?",
    options: ["True", "False", "0", "Error"],
    answer: "False",
  },
  {
    question: "Which Python keyword is used to end a function and return a value?",
    options: ["break", "exit", "return", "yield"],
    answer: "return",
  },
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
          sessionStorage.setItem("PythonScore", score);
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

  const currentQuestion = PythonQuestions[currentIndex];

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
    if (currentIndex + 1 < PythonQuestions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowResult(true);
      sessionStorage.setItem("PythonScore", score);
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
    const percentage = Math.round((score / PythonQuestions.length) * 100);

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-extrabold text-center mb-6">
            Python Quiz Result
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-800 p-4 rounded-xl text-center">
              <p className="text-gray-400">Total</p>
              <p className="text-2xl font-bold">{PythonQuestions.length}</p>
            </div>
            <div className="bg-green-700 p-4 rounded-xl text-center">
              <p>Correct</p>
              <p className="text-2xl font-bold">{score}</p>
            </div>
            <div className="bg-red-700 p-4 rounded-xl text-center">
              <p>Wrong</p>
              <p className="text-2xl font-bold">
                {PythonQuestions.length - score}
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

  const progress = ((currentIndex + 1) / PythonQuestions.length) * 100;

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
          Question {currentIndex + 1} of {PythonQuestions.length}
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
              {currentIndex + 1 === PythonQuestions.length
                ? "Finish Quiz"
                : "Next "}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Python;
