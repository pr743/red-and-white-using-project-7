import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const saveUser = JSON.parse(localStorage.getItem("user"));

    if (!saveUser) {
      setTimeout(() => {
        setMessage("No user found! Please signup first.");
      }, 1500);

      return;
    }

    if (saveUser.email === email && saveUser.password === password) {
      localStorage.setItem("isLoggedIn", true);

      setTimeout(() => {
        setMessage(" Login successful! Redirecting to dashboard...");
      }, 1500);

      navigate("/dashboard");
    } else {
      setTimeout(() => {
        setMessage("Invalid email or password");
      }, 1500);
    }
  };
  return (
    <>
      <div className="min-h-screen flex items-center justify-center  bg-gradient-to-br from-green-600 via-indigo-600 to-purple-700 animate-fadeIn ">
        <div className="w-full max-w-md bg-white p-8  rounded-2xl shadow-xl  transform transition duration-500 hover:scale-105">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 animate-fadeInDown">
            Login
          </h1>

          <p className="mb-4 text-center text-sm font-semibold text-blue-600 bg-blue-100 p-2 rounded-lg animate-fadeInUp">
            {message}
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            <input
              className="w-full p-3 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transform transition duration-300 hover:scale-105"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              className="w-full p-3 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transform transition duration-300 hover:scale-105"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold shadow-md transform transition duration-300 hover:scale-105 hover:bg-blue-700"
            >
              Login
            </button>

            <p className="mt-4 text-center text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/"
                className="text-blue-800 font-semibold hover:underline"
              >
                Signup
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
