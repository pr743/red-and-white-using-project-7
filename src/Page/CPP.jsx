import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CPP() {
  const CPPQuestions = [
    {
      question:
        "Which feature of C++ allows using the same function name with different parameters?",
      options: [
        "Inheritance",
        "Polymorphism",
        "Function Overloading",
        "Encapsulation",
      ],
      answer: "Function Overloading",
    },
    {
      question: "Which operator cannot be overloaded in C++?",
      options: ["+", "=", "::", "[]"],
      answer: "::",
    },
    {
      question: "What is the correct way to declare a constant pointer?",
      options: [
        "int * const ptr",
        "const int * ptr",
        "int const * ptr",
        "const ptr int *",
      ],
      answer: "int * const ptr",
    },
    {
      question:
        "Which concept is used to implement runtime polymorphism in C++?",
      options: [
        "Templates",
        "Function Overloading",
        "Virtual Functions",
        "Macros",
      ],
      answer: "Virtual Functions",
    },
    {
      question: "Which keyword is used to prevent function overriding?",
      options: ["static", "const", "final", "explicit"],
      answer: "final",
    },
    {
      question: "What is the size of an empty class in C++?",
      options: ["0 bytes", "1 byte", "2 bytes", "Depends on compiler"],
      answer: "1 byte",
    },
    {
      question: "Which STL container stores elements in sorted order?",
      options: ["vector", "list", "map", "queue"],
      answer: "map",
    },
    {
      question: "What happens if a destructor throws an exception?",
      options: [
        "Program terminates",
        "Exception is ignored",
        "Destructor is retried",
        "Undefined behavior",
      ],
      answer: "Program terminates",
    },
    {
      question: "Which cast is safest in C++?",
      options: [
        "C-style cast",
        "reinterpret_cast",
        "static_cast",
        "dynamic_cast",
      ],
      answer: "dynamic_cast",
    },
    {
      question:
        "Which keyword is used to resolve ambiguity in multiple inheritance?",
      options: ["virtual", "override", "explicit", "mutable"],
      answer: "virtual",
    },
    {
      question: "Which memory is allocated during compile time?",
      options: ["Heap", "Stack", "Static", "Register"],
      answer: "Static",
    },
    {
      question:
        "Which function is called automatically when an object goes out of scope?",
      options: ["Constructor", "Destructor", "Virtual Function", "Delete"],
      answer: "Destructor",
    },
    {
      question: "Which C++ feature supports generic programming?",
      options: ["Inheritance", "Templates", "Polymorphism", "Namespaces"],
      answer: "Templates",
    },
    {
      question: "What does RAII stand for in C++?",
      options: [
        "Resource Allocation Is Initialization",
        "Runtime Allocation In Inheritance",
        "Resource Access In Interface",
        "Runtime Access Is Immediate",
      ],
      answer: "Resource Allocation Is Initialization",
    },
    {
      question: "Which container provides fastest insertion at the end?",
      options: ["vector", "list", "deque", "set"],
      answer: "vector",
    },
    {
      question:
        "Which keyword allows modifying a member inside a const function?",
      options: ["static", "mutable", "volatile", "register"],
      answer: "mutable",
    },
    {
      question: "Which header is required for using smart pointers?",
      options: ["<memory>", "<pointer>", "<smartptr>", "<utility>"],
      answer: "<memory>",
    },
    {
      question: "What is the return type of sizeof operator?",
      options: ["int", "long", "size_t", "unsigned int"],
      answer: "size_t",
    },
    {
      question: "Which smart pointer allows multiple ownership?",
      options: ["unique_ptr", "auto_ptr", "shared_ptr", "weak_ptr"],
      answer: "shared_ptr",
    },
    {
      question: "Which function is used to deallocate memory allocated by new?",
      options: ["free()", "delete", "remove()", "clear()"],
      answer: "delete",
    },
    {
      question: "Which type of inheritance is NOT supported directly in C++?",
      options: ["Single", "Multiple", "Hierarchical", "Hybrid"],
      answer: "Hybrid",
    },
    {
      question: "Which keyword avoids name conflicts in large projects?",
      options: ["class", "using", "namespace", "typedef"],
      answer: "namespace",
    },
    {
      question: "Which object is destroyed first?",
      options: [
        "Global object",
        "Local object",
        "Static object",
        "Dynamic object",
      ],
      answer: "Local object",
    },
    {
      question:
        "Which operator is used to access class members through pointer?",
      options: [".", "::", "->", "*"],
      answer: "->",
    },
    {
      question: "Which C++ standard introduced auto keyword?",
      options: ["C++98", "C++03", "C++11", "C++14"],
      answer: "C++11",
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

  const currentQuestion = CPPQuestions[currentIndex];

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
    if (currentIndex + 1 < CPPQuestions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowResult(true);
      sessionStorage.setItem("CPPScore", score);
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
    const percentage = Math.round((score / CPPQuestions.length) * 100);

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-extrabold text-center mb-6">
            CPP Quiz Result
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-800 p-4 rounded-xl text-center">
              <p className="text-gray-400">Total</p>
              <p className="text-2xl font-bold">{CPPQuestions.length}</p>
            </div>
            <div className="bg-green-700 p-4 rounded-xl text-center">
              <p>Correct</p>
              <p className="text-2xl font-bold">{score}</p>
            </div>
            <div className="bg-red-700 p-4 rounded-xl text-center">
              <p>Wrong</p>
              <p className="text-2xl font-bold">
                {CPPQuestions.length - score}
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

  const progress = ((currentIndex + 1) / CPPQuestions.length) * 100;

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
          Question {currentIndex + 1} of {CPPQuestions.length}
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
              {currentIndex + 1 === CPPQuestions.length
                ? "Finish Quiz"
                : "Next "}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CPP;
