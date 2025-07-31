# 🛒 Tienda Moderna - Backend API

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.18+-blue.svg)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.7+-purple.svg)](https://prisma.io/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0+-orange.svg)](https://mysql.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Backend API completo para Tienda Moderna - Una plataforma de e-commerce moderna construida con Node.js, Express.js, Prisma y MySQL que soporta las **27 páginas del frontend** al 100%.

## 🌟 Características Principales

### 🔐 **Autenticación y Seguridad**
- ✅ **JWT Authentication** con refresh tokens
- ✅ **Bcrypt** para hash de contraseñas
- ✅ **Rate limiting** y protección CORS
- ✅ **Helmet** para headers de seguridad
- ✅ **Validación de datos** con express-validator

### 🗄️ **Base de Datos**
- ✅ **MySQL 8.0** como base de datos principal
- ✅ **Prisma ORM** para manejo de datos
- ✅ **Migraciones** automáticas
- ✅ **Seeders** para datos de prueba
- ✅ **Relaciones complejas** entre modelos

### 📦 **API Endpoints Completos**
- ✅ **Autenticación** (registro, login, refresh tokens)
- ✅ **Usuarios** (perfil, direcciones, configuraciones)
- ✅ **Productos** (CRUD, búsqueda, filtros)
- ✅ **Categorías y Marcas** (gestión jerárquica)
- ✅ **Carrito de Compras** (persistente, validaciones)
- ✅ **Lista de Deseos** (gestión completa)
- ✅ **Órdenes** (checkout, estados, historial)
- ✅ **Reviews** (calificaciones, moderación)
- ✅ **Búsqueda Avanzada** (filtros, sugerencias)
- ✅ **Upload de Archivos** (imágenes, documentos)
- ✅ **Analytics** (dashboard, reportes)
- ✅ **Administración** (panel completo)

### ⚡ **Performance y Escalabilidad**
- ✅ **Paginación** en todas las consultas
- ✅ **Caching** con Redis (opcional)
- ✅ **Compresión** de respuestas
- ✅ **Logging** estructurado con Winston
- ✅ **Error handling** centralizado

### 📧 **Servicios Externos**
- ✅ **Email Service** (SendGrid/SMTP)
- ✅ **File Upload** con Multer
- ✅ **Image Processing** (Sharp - opcional)
- ✅ **Payment Integration** ready (Stripe/PayU)

## 🏗️ Arquitectura

### **Stack Tecnológico**
- **Runtime**: Node.js 18+
- **Framework**: Express.js 4.18+
- **Database**: MySQL 8.0
- **ORM**: Prisma 5.7+
- **Authentication**: JWT + Bcrypt
- **Validation**: Express-validator + Joi
- **File Upload**: Multer + Sharp
- **Email**: Nodemailer
- **Logging**: Winston
- **Testing**: Vitest + Supertest

### **Estructura del Proyecto**
```
tienda-moderna-backend/
├── src/
│   ├── config/           # Configuraciones
│   │   └── database.js   # Configuración de Prisma
│   ├── middleware/       # Middleware personalizado
│   │   ├── auth.js       # Autenticación JWT
│   │   ├── upload.js     # Upload de archivos
│   │   ├── errorHandler.js
│   │   └── logger.js
│   ├── routes/           # Rutas de la API
│   │   ├── auth.js       # Autenticación
│   │   ├── users.js      # Usuarios
│   │   ├── products.js   # Productos
│   │   ├── categories.js # Categorías
│   │   ├── brands.js     # Marcas
│   │   ├── cart.js       # Carrito
│   │   ├── wishlist.js   # Lista de deseos
│   │   ├── orders.js     # Órdenes
│   │   ├── reviews.js    # Reviews
│   │   ├── search.js     # Búsqueda
│   │   ├── upload.js     # Upload
│   │   ├── analytics.js  # Analytics
│   │   └── admin.js      # Administración
│   ├── services/         # Servicios
│   │   └── emailService.js
│   ├── utils/            # Utilidades
│   │   ├── logger.js     # Sistema de logging
│   │   ├── errors.js     # Manejo de errores
│   │   ├── tokens.js     # Utilidades de tokens
│   │   └── orderUtils.js # Utilidades de órdenes
│   └── server.js         # Servidor principal
├── prisma/
│   ├── schema.prisma     # Esquema de base de datos
│   └── seed.js           # Datos de prueba
├── uploads/              # Archivos subidos
├── logs/                 # Logs del sistema
├── docker-compose.yml    # Docker setup
├── Dockerfile           # Docker image
└── package.json         # Dependencias
```

## 🚀 Inicio Rápido

### **Prerrequisitos**
- Node.js 18+
- MySQL 8.0+
- npm o pnpm

### **Instalación**

1. **Clonar el repositorio**
```bash
git clone https://github.com/username/tienda-moderna-backend.git
cd tienda-moderna-backend
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env
```

Editar `.env` con tus configuraciones:
```env
# Database
DATABASE_URL="mysql://username:password@localhost:3306/tienda_moderna"

# JWT Secrets
JWT_SECRET=your-super-secret-jwt-key
JWT_REFRESH_SECRET=your-super-secret-refresh-key

# Email
SENDGRID_API_KEY=your-sendgrid-api-key
FROM_EMAIL=noreply@tiendamoderna.com
```

4. **Configurar base de datos**
```bash
# Generar cliente Prisma
npx prisma generate

# Ejecutar migraciones
npx prisma migrate dev

# Poblar con datos de prueba
npx prisma db seed
```

5. **Iniciar servidor**
```bash
# Desarrollo
npm run dev

# Producción
npm start
```

### **Con Docker**
```bash
# Iniciar todos los servicios
docker-compose up -d

# Ver logs
docker-compose logs -f api
```

## 📚 API Documentation

### **Base URL**
```
http://localhost:3001/api
```

### **Endpoints Principales**

#### **Autenticación**
```http
POST /api/auth/register     # Registro de usuario
POST /api/auth/login        # Inicio de sesión
POST /api/auth/refresh      # Renovar token
POST /api/auth/logout       # Cerrar sesión
GET  /api/auth/me          # Usuario actual
```

#### **Productos**
```http
GET    /api/products           # Listar productos
GET    /api/products/featured  # Productos destacados
GET    /api/products/new       # Productos nuevos
GET    /api/products/:id       # Producto específico
POST   /api/products           # Crear producto (Admin)
PUT    /api/products/:id       # Actualizar producto (Admin)
DELETE /api/products/:id       # Eliminar producto (Admin)
```

#### **Carrito**
```http
GET    /api/cart              # Ver carrito
POST   /api/cart/items        # Agregar al carrito
PUT    /api/cart/items/:id    # Actualizar cantidad
DELETE /api/cart/items/:id    # Remover del carrito
DELETE /api/cart              # Vaciar carrito
```

#### **Órdenes**
```http
GET  /api/orders              # Historial de órdenes
GET  /api/orders/:id          # Orden específica
POST /api/orders              # Crear orden
PATCH /api/orders/:id/cancel  # Cancelar orden
```

### **Autenticación**
Incluir en headers:
```http
Authorization: Bearer <access_token>
```

## 🧪 Testing

```bash
# Ejecutar tests
npm test

# Tests con coverage
npm run test:coverage

# Tests end-to-end
npm run test:e2e
```

## 📊 Monitoreo y Logs

### **Logs**
Los logs se guardan en:
- `logs/combined.log` - Todos los logs
- `logs/error.log` - Solo errores

### **Health Check**
```http
GET /health
```

### **Métricas**
```http
GET /api/analytics/dashboard  # Dashboard completo (Admin)
GET /api/analytics/sales      # Métricas de ventas (Admin)
```

## 🔧 Configuración Avanzada

### **Variables de Entorno**
Ver `.env.example` para todas las opciones disponibles.

### **Base de Datos**
```bash
# Reset completo
npx prisma migrate reset

# Solo migraciones
npx prisma migrate deploy

# Prisma Studio (GUI)
npx prisma studio
```

### **Producción**
```bash
# Build
npm run build

# Iniciar
npm start
```

## 🐳 Docker

### **Desarrollo**
```bash
docker-compose up -d
```

### **Producción**
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## 🤝 Contribución

1. Fork el proyecto
2. Crear rama feature (`git checkout -b feature/amazing-feature`)
3. Commit cambios (`git commit -m 'Add amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 👥 Equipo

- **Backend Developer** - [Tu Nombre](https://github.com/username)

## 🆘 Soporte

- 📧 Email: support@tiendamoderna.com
- 📱 Issues: [GitHub Issues](https://github.com/username/tienda-moderna-backend/issues)
- 📖 Docs: [API Documentation](https://api.tiendamoderna.com/docs)

---

**¡Gracias por usar Tienda Moderna Backend! 🚀**
