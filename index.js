
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

const controllerProductos = require('./controllers/controllerProductos');
const controllerClientes = require('./controllers/controllerClientes')

const sqlite3 = require('sqlite3').verbose();

// Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // Servir archivos estáticos desde la carpeta 'public'

// Conectar a la base de datos SQLite
const db = require('./db/database')

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});



// Rutas usando el objeto 'productosController'
app.post('/insertP', controllerProductos.insertProducto);
app.put('/updateP', controllerProductos.updateProducto);
app.delete('/deleteP', controllerProductos.deleteProducto);
app.get('/productos', controllerProductos.getProductos);
app.get('/productos/:id', controllerProductos.getProductoById);



//Rutas usando el objeto controllerClientes
app.post('/insertC', controllerClientes.insertCliente);
app.put('/updateC', controllerClientes.updateCliente);
app.get('/clientes', controllerClientes.getClientes);
app.get('/clientes/:id', controllerClientes.getClienteById);
app.delete('/deleteC/:id', controllerClientes.deleteCliente);




app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
