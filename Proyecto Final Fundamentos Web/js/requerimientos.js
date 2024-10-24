document.getElementById('requerimientosForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar el envío del formulario hasta validar

    // Obtener valores de los campos
    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const presupuesto = document.getElementById('presupuesto').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const direccion = document.getElementById('direccion').value.trim();
    const terminos = document.getElementById('aceptarTerminos').checked;
    const domicilio = document.getElementById('Domicilio').checked;
    const recogerEnTienda = document.getElementById('RecogerEnTienda').checked;

    // Validar que todos los campos estén completos
    if (!nombre || !apellido || !presupuesto || !email || !telefono || !direccion) {
        alert('Todos los campos son obligatorios.');
        return;
    }

    // Validar términos y condiciones
    if (!terminos) {
        alert('Debes aceptar los términos y condiciones.');
        return;
    }

    // Validar selección de método de envío
    if (!domicilio && !recogerEnTienda) {
        alert('Debes seleccionar un método de envío.');
        return;
    }

    // Mensaje según el método de envío seleccionado
    if (recogerEnTienda) {
        alert('¡Enhorabuena! Tus productos Seran Entregados en nustras sucursales;visita tu sucursal más cercana.');
    } else {
        alert('Listo ahor apuedes revivir tus productos en casa;A continuacion selecciona tus productos.');
    }


    document.getElementById('mensajeExito').style.display = 'block';
    this.reset();
});