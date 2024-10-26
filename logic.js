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
        id_venta INTEGER NOT NULL,
        cliente TEXT NOT NULL, 
        valorTotal FLOAT NOT NULL,
        foreign key(id_venta) references detalleVenta(id)
    )`, (err) => {
      if (err) {
        console.error('Error al crear la tabla:', err.message);
      } else {
        console.log('Tabla "faturasVentas" creada o ya existente');
      }
    });
  });
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS detalleVenta (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        id_productos INTEGER NOT NULL,
        valorUnitario FLOAT NOT NULL,
        cliente TEXT NOT NULL, 
        cantidad FLOAT NOT NULL,
        fecha current_timestamp,
        foreign key(id_productos) references productos(id)
        foreign key(valorUnitario) references productos(valorUnitario)
    )`, (err) => {
      if (err) {
        console.error('Error al crear la tabla:', err.message);
      } else {
        console.log('Tabla "faturasVentas" creada o ya existente');
      }
    });
  });