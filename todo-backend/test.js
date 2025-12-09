const connection = require("./db");

async function testInsert() {
  try {
    const [result] = await connection.query(
      "INSERT INTO todos (title, completed) VALUES (?, 0)",
      ["Tarea de prueba"]
    );
    console.log("✅ Insert exitoso:", result.insertId);
  } catch (err) {
    console.error("❌ Error insertando:", err);
  }
}

testInsert();
