import { useEffect, useState } from "react";
import "./App.css";

const apiUrl = process.env.REACT_APP_API_URL;

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    cargarTareas();
  }, []);

  function cargarTareas() {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }

  function agregarTarea(e) {
    e.preventDefault();
    if (!title.trim()) return;

    fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    })
      .then((res) => res.json())
      .then(() => {
        setTitle("");
        cargarTareas();
      });
  }

  function actualizarTarea(id, completed) {
    fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed }),
    }).then(() => cargarTareas());
  }

  function eliminarTarea(id) {
    fetch(`${apiUrl}/${id}`, {
      method: "DELETE",
    }).then(() => cargarTareas());
  }

  return (
    <div className="container">
      <h1>Todo List</h1>

      <form id="todo-form" onSubmit={agregarTarea}>
        <input
          id="todo-input"
          type="text"
          placeholder="Nueva tarea..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Agregar</button>
      </form>

      <ul id="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <input
              type="checkbox"
              checked={todo.completed === 1}
              onChange={(e) =>
                actualizarTarea(todo.id, e.target.checked)
              }
            />

            <span className={todo.completed === 1 ? "completed" : ""}>
              {todo.title}
            </span>

            <button
              className="delete-btn"
              onClick={() => eliminarTarea(todo.id)}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
