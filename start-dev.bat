@echo off
setlocal enabledelayedexpansion

echo.
echo ========================================
echo 🚀 Iniciando Tienda Moderna - Desarrollo
echo ========================================
echo.

:: Verificar configuración
echo 🔍 Verificando configuración...
node verify-setup.js
if errorlevel 1 (
    echo.
    echo ❌ Se encontraron problemas en la configuración
    echo    Revisa los errores anteriores antes de continuar
    pause
    exit /b 1
)
echo.

:: Verificar Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js no está instalado
    pause
    exit /b 1
)

:: Verificar npm
npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ npm no está instalado
    pause
    exit /b 1
)

echo ✅ Dependencias verificadas
echo.

:: Matar procesos en puertos 3000 y 3001 si existen
echo 🔄 Liberando puertos...
for /f "tokens=5" %%a in ('netstat -aon ^| find ":3000" ^| find "LISTENING"') do taskkill /f /pid %%a >nul 2>&1
for /f "tokens=5" %%a in ('netstat -aon ^| find ":3001" ^| find "LISTENING"') do taskkill /f /pid %%a >nul 2>&1

:: Configurar backend
echo 📦 Configurando backend...
cd tienda-moderna\backend

:: Instalar dependencias del backend si no existen
if not exist "node_modules" (
    echo 📦 Instalando dependencias del backend...
    call npm install
)

:: Verificar archivo .env del backend
if not exist ".env" (
    echo ⚠️  Archivo .env no encontrado en backend
    echo    Copiando .env.example a .env...
    copy .env.example .env >nul
    echo 🔧 IMPORTANTE: Configura las variables de entorno en tienda-moderna-backend/.env
)

:: Backend simplificado - no necesita Prisma
echo ✅ Backend Node.js simplificado listo

:: Ejecutar migraciones
echo 🗄️  Ejecutando migraciones de base de datos...
call npx prisma migrate dev --name init
if errorlevel 1 (
    echo ⚠️  Error en migraciones. Intentando push...
    call npx prisma db push
)

:: Poblar base de datos
echo 🌱 Poblando base de datos con datos de prueba...
call npm run prisma:seed

cd ..

:: Configurar frontend
echo 📦 Configurando frontend...
cd tienda-moderna

:: Instalar dependencias del frontend si no existen
if not exist "node_modules" (
    echo 📦 Instalando dependencias del frontend...
    call npm install
)

:: Verificar archivo .env del frontend
if not exist ".env" (
    echo ⚠️  Archivo .env no encontrado en frontend
    echo    Copiando .env.example a .env...
    copy .env.example .env >nul
)

cd ..

:: Crear directorios necesarios
if not exist "tienda-moderna\backend\uploads" mkdir tienda-moderna\backend\uploads
if not exist "tienda-moderna\backend\logs" mkdir tienda-moderna\backend\logs

echo.
echo ✅ Configuración completada
echo.
echo 🚀 Iniciando servidores...
echo.

:: Iniciar backend
echo 🔧 Iniciando backend en puerto 3001...
cd tienda-moderna\backend
start "Backend - Tienda Moderna" cmd /k "node server.js"
cd ..\..

:: Esperar un poco
timeout /t 5 /nobreak >nul

:: Iniciar frontend
echo 🎨 Iniciando frontend en puerto 3000...
cd tienda-moderna
start "Frontend - Tienda Moderna" cmd /k "npm run dev"
cd ..

echo.
echo ========================================
echo 🎉 ¡Tienda Moderna iniciada correctamente!
echo ========================================
echo 📱 Frontend: http://localhost:3000
echo 🔧 Backend:  http://localhost:3001
echo 🗄️  API:      http://localhost:3001/api
echo 📊 Health:   http://localhost:3001/health
echo.
echo 💡 Se abrieron dos ventanas de terminal
echo    Una para el backend y otra para el frontend
echo.
pause
