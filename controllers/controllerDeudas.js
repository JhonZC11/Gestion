const db = require('../db/database')

const controllerDeudas = {
    updateDeuda:(req, res) => {
        const { id,  valorNuevo } = req.body;
        const sql = `UPDATE facturasVenta SET valorTotal = ? WHERE id = ?`;
        db.run(sql, [ valorNuevo, id ], function(err) {
            if (err) {
                return res.status(500).json({ message: 'Error al actualizar los datos' });
            }
            res.json({ message: 'Registro actualizado exitosamente' });
        });
    },
    getDeudas:(req, res) => {    
        const sql = `SELECT fv.id, fv.id_venta, fv.cliente, fv.valorTotal, dv.id_productos, dv.fecha, dv.cantidad, p.descripcion AS nombre_producto, p.valorUnitario AS precio_producto FROM facturasVenta fv JOIN detalleVenta dv ON fv.id_venta = dv.id JOIN productos p ON dv.id_productos = p.id WHERE fv.valorTotal > 0;`;
        db.all(sql, (err, rows) => {
            if (err) {
                return res.status(500).json({ message: 'Error al obtener los datos' });
            }
            res.json(rows);
            console.log(rows)
        });
    },
    getDeudaById:(req, res) => {
        const identificacion = req.params.id;
        const sql = `SELECT * FROM facturasVenta WHERE id = ?`;
        db.get(sql, [identificacion], (err, cliente) => {
            if (err) {
                return res.status(500).json({ message: 'Error al obtener los datos del cliente' });
            }
            res.json(cliente);
        });
    }
}

module.exports = controllerDeudas;