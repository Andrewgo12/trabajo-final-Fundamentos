class Carrito {
    constructor() {
        this.carrito = []; // Inicializa el carrito como un array vacío.
        this.cargarDesdeLocalStorage(); // Carga los productos del carrito desde localStorage al iniciar la clase.
    }

    /*=========== Cargar carrito desde localStorage ===========*/
    cargarDesdeLocalStorage() {
        const carritoGuardado = JSON.parse(localStorage.getItem('productos-en-carrito')); // Intenta obtener el carrito guardado del localStorage.
        this.carrito = carritoGuardado || []; // Si no hay carrito guardado, inicializa como un array vacío.
    }

    /*=========== Actualizar localStorage ===========*/
    actualizarEnLocalStorage() {
        localStorage.setItem('productos-en-carrito', JSON.stringify(this.carrito)); // Guarda el carrito actual en localStorage.
    }

    /*=========== Agregar producto al carrito ===========*/
    agregar(id) {
        const producto = this.encontrarProducto(id); // Busca el producto por ID.

        if (!producto) {
            throw new Error("Producto no encontrado."); // Lanza un error si el producto no existe.
        }

        // Verifica si el producto ya está en el carrito
        const productoEnCarrito = this.carrito.find(item => item.id === producto.id);

        if (productoEnCarrito) {
            // Si el producto ya está en el carrito y hay stock disponible, incrementa la cantidad
            if (productoEnCarrito.cantidad < producto.stock) {
                productoEnCarrito.cantidad++;
            } else {
                throw new Error('Stock insuficiente.'); // Lanza un error si no hay suficiente stock.
            }
        } else {
            // Si el producto no está en el carrito, agrégalo con cantidad 1
            this.carrito.push({ ...producto, cantidad: 1 });
        }

        this.actualizarEnLocalStorage(); // Actualiza el localStorage con el carrito modificado.
    }

    /*=========== Eliminar producto del carrito ===========*/
    eliminar(id) {
        this.carrito = this.carrito.filter(item => item.id !== id); // Filtra el carrito para eliminar el producto por ID.
        this.actualizarEnLocalStorage(); // Actualiza el localStorage después de la eliminación.
    }

    /*=========== Vaciar carrito ===========*/
    vaciar() {
        this.carrito = []; // Reinicia el carrito a un array vacío.
        this.actualizarEnLocalStorage(); // Actualiza el localStorage.
    }

    /*=========== Encontrar producto por ID ===========*/
    encontrarProducto(id) {
        return productosDeLimpieza.find(item => item.id === id); // Busca y retorna el producto de la lista de productos.
    }

    /*=========== Mostrar carrito en la tabla ===========*/
    mostrar(tablaCarrito, totalCompra, cantidadProductos) {
        tablaCarrito.innerHTML = ''; // Limpia la tabla antes de mostrar los productos.
        let total = 0; // Inicializa el total de la compra.

        this.carrito.forEach(producto => {
            const fila = document.createElement('tr'); // Crea una nueva fila para la tabla.
            fila.innerHTML = `
                <td>${producto.nombre}</td>
                <td>${producto.cantidad}</td>
                <td>$${(producto.precio * producto.cantidad).toLocaleString('es-CO')}</td>
                <td><button onclick="carrito.eliminar(${producto.id}); mostrarCarrito()">Eliminar</button></td>
            `;
            tablaCarrito.appendChild(fila); // Agrega la fila a la tabla.
            total += producto.precio * producto.cantidad; // Suma el precio del producto al total.
        });

        // Actualiza el total y la cantidad de productos en la interfaz
        totalCompra.textContent = `Total: $${total.toLocaleString('es-CO')}`;
        cantidadProductos.textContent = `Cantidad de productos: ${this.carrito.reduce((acc, item) => acc + item.cantidad, 0)}`;
    }
}

// Instancia del carrito
const carrito = new Carrito();

/*=========== Función para mostrar el carrito ===========*/
function mostrarCarrito() {
    const tablaCarrito = document.getElementById('tablaCarrito'); // Obtiene la tabla del carrito.
    const totalCompra = document.getElementById('totalCompra'); // Obtiene el elemento que muestra el total de la compra.
    const cantidadProductos = document.getElementById('cantidadProductos'); // Obtiene el elemento que muestra la cantidad de productos.

    try {
        carrito.mostrar(tablaCarrito, totalCompra, cantidadProductos); // Muestra el carrito en la tabla.
    } catch (error) {
        console.error(" Error al mostrar el carrito:", error); // Maneja errores en la visualización del carrito.
    }
}

/*=========== Agregar al carrito al hacer clic en el botón ===========*/
function agregarAlCarrito(id) {
    try {
        carrito.agregar(id); // Agrega el producto al carrito.
        alert(`Producto agregado al carrito: ${carrito.encontrarProducto(id).nombre}`); // Muestra un mensaje de confirmación.
        mostrarCarrito(); // Actualiza la vista del carrito.
    } catch (error) {
        alert(error.message); // Muestra un mensaje de error si ocurre un problema.
        console.error("Error al agregar al carrito:", error); // Registra el error en la consola.
    }
}

