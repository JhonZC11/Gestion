
function editCliente(identificacion) {
    // Aquí puedes hacer una solicitud para obtener los datos del cliente

    // Endpoint para obtener registros con paginación
    
 
// El fetch funciona, no tocar
    fetch(`/clientes/${identificacion}`)
        .then(response => response.json())
        .then(cliente => {
            // Llenar el formulario con los datos del cliente
            document.getElementById('cedulaToUpdate').value = cliente.identificacion;
            document.getElementById('nombresToUpdate').value = cliente.nombres;
            document.getElementById('apellidosToUpdate').value = cliente.apellidos;
            document.getElementById('telefonoToUpdate').value = cliente.telefono;
            document.getElementById('direccionToUpdate').value = cliente.direccion;

            // Cambiar el texto del botón de envío del formulario
            const submitButton = document.getElementById('submit-button');
            submitButton.innerText = 'Actualizar';
            submitButton.onclick = function() {
                updateCliente(cliente.identificacion); // Actualiza el cliente al enviar el formulario
            };
        })
        .catch((error) => {
            console.error('Error al cargar los datos del cliente:', error);
        });
}













function updateCliente(identificacion) {
    const cedula = document.getElementById('cedulaToUpdate').value;
    const nombres = document.getElementById('nombresToUpdate').value;
    const apellidos = document.getElementById('apellidosToUpdate').value;
    const telefono = document.getElementById('telefonoToUpdate').value;
    const direccion = document.getElementById('direccionToUpdate').value;

    fetch(`/actualizar`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ identificacion, cedula, nombres, apellidos, telefono, direccion })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message); // Mostrar mensaje de respuesta del servidor
        document.getElementById('myFormUpdate').reset(); // Limpiar el formulario
        loadClientes(currentPage); // Volver a cargar la lista de clientes
        const submitButton = document.getElementById('submit-button');
        submitButton.innerText = 'Ingresar'; // Restablecer texto del botón
        submitButton.onclick = insertCliente; // Restablecer función de inserción
    })
    .catch((error) => {
        console.error('Error al actualizar el cliente:', error);
    });
}
