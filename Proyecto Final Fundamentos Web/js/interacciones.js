/*=========== Evento para mostrar u ocultar testimonios ===========*/
function mostrarTestimonios() {
    const testimoniosDiv = document.getElementById('testimonios'); // Obtiene el elemento del DOM que contiene los testimonios.
    // Alterna la visibilidad del div de testimonios entre 'block' y 'none'.
    testimoniosDiv.style.display = testimoniosDiv.style.display === 'none' || !testimoniosDiv.style.display ? 'block' : 'none';
}

/*=========== Evento para mostrar u ocultar la sección de ayuda ===========*/
function mostrarAyuda() {
    const ayudaDiv = document.getElementById('ayuda'); // Obtiene el elemento del DOM que contiene la sección de ayuda.
    // Alterna la visibilidad del div de ayuda entre 'block' y 'none'.
    ayudaDiv.style.display = ayudaDiv.style.display === 'none' || !ayudaDiv.style.display ? 'block' : 'none';
}
