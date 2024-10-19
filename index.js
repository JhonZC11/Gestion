
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');


const sqlite3 = require('sqlite3').verbose();
let currentPage =1
// Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // Servir archivos estáticos desde la carpeta 'public'

// Conectar a la base de datos SQLite
const db = new sqlite3.Database('db/Gestion.db');

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Endpoint para insertar datos
app.post('/insertar', (req, res) => {
  const { cedula, nombres, apellidos, telefono, direccion } = req.body;

  // SQL para insertar
  const sql = `INSERT INTO clientes (identificacion, nombres, apellidos, telefono, direccion) VALUES (?, ?, ?, ?, ?)`;
  db.run(sql, [cedula, nombres, apellidos, telefono, direccion], function(err) {
      if (err) {
          return res.status(500).json({ message: 'Error al insertar los datos' });
      }
      res.json({ message: 'Registro insertado exitosamente' });
  });
});






// Endpoint para obtener todos los registros
// Endpoint para obtener registros con paginación
app.get('/clientes', (req, res) => {
    const page = parseInt(req.query.page) || 1; // Número de página, por defecto 1
    const limit = 10; // Máximo de registros por página
    const offset = (page - 1) * limit; // Offset para la consulta

    const sql = `SELECT * FROM clientes LIMIT ? OFFSET ?`;
    db.all(sql, [limit, offset], (err, rows) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener los datos' });
        }
        res.json(rows);
    });
});

// Asegúrate de tener algo como esto en tu servidor
app.get('/clientes/:id', (req, res) => {
    const identificacion = req.params.id;
    const sql = `SELECT * FROM clientes WHERE identificacion = ?`;
    db.get(sql, [identificacion], (err, cliente) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener los datos del cliente' });
        }
        res.json(cliente);
    });
});


















// Endpoint para actualizar un registro
app.put('/actualizar', (req, res) => {
    const { identificacion, cedula, nombres, apellidos, telefono, direccion } = req.body;
    const sql = `UPDATE clientes SET identificacion = ?, nombres = ?, apellidos = ?, telefono = ?, direccion = ? WHERE identificacion = ?`;
    db.run(sql, [cedula, nombres, apellidos, telefono, direccion, identificacion], function(err) {
        if (err) {
            return res.status(500).json({ message: 'Error al actualizar los datos' });
        }
        res.json({ message: 'Registro actualizado exitosamente' });
    });
});













// Endpoint para eliminar un registro
app.delete('/eliminar/:identificacion', (req, res) => {
  const { identificacion } = req.params;

  const sql = `DELETE FROM clientes WHERE identificacion = ?`;
  db.run(sql, identificacion, function(err) {
      if (err) {
          return res.status(500).json({ message: 'Error al eliminar los datos' });
      }
      if (this.changes === 0) {
          return res.status(404).json({ message: 'Registro no encontrado' });
      }
      res.json({ message: 'Registro eliminado exitosamente' });
  });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
