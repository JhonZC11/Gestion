
function applyFilters() {
    const fechaFilter = document.getElementById('filterFecha').value.toLowerCase();
    const nombreFilter = document.getElementById('filterNombre').value.toLowerCase();
    const productoFilter = document.getElementById('filterProducto').value.toLowerCase();

    const table = document.getElementById('deudasbody');
    const rows = table.getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
        const fecha = rows[i].getElementsByTagName('td')[0].textContent.toLowerCase();
        const nombre = rows[i].getElementsByTagName('td')[1].textContent.toLowerCase();
        const producto = rows[i].getElementsByTagName('td')[2].textContent.toLowerCase();

        // Verificar si la fila coincide con los filtros
        const fechaMatch = fecha.includes(fechaFilter);
        const nombreMatch = nombre.includes(nombreFilter);
        const productoMatch = producto.includes(productoFilter);

        // Mostrar u ocultar la fila
        if (fechaMatch && nombreMatch && productoMatch) {
            rows[i].style.display = '';
        } else {
            rows[i].style.display = 'none';
        }
    }
}





function loadDeudas() {
    fetch(`/deudas`)
        .then(response => response.json())
        .then(data => {
            const clientesBody = document.getElementById('deudasbody');
            clientesBody.innerHTML = ''; // Limpiar el cuerpo de la tabla
            data.forEach(cliente => {
                const row = document.createElement('tr');
                row.className= "text-center"
                row.innerHTML = `
                    
                <td>${cliente.fecha}</td>        
                <td>${cliente.cliente}</td>
                <td>${cliente.nombre_producto}</td>
                <td>${cliente.precio_producto}</td>
                <td>${cliente.cantidad}</td>
                <td>${cliente.valorTotal}</td>
                <td>
                    <button class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#editDeuda" onclick="editDeuda(${cliente.id})">Actualizar</button>    
                </td>
`;
                clientesBody.appendChild(row);
            });
        })
        .catch((error) => {
            console.error('Error al cargar los clientes:', error);
        });
}
/*
                    <td>
                        <button class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#editCliente" onclick="editCliente(${cliente.id})">Actualizar</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteCliente(${cliente.id})">Eliminar</button>
                    </td>
<td>${cliente.apellidos}</td>
<td>${cliente.direccion}</td>
<td>${cliente.identificacion}</td>*/
// Cargar la lista de clientes al cargar la página
loadDeudas();

