#!/usr/bin/env node

// Script de verificación para asegurar que todo esté configurado correctamente
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 Verificando configuración de Tienda Moderna...\n');

let errors = 0;
let warnings = 0;

// Función para verificar si un archivo existe
const checkFile = (filePath, description, required = true) => {
  const fullPath = path.join(__dirname, filePath);
  if (fs.existsSync(fullPath)) {
    console.log(`✅ ${description}: ${filePath}`);
    return true;
  } else {
    if (required) {
      console.log(`❌ ${description}: ${filePath} - FALTANTE`);
      errors++;
    } else {
      console.log(`⚠️  ${description}: ${filePath} - OPCIONAL`);
      warnings++;
    }
    return false;
  }
};

// Función para verificar si un directorio existe
const checkDirectory = (dirPath, description, required = true) => {
  const fullPath = path.join(__dirname, dirPath);
  if (fs.existsSync(fullPath) && fs.statSync(fullPath).isDirectory()) {
    console.log(`✅ ${description}: ${dirPath}`);
    return true;
  } else {
    if (required) {
      console.log(`❌ ${description}: ${dirPath} - FALTANTE`);
      errors++;
    } else {
      console.log(`⚠️  ${description}: ${dirPath} - OPCIONAL`);
      warnings++;
    }
    return false;
  }
};

// Función para contar archivos en un directorio
const countFiles = (dirPath, extension = '') => {
  try {
    const fullPath = path.join(__dirname, dirPath);
    if (!fs.existsSync(fullPath)) return 0;
    
    const files = fs.readdirSync(fullPath);
    if (extension) {
      return files.filter(file => file.endsWith(extension)).length;
    }
    return files.length;
  } catch (error) {
    return 0;
  }
};

console.log('📁 VERIFICANDO ESTRUCTURA DE ARCHIVOS\n');

// Verificar estructura principal
checkDirectory('tienda-moderna', 'Frontend Directory');
checkDirectory('tienda-moderna-backend', 'Backend Directory');

console.log('\n📦 VERIFICANDO ARCHIVOS DE CONFIGURACIÓN\n');

// Archivos de configuración principales
checkFile('tienda-moderna/package.json', 'Frontend Package.json');
checkFile('tienda-moderna-backend/package.json', 'Backend Package.json');
checkFile('tienda-moderna/vite.config.js', 'Vite Config');
checkFile('tienda-moderna/.env.example', 'Frontend Env Example');
checkFile('tienda-moderna-backend/.env.example', 'Backend Env Example');

// Scripts de inicio
checkFile('start-dev.bat', 'Windows Start Script');
checkFile('start-dev.sh', 'Linux/Mac Start Script');

console.log('\n🎨 VERIFICANDO FRONTEND\n');

// Estructura del frontend
checkDirectory('tienda-moderna/src', 'Frontend Source');
checkDirectory('tienda-moderna/src/components', 'Components Directory');
checkDirectory('tienda-moderna/src/pages', 'Pages Directory');
checkDirectory('tienda-moderna/src/hooks', 'Hooks Directory');
checkDirectory('tienda-moderna/src/services', 'Services Directory');
checkDirectory('tienda-moderna/src/utils', 'Utils Directory');
checkDirectory('tienda-moderna/src/stores', 'Stores Directory');

// Archivos principales del frontend
checkFile('tienda-moderna/src/App.jsx', 'Main App Component');
checkFile('tienda-moderna/src/main.jsx', 'Main Entry Point');
checkFile('tienda-moderna/src/services/apiClient.js', 'API Client');

// Contar páginas
const pagesCount = countFiles('tienda-moderna/src/pages', '.jsx');
console.log(`📄 Páginas encontradas: ${pagesCount}/27`);

if (pagesCount >= 27) {
  console.log('✅ Todas las páginas están presentes');
} else {
  console.log('⚠️  Algunas páginas pueden estar faltando');
  warnings++;
}

console.log('\n🔧 VERIFICANDO BACKEND\n');

// Estructura del backend
checkDirectory('tienda-moderna-backend/src', 'Backend Source');
checkDirectory('tienda-moderna-backend/src/routes', 'Routes Directory');
checkDirectory('tienda-moderna-backend/src/middleware', 'Middleware Directory');
checkDirectory('tienda-moderna-backend/src/services', 'Services Directory');
checkDirectory('tienda-moderna-backend/src/utils', 'Utils Directory');
checkDirectory('tienda-moderna-backend/src/config', 'Config Directory');

