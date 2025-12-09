import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "https://todo-list-mda1.onrender.com/todos"; // tu backend desplegado

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  // Cargar tareas al iniciar
  useEffect(() => {
    cargarTareas();
  }, []);

  const cargarTareas = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("No se pudo cargar las tareas");
      const data = await res.json();
      setTodos(data);
      setError("");
    } catch (err) {
      setError("❌ Error cargando tareas: " + err.message);
      console.error("❌ Error cargando tareas:", err);
    }
  };

  const agregarTarea = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "No se pudo agregar la tarea");
      }

      const data = await res.json();
      console.log("Respuesta POST:", data);
      setTitle("");
      setError("");
      cargarTareas();
    } catch (err) {
      setError("❌ Error agregando tarea: " + err.message);
      console.error("❌ Error agregando tarea:", err);
    }
  };

  const actualizarTarea = async (id, completed) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed }),
      });
      cargarTareas(); // refresca la lista
    } catch (err) {
      console.error("❌ Error actualizando tarea:", err);
    }
  };

  const eliminarTarea = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      cargarTareas(); // refresca la lista
    } catch (err) {
      console.error("❌ Error eliminando tarea:", err);
    }
  };

  return (
    <div className="container">
      <h1>Todo List</h1>

      {error && (
        <div style={{ color: "red", marginBottom: "1em" }}>{error}</div>
      )}

      <form onSubmit={agregarTarea}>
        <input
          type="text"
          placeholder="Nueva tarea..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Agregar</button>
      </form>

      <ul>
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
            <button onClick={() => eliminarTarea(todo.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
