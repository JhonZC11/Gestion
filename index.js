
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

const controllerProductos = require('./controllers/controllerProductos');
const controllerClientes = require('./controllers/controllerClientes')
const controllerVenta = require('./controllers/controllerVenta.js');

const sqlite3 = require('sqlite3').verbose();

// Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // Servir archivos estáticos desde la carpeta 'public'

// Conectar a la base de datos SQLite
const db = require('./db/database');
const controllerDeudas = require('./controllers/controllerDeudas.js');

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});



// Rutas usando el objeto 'productosController'
app.post('/insertP', controllerProductos.insertProducto);
app.put('/updateP', controllerProductos.updateProducto);
app.get('/productos', controllerProductos.getProductos);
app.get('/productos/:id', controllerProductos.getProductoById);
app.delete('/deleteP/:id', controllerProductos.deleteProducto);



//Rutas usando el objeto controllerClientes
app.post('/insertC', controllerClientes.insertCliente);
app.put('/updateC', controllerClientes.updateCliente);
app.get('/clientes', controllerClientes.getClientes);
app.get('/clientes/:id', controllerClientes.getClienteById);
app.delete('/deleteC/:id', controllerClientes.deleteCliente);


//Rutas usando el objeto controllerVenta
app.post('/insertV', controllerVenta.insertVenta);

app.put('/updateD', controllerDeudas.updateDeuda);
app.get('/deudas', controllerDeudas.getDeudas)
app.get('/deudas/:id', controllerDeudas.getDeudaById)


app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
