
const db = require('../db/database')

const controllerVenta = {
    // Endpoint para insertar un producto
    insertVenta: (req, res) => {
        const { id_producto, cliente, cantidad, totalPurchase } = req.body;
        console.log('ID Productos:', id_producto);
        console.log('Cliente:', cliente);
        console.log('Cantidad:', cantidad);
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
            console.log('Último ID obtenido:', lastID);
            insertFactura(lastID)
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
    }
}
module.exports = controllerVenta;