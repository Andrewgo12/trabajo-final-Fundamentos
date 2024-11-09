/*=========== Configuración Inicial ===========*/
const productsPerPage = 49; // Número de productos por página
let currentPage = 0; // Página actual
let productosDeLimpieza = [];
const productos =
    [
        {
            "id": 1001,
            "nombre": "Detergente Líquido",
            "descripcion": "Detergente concentrado para ropa.",
            "precio": 15000,
            "imagen": "https://www.kipclin.com/images/virtuemart/product/KIP-PQP-DETER00999(E).jpg",
            "cantidad": 29
        },
        {
            "id": 1002,
            "nombre": "Limpiador Multiusos",
            "descripcion": "Ideal para superficies duras.",
            "precio": 10000,
            "imagen": "https://mercaldas.vtexassets.com/arquivos/ids/1325813/Limpiador-DERSA-multiusos-desinfectante-x4000-ml_120391.jpg?v=638508604253470000s",
            "cantidad": 50
        },
        {
            "id": 1003,
            "nombre": "Desinfectante en Spray",
            "descripcion": "Elimina el 99.9% de gérmenes.",
            "precio": 20000,
            "imagen": "https://olimpica.vtexassets.com/arquivos/ids/1327291/7793253471705_2.jpg?v=638452530742270000",
            "cantidad": 40
        },
        {
            "id": 1004,
            "nombre": "Jabón en Barra",
            "descripcion": "Jabón biodegradable para manos.",
            "precio": 5000,
            "imagen": "https://www.cerowasteshop.com/cdn/shop/products/Jabon-Para-Manos-Natural-Ecologico-Biodegradable-500-ml.jpg?v=1685639410&width=1445",
            "cantidad": 50
        },
        {
            "id": 1005,
            "nombre": "Toallas de Papel",
            "descripcion": "Absorbentes y resistentes.",
            "precio": 12000,
            "imagen": "https://www.catalogoespacial.com/16656-large_default/toallas-de-papel.jpg",
            "cantidad": 150
        },
        {
            "id": 1006,
            "nombre": "Escoba de Madera",
            "descripcion": "Escoba tradicional para barrer.",
            "precio": 25000,
            "imagen": "https://www.loencuentras.com.co/1916-large_default/escoba-madera.jpg",
            "cantidad": 55
        },
        {
            "id": 1007,
            "nombre": "Recogedor de Basura",
            "descripcion": "Recogedor plástico de alta resistencia.",
            "precio": 10000,
            "imagen": "https://detalshop.com/cdn/shop/products/022366.jpg?v=1588392867",
            "cantidad": 296
        },
        {
            "id": 1008,
            "nombre": "Trapeador de Microfibra",
            "descripcion": "Perfecto para pisos duros.",
            "precio": 30000,
            "imagen": "https://canelahogar.com.co/wp-content/uploads/2021/08/7016005-TraperoMicroFibraAzul.jpg",
            "cantidad": 40
        },
        {
            "id": 1009,
            "nombre": "Guantes de Limpieza",
            "descripcion": "Guantes desechables para tareas domésticas.",
            "precio": 5000,
            "imagen": "https://http2.mlstatic.com/D_NQ_NP_661197-MCO47379769348_092021-O.webp",
            "cantidad": 68
        },
        {
            "id": 1010,
            "nombre": "Esponjas de Cocina",
            "descripcion": "Esponjas suaves y duraderas.",
            "precio": 7000,
            "imagen": "https://dojiw2m9tvv09.cloudfront.net/12840/product/M_esponja-lisa3798.png?11&time=1728407800",
            "cantidad": 297
        },
        {
            "id": 1011,
            "nombre": "Bolsas de Basura",
            "descripcion": "Bolsas resistentes para desechos.",
            "precio": 8000,
            "imagen": "https://centraldesuministrosgs.com/wp-content/uploads/2023/12/Bolsa-Plastica-de-65X80cm-paqx30und-color-negrox18g-central-de-suministrosgs1.webp",
            "cantidad": 2000
        },
        {
            "id": 1012,
            "nombre": "Limpiador de Vidrios",
            "descripcion": "Para ventanas brillantes y sin rayas.",
            " precio": 10000,
            "imagen": "https://http2.mlstatic.com/D_NQ_NP_706057-MCO45418130666_042021-O.webp",
            "cantidad": 330
        },
        {
            "id": 1013,
            "nombre": "Ambientador en Spray",
            "descripcion": "Fragancia fresca para el hogar.",
            "precio": 7000,
            "imagen": "https://exitocol.vtexassets.com/arquivos/ids/24447946/Ambientador-Spray-Lavanda-HOMEBRIGHT-MARCA-EXCLUSIVA-30177-3393959_a.jpg?v=638609471481300000",
            "cantidad": 294
        },
        {
            "id": 1014,
            "nombre": "Fregona",
            "descripcion": "Fregona de algodón para limpieza profunda.",
            "precio": 15000,
            "imagen": "https://cuatrogasaprofesional.com/wp-content/uploads/2023/07/BF-F0160-VE-FRTI_Pack_sd_96ppp.jpg",
            "cantidad": 223
        },
        {
            "id": 1015,
            "nombre": "Limpiador de Baños",
            "descripcion": "Elimina manchas y desinfecta.",
            "precio": 12000,
            "imagen": "https://cdn1.totalcommerce.cloud/homesentry/product-zoom/es/limpiador-de-banos-mr-musculo_naranja-con-blanco-1.webp",
            "cantidad": 293
        },
        {
            "id": 1016,
            "nombre": "Limpiador de Pisos",
            "descripcion": "Fórmula concentrada para todo tipo de pisos.",
            "precio": 18000,
            "imagen": "https://vaquitaexpress.com.co/media/catalog/product/cache/e89ece728e3939ca368b457071d3c0be/7/7/7707815552078_29.jpg",
            "cantidad": 298
        },
        {
            "id": 1017,
            "nombre": "Paños de Microfibra",
            " descripcion": "Ideales para secar y pulir.",
            "precio": 6000,
            "imagen": "https://http2.mlstatic.com/D_NQ_NP_797432-MLA44041279363_112020-O.webp",
            "cantidad": 2953
        },
        {
            "id": 1018,
            "nombre": "Desengrasante",
            "descripcion": "Elimina grasa y suciedad difícil.",
            "precio": 14000,
            "imagen": "https://dcdn.mitiendanube.com/stores/001/696/864/products/desengrasante-liquido-por-500cc-afc70fe80def5764ae17072485839184-1024-1024.png",
            "cantidad": 223
        },
        {
            "id": 1019,
            "nombre": "Limpiador de Alfombras",
            "descripcion": "Elimina manchas y olores.",
            "precio": 25000,
            "imagen": "https://exitocol.vtexassets.com/arquivos/ids/24442331/Limpiador-De-Alfombra-X-650-ml-855621_a.jpg?v=638609322891800000",
            "cantidad": 223
        },
        {
            "id": 1020,
            "nombre": "Cepillo de Ingreso",
            "descripcion": "Ideal para limpiar rincones difíciles.",
            "precio": 8000,
            "imagen": "https://http2.mlstatic.com/D_NQ_NP_715235-MLU71568057782_092023-O.webp",
            "cantidad": 2234
        },
        {
            "id": 1021,
            "nombre": "Pulidor de Muebles",
            "descripcion": "Deja un acabado brillante en los muebles.",
            "precio": 12000,
            "imagen": "https://dafesa.com/wp-content/uploads/2019/11/Limpiador-muebles-06.jpg",
            "cantidad": 2224
        },
        {
            "id": 1022,
            "nombre": "Spray Quitamanchas",
            "descripcion": "Para tratar manchas en ropa.",
            "precio": 10000,
            "imagen": "https://m.media-amazon.com/images/I/61levC7cZmL._SL1280_.jpg",
            "cantidad": 223
        },
        {
            "id": 1023,
            "nombre": "Fórmula de Limpieza Ecológica",
            "descripcion": "Limpieza efectiva y amigable con el medio ambiente.",
            "precio": 15000,
            "imagen": "https://sgfm.elcorteingles.es/SGFM/dctm/MEDIA03/202210/31/00128013200945____9__325x325.jpg",
            "cantidad": 224
        },
        {
            "id": 1024,
            "nombre": "Papel Higiénico",
            "descripcion": "Suave y resistente.",
            "precio": 5000,
            "imagen": "https://lirp.cdn-website.com/1a6c14d7/dms3rep/multi/opt/image007-640w.jpg",
            "cantidad": 225
        },
        {
            "id": 1025,
            "nombre": "Limpiador de Olores",
            "descripcion": "Neutraliza olores desagradables.",
            "precio": 10000,
            "imagen": "https://images.ctfassets.net/tcoigcjw85h2/48LDdMs6CUi1Dzu1CFjWaX/d8c24b11087cd05efbdabb90110730d2/eliminador-olores-bano-aires-lavanda.png",
            "cantidad": 223465
        },
        {
            "id": 1026,
            "nombre": "Guantes de Cocina",
            "descripcion": "Protege tus manos mientras cocinas.",
            "precio": 8000,
            "imagen": "https://estra.vtexassets.com/arquivos/ids/182775/4-1049699_Guante-Para-Cocina-De-Silicona-.jpg?v=638405948876200000",
            "cantidad": 225
        },
        {
            "id": 1027,
            "nombre": "Detergente en Cápsulas",
            " descripcion": "Cápsulas para una dosificación precisa.",
            "precio": 18000,
            "imagen": "https://m.media-amazon.com/images/I/61U9J0JUcSL._AC_UF1000,1000_QL80_.jpg",
            "cantidad": 225
        },
        {
            "id": 1028,
            "nombre": "Limpiador de Cristales",
            "descripcion": "Para una limpieza rápida y efectiva.",
            "precio": 12000,
            "imagen": "https://cdn1.totalcommerce.cloud/homesentry/product-zoom/es/limpiador-vidrios-antiempanante-citrus-azul-1.webp",
            "cantidad": 227
        },
        {
            "id": 1029,
            "nombre": "Limpiador para Horno",
            "descripcion": "Elimina grasa y suciedad del horno.",
            "precio": 15000,
            "imagen": "https://maxitenjo.com.co/cdn/shop/products/limpiahornos-magistral-x-180-gr-1_800x.jpg?v=1597944051",
            "cantidad": 227
        },
        {
            "id": 1030,
            "nombre": "Cubo de Limpieza",
            "descripcion": "Cubo para el trapeador.",
            "precio": 20000,
            "imagen": "https://m.media-amazon.com/images/I/514t+vjLjhL._AC_UF350,350_QL80_.jpg",
            "cantidad": 227
        },
        {
            "id": 1031,
            "nombre": "Limpiador de Cocina",
            "descripcion": "Fórmula para limpiar la cocina a fondo.",
            "precio": 22000,
            "imagen": "https://m.media-amazon.com/images/I/81m7e1N8pzL._AC_UF894,1000_QL80_.jpg",
            "cantidad": 226
        },
        {
            "id": 1032,
            "nombre": "Desinfectante de Superficies",
            "descripcion": "Para desinfectar todas las superficies del hogar.",
            "precio": 20000,
            "imagen": "https://www.cif.com.ar/images/h0nadbhvm6m4/4rugFP9MsKKtwD5URTFc2t/45cd0c51f72b52b0f799a1734d64b21c/Q2lmX0dhdGlsbG9fRGVzaW5mZWN0YW50ZS5wbmc/1100w-1100h/cif-limpiador-l%C3%ADquido-desinfectante-de-superficies.jpg",
            "cantidad": 2234
        },
        {
            "id": 1033,
            "nombre": "Paños de Papel",
            "descripcion": "Ideales para limpieza y desinfección.",
            "precio": 5000,
            "imagen": "https://maken.com.co/wp-content/uploads/2020/08/toallas-para-manos-maken-copia.jpg",
            "cantidad": 226
        },
        {
            "id": 1035,
            "nombre": "Limpiador de Pisos de Madera",
            "descripcion": "Para limpiar y proteger pisos de madera.",
            "precio": 18000,
            "imagen": "https://http2.mlstatic.com/D_NQ_NP_751831-MLU76259015857_052024-O.webp",
            "cantidad": 223
        },
        {
            "id": 1036,
            "nombre": "Limpiador de Tapicería",
            "descripcion": "Elimina manchas en muebles tapizados.",
            "precio": 22000,
            "imagen": "https://www.velky.store/wp-content/uploads/2020/05/upholstery-cleaner-32oz-1518x1518.jpg",
            "cantidad": 2234
        },
        {
            "id": 1037,
            "nombre": "Desinfectante para Manos",
            "descripcion": "Gel desinfectante para manos.",
            "precio": 6000,
            "imagen": "https://holandinacolombia.com/wp-content/uploads/2024/01/geldin-a-gel-antibacterial-antiseptico-holandina-500ml.jpg",
            "cantidad": 287
        },
        {
            "id": 1038,
            "nombre": "Limpiador de Parrillas",
            "descripcion": "Para una limpieza profunda de parrillas.",
            "precio": 15000,
            "imagen": "https://charbroil.com.co/wp-content/uploads/2019/06/Limpiador-de-parrilla-8416558R06-2.jpg",
            "cantidad": 296
        },
        {
            "id": 1039,
            "nombre": "Limpiador de Cerámica",
            "descripcion": "Fórmula eficaz para limpiar cerámica.",
            "precio": 10000,
            "imagen": "https://olimpica.vtexassets.com/arquivos/ids/1319642/7702155028603.jpg?v=638446432011470000",
            "cantidad": 267
        },
        {
            "id": 1040,
            "nombre": "Limpieza de Vapor",
            "descripcion": "Limpiador a vapor para eliminar gérmenes.",
            "precio": 100000,
            "imagen": "https://exitocol.vtexassets.com/arquivos/ids/18843320/maquina-a-vapor-limpieza-para-casa-5-en-1.jpg?v=638217469392570000",
            "cantidad": 295
        },
        {
            "id": 1041,
            "nombre": "Limpiador de Olores para Mascotas",
            "descripcion": "Neutraliza olores causados por mascotas.",
            "precio": 15000,
            "imagen": "https://www.faggidistribuciones.com.co/wp-content/uploads/2018/07/eliminador-de-olores-mascotas-brizze-320-ml.jpg",
            "cantidad": 223
        },
        {
            "id": 1042,
            "nombre": "Pasta para Ceras",
            "descripcion": "Para abrillantar pisos y muebles.",
            "precio": 20000,
            "imagen": "https://pulitocarwash.co/wp-content/uploads/2020/07/IMG_0047.jpg",
            "cantidad": 2943
        },
        {
            "id": 1043,
            "nombre": "Bolsa para Reciclaje",
            "descripcion": "Para la separación de residuos reciclables.",
            "precio": 8000,
            "imagen": "https://i0.wp.com/stopbasura.com/wp-content/uploads/2023/01/foto2.jpg?fit=800%2C800&ssl=1",
            "cantidad": 223
        },
        {
            "id": 1044,
            "nombre": "Desinfectante para Juguetes",
            "descripcion": "Para desinfectar juguetes infantiles.",
            "precio": 10000,
            "imagen": "https://olimpica.vtexassets.com/arquivos/ids/1240445/image-d31f1fe39c7746d0831864e335cfb132.jpg?v=638369588174300000",
            "cantidad": 2997
        },
        {
            "id": 1045,
            "nombre": "Raspador de Suciedad",
            "descripcion": "Raspador para eliminar suciedad resistente.",
            "precio": 5000,
            "imagen": "https://img.kwcdn.com/product/open/2023-12-28/1703747008180-093f36faf6814c2fbf4eb9cc6f383fd1-goods.jpeg?imageMogr2/auto-orient%7CimageView2/2/w/800/q/70/format/webp",
            "cantidad": 294
        },
        {
            "id": 1046,
            "nombre": "Limpiador de Alfombra en Espuma",
            "descripcion": "Espuma para limpiar alfombras.",
            "precio": 15000,
            "imagen": "https://chedrauimx.vtexassets.com/arquivos/ids/36627744/7501066200043_02.jpg?v=638630624760430000",
            "cantidad": 296
        },
        {
            "id": 1047,
            "nombre": "Cera para Pisos",
            "descripcion": "Para abrillantar y proteger pisos.",
            "precio": 12000,
            "imagen": "https://olimpica.vtexassets.com/arquivos/ids/611026/7701008227446.jpg?v=637626512766570000",
            "cantidad": 294
        },
        {
            "id": 1048,
            "nombre": "Toallas de Papel",
            "descripcion": "Absorbentes y prácticas.",
            "precio": 7000,
            "imagen": "https://olimpica.vtexassets.com/arquivos/ids/1047689/image-945595bdf6b545988676506a6a8a5c84.jpg?v=638119997170930000",
            "cantidad": 242
        },
        {
            "id": 1049,
            "nombre": "Pañales Desechables",
            "descripcion": "Para la comodidad de los bebés.",
            "precio": 40000,
            "imagen": "https://www.ipetplace.com.co/wp-content/uploads/2023/10/PanalesDesechablesxl.jpg",
            "cantidad": 2923
        }


    ];

