import { useEffect, useState } from "react";
import "./App.css";

// URL base del backend (sin /todos)
const apiBase = "https://todo-list-mda1.onrender.com";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    cargarTareas();
  }, []);

  function cargarTareas() {
    fetch(`${apiBase}/todos`)
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error("❌ Error cargando tareas:", err));
  }

  function agregarTarea(e) {
    e.preventDefault();
    if (!title.trim()) return;

    fetch(`${apiBase}/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    })
      .then((res) => res.json())
      .then(() => {
        setTitle("");
        cargarTareas();
      })
      .catch((err) => console.error("❌ Error agregando tarea:", err));
  }

  function actualizarTarea(id, completed) {
    fetch(`${apiBase}/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed }),
    })
      .then(() => cargarTareas())
      .catch((err) => console.error("❌ Error actualizando tarea:", err));
  }

  function eliminarTarea(id) {
    fetch(`${apiBase}/todos/${id}`, {
      method: "DELETE",
    })
      .then(() => cargarTareas())
      .catch((err) => console.error("❌ Error eliminando tarea:", err));
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
              onChange={(e) => actualizarTarea(todo.id, e.target.checked)}
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
