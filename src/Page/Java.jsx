import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Java() {
  const javaQuestions = [
    {
      question: "What is JVM?",
      options: [
        "Java Virtual Machine",
        "Java Visual Machine",
        "Java Variable Method",
        "None of these",
      ],
      answer: "Java Virtual Machine",
    },
    {
      question: "Which keyword is used to inherit a class in Java?",
      options: ["this", "super", "extends", "implements"],
      answer: "extends",
    },
    {
      question: "Which method is the entry point of Java program?",
      options: ["start()", "run()", "main()", "init()"],
      answer: "main()",
    },
    {
      question: "Which of these is not a Java feature?",
      options: [
        "Object-oriented",
        "Platform independent",
        "Use of pointers",
        "Secure",
      ],
      answer: "Use of pointers",
    },
    {
      question: "Which keyword is used to create an object?",
      options: ["new", "class", "object", "create"],
      answer: "new",
    },
    {
      question: "Which data type is used to store true/false?",
      options: ["int", "boolean", "char", "float"],
      answer: "boolean",
    },
    {
      question: "Which package contains Scanner class?",
      options: ["java.io", "java.util", "java.lang", "java.net"],
      answer: "java.util",
    },
    {
      question: "Which keyword is used to prevent inheritance?",
      options: ["static", "final", "private", "protected"],
      answer: "final",
    },
    {
      question: "Which keyword is used to handle exceptions?",
      options: ["try", "catch", "throw", "All of these"],
      answer: "All of these",
    },
    {
      question: "Which loop is guaranteed to execute at least once?",
      options: ["for", "while", "do-while", "foreach"],
      answer: "do-while",
    },
    {
      question: "Which operator is used for comparison?",
      options: ["=", "==", "+", "%"],
      answer: "==",
    },
    {
      question: "Which keyword is used to call parent class constructor?",
      options: ["this()", "super()", "parent()", "base()"],
      answer: "super()",
    },
    {
      question: "Which class is the parent of all classes?",
      options: ["Main", "Object", "Class", "System"],
      answer: "Object",
    },
    {
      question: "Which exception occurs when dividing by zero?",
      options: [
        "NullPointerException",
        "ArithmeticException",
        "IOException",
        "ArrayIndexOutOfBoundsException",
      ],
      answer: "ArithmeticException",
    },
    {
      question: "Which keyword is used to define constant?",
      options: ["static", "final", "const", "constant"],
      answer: "final",
    },
    {
      question: "Which access modifier is most restrictive?",
      options: ["public", "protected", "default", "private"],
      answer: "private",
    },
    {
      question: "Which collection does not allow duplicate values?",
      options: ["List", "ArrayList", "Set", "Vector"],
      answer: "Set",
    },
    {
      question: "Which keyword is used to implement interface?",
      options: ["extends", "implements", "interface", "inherit"],
      answer: "implements",
    },
    {
      question: "Which method is used to start a thread?",
      options: ["run()", "start()", "execute()", "begin()"],
      answer: "start()",
    },
    {
      question: "Which Java version introduced lambda expression?",
      options: ["Java 5", "Java 6", "Java 7", "Java 8"],
      answer: "Java 8",
    },
    {
      question: "Which keyword is used for abstraction?",
      options: ["abstract", "interface", "Both A and B", "None"],
      answer: "Both A and B",
    },
    {
      question: "Which stream is used to read data?",
      options: ["OutputStream", "InputStream", "FileWriter", "PrintStream"],
      answer: "InputStream",
    },
    {
      question: "Which class is used for file handling?",
      options: ["Scanner", "File", "System", "Math"],
      answer: "File",
    },
    {
      question: "Which memory area stores objects?",
      options: ["Stack", "Heap", "Method Area", "Register"],
      answer: "Heap",
    },
    {
      question: "Which keyword is used to stop method overriding?",
      options: ["static", "final", "private", "protected"],
      answer: "final",
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
          sessionStorage.setItem("javaScore", score);
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

  const currentQuestion = javaQuestions[currentIndex];

  const handleOptionClick = (option) => {
    if (selectedOption) return;
    setSelectedOption(option);

    const isCorrect = option === currentQuestion.answer;
    if (isCorrect) setScore((prev) => prev + 1);

    setAnswers((prev) => [
      ...prev,
      {
        question: currentQuestion.question,
        correct: currentQuestion.answer,
        selected: option,
        isCorrect,
      },
    ]);
  };

  const handleNext = () => {
    setSelectedOption(answers[currentIndex + 1]?.selected || null);

    if (currentIndex + 1 < javaQuestions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowResult(true);
      sessionStorage.setItem("javaScore", score);
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
    const percentage = Math.round((score / javaQuestions.length) * 100);

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-extrabold text-center mb-6">
            Java Quiz Result
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-800 p-4 rounded-xl text-center">
              <p className="text-gray-400">Total</p>
              <p className="text-2xl font-bold">{javaQuestions.length}</p>
            </div>
            <div className="bg-green-700 p-4 rounded-xl text-center">
              <p>Correct</p>
              <p className="text-2xl font-bold">{score}</p>
            </div>
            <div className="bg-red-700 p-4 rounded-xl text-center">
              <p>Wrong</p>
              <p className="text-2xl font-bold">
                {javaQuestions.length - score}
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

  const progress = ((currentIndex + 1) / javaQuestions.length) * 100;

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
          Question {currentIndex + 1} of {javaQuestions.length}
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
              {currentIndex + 1 === javaQuestions.length
                ? "Finish Quiz"
                : "Next "}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Java;
