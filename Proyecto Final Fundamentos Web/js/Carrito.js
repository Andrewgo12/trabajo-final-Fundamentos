// carrito.js
let carrito = [];
let totalCompra = 0;

// Función para agregar productos al carrito
function agregarAlCarrito(idProducto) {
    const producto = productosDeLimpieza.find(item => item.id === idProducto);
    if (producto && producto.cantidad > 0) {
        carrito.push({ ...producto }); // Agrega una copia del producto
        producto.cantidad--; // Decrementar cantidad disponible en productos
        totalCompra += producto.precio;
        actualizarCarrito();
    } else {
        alert(`No hay suficiente stock para: ${producto ? producto.nombre : 'este producto'}`);
    }
}

// Función para actualizar el carrito en la interfaz
function actualizarCarrito() {
    const cantidadCarrito = document.getElementById('cantidad-carrito');
    cantidadCarrito.textContent = carrito.length;

    const carritoProductos = document.getElementById('carrito-productos');
    carritoProductos.innerHTML = ''; // Limpiar contenido previo

    carrito.forEach(producto => {
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" width="50">
            ${producto.nombre} - $${producto.precio.toLocaleString('es-CO')}
            <button onclick="eliminarDelCarrito(${producto.id})">Eliminar</button>
        `;
        carritoProductos.appendChild(itemDiv);
    });

    document.getElementById('total-compra').textContent = `Total: $${totalCompra.toLocaleString('es-CO')}`;
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(idProducto) {
    const index = carrito.findIndex(item => item.id === idProducto);
    if (index !== -1) {
        const producto = carrito[index];
        carrito.splice(index, 1); // Elimina el producto del carrito
        totalCompra -= producto.precio; // Decrementa el total
        const originalProducto = productosDeLimpieza.find(item => item.id === idProducto);
        if (originalProducto) {
            originalProducto.cantidad++; // Aumentar el stock del producto original
        }
        actualizarCarrito();
    }
}

// Función para mostrar el carrito
function mostrarCarrito() {
    const modalCarrito = document.getElementById('modal-carrito');
    modalCarrito.style.display = 'block';
    actualizarCarrito(); // Actualiza el carrito al abrir
}

// Función para cerrar el modal del carrito
function cerrarModal() {
    const modalCarrito = document.getElementById('modal-carrito');
    modalCarrito.style.display = 'none';
}

// Función de ejemplo para seleccionar método de pago
function seleccionarMetodoPago(metodo) {
    const mensajePresupuesto = document.getElementById('mensaje-presupuesto');
    mensajePresupuesto.textContent = `Método de Pago Seleccionado: ${metodo}`;
}
