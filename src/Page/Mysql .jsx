import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function MYsql() {
    const MYsqlQuestions = [
  {
    question: "Which SQL statement is used to extract data from a database?",
    options: ["GET", "SELECT", "EXTRACT", "OPEN"],
    answer: "SELECT",
  },
  {
    question: "Which SQL clause is used to filter records?",
    options: ["WHERE", "ORDER BY", "GROUP BY", "HAVING"],
    answer: "WHERE",
  },
  {
    question: "Which command is used to remove a table from a database?",
    options: ["DROP TABLE", "DELETE TABLE", "REMOVE TABLE", "TRUNCATE TABLE"],
    answer: "DROP TABLE",
  },
  {
    question: "Which SQL keyword is used to sort the result-set?",
    options: ["ORDER BY", "SORT BY", "GROUP BY", "ARRANGE BY"],
    answer: "ORDER BY",
  },
  {
    question: "Which command is used to delete all records in a table but not the table?",
    options: ["DELETE", "DROP", "TRUNCATE", "REMOVE"],
    answer: "TRUNCATE",
  },
  {
    question: "Which function is used to count the number of rows in a table?",
    options: ["COUNT()", "SUM()", "TOTAL()", "ROWCOUNT()"],
    answer: "COUNT()",
  },
  {
    question: "Which SQL clause is used with aggregate functions to group the result-set?",
    options: ["GROUP BY", "ORDER BY", "HAVING", "WHERE"],
    answer: "GROUP BY",
  },
  {
    question: "Which command is used to add a new row into a table?",
    options: ["INSERT INTO", "ADD ROW", "UPDATE", "CREATE ROW"],
    answer: "INSERT INTO",
  },
  {
    question: "Which SQL statement is used to modify existing data in a table?",
    options: ["MODIFY", "UPDATE", "CHANGE", "SET"],
    answer: "UPDATE",
  },
  {
    question: "Which SQL statement is used to remove records from a table?",
    options: ["DELETE", "DROP", "TRUNCATE", "REMOVE"],
    answer: "DELETE",
  },
  {
    question: "Which SQL keyword is used to return only distinct values?",
    options: ["DISTINCT", "UNIQUE", "DIFFERENT", "ONLY"],
    answer: "DISTINCT",
  },
  {
    question: "Which SQL clause is used to filter groups based on aggregate values?",
    options: ["HAVING", "WHERE", "GROUP BY", "ORDER BY"],
    answer: "HAVING",
  },
  {
    question: "Which operator is used for pattern matching in SQL?",
    options: ["LIKE", "MATCH", "SIMILAR", "PATTERN"],
    answer: "LIKE",
  },
  {
    question: "Which SQL command is used to create a new database?",
    options: ["CREATE DATABASE", "NEW DATABASE", "MAKE DATABASE", "ADD DATABASE"],
    answer: "CREATE DATABASE",
  },
  {
    question: "Which SQL constraint ensures that a column cannot have NULL values?",
    options: ["NOT NULL", "UNIQUE", "PRIMARY KEY", "CHECK"],
    answer: "NOT NULL",
  },
  {
    question: "Which keyword is used to combine rows from two tables based on a related column?",
    options: ["JOIN", "MERGE", "UNION", "LINK"],
    answer: "JOIN",
  },
  {
    question: "Which JOIN returns all rows from the left table and matching rows from the right table?",
    options: ["LEFT JOIN", "RIGHT JOIN", "INNER JOIN", "FULL JOIN"],
    answer: "LEFT JOIN",
  },
  {
    question: "Which JOIN returns only matching rows from both tables?",
    options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL JOIN"],
    answer: "INNER JOIN",
  },
  {
    question: "Which SQL function returns the largest value of a column?",
    options: ["MAX()", "MIN()", "TOP()", "LARGEST()"],
    answer: "MAX()",
  },
  {
    question: "Which SQL function returns the smallest value of a column?",
    options: ["MIN()", "MAX()", "LEAST()", "SMALL()"],
    answer: "MIN()",
  },
  {
    question: "Which SQL keyword is used to remove duplicate rows in a query?",
    options: ["DISTINCT", "UNIQUE", "SEPARATE", "FILTER"],
    answer: "DISTINCT",
  },
  {
    question: "Which SQL statement is used to modify the structure of a table?",
    options: ["ALTER TABLE", "MODIFY TABLE", "UPDATE TABLE", "CHANGE TABLE"],
    answer: "ALTER TABLE",
  },
  {
    question: "Which SQL constraint uniquely identifies each row in a table?",
    options: ["PRIMARY KEY", "UNIQUE", "FOREIGN KEY", "CHECK"],
    answer: "PRIMARY KEY",
  },
  {
    question: "Which SQL constraint ensures that a value exists in another table's column?",
    options: ["FOREIGN KEY", "CHECK", "UNIQUE", "PRIMARY KEY"],
    answer: "FOREIGN KEY",
  },
  {
    question: "Which SQL command is used to save changes made in a transaction?",
    options: ["COMMIT", "ROLLBACK", "SAVE", "END TRANSACTION"],
    answer: "COMMIT",
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
          sessionStorage.setItem("MYsqlScore", score);
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

  const currentQuestion = MYsqlQuestions[currentIndex];

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
    if (currentIndex + 1 < MYsqlQuestions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowResult(true);
      sessionStorage.setItem("MYsqlScore", score);
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
    const percentage = Math.round((score / MYsqlQuestions.length) * 100);

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-extrabold text-center mb-6">
            CPP Quiz Result
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-800 p-4 rounded-xl text-center">
              <p className="text-gray-400">Total</p>
              <p className="text-2xl font-bold">{MYsqlQuestions.length}</p>
            </div>
            <div className="bg-green-700 p-4 rounded-xl text-center">
              <p>Correct</p>
              <p className="text-2xl font-bold">{score}</p>
            </div>
            <div className="bg-red-700 p-4 rounded-xl text-center">
              <p>Wrong</p>
              <p className="text-2xl font-bold">
                {MYsqlQuestions.length - score}
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

  const progress = ((currentIndex + 1) / MYsqlQuestions.length) * 100;

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
          Question {currentIndex + 1} of {MYsqlQuestions.length}
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
              {currentIndex + 1 === MYsqlQuestions.length
                ? "Finish Quiz"
                : "Next "}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MYsql;