/*=========== Confirmar método de pago ===========*/
function confirmarMetodoPago() {
    const pagoEfectivo = document.getElementById("Pago_efectivo").checked; // Verifica si el pago en efectivo está seleccionado.
    const pagoTarjeta = document.getElementById("Pago_con_tarjeta").checked; // Verifica si el pago con tarjeta está seleccionado.

    let metodoPago = ''; // Inicializa el método de pago como una cadena vacía.

    if (pagoEfectivo) metodoPago = 'Efectivo'; // Asigna el método de pago en efectivo si está seleccionado.
    else if (pagoTarjeta) metodoPago = 'Tarjeta'; // Asigna el método de pago con tarjeta si está seleccionado.

    if (metodoPago) {
        localStorage.setItem('metodo-pago', metodoPago); // Guarda el método de pago en localStorage.
        alert(`Método de pago confirmado: ${metodoPago}`); // Muestra un mensaje de confirmación.
    } else {
        alert("Seleccione un método de pago."); // Muestra un mensaje si no se seleccionó un método de pago.
    }
}

/*=========== Confirmar compra ===========*/
function confirmarCompra() {
    const metodoPago = localStorage.getItem('metodo-pago'); // Obtiene el método de pago guardado en localStorage.

    if (carrito.carrito.length === 0) {
        alert("El carrito está vacío."); // Muestra un mensaje si el carrito está vacío.
        return;
    }

    let factura = "----- Factura de Compra -----\n"; // Inicializa la factura como una cadena vacía.

    const total = carrito.carrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0); // Calcula el total de la compra.
    const cantidadProductos = carrito.carrito.reduce((acc, producto) => acc + producto.cantidad, 0); // Calcula la cantidad de productos.

    factura += `Total a pagar: $${total.toLocaleString('es-CO')}\n`; // Agrega el total a la factura.
    factura += `Cantidad de productos: ${cantidadProductos}\n`; // Agrega la cantidad de productos a la factura.
    factura += `Método de pago: ${metodoPago}\n`; // Agrega el método de pago a la factura.
    factura += "\nProductos:\n"; // Agrega un título para la lista de productos.

    carrito.carrito.forEach(producto => {
        factura += `- ${producto.nombre} x${producto.cantidad} - $${(producto.precio * producto.cantidad).toLocaleString('es-CO')}\n`; // Agrega cada producto a la factura.
    });

    alert(factura); // Muestra la factura completa.
    carrito.vaciar(); // Vacía el carrito después de la compra.
    mostrarCarrito(); // Actualiza la vista del carrito.
}

/*=========== Vaciar carrito ===========*/
function vaciarCarrito() {
    carrito.vaciar(); // Vacía el carrito.
    mostrarCarrito(); // Actualiza la vista del carrito.
}

/*=========== Manejo de eventos ===========*/
document.addEventListener("DOMContentLoaded", mostrarCarrito); // Muestra el carrito al cargar la página.
document.getElementById("confirmacionMePgo").addEventListener("click", confirmarMetodoPago); // Asigna el evento de confirmación de método de pago.
document.getElementById("cancelarCompraBtn").addEventListener("click", vaciarCarrito); // Asigna el evento de cancelación de compra.
document.getElementById("confirmarCompraBtn").addEventListener("click", confirmarCompra); // Asigna el evento de confirmación de compra.

/*=========== Mostrar información del comprador ===========*/
function mostrarInformacionComprador() {
    const requerimiento = JSON.parse(localStorage.getItem('requerimiento')); // Obtiene la información del comprador guardada en localStorage.

    if (requerimiento) {
        document.getElementById('nombreCarrito ').textContent = requerimiento.nombre; // Muestra el nombre del comprador.
        document.getElementById('apellidoCarrito').textContent = requerimiento.apellido; // Muestra el apellido del comprador.
        document.getElementById('presupuestoCarrito').textContent = requerimiento.presupuesto; // Muestra el presupuesto del comprador.
        document.getElementById('emailCarrito').textContent = requerimiento.email; // Muestra el correo electrónico del comprador.
        document.getElementById('cantidadProductosCarrito').textContent = requerimiento.cantidadProductos; // Muestra la cantidad de productos del comprador.
        document.getElementById('direccionCarrito').textContent = requerimiento.direccion; // Muestra la dirección del comprador.
    } else {
        document.getElementById('carrito').innerHTML = '<p>No se encontraron detalles del comprador.</p>'; // Muestra un mensaje si no hay información del comprador.
    }
}

/*=========== Llamar a la función para mostrar información en el carrito al cargar la página ===========*/
document.addEventListener('DOMContentLoaded', mostrarInformacionComprador);
