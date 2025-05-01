import { useState } from "react";
import "./todo.css";

export default function Todofunc() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, task]);
      setTask("");
    }
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="todo">
      <h2>ToDo Lista</h2>
      <div className="input-group">
        <input
          type="text"
          placeholder="Új feladat..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={addTask}>+</button>
      </div>

      <ul>
        {tasks.map((t, index) => (
          <li key={index}>
            {t}
            <button onClick={() => removeTask(index)}>🗑</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
