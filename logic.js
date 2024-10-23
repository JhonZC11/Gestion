const db = require('./db/database.js');

// Crear una tabla de ejemplo llamada "usuarios"
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS clientes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      telefono TEXT NOT NULL
    )`, (err) => {
    if (err) {
      console.error('Error al crear la tabla:');
    } else {
      console.log('Tabla "usuarios" creada o ya existente');
    }
  });
});
db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS productos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        descripcion TEXT NOT NULL,
        unidadMedida TEXT NOT NULL, 
        valorUnitario FLOAT NOT NULL,
        stock FLOAT NOT NULL
    )`, (err) => {
      if (err) {
        console.error('Error al crear la tabla:', err.message);
      } else {
        console.log('Tabla "productos" creada o ya existente');
      }
    });
  });
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS facturasVenta (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        id_productos INTEGER NOT NULL,
        id_cliente INTEGER NOT NULL,
        unidadMedida TEXT NOT NULL, 
        valorUnitario FLOAT NOT NULL,
        fecha TIMESTAMP,
        valorTotal FLOAT NOT NULL,
        tipoPago TEXT NOT NULL,
        medioPago TEXT NOT NULL,
        foreign key(id_productos) references productos(id),
        foreign key(id_cliente) references clientes(id)
    )`, (err) => {
      if (err) {
        console.error('Error al crear la tabla:', err.message);
      } else {
        console.log('Tabla "faturasVentas" creada o ya existente');
      }
    });
  });
