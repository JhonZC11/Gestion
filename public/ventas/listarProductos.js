function loadProductos() {
    fetch(`/productos`)
        .then(response => response.json())
        .then(data => {
            const productosBody = document.getElementById('productosArea');
            productosBody.innerHTML = ''; // Limpiar el cuerpo de la tabla
            data.forEach(producto => {
                const row = document.createElement('tr');
                row.className= "text-center"
                row.innerHTML = `

                    <td><input type="checkbox" class="item-checkbox" value="${producto.id}"></td>
                    <td>${producto.descripcion}</td>
                    <td>${producto.unidadMedida}</td>
                    <td"><input class="form-control w-50 unit-value" value="${producto.valorUnitario}" readonly></td>
                    <td>${producto.stock}</td>
                    <td class="position-relative">
                        <input class="form-control w-50 position-absolute top-50 start-50 translate-middle p-1 quantity" onchange="calculaT(this,${producto.id}, ${producto.valorUnitario})" type="number">                      
                    </td>
                    <td class="position-relative">
                        <input class="form-control w-75 position-absolute top-50 start-50 translate-middle p-1 value-purchase" id="${producto.id}" readonly>                      
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