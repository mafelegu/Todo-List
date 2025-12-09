require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connection = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// --------------------------
//        RUTAS TODO
// --------------------------

// Obtener todas las tareas
app.get('/todos', (req, res) => {
  connection.query("SELECT * FROM todos", (err, results) => {
    if (err) {
      console.error("❌ Error al obtener tareas:", err);
      return res.status(500).json({ error: "Error al obtener tareas" });
    }
    res.json(results);
  });
});

// Crear nueva tarea
app.post('/todos', (req, res) => {
  const { title } = req.body;

  if (!title || title.trim() === '') {
    return res.status(400).json({ error: "El título es obligatorio" });
  }

  connection.query(
    "INSERT INTO todos (title, completed) VALUES (?, 0)",
    [title],
    (err, result) => {
      if (err) {
        console.error("❌ Error al crear tarea:", err);
        return res.status(500).json({ error: "Error al crear tarea" });
      }
      res.json({ id: result.insertId, title, completed: false });
    }
  );
});

// Actualizar tarea
app.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  connection.query(
    "UPDATE todos SET completed = ? WHERE id = ?",
    [completed ? 1 : 0, id],
    (err) => {
      if (err) {
        console.error("❌ Error al actualizar tarea:", err);
        return res.status(500).json({ error: "Error al actualizar tarea" });
      }
      res.json({ message: "Tarea actualizada" });
    }
  );
});

// Eliminar tarea
app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;

  connection.query(
    "DELETE FROM todos WHERE id = ?",
    [id],
    (err) => {
      if (err) {
        console.error("❌ Error al eliminar tarea:", err);
        return res.status(500).json({ error: "Error al eliminar tarea" });
      }
      res.json({ message: "Tarea eliminada" });
    }
  );
});

// --------------------------
//       INICIAR SERVIDOR
// --------------------------
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Servidor Todo List corriendo en http://localhost:${PORT}`);
});
