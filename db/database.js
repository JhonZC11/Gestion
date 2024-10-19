const sqlite3 = require('sqlite3').verbose();

// Conectar a la base de datos (o crearla si no existe)
const db = new sqlite3.Database('Gestion.db', (err) => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err.message);
  } else {
    console.log('Conectado a la base de datos SQLite');
  }
});

// Exportar la conexión para usarla en otros archivos
module.exports = db;