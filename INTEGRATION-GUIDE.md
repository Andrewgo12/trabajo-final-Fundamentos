# 🔗 Guía de Integración - Tienda Moderna

Esta guía te ayudará a conectar el frontend y backend de Tienda Moderna para que funcionen perfectamente juntos.

## 📋 Prerrequisitos

### Software Requerido
- ✅ **Node.js 18+** - [Descargar](https://nodejs.org/)
- ✅ **MySQL 8.0+** - [Descargar](https://dev.mysql.com/downloads/)
- ✅ **Git** - [Descargar](https://git-scm.com/)

### Verificar Instalación
```bash
node --version    # Debe mostrar v18.x.x o superior
npm --version     # Debe mostrar 9.x.x o superior
mysql --version   # Debe mostrar 8.0.x o superior
```

## 🚀 Inicio Rápido (Automático)

### Opción 1: Script Automático (Recomendado)

**En Windows:**
```bash
# Ejecutar desde la carpeta raíz del proyecto
start-dev.bat
```

**En Linux/Mac:**
```bash
# Ejecutar desde la carpeta raíz del proyecto
./start-dev.sh
```

Este script automáticamente:
- ✅ Verifica dependencias
- ✅ Instala paquetes npm
- ✅ Configura variables de entorno
- ✅ Ejecuta migraciones de base de datos
- ✅ Puebla la base de datos con datos de prueba
- ✅ Inicia ambos servidores

## 🔧 Configuración Manual

### 1. Configurar Base de Datos

```sql
-- Crear base de datos
CREATE DATABASE tienda_moderna;

-- Crear usuario (opcional)
CREATE USER 'tienda_user'@'localhost' IDENTIFIED BY 'tu_password';
GRANT ALL PRIVILEGES ON tienda_moderna.* TO 'tienda_user'@'localhost';
FLUSH PRIVILEGES;
```

### 2. Configurar Backend

```bash
cd tienda-moderna-backend

# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.example .env

# Editar .env con tus configuraciones
# DATABASE_URL="mysql://usuario:password@localhost:3306/tienda_moderna"
# JWT_SECRET=tu-clave-secreta-muy-segura
# JWT_REFRESH_SECRET=tu-clave-refresh-muy-segura

# Generar cliente Prisma
npx prisma generate

# Ejecutar migraciones
npx prisma migrate dev

# Poblar con datos de prueba
npm run prisma:seed

# Iniciar servidor
npm run dev
```

### 3. Configurar Frontend

```bash
cd tienda-moderna

# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.example .env

# El .env ya está configurado para desarrollo local
# VITE_API_URL=http://localhost:3001/api

# Iniciar servidor
npm run dev
```

## 🌐 URLs de Desarrollo

Una vez iniciados ambos servidores:

- **🎨 Frontend**: http://localhost:3000
- **🔧 Backend**: http://localhost:3001
- **📡 API**: http://localhost:3001/api
- **❤️ Health Check**: http://localhost:3001/health
- **🗄️ Prisma Studio**: http://localhost:5555 (ejecutar `npx prisma studio`)

## 🔐 Usuarios de Prueba

El seed crea estos usuarios automáticamente:

### Administrador
- **Email**: admin@tiendamoderna.com
- **Password**: admin123456
- **Rol**: SUPER_ADMIN

### Cliente de Prueba
- **Email**: customer@test.com
- **Password**: customer123
- **Rol**: CUSTOMER

## 📊 Estructura de la API

### Endpoints Principales

```
/api/auth/*          - Autenticación
/api/products/*      - Productos
/api/categories/*    - Categorías
/api/brands/*        - Marcas
/api/cart/*          - Carrito de compras
/api/wishlist/*      - Lista de deseos
/api/orders/*        - Órdenes
/api/reviews/*       - Reseñas
/api/search/*        - Búsqueda
/api/users/*         - Usuarios
/api/upload/*        - Subida de archivos
/api/admin/*         - Administración
/api/analytics/*     - Analíticas
```

## 🔄 Flujo de Autenticación

1. **Registro/Login** → Recibe `accessToken` y `refreshToken`
2. **Requests** → Incluye `Authorization: Bearer <accessToken>`
3. **Token Expira** → Auto-refresh con `refreshToken`
4. **Refresh Falla** → Redirect a login

## 📱 Páginas del Frontend

### Páginas Públicas (27 páginas)
- ✅ Home (`/`)
- ✅ Productos (`/products`)
- ✅ Producto Individual (`/products/:slug`)
- ✅ Categorías (`/categories`)
- ✅ Categoría (`/categories/:slug`)
- ✅ Marcas (`/brands`)
- ✅ Marca (`/brands/:slug`)
- ✅ Búsqueda (`/search`)
- ✅ Login (`/login`)
- ✅ Registro (`/register`)
- ✅ Recuperar Password (`/forgot-password`)
- ✅ Reset Password (`/reset-password`)

### Páginas Privadas
- ✅ Perfil (`/profile`)
- ✅ Direcciones (`/profile/addresses`)
- ✅ Órdenes (`/profile/orders`)
- ✅ Orden (`/profile/orders/:id`)
- ✅ Lista de Deseos (`/wishlist`)
- ✅ Carrito (`/cart`)
- ✅ Checkout (`/checkout`)
- ✅ Confirmación (`/order-confirmation/:id`)

### Páginas Admin
- ✅ Dashboard (`/admin`)
- ✅ Productos Admin (`/admin/products`)
- ✅ Órdenes Admin (`/admin/orders`)
- ✅ Usuarios Admin (`/admin/users`)
- ✅ Analíticas (`/admin/analytics`)

### Páginas Adicionales
- ✅ Sobre Nosotros (`/about`)
- ✅ Contacto (`/contact`)
- ✅ 404 (`/404`)

## 🧪 Testing

### Backend
```bash
cd tienda-moderna-backend
npm test                # Tests unitarios
npm run test:coverage   # Coverage
npm run test:e2e        # Tests E2E
```

### Frontend
```bash
cd tienda-moderna
npm test                # Tests unitarios
npm run test:coverage   # Coverage
```

## 🐛 Solución de Problemas

### Error: Puerto en uso
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9
```

### Error: Base de datos no conecta
1. Verificar que MySQL esté ejecutándose
2. Verificar credenciales en `.env`
3. Verificar que la base de datos existe

### Error: Prisma no encuentra la base de datos
```bash
cd tienda-moderna-backend
npx prisma db push
npx prisma generate
```

### Error: CORS
- Verificar que `FRONTEND_URL` en backend `.env` sea correcto
- Verificar que `VITE_API_URL` en frontend `.env` sea correcto

## 📦 Producción

### Build Frontend
```bash
cd tienda-moderna
npm run build
```

### Build Backend
```bash
cd tienda-moderna-backend
npm run build
```

### Docker
```bash
# Desarrollo
docker-compose up -d

# Producción
docker-compose -f docker-compose.prod.yml up -d
```

## 🤝 Contribución

1. Fork el proyecto
2. Crear rama feature (`git checkout -b feature/amazing-feature`)
3. Commit cambios (`git commit -m 'Add amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abrir Pull Request

## 📞 Soporte

- 📧 **Email**: support@tiendamoderna.com
- 📱 **Issues**: [GitHub Issues](https://github.com/username/tienda-moderna/issues)
- 📖 **Docs**: [Documentación Completa](https://docs.tiendamoderna.com)

---

**¡Listo para desarrollar! 🚀**
