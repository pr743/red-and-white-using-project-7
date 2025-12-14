import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      
     
      <div className="flex justify-between items-center p-6 bg-black/40">
        <h1 className="text-2xl font-bold">
        {user?.name} 
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>

      
      <div className="flex justify-center mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-[90%] max-w-5xl">

         
          <div className="bg-gradient-to-br from-orange-500 to-red-500 p-6 rounded-2xl shadow-xl hover:scale-105 transition">
            <h2 className="text-2xl font-bold mb-2">Java Quiz</h2>
            <p className="text-sm mb-4">
              Test your Java fundamentals & OOP concepts.
            </p>
            <button
              onClick={() => navigate("/quiz/java")}
              className="bg-white text-black px-4 py-2 rounded font-semibold"
            >
              Start Quiz
            </button>
          </div>

          
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-6 rounded-2xl shadow-xl hover:scale-105 transition">
            <h2 className="text-2xl font-bold mb-2">C++ Quiz</h2>
            <p className="text-sm mb-4">
              Check your C++ logic, STL & OOP skills.
            </p>
            <button
              onClick={() => navigate("/quiz/cpp")}
              className="bg-white text-black px-4 py-2 rounded font-semibold"
            >
              Start Quiz
            </button>
          </div>

          
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-2xl shadow-xl hover:scale-105 transition">
            <h2 className="text-2xl font-bold mb-2">Python Quiz</h2>
            <p className="text-sm mb-4">
              Practice Python basics & logic building.
            </p>
            <button
              onClick={() => navigate("/quiz/python")}
              className="bg-white text-black px-4 py-2 rounded font-semibold"
            >
              Start Quiz
            </button>
          </div>


          <div className="bg-gradient-to-br from-orange-500 to-emerald-600 p-6 rounded-2xl shadow-xl hover:scale-105 transition">
            <h2 className="text-2xl font-bold mb-2">Mysql Quiz</h2>
            <p className="text-sm mb-4">
              Practice Mysql basics & logic building.
            </p>
            <button
              onClick={() => navigate("/quiz/mysql")}
              className="bg-white text-black px-4 py-2 rounded font-semibold"
            >
              Start Quiz
            </button>
          </div>



           <div className="bg-gradient-to-br from-purple-500 to-emerald-600 p-6 rounded-2xl shadow-xl hover:scale-105 transition">
            <h2 className="text-2xl font-bold mb-2">ReactJS Quiz</h2>
            <p className="text-sm mb-4">
              Practice ReactJS basics & logic building.
            </p>
            <button
              onClick={() => navigate("/quiz/reactjs")}
              className="bg-white text-black px-4 py-2 rounded font-semibold"
            >
              Start Quiz
            </button>
          </div>

           <div className="bg-gradient-to-br from-indigo-500 to-emerald-600 p-6 rounded-2xl shadow-xl hover:scale-105 transition">
            <h2 className="text-2xl font-bold mb-2">javaScript  Quiz</h2>
            <p className="text-sm mb-4">
              Practice javaScript basics & logic building.
            </p>
            <button
              onClick={() => navigate("/quiz/javascript")}
              className="bg-white text-black px-4 py-2 rounded font-semibold"
            >
              Start Quiz
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;
