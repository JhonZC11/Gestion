
const db = require('../db/database')

const controllerProductos = {
    // Endpoint para insertar un producto
    insertProducto: (req, res) => {
        const { descripcion, unidadMedida, valorUnidad, stock } = req.body;
        const sql = `INSERT INTO productos (descripcion, unidadMedida, valorUnitario, stock) VALUES (?, ?, ?, ?)`;
        db.run(sql, [descripcion, unidadMedida, valorUnidad, stock], function (err) {
            if (err) {
                return res.status(500).json({ message: 'Error al insertar los datos', error: err.message });
            }
            res.json({ message: 'Registro insertado exitosamente' });
        });
    },
    // Endpoint para actualizar un producto
    updateProducto: (req, res) => {
        const { descripcion, unidadMedida, valorUnidad, stock, id } = req.body;
        const sql = `UPDATE productos SET descripcion = ?, unidadMedida = ?, valorUnitario = ?, stock = ? WHERE id = ?`;
        db.run(sql, [descripcion, unidadMedida, valorUnidad, stock, id], function (err) {
            if (err) {
                return res.status(500).json({ message: 'Error al actualizar los datos', error: err.message });
            }
            res.json({ message: 'Registro actualizado exitosamente' });
        });
    },

    // Endpoint para eliminar un producto
    deleteProducto: (req, res) => {
        const { id } = req.body;
        const sql = `DELETE FROM productos WHERE id = ?`;
        db.run(sql, [id], function (err) {
            if (err) {
                return res.status(500).json({ message: 'Error al eliminar el registro', error: err.message });
            }
            res.json({ message: 'Registro eliminado exitosamente' });
        });
    },

    // Endpoint para obtener todos los productos
    getProductos: (req, res) => {
        const sql = `SELECT * FROM productos`;
        db.all(sql, [], (err, rows) => {
            if (err) {
                return res.status(500).json({ message: 'Error al obtener los productos', error: err.message });
            }
            res.json(rows);
        });
    },

    // Endpoint para obtener un producto por su ID
    getProductoById: (req, res) => {
        const { id } = req.params;
        const sql = `SELECT * FROM productos WHERE id = ?`;
        db.get(sql, [id], (err, row) => {
            if (err) {
                return res.status(500).json({ message: 'Error al obtener el producto', error: err.message });
            }
            res.json(row);
        });
    }
}
module.exports = controllerProductos;
