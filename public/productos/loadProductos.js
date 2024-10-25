function loadProductos() {
    fetch(`/productos`)
        .then(response => response.json())
        .then(data => {
            const productosBody = document.getElementById('productosBody');
            productosBody.innerHTML = ''; // Limpiar el cuerpo de la tabla
            data.forEach(producto => {
                const row = document.createElement('tr');
                row.className= "text-center"
                row.innerHTML = `
                    
                    <td>${producto.descripcion}</td>
                    <td>${producto.unidadMedida}</td>
                    <td>${producto.valorUnitario}</td>
                    <td>${producto.stock}</td>                    
                    <td>
                        <button class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#editProducto" onclick="editProducto(${producto.id})">Actualizar</button>                        
                    </td>
                `;
                productosBody.appendChild(row);
            });
        })
        .catch((error) => {
            console.error('Error al cargar los clientes:', error);
        });
}
/*
<td>${cliente.apellidos}</td>
<td>${cliente.direccion}</td>
<td>${cliente.identificacion}</td>*/
// Cargar la lista de clientes al cargar la página
loadProductos();
