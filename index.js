const express = require('express');
const app = express();
const port = 3000;

// Configurar una ruta de ejemplo
app.get('/', (req, res) => {
  res.send('¡Hola, este es tu primer proyecto con Node.js!');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
