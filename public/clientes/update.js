function editCliente(identificacion) {
    // El fetch funciona, no tocar
    fetch(`/clientes/${identificacion}`)
        .then(response => response.json())
        .then(cliente => {
            // Llenar el formulario con los datos del cliente
            document.getElementById('nombresToUpdate').value = cliente.nombre;
            document.getElementById('telefonoToUpdate').value = cliente.telefono;

            // Cambiar el texto del botón de envío del formulario
            const submitButton = document.getElementById('submit-button');
            submitButton.innerText = 'Actualizar';
            submitButton.onclick = function() {
                updateCliente(identificacion); // Actualiza el cliente al enviar el formulario
            };
        })
        .catch((error) => {
            console.error('Error al cargar los datos del cliente:', error);
        });
}

function updateCliente(identificacion) {
    const nombres = document.getElementById('nombresToUpdate').value;
    const telefono = document.getElementById('telefonoToUpdate').value;

    fetch(`/updateC`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ identificacion, nombres, telefono }) // Asegúrate de enviar 'identificacion'
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message); // Mostrar mensaje de respuesta del servidor
        document.getElementById('myFormUpdate').reset(); // Limpiar el formulario
        loadClientes(); // Volver a cargar la lista de clientes

        muestraMensajeUpdate(); // Mover aquí para mostrar el mensaje solo después de una actualización exitosa

        const submitButton = document.getElementById('submit-button');
        submitButton.innerText = 'Ingresar'; // Restablecer texto del botón
        submitButton.onclick = insertCliente; // Restablecer función de inserción
    })
    .catch((error) => {
        console.error('Error al actualizar el cliente:', error);
    });
}
