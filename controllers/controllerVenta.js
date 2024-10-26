
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
        const sqlVenta = `INSERT INTO facturasVenta (cliente, valorTotal) VALUES (?, ?)`;
        db.run(sqlVenta, [cliente, totalPurchase], function(err) {
            if (err) {
                return res.status(500).json({ message: 'Error al insertar la venta' });
            }
            console.log("Estoy aca")
            const id_venta = this.lastID;
            console.log("id venta: ", id_venta) // Obtén el ID de la venta recién insertada
            
            // Ahora inserta los detalles de la venta (producto y cantidad)
            const sqlDetalle = `INSERT INTO detalleVenta (id_venta, id_producto, cantidad) VALUES (?, ?, ?)`;
            const stmt = db.prepare(sqlDetalle);
    
            // Iterar sobre los arrays de productos y cantidades para insertar cada detalle
            id_producto.forEach((productoID, index) => {
                const cantidadProducto = cantidad[index];
                stmt.run(id_venta, productoID, cantidadProducto, (err) => {
                    if (err) {
                        console.error('Error al insertar detalle:', err);
                    }
                });
            });
    
            stmt.finalize();
            res.json({ message: 'Venta y detalles registrados exitosamente' });
        });
    }
}
module.exports = controllerVenta;