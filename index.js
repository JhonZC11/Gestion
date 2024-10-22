
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');


const sqlite3 = require('sqlite3').verbose();

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
  const {  nombre,  telefono } = req.body;
  // SQL para insertar
  const sql = `INSERT INTO clientes ( nombre,  telefono ) VALUES (?, ?)`;
  db.run(sql, [ nombre,  telefono ], function(err) {
      if (err) {
          return res.status(500).json({ message: 'Error al insertar los datos' });
      }
      res.json({ message: 'Registro insertado exitosamente' });
  });
});



//Productos
app.post('/insertP', (req, res) => {
    const {  descripcion, unidadMedida, valorUnidad, stock } = req.body;
    // SQL para insertar
    const sql = `INSERT INTO productos ( descripcion, unidadMedida, valorUnitario, stock ) VALUES (?, ?, ?, ?)`;
    db.run(sql, [ descripcion, unidadMedida, valorUnidad, stock ], function(err) {
        if (err) {
            return res.status(500).json({ message: 'Error al insertar los datos' });
        }
        res.json({ message: 'Registro insertado exitosamente' });
    });
});



app.get('/productos', (req, res) => {
    const page = parseInt(req.query.page) || 1; // Número de página, por defecto 1
    const limit = 10; // Máximo de registros por página
    const offset = (page - 1) * limit; // Offset para la consulta

    const sql = `SELECT * FROM productos LIMIT ? OFFSET ?`;
    db.all(sql, [limit, offset], (err, rows) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener los datos' });
        }
        res.json(rows);
    });
});

// Asegúrate de tener algo como esto en tu servidor
app.get('/productos/:id', (req, res) => {
    const identificacion = req.params.id;
    const sql = `SELECT * FROM productos WHERE id = ?`;
    db.get(sql, [identificacion], (err, cliente) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener los datos del cliente' });
        }
        res.json(cliente);
    });
});




// Endpoint para actualizar un registro
app.put('/actualizar', (req, res) => {
    const { descripcion, unidadMedida, valorUnitario, stock, identificacion  } = req.body;
    const sql = `UPDATE productos SET descripcion=?, unidadMedida=?, valorUnitario=?, stock=? WHERE id = ?`;
    db.run(sql, [descripcion, unidadMedida, valorUnitario, stock, identificacion], function(err) {
        if (err) {
            return res.status(500).json({ message: 'Error al actualizar los datos' });
        }
        res.json({ message: 'Registro actualizado exitosamente' });
    });
});








/* Endpoint para eliminar un registro
app.delete('/eliminar/:identificacion', (req, res) => {
    const { identificacion } = req.params;
  
    const sql = `DELETE FROM productos WHERE id = ?`;
    db.run(sql, identificacion, function(err) {
        if (err) {
            return res.status(500).json({ message: 'Error al eliminar los datos' });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Registro no encontrado' });
        }
        res.json({ message: 'Registro eliminado exitosamente' });
    });
  });*/
  
  






















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
    const sql = `SELECT * FROM clientes WHERE id = ?`;
    db.get(sql, [identificacion], (err, cliente) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener los datos del cliente' });
        }
        res.json(cliente);
    });
});


















// Endpoint para actualizar un registro
app.put('/actualizar', (req, res) => {
    const { identificacion,  nombres,  telefono,  } = req.body;
    const sql = `UPDATE clientes SET nombre = ?,  telefono = ? WHERE id = ?`;
    db.run(sql, [nombres, telefono, identificacion], function(err) {
        if (err) {
            return res.status(500).json({ message: 'Error al actualizar los datos' });
        }
        res.json({ message: 'Registro actualizado exitosamente' });
    });
});









// Endpoint para eliminar un registro
app.delete('/eliminar/:identificacion', (req, res) => {
  const { identificacion } = req.params;

  const sql = `DELETE FROM clientes WHERE id = ?`;
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