/*=========== Comprobación y Carga Inicial ===========*/
if (!localStorage.getItem('productos')) {
    localStorage.setItem('productos', JSON.stringify(productosIniciales));
}

/*=========== Función para cargar productos desde el JSON ===========*/
async function cargarProductos() {
    try {
        const response = await fetch('productos.json'); // Asegúrate de que la ruta sea correcta
        if (!response.ok) {
            throw new Error('Error al cargar productos');
        }
        productos = await response.json();

        // Guardar los productos en localStorage
        guardarEnLocalStorage(productos);

        mostrarProductos(productos); // Llama a la función para mostrar productos después de cargarlos
    } catch (error) {
        console.error(error);
    }
}


/*=========== Función para guardar productos en localStorage ===========*/
function guardarEnLocalStorage(productos) {
    localStorage.setItem('productos', JSON.stringify(productos)); // Convierte el array a JSON y lo guarda
}

/*=========== Función para mostrar productos en el DOM ===========*/
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
            <button onclick="verDetalleProducto(${producto.id})">Ver Detalles</button>
            <button onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
        `;
        contenedor.appendChild(divProducto);
    });
}

/*=========== Función para agregar productos al carrito ===========*/
function agregarAlCarrito(productoId) {
    const producto = productos.find(p => p.id === productoId);
    if (producto) {
        producto.cantidad = (producto.cantidad || 0) + 1; // Maneja la cantidad del producto
        Swal.fire({
            title: 'Producto agregado',
            text: `${producto.nombre} ha sido agregado al carrito.`,
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });
    }
}

/*=========== Función para mostrar detalles del producto en una modal ===========*/
function verDetalleProducto(productoId) {
    const producto = productos.find(p => p.id === productoId);
    if (producto) {
        document.getElementById('nombreProducto').innerText = producto.nombre;
        document.getElementById('imagenProducto').src = producto.imagen;
        document.getElementById('descripcionProducto').innerText = producto.descripcion;
        document.getElementById('precioProducto').innerText = producto.precio.toLocaleString('es-CO');
        document.getElementById('cantidadProducto').innerText = producto.cantidad;
        // Mostrar la modal
        document.getElementById('modalProducto').style.display = 'block';
    }
}

/*=========== Función para cerrar la modal ===========*/
function cerrarModal() {
    document.getElementById('modalProducto').style.display = 'none';
}

/*=========== Cerrar la modal si se hace clic fuera de ella ===========*/
window.onclick = function (event) {
    const modal = document.getElementById('modalProducto');
    if (event.target === modal) {
        cerrarModal();
    }
}

/*=========== Funciones para gestionar productos de limpieza en localStorage ===========*/
function guardarProductosEnLocalStorage() {
    localStorage.setItem('productosDeLimpieza', JSON.stringify(productosDeLimpieza));
}

//================================= Recuperar productos de limpieza desde localStorage======================
function recuperarProductosDesdeLocalStorage() {
    const productosGuardados = localStorage.getItem('productosDeLimpieza');
    return productosGuardados ? JSON.parse(productosGuardados) : [];
}
/*=========== Función para agregar productos de limpieza al carrito ===========*/
function agregarAlCarritoLimpieza(id) {
    const producto = productosDeLimpieza.find(item => item.id === id);
    if (producto) {
        // Obtener el carrito actual del localStorage o inicializar uno nuevo
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

        // Verificar si el producto ya está en el carrito
        const productoEnCarrito = carrito.find(item => item.id === producto.id);
        if (productoEnCarrito) {
            // Si el producto ya existe, aumentar la cantidad
            productoEnCarrito.cantidad++;
        } else {
            // Si no existe, agregarlo al carrito
            carrito.push({ ...producto, cantidad: 1 });
        }

        // Guardar el carrito actualizado en localStorage
        localStorage.setItem('carrito', JSON.stringify(carrito));
        alert(`Producto agregado al carrito: ${producto.nombre}`);
    }
}

/*=========== Función para filtrar productos ===========*/
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

/*=========== Evento del botón de filtrado ===========*/
document.getElementById("filterButton").addEventListener("click", filtrarProductos);


/*=========== Limpiar filtros ===========*/
document.getElementById('clearFilters').onclick = function () {
    document.getElementById('buscador').value = '';
    document.getElementById('min-precio').value = '';
    document.getElementById('max-precio').value = '';
    mostrarProductos(productosDeLimpieza); // Mostrar todos los productos al limpiar filtros
};

/*=========== Cargar los productos desde el JSON al cargar la página ===========*/
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

/*=========== Inicializar la aplicación ===========*/
function inicializar() {
    mostrarProductos(recuperarProductosDesdeLocalStorage()); // Mostrar los productos guardados en localStorage
}

/*=========== Llamar a la función para cargar productos al cargar la página ===========*/
document.addEventListener("DOMContentLoaded", cargarProductos);
