function validarFormulario() {
    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const presupuesto = document.getElementById('presupuesto').value.trim();
    const email = document.getElementById('email').value.trim();
    const cantidadProductos = document.getElementById('CantidadPorductosrq').value.trim();
    const direccion = document.getElementById('direccion').value.trim();
    const terminos = document.getElementById('aceptarTerminos').checked;
    const domicilio = document.getElementById('Domicilio').checked;
    const recogerEnTienda = document.getElementById('RecogerEnTienda').checked;

    // Validación de campos requeridos
    if (!nombre || !apellido || !presupuesto || !email || !cantidadProductos || !direccion) {
        alert('Todos los campos son obligatorios.');
        return false;
    }

    // Validación de longitud del nombre
    if (nombre.length > 20) {
        alert('El nombre no puede superar los 20 caracteres.');
        return false;
    }

    // Validación del presupuesto
    const presupuestoNumero = parseFloat(presupuesto.replace(/[^0-9.-]+/g, ""));
    if (isNaN(presupuestoNumero) || presupuestoNumero <= 0) {
        alert('El presupuesto debe ser un número positivo y estar formateado en pesos.');
        return false;
    }

    // Validación de la cantidad de productos
    const cantidadProductosNumero = parseInt(cantidadProductos);
    if (isNaN(cantidadProductosNumero) || cantidadProductosNumero <= 0 || cantidadProductosNumero > 20) {
        alert('La cantidad de productos debe ser un número positivo y no puede ser superior a 20.');
        return false;
    }

    // Validación de términos y condiciones
    if (!terminos) {
        alert('Debes aceptar los términos y condiciones.');
        return false;
    }

    // Validación de selección de método de envío
    if (!domicilio && !recogerEnTienda) {
        alert('Debes seleccionar un método de envío.');
        return false;
    }

    // Guardar información en un objeto y en localStorage
    const datos = {
        nombre,
        apellido,
        presupuesto,
        email,
        cantidadProductos,
        direccion,
        domicilio,
        recogerEnTienda
    };
    localStorage.setItem('requerimiento', JSON.stringify(datos));

    return datos;
}

// Función para mostrar el mensaje de éxito con información del cliente
function mostrarMensajeExito() {
    const requerimiento = JSON.parse(localStorage.getItem('requerimiento'));
    let mensaje;

    if (requerimiento.recogerEnTienda) {
        mensaje = '¡Enhorabuena! Tus productos serán entregados en nuestras sucursales; visita tu sucursal más cercana.';
    } else {
        mensaje = 'Listo, ahora puedes recibir tus productos en casa; a continuación selecciona tus productos.';
    }

    // Mostrar mensaje de éxito con información del cliente
    const mensajeCompleto = `
        ${mensaje}
        <br><br>
        Información del cliente:<br>
        Nombre: ${requerimiento.nombre}<br>
        Apellido: ${requerimiento.apellido}<br>
        Email: ${requerimiento.email}<br>
        Presupuesto: ${requerimiento.presupuesto}<br>
        Cantidad de Productos: ${requerimiento.cantidadProductos}<br>
        Dirección: ${requerimiento.direccion}<br>
        Método de Envío: ${requerimiento.domicilio ? 'Envío a domicilio' : 'Recoger en tienda'}<br>
        <a href="../html/productos.html" class="btn">Ver Productos</a>
    `;

    // Mostrar en un elemento específico
    const mensajeDiv = document.getElementById('mensajeExito');
    mensajeDiv.innerHTML = mensajeCompleto;
    mensajeDiv.style.display = 'block';
}

// Función para limpiar el formulario y ocultar el mensaje de éxito
function limpiarFormulario() {
    document.getElementById('requerimientosForm').reset();
    document.getElementById('mensajeExito').style.display = 'none';
    localStorage.removeItem('requerimiento');
}

// Evento para el envío del formulario
document.getElementById('requerimientosForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const validacion = validarFormulario();
    if (validacion) {
        mostrarMensajeExito();
    }
});

document.querySelector('button[type="button"]').addEventListener('click', limpiarFormulario);
