

document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    // Capturar los valores de los campos
    const cedula = document.getElementById('cedula').value;
    const nombres = document.getElementById('nombres').value;
    const apellidos = document.getElementById('apellidos').value;
    const telefono = document.getElementById('telefono').value;
    const direccion = document.getElementById('direccion').value;

    // Enviar datos al servidor
    fetch('/insertar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cedula, nombres, apellidos, telefono, direccion })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('myForm').reset(); // Limpiar el formulario
        muestraMensajeGood()
        loadClientes()
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});