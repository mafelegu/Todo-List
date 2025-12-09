# Todo List App - Backend

Este proyecto es el **backend de una aplicación Todo List** usando Node.js, Express y MySQL, desplegado en **Render** y conectado a una base de datos **Railway MySQL**.

---

## 🚀 Requisitos

- Node.js >= 16
- npm
- Base de datos MySQL en Railway
- Cuenta en Render para desplegar el backend

---

## ⚙️ Instalación local

1. Clona el repositorio:

```bash
git clone https://github.com/tu-usuario/todo-backend.git
cd todo-backend
npm install
DB_HOST=tu_host_railway
DB_USER=tu_usuario_railway
DB_PASSWORD=tu_contraseña_railway
DB_NAME=tu_base_de_datos
DB_PORT=3306
PORT=3001
npm start
🌐 Despliegue en Render

Crea un nuevo Web Service en Render.

Conecta tu repositorio de GitHub.

Configura Environment Variables:

DB_HOST=tu_host_railway
DB_USER=tu_usuario_railway
DB_PASSWORD=tu_contraseña_railway
DB_NAME=tu_base_de_datos
DB_PORT=3306
PORT=10000


Haz deploy y verifica los logs. Debe aparecer:

✅ Conexión exitosa a Railway MySQL


Usa la URL pública de Render en tu frontend React:

fetch("https://tu-backend.onrender.com/todos")

⚡ Tips

Asegúrate de que la tabla todos exista:

CREATE TABLE IF NOT EXISTS todos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  completed TINYINT(1) DEFAULT 0
);


Siempre enviar POST con un objeto { title: "nombre tarea" } y no un array de tareas.

¡Listo! Tu backend ya debería funcionar tanto localmente como en Render conectado a Railway MySQL.


---

Si quieres, puedo hacer **una versión aún más corta y visual**, tipo “README de 1 minuto de lectura” lista para tu repo.  

¿Quieres que haga esa versión?