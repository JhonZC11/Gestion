function deleteCliente(identificacion) {
    if (confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
        fetch(`/eliminar/${identificacion}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            muestraMensajeDeleted() // Mostrar mensaje de respuesta del servidor
            loadClientes(); // Volver a cargar la lista de clientes
        })
        .catch((error) => {
            console.error('Error al eliminar el cliente:', error);
        });
    }
}
