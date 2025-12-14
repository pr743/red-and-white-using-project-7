import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './Page/Signup';
import Login from './Page/Login';
import Dashboard from './Page/Dashboard';
import Java from './Page/Java';
import CPP from './Page/CPP';
import Python from './Page/Python';
import MYsql from './Page/Mysql ';
import ReactJS from './Page/ReactJS';
import JavaScript from './Page/javaScript ';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/quiz/java" element={<Java />} />
         <Route path="/quiz/cpp" element={<CPP />} />
          <Route path="/quiz/python" element={<Python />} />
          <Route path="/quiz/mysql" element={<MYsql />} />
          <Route path="/quiz/ReactJs" element={<ReactJS />} />
           <Route path="/quiz/javaScript" element={<JavaScript />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;





