
const db = require('../db/database')

const controllerVenta = {
    // Endpoint para insertar un producto
    insertVenta: (req, res) => {
        const { descripcion, unidadMedida, valorUnidad, stock } = req.body;
        const sql = `INSERT INTO productos (descripcion, unidadMedida, valorUnitario, stock) VALUES (?, ?, ?, ?)`;
        db.run(sql, [descripcion, unidadMedida, valorUnidad, stock], function (err) {
            if (err) {
                return res.status(500).json({ message: 'Error al insertar los datos', error: err.message });
            }
            res.json({ message: 'Registro insertado exitosamente' });
        });
    }
}

module.exports = controllerVenta;