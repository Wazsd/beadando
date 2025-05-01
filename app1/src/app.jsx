import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import Calculator from "./Calculator.jsx";
import Todo from "./Todo.jsx";
import MemoryGame from "./memoryGame.jsx";

export default function App() {
  return (
    <div className="container">
      <h1>Mini React Projektek</h1>
      <nav>
        <ul>
          <li><Link to="/calculator">Kalkulátor</Link></li>

          <li><Link to="/todo">Todo Lista</Link></li>

          <li><Link to="/memoryGame">Memóriajáték</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/memoryGame" element={<MemoryGame />} />
      </Routes>

    </div>
  );
}
