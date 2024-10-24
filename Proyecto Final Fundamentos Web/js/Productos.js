const productosDeLimpieza = [
    { id: 1001, nombre: "Detergente Líquido", descripcion: "Detergente concentrado para ropa.", precio: 15000, imagen: "https://www.kipclin.com/images/virtuemart/product/KIP-PQP-DETER00999(E).jpg" },
    { id: 1002, nombre: "Limpiador Multiusos", descripcxion: "Ideal para superficies duras.", precio: 10000, imagen: "https://mercaldas.vtexassets.com/arquivos/ids/1325813/Limpiador-DERSA-multiusos-desinfectante-x4000-ml_120391.jpg?v=638508604253470000s" },
    { id: 1003, nombre: "Desinfectante en Spray", descripcion: "Elimina el 99.9% de gérmenes.", precio: 20000, imagen: "https://olimpica.vtexassets.com/arquivos/ids/1327291/7793253471705_2.jpg?v=638452530742270000" },
    { id: 1004, nombre: "Jabón en Barra", descripcion: "Jabón biodegradable para manos.", precio: 5000, imagen: "https://www.cerowasteshop.com/cdn/shop/products/Jabon-Para-Manos-Natural-Ecologico-Biodegradable-500-ml.jpg?v=1685639410&width=1445" },
    { id: 1005, nombre: "Toallas de Papel", descripcion: "Absorbentes y resistentes.", precio: 12000, imagen: "https://www.catalogoespacial.com/16656-large_default/toallas-de-papel.jpg" },
    { id: 1006, nombre: "Escoba de Madera", descripcion: "Escoba tradicional para barrer.", precio: 25000, imagen: "https://www.loencuentras.com.co/1916-large_default/escoba-madera.jpg" },
    { id: 1007, nombre: "Recogedor de Basura", descripcion: "Recogedor plástico de alta resistencia.", precio: 10000, imagen: "https://detalshop.com/cdn/shop/products/022366.jpg?v=1588392867" },
    { id: 1008, nombre: "Trapeador de Microfibra", descripcion: "Perfecto para pisos duros.", precio: 30000, imagen: "https://canelahogar.com.co/wp-content/uploads/2021/08/7016005-TraperoMicroFibraAzul.jpg" },
    { id: 1009, nombre: "Guantes de Limpieza", descripcion: "Guantes desechables para tareas domésticas.", precio: 5000, imagen: "https://http2.mlstatic.com/D_NQ_NP_661197-MCO47379769348_092021-O.webp" },
    { id: 1010, nombre: "Esponjas de Cocina", descripcion: "Esponjas suaves y duraderas.", precio: 7000, imagen: "https://dojiw2m9tvv09.cloudfront.net/12840/product/M_esponja-lisa3798.png?11&time=1728407800" },
    { id: 1011, nombre: "Bolsas de Basura", descripcion: "Bolsas resistentes para desechos.", precio: 8000, imagen: "https://centraldesuministrosgs.com/wp-content/uploads/2023/12/Bolsa-Plastica-de-65X80cm-paqx30und-color-negrox18g-central-de-suministrosgs1.webp" },
    { id: 1012, nombre: "Limpiador de Vidrios", descripcion: "Para ventanas brillantes y sin rayas.", precio: 10000, imagen: "https://http2.mlstatic.com/D_NQ_NP_706057-MCO45418130666_042021-O.webp" },
    { id: 1013, nombre: "Ambientador en Spray", descripcion: "Fragancia fresca para el hogar.", precio: 7000, imagen: "https://exitocol.vtexassets.com/arquivos/ids/24447946/Ambientador-Spray-Lavanda-HOMEBRIGHT-MARCA-EXCLUSIVA-30177-3393959_a.jpg?v=638609471481300000" },
    { id: 1014, nombre: "Fregona", descripcion: "Fregona de algodón para limpieza profunda.", precio: 15000, imagen: "https://cuatrogasaprofesional.com/wp-content/uploads/2023/07/BF-F0160-VE-FRTI_Pack_sd_96ppp.jpg" },
    { id: 1015, nombre: "Limpiador de Baños", descripcion: "Elimina manchas y desinfecta.", precio: 12000, imagen: "https://cdn1.totalcommerce.cloud/homesentry/product-zoom/es/limpiador-de-banos-mr-musculo_naranja-con-blanco-1.webp" },
    { id: 1016, nombre: "Limpiador de Pisos", descripcion: "Fórmula concentrada para todo tipo de pisos.", precio: 18000, imagen: "https://vaquitaexpress.com.co/media/catalog/product/cache/e89ece728e3939ca368b457071d3c0be/7/7/7707815552078_29.jpg" },
    { id: 1017, nombre: "Paños de Microfibra", descripcion: "Ideales para secar y pulir.", precio: 6000, imagen: "https://http2.mlstatic.com/D_NQ_NP_797432-MLA44041279363_112020-O.webp" },
    { id: 1018, nombre: "Desengrasante", descripcion: "Elimina grasa y suciedad difícil.", precio: 14000, imagen: "https://dcdn.mitiendanube.com/stores/001/696/864/products/desengrasante-liquido-por-500cc-afc70fe80def5764ae17072485839184-1024-1024.png" },
    { id: 1019, nombre: "Limpiador de Alfombras", descripcion: "Elimina manchas y olores.", precio: 25000, imagen: "https://exitocol.vtexassets.com/arquivos/ids/24442331/Limpiador-De-Alfombra-X-650-ml-855621_a.jpg?v=638609322891800000" },
    { id: 1020, nombre: "Cepillo de Ingreso", descripcion: "Ideal para limpiar rincones difíciles.", precio: 8000, imagen: "https://http2.mlstatic.com/D_NQ_NP_715235-MLU71568057782_092023-O.webp" },
    { id: 1021, nombre: "Pulidor de Muebles", descripcion: "Deja un acabado brillante en los muebles.", precio: 12000, imagen: "https://dafesa.com/wp-content/uploads/2019/11/Limpiador-muebles-06.jpg" },
    { id: 1022, nombre: "Spray Quitamanchas", descripcion: "Para tratar manchas en ropa.", precio: 10000, imagen: "https://m.media-amazon.com/images/I/61levC7cZmL._SL1280_.jpg" },
    { id: 1023, nombre: "Fórmula de Limpieza Ecológica", descripcion: "Limpieza efectiva y amigable con el medio ambiente.", precio: 15000, imagen: "https://sgfm.elcorteingles.es/SGFM/dctm/MEDIA03/202210/31/00128013200945____9__325x325.jpg" },
    { id: 1024, nombre: "Papel Higiénico", descripcion: "Suave y resistente.", precio: 5000, imagen: "https://lirp.cdn-website.com/1a6c14d7/dms3rep/multi/opt/image007-640w.jpg" },
    { id: 1025, nombre: "Limpiador de Olores", descripcion: "Neutraliza olores desagradables.", precio: 10000, imagen: "https://images.ctfassets.net/tcoigcjw85h2/48LDdMs6CUi1Dzu1CFjWaX/d8c24b11087cd05efbdabb90110730d2/eliminador-olores-bano-aires-lavanda.png" },
    { id: 1026, nombre: "Guantes de Cocina", descripcion: "Protege tus manos mientras cocinas.", precio: 8000, imagen: "https://estra.vtexassets.com/arquivos/ids/182775/4-1049699_Guante-Para-Cocina-De-Silicona-.jpg?v=638405948876200000" },
    { id: 1027, nombre: "Detergente en Cápsulas", descripcion: "Cápsulas para una dosificación precisa.", precio: 18000, imagen: "https://m.media-amazon.com/images/I/61U9J0JUcSL._AC_UF1000,1000_QL80_.jpg" },
    { id: 1028, nombre: "Limpiador de Cristales", descripcion: "Para una limpieza rápida y efectiva.", precio: 12000, imagen: "https://cdn1.totalcommerce.cloud/homesentry/product-zoom/es/limpiador-vidrios-antiempanante-citrus-azul-1.webp" },
    { id: 1029, nombre: "Limpiador para Horno", descripcion: "Elimina grasa y suciedad del horno.", precio: 15000, imagen: "https://maxitenjo.com.co/cdn/shop/products/limpiahornos-magistral-x-180-gr-1_800x.jpg?v=1597944051" },
    { id: 1030, nombre: "Cubo de Limpieza", descripcion: "Cubo para el trapeador.", precio: 20000, imagen: "https://m.media-amazon.com/images/I/514t+vjLjhL._AC_UF350,350_QL80_.jpg" },
    { id: 1031, nombre: "Limpiador de Cocina", descripcion: "Fórmula para limpiar la cocina a fondo.", precio: 22000, imagen: "https://m.media-amazon.com/images/I/81m7e1N8pzL._AC_UF894,1000_QL80_.jpg" },
    { id: 1032, nombre: "Desinfectante de Superficies", descripcion: "Para desinfectar todas las superficies del hogar.", precio: 20000, imagen: "https://www.cif.com.ar/images/h0nadbhvm6m4/4rugFP9MsKKtwD5URTFc2t/45cd0c51f72b52b0f799a1734d64b21c/Q2lmX0dhdGlsbG9fRGVzaW5mZWN0YW50ZS5wbmc/1100w-1100h/cif-limpiador-l%C3%ADquido-desinfectante-de-superficies.jpg" },
    { id: 1033, nombre: "Paños de Papel", descripcion: "Ideales para limpieza y desinfección.", precio: 5000, imagen: "https://maken.com.co/wp-content/uploads/2020/08/toallas-para-manos-maken-copia.jpg" },
    { id: 1034, nombre: "Limpiador de Sanitarios", descripcion: "Fórmula especializada para inodoros.", precio: 12000, imagen: "" },
    { id: 1035, nombre: "Limpiador de Pisos de Madera", descripcion: "Para limpiar y proteger pisos de madera.", precio: 18000, imagen: "https://http2.mlstatic.com/D_NQ_NP_751831-MLU76259015857_052024-O.webp" },
    { id: 1036, nombre: "Limpiador de Tapicería", descripcion: "Elimina manchas en muebles tapizados.", precio: 22000, imagen: "https://www.velky.store/wp-content/uploads/2020/05/upholstery-cleaner-32oz-1518x1518.jpg" },
    { id: 1037, nombre: "Desinfectante para Manos", descripcion: "Gel desinfectante para manos.", precio: 6000, imagen: "https://holandinacolombia.com/wp-content/uploads/2024/01/geldin-a-gel-antibacterial-antiseptico-holandina-500ml.jpg" },
    { id: 1038, nombre: "Limpiador de Parrillas", descripcion: "Para una limpieza profunda de parrillas.", precio: 15000, imagen: "https://charbroil.com.co/wp-content/uploads/2019/06/Limpiador-de-parrilla-8416558R06-2.jpg" },
    { id: 1039, nombre: "Limpiador de Cerámica", descripcion: "Fórmula eficaz para limpiar cerámica.", precio: 10000, imagen: "https://olimpica.vtexassets.com/arquivos/ids/1319642/7702155028603.jpg?v=638446432011470000" },
    { id: 1040, nombre: "Limpieza de Vapor", descripcion: "Limpiador a vapor para eliminar gérmenes.", precio: 100000, imagen: "https://exitocol.vtexassets.com/arquivos/ids/18843320/maquina-a-vapor-limpieza-para-casa-5-en-1.jpg?v=638217469392570000" },
    { id: 1041, nombre: "Limpiador de Olores para Mascotas", descripcion: "Neutraliza olores causados por mascotas.", precio: 15000, imagen: "https://www.faggidistribuciones.com.co/wp-content/uploads/2018/07/eliminador-de-olores-mascotas-brizze-320-ml.jpg" },
    { id: 1042, nombre: "Pasta para Ceras", descripcion: "Para abrillantar pisos y muebles.", precio: 20000, imagen: "https://pulitocarwash.co/wp-content/uploads/2020/07/IMG_0047.jpg" },
    { id: 1043, nombre: "Bolsa para Reciclaje", descripcion: "Para la separación de residuos reciclables.", precio: 8000, imagen: "https://i0.wp.com/stopbasura.com/wp-content/uploads/2023/01/foto2.jpg?fit=800%2C800&ssl=1" },
    { id: 1044, nombre: "Desinfectante para Juguetes", descripcion: "Para desinfectar juguetes infantiles.", precio: 10000, imagen: "https://olimpica.vtexassets.com/arquivos/ids/1240445/image-d31f1fe39c7746d0831864e335cfb132.jpg?v=638369588174300000" },
    { id: 1045, nombre: "Raspador de Suciedad", descripcion: "Raspador para eliminar suciedad resistente.", precio: 5000, imagen: "https://img.kwcdn.com/product/open/2023-12-28/1703747008180-093f36faf6814c2fbf4eb9cc6f383fd1-goods.jpeg?imageMogr2/auto-orient%7CimageView2/2/w/800/q/70/format/webp" },
    { id: 1046, nombre: "Limpiador de Alfombra en Espuma", descripcion: "Espuma para limpiar alfombras.", precio: 15000, imagen: "https://chedrauimx.vtexassets.com/arquivos/ids/36627744/7501066200043_02.jpg?v=638630624760430000" },
    { id: 1047, nombre: "Cera para Pisos", descripcion: "Para abrillantar y proteger pisos.", precio: 12000, imagen: "https://olimpica.vtexassets.com/arquivos/ids/611026/7701008227446.jpg?v=637626512766570000" },
    { id: 1048, nombre: "Toallas de Papel", descripcion: "Absorbentes y prácticas.", precio: 7000, imagen: "https://olimpica.vtexassets.com/arquivos/ids/1047689/image-945595bdf6b545988676506a6a8a5c84.jpg?v=638119997170930000" },
    { id: 1049, nombre: "Pañales Desechables", descripcion: "Para la comodidad de los bebés.", precio: 40000, imagen: "https://www.ipetplace.com.co/wp-content/uploads/2023/10/PanalesDesechablesxl.jpg" }
];
// Función para mostrar todos los productos
function mostrarProductos(productos) {
    const contenedorProductos = document.getElementById('productos');
    contenedorProductos.innerHTML = '';

    // Cargar todos los productos
    const productosHTML = productos.map(crearProductoHTML).join('');
    contenedorProductos.innerHTML = productosHTML; // Agregar productos al contenedor
    // Ajustar el estilo para mostrar en 3 columnas
    contenedorProductos.style.display = 'grid';
    contenedorProductos.style.gridTemplateColumns = 'repeat(3, 150PX)'; // 3 columnas
    contenedorProductos.style.gap = '20px'; // Espaciado entre productos
}

