function mostrarTestimonios() {
    const testimoniosDiv = document.getElementById('testimonios');
    testimoniosDiv.style.display = testimoniosDiv.style.display === 'none' || !testimoniosDiv.style.display ? 'block' : 'none';
    
}

function mostrarAyuda() {
    const ayudaDiv = document.getElementById('ayuda');
    ayudaDiv.style.display = ayudaDiv.style.display === 'none' || !ayudaDiv.style.display ? 'block' : 'none';
}