// Archivos principales del backend
checkFile('tienda-moderna-backend/src/server.js', 'Main Server File');
checkFile('tienda-moderna-backend/prisma/schema.prisma', 'Prisma Schema');
checkFile('tienda-moderna-backend/prisma/seed.js', 'Database Seed');

// Contar rutas
const routesCount = countFiles('tienda-moderna-backend/src/routes', '.js');
console.log(`🛣️  Rutas encontradas: ${routesCount}/13`);

if (routesCount >= 13) {
  console.log('✅ Todas las rutas están presentes');
} else {
  console.log('⚠️  Algunas rutas pueden estar faltando');
  warnings++;
}

console.log('\n🗄️  VERIFICANDO BASE DE DATOS\n');

// Archivos de base de datos
checkDirectory('tienda-moderna-backend/prisma', 'Prisma Directory');
checkFile('tienda-moderna-backend/prisma/schema.prisma', 'Database Schema');
checkFile('tienda-moderna-backend/prisma/seed.js', 'Database Seed File');

// Verificar migraciones
const migrationsExist = checkDirectory('tienda-moderna-backend/prisma/migrations', 'Migrations Directory', false);
if (migrationsExist) {
  const migrationsCount = countFiles('tienda-moderna-backend/prisma/migrations');
  console.log(`📊 Migraciones encontradas: ${migrationsCount}`);
}

console.log('\n📚 VERIFICANDO DOCUMENTACIÓN\n');

// Documentación
checkFile('README.md', 'Main README', false);
checkFile('INTEGRATION-GUIDE.md', 'Integration Guide');
checkFile('READY-TO-USE.md', 'Ready to Use Guide');

console.log('\n🐳 VERIFICANDO DOCKER\n');

// Docker files
checkFile('tienda-moderna-backend/Dockerfile', 'Backend Dockerfile');
checkFile('tienda-moderna-backend/Dockerfile.prod', 'Production Dockerfile');
checkFile('tienda-moderna-backend/docker-compose.yml', 'Docker Compose Dev');
checkFile('tienda-moderna-backend/docker-compose.prod.yml', 'Docker Compose Prod');

console.log('\n📋 VERIFICANDO ARCHIVOS ADICIONALES\n');

// Archivos adicionales
checkFile('tienda-moderna-backend/healthcheck.js', 'Health Check Script');
checkFile('tienda-moderna-backend/.eslintrc.js', 'ESLint Config');
checkFile('tienda-moderna-backend/.prettierrc', 'Prettier Config');
checkFile('tienda-moderna-backend/vitest.config.js', 'Vitest Config');

// Directorios opcionales
checkDirectory('tienda-moderna-backend/uploads', 'Uploads Directory', false);
checkDirectory('tienda-moderna-backend/logs', 'Logs Directory', false);

console.log('\n' + '='.repeat(60));
console.log('📊 RESUMEN DE VERIFICACIÓN');
console.log('='.repeat(60));

if (errors === 0 && warnings === 0) {
  console.log('🎉 ¡PERFECTO! Todo está configurado correctamente.');
  console.log('✅ 0 errores, 0 advertencias');
  console.log('\n🚀 Tu proyecto está 100% listo para usar!');
  console.log('\nPara iniciar el proyecto:');
  console.log('  Windows: start-dev.bat');
  console.log('  Linux/Mac: ./start-dev.sh');
} else if (errors === 0) {
  console.log('✅ ¡EXCELENTE! Configuración completa con algunas advertencias menores.');
  console.log(`✅ 0 errores, ⚠️  ${warnings} advertencias`);
  console.log('\n🚀 Tu proyecto está listo para usar!');
  console.log('\nPara iniciar el proyecto:');
  console.log('  Windows: start-dev.bat');
  console.log('  Linux/Mac: ./start-dev.sh');
} else {
  console.log('❌ Se encontraron algunos problemas que necesitan atención.');
  console.log(`❌ ${errors} errores, ⚠️  ${warnings} advertencias`);
  console.log('\n🔧 Por favor, revisa los archivos faltantes antes de continuar.');
}

console.log('\n📞 ¿Necesitas ayuda?');
console.log('  📖 Lee INTEGRATION-GUIDE.md para instrucciones detalladas');
console.log('  📋 Revisa READY-TO-USE.md para el estado completo');

process.exit(errors > 0 ? 1 : 0);
