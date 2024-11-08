function deleteProducto(id) {
    if (confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
        fetch(`/deleteP/${id}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            muestraMensajeDeleted() // Mostrar mensaje de respuesta del servidor
            loadProductos(); // Volver a cargar la lista de clientes
        })
        .catch((error) => {
            console.error('Error al eliminar el cliente:', error);
        });
    }
}
