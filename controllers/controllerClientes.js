const db = require('../db/database')

const controllerClientes = {
    insertCliente:(req, res) => {
        const {  nombre,  telefono } = req.body;
        // SQL para insertar
        const sql = `INSERT INTO clientes ( nombre,  telefono ) VALUES (?, ?)`;
        db.run(sql, [ nombre,  telefono ], function(err) {
            if (err) {
                return res.status(500).json({ message: 'Error al insertar los datos' });
            }
            res.json({ message: 'Registro insertado exitosamente' });
        });
    },
    updateCliente:(req, res) => {
        const { identificacion,  nombres,  telefono,  } = req.body;
        const sql = `UPDATE clientes SET nombre = ?,  telefono = ? WHERE id = ?`;
        db.run(sql, [ nombres, telefono,identificacion ], function(err) {
            if (err) {
                return res.status(500).json({ message: 'Error al actualizar los datos' });
            }
            res.json({ message: 'Registro actualizado exitosamente' });
        });
    },
    deleteCliente:(req, res) => {
        const { id } = req.params;
        const sql = `DELETE FROM clientes WHERE id = ?`;
        db.run(sql, id, function(err) {
            if (err) {
                return res.status(500).json({ message: 'Error al eliminar los datos' });
            }
            if (this.changes === 0) {
                return res.status(404).json({ message: 'Registro no encontrado' });
            }
            res.json({ message: 'Registro eliminado exitosamente' });
        });
    },
    getClientes:(req, res) => {
        const page = parseInt(req.query.page) || 1; // Número de página, por defecto 1
        const limit = 10; // Máximo de registros por página
        const offset = (page - 1) * limit; // Offset para la consulta
    
        const sql = `SELECT * FROM clientes LIMIT ? OFFSET ?`;
        db.all(sql, [limit, offset], (err, rows) => {
            if (err) {
                return res.status(500).json({ message: 'Error al obtener los datos' });
            }
            res.json(rows);
        });
    },
    getClienteById:(req, res) => {
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

module.exports = controllerClientes;