// Función para crear HTML de un producto
function crearProductoHTML(producto) {
    return `
        <div class="producto">
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <p>Precio: $${producto.precio.toLocaleString('es-CO')}</p>
            <button onclick="mostrarDetalleProducto(${producto.id})">Ver Detalles</button> _
            <button onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
        </div>
    `;
}

// Función para mostrar detalles del producto en la ventana
function mostrarDetalleProducto(id) {
    const producto = productosDeLimpieza.find(item => item.id === id);
    if (producto) {
        document.getElementById('nombreProductoVentana').textContent = producto.nombre;
        document.getElementById('imagenProductoVentana').src = producto.imagen;
        document.getElementById('precioProductoVentana').textContent = `Precio: $${producto.precio.toLocaleString('es-CO')}`;
        document.getElementById('cantidadProductoVentana').textContent = `Cantidad disponible: ${producto.cantidad}`;
        document.getElementById('categoriaProductoVentana').textContent = `Categoría: ${producto.categoria}`;
        document.getElementById('ventanaProducto').style.display = 'block';
    }
}

// Cerrar la ventana de detalles
document.getElementById('cerrarVentana').onclick = function () {
    document.getElementById('ventanaProducto').style.display = 'none';
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

// Inicializar la visualización de productos al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    mostrarProductos(productosDeLimpieza); // Cargar todos los productos
});

// Evento del botón de filtrado
document.getElementById("filterButton").addEventListener("click", filtrarProductos);