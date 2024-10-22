
document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    // Capturar los valores de los campos que ahora solo son 'nombre' y 'telefono'
    const descripcion = document.getElementById('descripcion').value;
    const unidadMedida = document.getElementById('unidadMedida').value;
    const valorUnidad = parseFloat(document.getElementById('valorUnidad').value);
    const stock = parseFloat(document.getElementById('stock').value);

   
    // Enviar datos al servidor
    fetch('/insertP', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ descripcion, unidadMedida, valorUnidad, stock })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('myForm').reset(); // Limpiar el formulario
        muestraMensajeGood(); // Muestra un mensaje de éxito
        loadProductos(); // Recargar la lista de clientes
    })
    .catch((error) => {
        console.error('Error:', error);
        muestraMensajeError(); // Muestra un mensaje de error en caso de fallo
    });
});
