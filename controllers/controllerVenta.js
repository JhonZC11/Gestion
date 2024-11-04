
const db = require('../db/database')

const controllerVenta = {
    // Endpoint para insertar un producto
    insertVenta: (req, res) => {
        const { id_producto, cliente, cantidad, totalPurchase } = req.body;
        console.log('ID Productos:', id_producto);
        console.log('Cliente:', cliente);
        console.log('Cantidad:', cantidad);
        const formCantidad = cantidad;
        console.log(formCantidad)
        console.log('Total Purchase:', totalPurchase);
        // Inserta la venta y obtén el ID de la venta insertada
        const sqlDetalle = `INSERT INTO detalleVenta (id_productos, cantidad) VALUES (?, ?)`;
        const stmt = db.prepare(sqlDetalle);
        id_producto.forEach((productoID, index) => {
            const cantidadProducto = cantidad[index];
            stmt.run( productoID, cantidadProducto, (err) => {
                if (err) {
                    console.error('Error al insertar detalle:', err);
                }
            });
        });
        const sqlId = 'SELECT last_insert_rowid()';
        db.get(sqlId, (err, row) =>{ 
            const lastID = row['last_insert_rowid()']; // Asignar el valor del último ID
            //console.log('Último ID obtenido:', lastID);
            insertFactura(lastID)
            getCantidad(id_producto[0], formCantidad)
        })
        console.log()
        function insertFactura(lastId){
            const sqlVenta = `INSERT INTO facturasVenta (id_venta, cliente, valorTotal ) VALUES (?, ?, ?)`;
            db.run(sqlVenta, [lastId, cliente, totalPurchase], function(err) {
                if (err) {
                    return res.status(500).json({ message: 'Error al insertar la venta' });
                }
                
                stmt.finalize();
                res.json({ message: 'Venta y detalles registrados exitosamente' });
            });
        }
        function getCantidad(id, formCantidad) {
            const sql = `SELECT stock FROM productos WHERE id = ?`;
            db.get(sql, [id], (err, row) => { 
                if (err) {
                    console.error('Error al obtener stock:', err);
                    return;
                }
                
                if (row) {
                    const cantidadStock = row.stock;
                    console.log('Cantidad en stock:', cantidadStock);
                    updateStock(id, cantidadStock, formCantidad);  // Llamada a updateStock con los valores necesarios
                } else {
                    console.log('No se encontró el producto con el id especificado');
                }
            });
        }
        
        function updateStock(id, cantidadStock, formCantidad) {
            const newCantidad = cantidadStock - formCantidad;
            const sql = "UPDATE productos SET stock = ? WHERE id = ?";
            db.run(sql, [newCantidad, id], function(err) {  // Cambiado el orden de los parámetros
                if (err) {
                    console.error('Error al actualizar el stock:', err);
                    return;
                }
                console.log('Stock actualizado exitosamente');
            });
        }
        
    }
}
module.exports = controllerVenta;