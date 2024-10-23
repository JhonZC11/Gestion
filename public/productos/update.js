function editProducto(id) {
    // El fetch funciona, no tocar
    fetch(`/productos/${id}`)
        .then(response => response.json())
        .then(producto => {
            // Llenar el formulario con los datos del cliente
            document.getElementById('descripcionToUpdate').value = producto.descripcion;
            document.getElementById('unidadMedidaToUpdate').value = producto.unidadMedida;
            document.getElementById('valorUnidadToUpdate').value = producto.valorUnitario;
            document.getElementById('stockToUpdate').value = producto.stock;
            // Cambiar el texto del botón de envío del formulario
            const submitButton = document.getElementById('submit-button');
            submitButton.innerText = 'Actualizar';
            submitButton.onclick = function() {
                updateProducto(id); // Actualiza el cliente al enviar el formulario
            };
        })
        .catch((error) => {
            console.error('Error al cargar los datos del cliente:', error);
        });
}

function updateProducto(id) {
    const descripcion = document.getElementById('descripcionToUpdate').value;
    const unidadMedida =document.getElementById('unidadMedidaToUpdate').value;
    const valorUnitario = document.getElementById('valorUnidadToUpdate').value;
    const stock =  document.getElementById('stockToUpdate').value;

    fetch(`/updateP`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ descripcion, unidadMedida, valorUnitario, stock, id }) // Asegúrate de enviar 'identificacion'
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message); // Mostrar mensaje de respuesta del servidor
        document.getElementById('myFormUpdate').reset(); // Limpiar el formulario
        loadProductos(); // Volver a cargar la lista de clientes

        muestraMensajeUpdate(); // Mover aquí para mostrar el mensaje solo después de una actualización exitosa

        const submitButton = document.getElementById('submit-button');
        submitButton.innerText = 'Ingresar'; // Restablecer texto del botón
        submitButton.onclick = insertCliente; // Restablecer función de inserción
    })
    .catch((error) => {
        console.error('Error al actualizar el cliente:', error);
    });
}
