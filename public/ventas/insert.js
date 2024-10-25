document.getElementById('ventaForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    // Capturar los valores de los campos que ahora solo son 'nombre' y 'telefono'
    const cliente = document.getElementById('nombreCliente').value;
    const telefono = document.getElementById('telefonoCliente').value;
    const totalPurchase = parseFloat(document.getElementById('totalPurchase').value);

   
    // Enviar datos al servidor
    fetch('/insertV', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cliente, telefono, totalPurchase })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('ventaForm').reset(); // Limpiar el formulario
        muestraMensajeGood(); // Muestra un mensaje de éxito
        loadProductos(); // Recargar la lista de clientes
    })
    .catch((error) => {
        console.error('Error:', error);
        muestraMensajeError(); // Muestra un mensaje de error en caso de fallo
    });
});