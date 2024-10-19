let currentPage = 1

function loadClientes(page) {
    fetch(`/clientes?page=${page}`)
        .then(response => response.json())
        .then(data => {
            const clientesBody = document.getElementById('clientesBody');
            clientesBody.innerHTML = ''; // Limpiar el cuerpo de la tabla
            data.forEach(cliente => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${cliente.identificacion}</td>
                    <td>${cliente.nombres}</td>
                    <td>${cliente.apellidos}</td>
                    <td>${cliente.telefono}</td>
                    <td>${cliente.direccion}</td>
                `;
                clientesBody.appendChild(row);
            });
            updatePaginationButtons(page);
        })
        .catch((error) => {
            console.error('Error al cargar los clientes:', error);
        });
}

// Función para actualizar los botones de paginación
function updatePaginationButtons(page) {
    document.getElementById('prevButton').disabled = page === 1;
    // Aquí puedes agregar lógica para habilitar/deshabilitar el botón "Siguiente"
    // por ejemplo, contando el número total de registros.
    // Para simplificar, puedes suponer que si hay 10 o menos registros, no hay más páginas.
    document.getElementById('nextButton').disabled = true; // Inicialmente habilitado, puedes ajustarlo después
}

// Manejo de los botones de paginación
document.getElementById('prevButton').addEventListener('click', function() {
    if (currentPage > 1) {
        currentPage--;
        loadClientes(currentPage);
    }
});

document.getElementById('nextButton').addEventListener('click', function() {
    currentPage++;
    loadClientes(currentPage);
});

// Cargar la lista de clientes al cargar la página
loadClientes(currentPage);

