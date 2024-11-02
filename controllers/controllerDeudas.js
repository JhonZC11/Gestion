const db = require('../db/database')

const controllerDeudas = {
    updateDeuda:(req, res) => {
        const { identificacion,  nombres,  telefono,  } = req.body;
        const sql = `UPDATE clientes SET nombre = ?,  telefono = ? WHERE id = ?`;
        db.run(sql, [ nombres, telefono,identificacion ], function(err) {
            if (err) {
                return res.status(500).json({ message: 'Error al actualizar los datos' });
            }
            res.json({ message: 'Registro actualizado exitosamente' });
        });
    },
    getDeudas:(req, res) => {    
        const sql = `SELECT cliente, valorTotal FROM facturasVenta WHERE valorTotal > 0;`;
        db.all(sql, (err, rows) => {
            if (err) {
                return res.status(500).json({ message: 'Error al obtener los datos' });
            }
            res.json(rows);
        });
    },
    getDeuda:(req, res) => {
        const identificacion = req.params.id;
        const sql = `SELECT * FROM clientes WHERE id = ?`;
        db.get(sql, [identificacion], (err, cliente) => {
            if (err) {
                return res.status(500).json({ message: 'Error al obtener los datos del cliente' });
            }
            res.json(cliente);
        });
    }
}

module.exports = controllerDeudas;