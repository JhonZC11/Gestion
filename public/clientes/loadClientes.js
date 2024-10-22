

function loadClientes() {
    fetch(`/clientes`)
        .then(response => response.json())
        .then(data => {
            const clientesBody = document.getElementById('clientesBody');
            clientesBody.innerHTML = ''; // Limpiar el cuerpo de la tabla
            data.forEach(cliente => {
                const row = document.createElement('tr');
                row.className= "text-center"
                row.innerHTML = `
                    
                    <td>${cliente.nombre}</td>
                    
                    <td>${cliente.telefono}</td>
                    
                    <td>
                        <button class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#editCliente" onclick="editCliente(${cliente.id})">Actualizar</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteCliente(${cliente.id})">Eliminar</button>
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
<td>${cliente.apellidos}</td>
<td>${cliente.direccion}</td>
<td>${cliente.identificacion}</td>*/
// Cargar la lista de clientes al cargar la página
loadClientes();

