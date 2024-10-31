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

    // Guardar información en un objeto
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

// Función para mostrar el mensaje de éxito con información del cliente
function mostrarMensajeExito(recogerEnTienda) {
    const requerimiento = JSON.parse(localStorage.getItem('requerimiento'));
    let mensaje;

    if (recogerEnTienda) {
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
        Dirección: ${requerimiento.direccion}<br>
        Método de Envío: ${requerimiento.domicilio ? 'Envío a domicilio' : 'Recoger en tienda'}
    `;

    // Mostrar en un elemento específico
    const mensajeDiv = document.getElementById('mensajeExito');
    mensajeDiv.innerHTML = mensajeCompleto;
    mensajeDiv.style.display = 'block';
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
        // Guardar en localStorage
        localStorage.setItem('requerimiento', JSON.stringify(validacion));
        mostrarMensajeExito(validacion.recogerEnTienda);
        this.reset(); // Restablece el formulario después de mostrar el mensaje
    }
});

// Evento para el botón "Limpiar campos"
document.querySelector('button[type="button"]').addEventListener('click', limpiarFormulario);
