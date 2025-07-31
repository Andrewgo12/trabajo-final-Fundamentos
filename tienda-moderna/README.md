# 🧽 Tienda Moderna - E-commerce de Productos de Limpieza

Una tienda virtual moderna y completa especializada en productos de limpieza para el hogar y oficina, desarrollada con React, Tailwind CSS y las mejores prácticas de desarrollo web.

## 🚀 Características Principales

### ✨ Funcionalidades Completas
- **Catálogo de Productos**: Más de 50 productos de limpieza organizados por categorías
- **Búsqueda Avanzada**: Con sugerencias, historial y filtros inteligentes
- **Carrito de Compras**: Persistente con LocalStorage y cálculos automáticos
- **Lista de Deseos**: Guardar productos favoritos
- **Sistema de Usuarios**: Registro, login, perfil y gestión de direcciones
- **Proceso de Checkout**: Completo con múltiples métodos de pago
- **Gestión de Pedidos**: Historial y seguimiento de órdenes
- **Blog Educativo**: Artículos sobre limpieza y cuidado del hogar

### 🎨 Diseño y UX
- **Responsive Design**: Optimizado para móvil, tablet y desktop
- **Animaciones Suaves**: Implementadas con Framer Motion
- **Componentes Reutilizables**: Sistema de diseño consistente
- **Accesibilidad**: ARIA labels y navegación por teclado
- **SEO Optimizado**: Meta tags y estructura semántica

### 🛠️ Tecnologías Utilizadas
- **Frontend**: React 18, React Router DOM
- **Estilos**: Tailwind CSS con configuración personalizada
- **Animaciones**: Framer Motion
- **Estado**: Context API + Zustand para estado global
- **Formularios**: React Hook Form + Zod para validación
- **Iconos**: Lucide React
- **Build Tool**: Vite

## 📁 Estructura del Proyecto

```
tienda-moderna/
├── public/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── ui/              # Componentes base reutilizables
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Toast.jsx
│   │   │   ├── Loading.jsx
│   │   │   ├── ErrorDisplay.jsx
│   │   │   ├── Pagination.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── Filters.jsx
│   │   │   └── ...
│   │   ├── layout/          # Componentes de layout
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Layout.jsx
│   │   │   └── Navigation.jsx
│   │   ├── product/         # Componentes de productos
│   │   │   └── ProductCard.jsx
│   │   └── modals/          # Modales especializados
│   │       ├── ProductQuickView.jsx
│   │       ├── ConfirmationModal.jsx
│   │       └── NotificationModal.jsx
│   ├── pages/               # Páginas de la aplicación
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── Profile.jsx
│   │   ├── Orders.jsx
│   │   ├── Wishlist.jsx
│   │   ├── Blog.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   └── ...
│   ├── context/             # Contextos de React
│   │   ├── AuthContext.jsx
│   │   ├── CartContext.jsx
│   │   └── WishlistContext.jsx
│   ├── stores/              # Stores de Zustand
│   │   └── useStore.js
│   ├── hooks/               # Hooks personalizados
│   │   └── useProducts.js
│   ├── services/            # Servicios y API
│   │   └── api.js
│   ├── data/                # Datos mock
│   │   └── products.js
│   ├── utils/               # Utilidades
│   │   └── cn.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd tienda-moderna
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Iniciar el servidor de desarrollo**
```bash
npm run dev
```

4. **Abrir en el navegador**
```
http://localhost:5173
```

### Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia el servidor de desarrollo

# Producción
npm run build        # Construye la aplicación para producción
npm run preview      # Previsualiza la build de producción

# Linting
npm run lint         # Ejecuta ESLint
```

## 🛍️ Funcionalidades Detalladas

### Catálogo de Productos
- **Categorías**: Multiusos, Cocina, Baño, Pisos, Lavandería, Cristales, Desinfectantes, Eco-Amigables
- **Marcas**: CleanMaster Pro, EcoClean Natural, PowerClean Industrial, FreshHome, AquaPure, SparkleMax
- **Filtros**: Por categoría, marca, precio, calificación, características especiales
- **Ordenamiento**: Por nombre, precio, calificación, popularidad, descuentos

### Sistema de Usuarios
- **Registro y Login**: Con validación completa
- **Perfil de Usuario**: Gestión de datos personales
- **Direcciones**: Múltiples direcciones de envío
- **Historial de Pedidos**: Seguimiento completo de órdenes

### Carrito y Checkout
- **Carrito Persistente**: Se mantiene entre sesiones
- **Cálculos Automáticos**: Subtotal, descuentos, envío, total
- **Cupones de Descuento**: Sistema de promociones
- **Múltiples Métodos de Pago**: Tarjetas, PSE, efectivo
- **Cálculo de Envío**: Por zonas de Colombia

### Experiencia de Usuario
- **Búsqueda Inteligente**: Con sugerencias y autocompletado
- **Vista Rápida**: Modal de productos sin salir del catálogo
- **Comparación**: Comparar hasta 4 productos
- **Visto Recientemente**: Historial de productos visitados
- **Notificaciones**: Sistema de toast para feedback

## 🎨 Sistema de Diseño

### Colores Principales
- **Primary**: Azul (#2563eb)
- **Secondary**: Gris (#64748b)
- **Accent**: Magenta (#d946ef)
- **Success**: Verde (#22c55e)
- **Warning**: Amarillo (#f59e0b)
- **Error**: Rojo (#ef4444)

### Componentes UI
Todos los componentes siguen un patrón consistente con:
- Variantes múltiples (primary, secondary, outline, ghost)
- Tamaños responsivos (sm, md, lg, xl)
- Estados interactivos (hover, focus, disabled, loading)
- Animaciones suaves con Framer Motion

## 📱 Responsive Design

La aplicación está optimizada para:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

Con breakpoints personalizados:
- `xs`: 475px
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px
- `3xl`: 1600px

## 🔧 Configuración Avanzada

### Variables de Entorno
Crear un archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=Tienda Moderna
VITE_STRIPE_PUBLIC_KEY=pk_test_...
```

### Personalización de Tailwind
El archivo `tailwind.config.js` incluye:
- Paleta de colores personalizada
- Fuentes tipográficas (Inter, Poppins)
- Espaciado y tamaños extendidos
- Animaciones personalizadas
- Sombras y efectos especiales

## 🚀 Despliegue

### Vercel (Recomendado)
```bash
npm run build
vercel --prod
```

### Netlify
```bash
npm run build
# Subir la carpeta dist/
```

### Servidor Propio
```bash
npm run build
# Servir la carpeta dist/ con nginx o apache
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Soporte

Para soporte técnico o consultas:
- Email: soporte@tiendamoderna.com
- WhatsApp: +57 300 123 4567
- Horario: Lunes a Viernes 8:00 AM - 6:00 PM

---

**Desarrollado con ❤️ para Colombia** 🇨🇴
