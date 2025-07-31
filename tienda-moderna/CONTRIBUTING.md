# 🤝 Guía de Contribución - Tienda Moderna

¡Gracias por tu interés en contribuir a Tienda Moderna! Esta guía te ayudará a empezar.

## 📋 Tabla de Contenidos

- [Código de Conducta](#código-de-conducta)
- [Cómo Contribuir](#cómo-contribuir)
- [Configuración del Entorno](#configuración-del-entorno)
- [Estándares de Código](#estándares-de-código)
- [Proceso de Pull Request](#proceso-de-pull-request)
- [Reportar Bugs](#reportar-bugs)
- [Solicitar Features](#solicitar-features)

## 📜 Código de Conducta

Este proyecto se adhiere al [Contributor Covenant](https://www.contributor-covenant.org/). Al participar, se espera que mantengas este código.

## 🚀 Cómo Contribuir

### Tipos de Contribuciones

- 🐛 **Bug fixes** - Corrección de errores
- ✨ **Features** - Nuevas funcionalidades
- 📚 **Documentación** - Mejoras en docs
- 🎨 **UI/UX** - Mejoras de diseño
- ⚡ **Performance** - Optimizaciones
- 🧪 **Tests** - Agregar o mejorar tests

### Proceso General

1. **Fork** el repositorio
2. **Crea** una rama para tu feature (`git checkout -b feature/amazing-feature`)
3. **Commit** tus cambios (`git commit -m 'Add amazing feature'`)
4. **Push** a la rama (`git push origin feature/amazing-feature`)
5. **Abre** un Pull Request

## 🛠️ Configuración del Entorno

### Prerrequisitos

- Node.js 18+
- pnpm 8+ (recomendado)
- Git

### Instalación

```bash
# 1. Fork y clona el repo
git clone https://github.com/tu-usuario/tienda-moderna.git
cd tienda-moderna

# 2. Instala dependencias
pnpm install

# 3. Configura variables de entorno
cp .env.example .env.local

# 4. Instala hooks de pre-commit
pnpm prepare

# 5. Ejecuta el proyecto
pnpm dev
```

### Scripts Disponibles

```bash
# Desarrollo
pnpm dev              # Servidor de desarrollo
pnpm build            # Build de producción
pnpm preview          # Preview del build

# Testing
pnpm test             # Tests en modo watch
pnpm test:run         # Ejecutar tests una vez
pnpm test:coverage    # Tests con coverage
pnpm test:ui          # Tests con interfaz visual

# Calidad de Código
pnpm lint             # Linting con ESLint
pnpm lint:fix         # Fix automático de linting
pnpm format           # Formatear con Prettier
pnpm format:check     # Verificar formato
pnpm type-check       # Verificar tipos TypeScript

# Análisis
pnpm analyze          # Analizar bundle
pnpm lighthouse       # Performance testing
```

## 📏 Estándares de Código

### Estructura de Archivos

```
src/
├── components/
│   ├── ui/           # Componentes base reutilizables
│   ├── layout/       # Componentes de layout
│   └── product/      # Componentes específicos de dominio
├── pages/            # Páginas de la aplicación
├── hooks/            # Custom hooks
├── context/          # React Context providers
├── stores/           # Zustand stores
├── services/         # Servicios API
├── utils/            # Funciones utilitarias
└── test/             # Utilidades de testing
```

### Convenciones de Naming

- **Componentes**: PascalCase (`ProductCard.jsx`)
- **Hooks**: camelCase con prefijo `use` (`useProducts.js`)
- **Utilidades**: camelCase (`formatPrice.js`)
- **Constantes**: UPPER_SNAKE_CASE (`API_ENDPOINTS`)
- **Archivos de test**: `*.test.jsx` o `*.spec.jsx`

### Estilo de Código

#### React Components

```jsx
// ✅ Bueno
import React from 'react'
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const ProductCard = ({ product, onAddToCart, className = '' }) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleAddToCart = async () => {
    setIsLoading(true)
    try {
      await onAddToCart(product)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={`product-card ${className}`}>
      {/* Component content */}
    </div>
  )
}

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  onAddToCart: PropTypes.func.isRequired,
  className: PropTypes.string
}

export default ProductCard
```

#### Custom Hooks

```jsx
// ✅ Bueno
import { useState, useEffect } from 'react'

export const useProducts = (filters = {}) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const data = await productService.getProducts(filters)
        setProducts(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [filters])

  return { products, loading, error }
}
```

### CSS y Styling

- Usar **Tailwind CSS** como primera opción
- **CSS Modules** para estilos específicos
- **Clases semánticas** y descriptivas
- **Mobile-first** approach

```jsx
// ✅ Bueno
<div className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
  <h2 className="text-xl font-semibold text-gray-900">
    {product.name}
  </h2>
  <p className="text-gray-600 line-clamp-3">
    {product.description}
  </p>
</div>
```

## 🔄 Proceso de Pull Request

### Antes de Enviar

1. ✅ **Tests pasan**: `pnpm test:run`
2. ✅ **Linting limpio**: `pnpm lint`
3. ✅ **Formato correcto**: `pnpm format:check`
4. ✅ **Build exitoso**: `pnpm build`
5. ✅ **Coverage mantenido**: >80%

### Template de PR

```markdown
## 📝 Descripción

Breve descripción de los cambios realizados.

## 🔗 Issue Relacionado

Fixes #(issue number)

## 🧪 Tipo de Cambio

- [ ] Bug fix (cambio que corrige un issue)
- [ ] Nueva feature (cambio que agrega funcionalidad)
- [ ] Breaking change (fix o feature que causa cambios en funcionalidad existente)
- [ ] Documentación

## ✅ Checklist

- [ ] Mi código sigue las convenciones del proyecto
- [ ] He realizado una auto-revisión de mi código
- [ ] He comentado mi código en áreas difíciles de entender
- [ ] He actualizado la documentación correspondiente
- [ ] Mis cambios no generan nuevos warnings
- [ ] He agregado tests que prueban mi fix/feature
- [ ] Tests nuevos y existentes pasan localmente
```

### Revisión de Código

- **Mínimo 1 aprobación** requerida
- **Todos los checks** deben pasar
- **Conflictos resueltos** antes del merge
- **Squash and merge** preferido

## 🐛 Reportar Bugs

### Antes de Reportar

1. **Busca** en issues existentes
2. **Reproduce** el bug consistentemente
3. **Identifica** la versión afectada

### Template de Bug Report

```markdown
## 🐛 Descripción del Bug

Descripción clara y concisa del bug.

## 🔄 Pasos para Reproducir

1. Ve a '...'
2. Haz click en '...'
3. Scroll hasta '...'
4. Ver error

## ✅ Comportamiento Esperado

Descripción de lo que esperabas que pasara.

## 📱 Información del Sistema

- OS: [e.g. iOS, Windows, macOS]
- Browser: [e.g. chrome, safari]
- Version: [e.g. 22]
- Device: [e.g. iPhone6, Desktop]

## 📎 Información Adicional

Screenshots, logs, o contexto adicional.
```

## ✨ Solicitar Features

### Template de Feature Request

```markdown
## 🚀 Feature Request

### 📝 Descripción

Descripción clara de la feature solicitada.

### 💡 Motivación

¿Por qué esta feature sería útil?

### 🎯 Solución Propuesta

Descripción de cómo te gustaría que funcionara.

### 🔄 Alternativas Consideradas

Otras soluciones que consideraste.

### 📎 Información Adicional

Mockups, ejemplos, o contexto adicional.
```

## 🏷️ Convenciones de Commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Tipos

- `feat`: Nueva feature
- `fix`: Bug fix
- `docs`: Documentación
- `style`: Formato, punto y coma faltante, etc
- `refactor`: Refactoring de código
- `test`: Agregar tests
- `chore`: Mantenimiento

### Ejemplos

```bash
feat(auth): add JWT authentication
fix(cart): resolve quantity update bug
docs(readme): update installation instructions
style(button): improve hover animations
refactor(api): simplify error handling
test(products): add unit tests for product service
chore(deps): update dependencies
```

## 🎉 ¡Gracias por Contribuir!

Tu contribución hace que Tienda Moderna sea mejor para todos. ¡Esperamos tu PR! 🚀
