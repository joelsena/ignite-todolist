import { useState } from "react";

import "../styles/tasklist.scss";

import { FiTrash, FiCheckSquare } from "react-icons/fi";

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  function createRandomId(min: number, max: number, nChar: number) {
    let id = "";
    const nMin = Math.ceil(min);
    const nMax = Math.ceil(max);

    for (let i = 0; i < nChar; i++) {
      id += Math.floor(Math.random() * (nMax - nMin)) + nMin;
    }
    return Number(id);
  }

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if (!newTaskTitle) {
      return;
    }

    const newTask = {
      id: createRandomId(0, 10, 20),
      title: newTaskTitle,
      isComplete: false,
    };

    setTasks((prev) => [...prev, newTask]);
    setNewTaskTitle("");
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    setTasks((prev) => {
      const newTasks = prev.map((task) => ({
        ...task,
        isComplete: task.id === id ? !task.isComplete : task.isComplete,
      }));
      return newTasks;
    });
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}
            disabled={!newTaskTitle ? true : false}
          >
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div
                className={task.isComplete ? "completed" : ""}
                data-testid="task"
              >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button
                type="button"
                data-testid="remove-task-button"
                onClick={() => handleRemoveTask(task.id)}
              >
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}
