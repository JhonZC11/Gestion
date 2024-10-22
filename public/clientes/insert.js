


document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    // Capturar los valores de los campos que ahora solo son 'nombre' y 'telefono'
    const nombre = document.getElementById('nombres').value;
    const telefono = document.getElementById('telefono').value;

    // Enviar datos al servidor
    fetch('/insertar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, telefono })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('myForm').reset(); // Limpiar el formulario
        muestraMensajeGood(); // Muestra un mensaje de éxito
        loadClientes(); // Recargar la lista de clientes
    })
    .catch((error) => {
        console.error('Error:', error);
        muestraMensajeError(); // Muestra un mensaje de error en caso de fallo
    });
});
