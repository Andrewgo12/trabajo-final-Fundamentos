#!/bin/bash

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Iniciando Tienda Moderna - Desarrollo${NC}"
echo "=================================================="

# Verificar configuración
echo -e "${BLUE}🔍 Verificando configuración...${NC}"
node verify-setup.js
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Se encontraron problemas en la configuración${NC}"
    echo -e "${RED}   Revisa los errores anteriores antes de continuar${NC}"
    exit 1
fi
echo ""

# Función para verificar si un puerto está en uso
check_port() {
    local port=$1
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null ; then
        return 0
    else
        return 1
    fi
}

# Función para matar procesos en un puerto
kill_port() {
    local port=$1
    echo -e "${YELLOW}🔄 Liberando puerto $port...${NC}"
    lsof -ti:$port | xargs kill -9 2>/dev/null || true
    sleep 2
}

# Verificar dependencias
echo -e "${BLUE}📦 Verificando dependencias...${NC}"

# Verificar Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js no está instalado${NC}"
    exit 1
fi

# Verificar npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm no está instalado${NC}"
    exit 1
fi

# Verificar MySQL
if ! command -v mysql &> /dev/null; then
    echo -e "${YELLOW}⚠️  MySQL no está instalado o no está en PATH${NC}"
    echo -e "${YELLOW}   Asegúrate de que MySQL esté ejecutándose${NC}"
fi

echo -e "${GREEN}✅ Dependencias verificadas${NC}"

# Limpiar puertos si están en uso
if check_port 3000; then
    echo -e "${YELLOW}⚠️  Puerto 3000 en uso${NC}"
    kill_port 3000
fi

if check_port 3001; then
    echo -e "${YELLOW}⚠️  Puerto 3001 en uso${NC}"
    kill_port 3001
fi

# Instalar dependencias del backend si no existen
echo -e "${BLUE}📦 Verificando dependencias del backend...${NC}"
cd tienda-moderna-backend
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}📦 Instalando dependencias del backend...${NC}"
    npm install
fi

# Verificar archivo .env del backend
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}⚠️  Archivo .env no encontrado en backend${NC}"
    echo -e "${YELLOW}   Copiando .env.example a .env...${NC}"
    cp .env.example .env
    echo -e "${RED}🔧 IMPORTANTE: Configura las variables de entorno en tienda-moderna-backend/.env${NC}"
fi

# Generar cliente Prisma
echo -e "${BLUE}🔄 Generando cliente Prisma...${NC}"
npx prisma generate

# Ejecutar migraciones
echo -e "${BLUE}🗄️  Ejecutando migraciones de base de datos...${NC}"
npx prisma migrate dev --name init || {
    echo -e "${YELLOW}⚠️  Error en migraciones. Intentando push...${NC}"
    npx prisma db push
}

# Poblar base de datos con datos de prueba
echo -e "${BLUE}🌱 Poblando base de datos con datos de prueba...${NC}"
npm run prisma:seed

cd ..

# Instalar dependencias del frontend si no existen
echo -e "${BLUE}📦 Verificando dependencias del frontend...${NC}"
cd tienda-moderna
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}📦 Instalando dependencias del frontend...${NC}"
    npm install
fi

# Verificar archivo .env del frontend
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}⚠️  Archivo .env no encontrado en frontend${NC}"
    echo -e "${YELLOW}   Copiando .env.example a .env...${NC}"
    cp .env.example .env
fi

cd ..

# Crear directorios necesarios
mkdir -p tienda-moderna-backend/uploads
mkdir -p tienda-moderna-backend/logs

echo -e "${GREEN}✅ Configuración completada${NC}"
echo ""
echo -e "${BLUE}🚀 Iniciando servidores...${NC}"

# Función para manejar la señal de interrupción
cleanup() {
    echo -e "\n${YELLOW}🛑 Deteniendo servidores...${NC}"
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    exit 0
}

# Configurar trap para cleanup
trap cleanup SIGINT SIGTERM

# Iniciar backend en segundo plano
echo -e "${BLUE}🔧 Iniciando backend en puerto 3001...${NC}"
cd tienda-moderna/backend
node server.js &
BACKEND_PID=$!
cd ..

# Esperar un poco para que el backend inicie
sleep 5

# Iniciar frontend en segundo plano
echo -e "${BLUE}🎨 Iniciando frontend en puerto 3000...${NC}"
cd tienda-moderna
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo -e "${GREEN}🎉 ¡Tienda Moderna iniciada correctamente!${NC}"
echo "=================================================="
echo -e "${GREEN}📱 Frontend:${NC} http://localhost:3000"
echo -e "${GREEN}🔧 Backend:${NC}  http://localhost:3001"
echo -e "${GREEN}🗄️  API:${NC}      http://localhost:3001/api"
echo -e "${GREEN}📊 Health:${NC}   http://localhost:3001/health"
echo ""
echo -e "${YELLOW}💡 Presiona Ctrl+C para detener ambos servidores${NC}"
echo ""

# Esperar a que ambos procesos terminen
wait $BACKEND_PID $FRONTEND_PID
