// Función para validar el formulario
function validarFormulario() {
    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const presupuesto = document.getElementById('presupuesto').value.trim();
    const email = document.getElementById('email').value.trim();
    const CantidadPorductosrq = document.getElementById('CantidadPorductosrq').value.trim();
    const direccion = document.getElementById('direccion').value.trim();
    const terminos = document.getElementById('aceptarTerminos').checked;
    const domicilio = document.getElementById('Domicilio').checked;
    const recogerEnTienda = document.getElementById('RecogerEnTienda').checked;

    // Validar que todos los campos estén completos
    if (!nombre || !apellido || !presupuesto || !email || !CantidadPorductosrq || !direccion) {
        alert('Todos los campos son obligatorios.');
        return false;
    }

    // Validar términos y condiciones
    if (!terminos) {
        alert('Debes aceptar los términos y condiciones.');
        return false;
    }

    // Validar selección de método de envío
    if (!domicilio && !recogerEnTienda) {
        alert('Debes seleccionar un método de envío.');
        return false;
    }

    return {
        nombre,
        apellido,
        presupuesto,
        email,
        CantidadPorductosrq,
        direccion,
        domicilio,
        recogerEnTienda
    };
}

// Función para mostrar el mensaje de éxito
function mostrarMensajeExito(recogerEnTienda) {
    if (recogerEnTienda) {
        alert('¡Enhorabuena! Tus productos serán entregados en nuestras sucursales; visita tu sucursal más cercana.');
    } else {
        alert('Listo, ahora puedes recibir tus productos en casa; a continuación selecciona tus productos.');
    }

    document.getElementById('mensajeExito').style.display = 'block';
}

// Función para limpiar el formulario y ocultar el mensaje de éxito
function limpiarFormulario() {
    document.getElementById('requerimientosForm').reset(); // Restablece los campos del formulario
    document.getElementById('mensajeExito').style.display = 'none'; // Oculta el mensaje de éxito
}

// Evento para el envío del formulario
document.getElementById('requerimientosForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar el envío del formulario hasta validar

    const validacion = validarFormulario();
    if (validacion) {
        mostrarMensajeExito(validacion.recogerEnTienda);
        this.reset(); // Restablece el formulario después de mostrar el mensaje
    }
});

// Evento para el botón "Limpiar campos"
document.querySelector('button[type="button"]').addEventListener('click', limpiarFormulario);
