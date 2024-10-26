function loadProductos() {
    fetch(`/productos`)
        .then(response => response.json())
        .then(data => {
            const productosBody = document.getElementById('productosArea');
            productosBody.innerHTML = ''; // Limpiar el cuerpo de la tabla
            data.forEach(producto => {
                const row = document.createElement('tr');
                row.className = "text-center"
                row.innerHTML = `
                    <td>${producto.descripcion}</td>
                    <td>${producto.unidadMedida}</td>
                    <td class="position-relative">
                        <input class="form-control text-center unit-value position-absolute top-50 start-50 translate-middle" value="${producto.valorUnitario}" readonly>
                    </td>
                    <td>${producto.stock}</td>
                    <td class="position-relative">
                        <input class="form-control w-50 p-1 quantity position-absolute top-50 start-50 translate-middle" onchange="calculaT(this,${producto.id}, ${producto.valorUnitario})" type="number">                      
                    </td>
                    <td class="position-relative">
                        <input class="form-control w-50 p-1 value-purchase position-absolute top-50 start-50 translate-middle" id="${producto.id}" readonly>                      
                    </td>          
      
                `;
                productosBody.appendChild(row);
            });
        })
        .catch((error) => {
            console.error('Error al cargar los clientes:', error);
        });
}
loadProductos()

const selectedItems= []
const selectedCantidad= []

// Función para calcular el valor total de una fila
function calculaT(inp, id, valorUnitario) {
    let cantidad = inp.value;
    let valorCompra = cantidad * valorUnitario;
    document.getElementById(id).value = valorCompra;
    // Verifica si el ID ya está en el array, si no, lo agrega
    if (!selectedItems.includes(id)) {
        selectedItems.push(id);
    }
    selectedCantidad.push(cantidad)

    totalCompra()
}
function totalCompra() {

    let total = 0;
    let inpValorTotal = document.getElementById('totalPurchase');
    let totales = document.getElementsByClassName('value-purchase');

    for (let index = 0; index < totales.length; index++) {
        // Asegúrate de que cada valor sea tratado como número
        let valor = parseFloat(totales[index].value);
        if (!isNaN(valor)) {
            total += valor; // Sumar los valores de compra
        }
    }

    // Asigna el total al input para mostrar el valor
    inpValorTotal.value = total.toFixed(0); // Muestra el total con dos decimales
}

document.getElementById('ventaForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    // Capturar los valores de los campos que ahora solo son 'nombre' y 'telefono'
    const cliente = document.getElementById('nombreCliente').value;
    const totalPurchase = parseFloat(document.getElementById('totalPurchase').value);
    const id_producto = selectedItems
    const cantidad = selectedCantidad// Array de IDs de productos
   // Array de cantidades

   
    // Enviar datos al servidor
    fetch('/insertV', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_producto, cliente, cantidad, totalPurchase })
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
