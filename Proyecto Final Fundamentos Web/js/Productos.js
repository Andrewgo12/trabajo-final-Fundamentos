let productosDeLimpieza = [];
const productsPerPage = 10; // Número de productos por página
let currentPage = 0; // Página actual

// Función para guardar productos en localStorage
function guardarProductosEnLocalStorage() {
    localStorage.setItem('productosDeLimpieza', JSON.stringify(productosDeLimpieza));
}

// Recuperar productos desde localStorage
function recuperarProductosDesdeLocalStorage() {
    const productosGuardados = localStorage.getItem('productosDeLimpieza');
    return productosGuardados ? JSON.parse(productosGuardados) : [];
}

// Mostrar productos en la página
function mostrarProductos(productos) {
    const contenedor = document.getElementById('contenedorProductos'); // Asegúrate de tener un contenedor en tu HTML
    contenedor.innerHTML = ''; // Limpiar el contenedor antes de mostrar los nuevos productos

    const start = currentPage * productsPerPage;
    const end = start + productsPerPage;
    const productosPaginados = productos.slice(start, end);

    productosPaginados.forEach(producto => {
        const divProducto = document.createElement('div');
        divProducto.classList.add('producto'); // Asegúrate de tener estilos para la clase 'producto'
        divProducto.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <p>Precio: $${producto.precio.toLocaleString('es-CO')}</p>
            <p>Cantidad disponible: ${producto.cantidad}</p>
            <button onclick="mostrarDetalleProducto(${producto.id})">Ver Detalles</button>
            <button onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
        `;
        contenedor.appendChild(divProducto);
    });
}

// Función para mostrar detalles del producto en la ventana
function mostrarDetalleProducto(id) {
    const producto = productosDeLimpieza.find(item => item.id === id);
    if (producto) {
        document.getElementById('nombreProductoVentana').textContent = producto.nombre;
        document.getElementById('imagenProductoVentana').src = producto.imagen;
        document.getElementById('precioProductoVentana').textContent = `Precio: $${producto.precio.toLocaleString('es-CO')}`;
        document.getElementById('cantidadProductoVentana').textContent = `Cantidad disponible: ${producto.cantidad}`;
        document.getElementById('ventanaProducto').style.display = 'block';
    }
}

// Cerrar la ventana de detalles
document.getElementById('cerrarVentana').onclick = function () {
    document.getElementById('ventanaProducto').style.display = 'none';
}

// Función para agregar al carrito
function agregarAlCarrito(id) {
    const producto = productosDeLimpieza.find(item => item.id === id);
    if (producto) {
        // Aquí puedes implementar la lógica para agregar el producto al carrito
        console.log(`Producto agregado al carrito: ${producto.nombre}`);
        alert(`Producto agregado al carrito: ${producto.nombre}`);
    }
}

// Función para filtrar productos
function filtrarProductos() {
    const buscador = document.getElementById('buscador').value.toLowerCase();
    const minPrecio = parseInt(document.getElementById('min-precio').value) || 0;
    const maxPrecio = parseInt(document.getElementById('max-precio').value) || Infinity;

    const productosFiltrados = productosDeLimpieza.filter(producto => {
        const nombre = producto.nombre.toLowerCase();
        return (nombre.includes(buscador) && producto.precio >= minPrecio && producto.precio <= maxPrecio);
    });

    mostrarProductos(productosFiltrados); // Mostrar los productos filtrados
}

// Evento del botón de filtrado
document.getElementById("filterButton").addEventListener("click", filtrarProductos);

// Limpiar filtros
document.getElementById('clearFilters').onclick = function () {
    document.getElementById('buscador').value = '';
    document.getElementById('min-precio').value = '';
    document.getElementById('max-precio').value = '';
    mostrarProductos(productosDeLimpieza); // Mostrar todos los productos al limpiar filtros
};

// Cargar los productos desde el JSON al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    // Primero recupera los productos del localStorage
    productosDeLimpieza = recuperarProductosDesdeLocalStorage();

    // Si no hay productos en localStorage, cargarlos desde el JSON
    if (productosDeLimpieza.length === 0) {
        fetch('productos.json')
            .then(response => response.json())
            .then(data => {
                productosDeLimpieza = data; // Asignar los productos cargados
                guardarProductosEnLocalStorage(); // Guardar productos en localStorage
                mostrarProductos(productosDeLimpieza); // Cargar todos los productos
            })
            .catch(error => console.error('Error al cargar los productos:', error));
    } else {
        mostrarProductos(productosDeLimpieza); // Mostrar productos guardados en localStorage
    }
});

// Inicializar la aplicación
function inicializar() {
    mostrarProductos(recuperarProductosDesdeLocalStorage()); // Mostrar los productos guardados en localStorage
}

fetch('../data/productos.json')
    .then(response => response.json())
    .then(data => {
        console.log(data); // Agrega esta línea para verificar la carga de productos
        productos = data;
        localStorage.setItem('productos', JSON.stringify(productos));
        mostrarProductos();
    })
    .catch(error => console.error('Error al cargar los productos:', error));
    
// Ejecutar la inicialización
window.onload = inicializar;
