// ===== IMPORTS EMPRESARIALES =====
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import slowDown from 'express-slow-down';
import compression from 'compression';
import { body, query, param, validationResult } from 'express-validator';
import winston from 'winston';
import dotenv from 'dotenv';
import mongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';
import { createHash } from 'crypto';

// ===== CONFIGURACIÓN INICIAL =====
dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT || 3001;

// ===== CONFIGURACIÓN DE LOGGING EMPRESARIAL =====
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json(),
    winston.format.printf(({ timestamp, level, message, stack, ...meta }) => {
      return JSON.stringify({
        timestamp,
        level,
        message,
        ...(stack && { stack }),
        ...meta,
        pid: process.pid,
        memory: process.memoryUsage(),
        uptime: process.uptime()
      });
    })
  ),
  defaultMeta: { service: 'tienda-moderna-api' },
  transports: [
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5
    }),
    new winston.transports.File({
      filename: 'logs/combined.log',
      maxsize: 5242880, // 5MB
      maxFiles: 10
    }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ]
});

// ===== CONFIGURACIÓN DE RATE LIMITING EMPRESARIAL =====
const createRateLimit = (windowMs, max, message) => rateLimit({
  windowMs,
  max,
  message: { error: message, retryAfter: Math.ceil(windowMs / 1000) },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    logger.warn('Rate limit exceeded', {
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      endpoint: req.path
    });
    res.status(429).json({
      error: message,
      retryAfter: Math.ceil(windowMs / 1000)
    });
  }
});

const generalLimiter = createRateLimit(15 * 60 * 1000, 1000, 'Demasiadas solicitudes desde esta IP');
const apiLimiter = createRateLimit(15 * 60 * 1000, 500, 'Límite de API excedido');
const authLimiter = createRateLimit(15 * 60 * 1000, 10, 'Demasiados intentos de autenticación');

// ===== CONFIGURACIÓN DE SLOW DOWN =====
const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutos
  delayAfter: 100, // Permitir 100 requests por ventana sin delay
  delayMs: () => 500, // Agregar 500ms de delay por request después del límite
  validate: { delayMs: false } // Deshabilitar warning
});

// ===== INICIALIZACIÓN DE EXPRESS =====
const app = express();

// ===== MIDDLEWARE DE SEGURIDAD EMPRESARIAL =====
// Configuración de CORS empresarial
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://tiendamoderna.com',
      'https://www.tiendamoderna.com'
    ];

    // Permitir requests sin origin (mobile apps, etc.)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      logger.warn('CORS blocked request', { origin, ip: origin });
      callback(new Error('No permitido por CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

// Aplicar middleware de seguridad
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));

app.use(cors(corsOptions));
app.use(compression());
app.use(mongoSanitize());
app.use(hpp());

// Rate limiting
app.use(generalLimiter);
app.use('/api/', apiLimiter);
app.use('/auth/', authLimiter);
app.use(speedLimiter);

// Parsing middleware
app.use(express.json({
  limit: '10mb',
  verify: (req, res, buf) => {
    req.rawBody = buf;
  }
}));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files con cache headers
app.use('/public', express.static('public', {
  maxAge: isProduction ? '1y' : '1h',
  etag: true,
  lastModified: true
}));

// ===== MIDDLEWARE DE LOGGING Y MONITOREO =====
app.use((req, res, next) => {
  const startTime = Date.now();
  const requestId = createHash('md5').update(`${Date.now()}-${Math.random()}`).digest('hex').substring(0, 8);

  req.requestId = requestId;
  req.startTime = startTime;

  logger.info('Request started', {
    requestId,
    method: req.method,
    url: req.url,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    contentLength: req.get('Content-Length') || 0
  });

  // Override res.json para logging de respuestas
  const originalJson = res.json;
  res.json = function(data) {
    const duration = Date.now() - startTime;
    logger.info('Request completed', {
      requestId,
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      duration,
      responseSize: JSON.stringify(data).length
    });
    return originalJson.call(this, data);
  };

  next();
});

// ===== VALIDADORES EMPRESARIALES =====
const validatePagination = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page debe ser un número entero mayor a 0'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit debe estar entre 1 y 100'),
  query('sort').optional().isIn(['name', 'price-asc', 'price-desc', 'newest', 'featured']).withMessage('Sort inválido')
];

const validateProductSearch = [
  query('search').optional().isLength({ min: 0, max: 100 }).withMessage('Search debe tener máximo 100 caracteres'),
  query('category').optional().isLength({ min: 0, max: 50 }).withMessage('Category debe tener máximo 50 caracteres'),
  query('brand').optional().isLength({ min: 0, max: 50 }).withMessage('Brand debe tener máximo 50 caracteres'),
  query('minPrice').optional().isFloat({ min: 0 }).withMessage('MinPrice debe ser un número positivo'),
  query('maxPrice').optional().isFloat({ min: 0 }).withMessage('MaxPrice debe ser un número positivo'),
  query('sortBy').optional().isIn(['name', 'price-asc', 'price-desc', 'rating']).withMessage('SortBy inválido')
];

const validateProductId = [
  param('id').isNumeric().withMessage('ID debe ser numérico')
];

// Middleware para manejar errores de validación
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.warn('Validation errors', {
      requestId: req.requestId,
      errors: errors.array(),
      body: req.body,
      query: req.query,
      params: req.params
    });

    return res.status(400).json({
      error: 'Datos de entrada inválidos',
      details: errors.array(),
      requestId: req.requestId
    });
  }
  next();
};

// ===== DATOS EN MEMORIA (SIMULANDO BASE DE DATOS) =====
let products = [];
let categories = [];
let brands = [];
let users = [];
let orders = [];
let cartItems = [];
let wishlistItems = [];
let reviews = [];
let coupons = [];
let shippingMethods = [];
let paymentMethods = [];

// ===== FUNCIÓN PARA GENERAR 500 PRODUCTOS ÚNICOS DIRECTAMENTE =====
function generateUniqueProducts() {
  const productTemplates = [
    {
      name: "Detergente Líquido",
      category: "detergentes",
      basePrice: 15000,
      description: "Detergente concentrado para ropa con fórmula avanzada",
      tags: ["detergente", "líquido", "ropa", "concentrado"]
    },
    {
      name: "Desinfectante Multiusos",
      category: "desinfectantes",
      basePrice: 12000,
      description: "Desinfectante que elimina 99.9% de gérmenes y bacterias",
      tags: ["desinfectante", "antibacterial", "multiusos", "gérmenes"]
    },
    {
      name: "Limpiador de Pisos",
      category: "limpieza-general",
      basePrice: 8000,
      description: "Limpiador especializado para todo tipo de pisos",
      tags: ["limpiador", "pisos", "hogar", "brillante"]
    },
    {
      name: "Papel Higiénico",
      category: "papel-higiene",
      basePrice: 25000,
      description: "Papel higiénico suave y resistente, paquete familiar",
      tags: ["papel", "higiénico", "suave", "familiar"]
    },
    {
      name: "Escoba",
      category: "herramientas",
      basePrice: 18000,
      description: "Escoba de cerdas sintéticas para limpieza eficiente",
      tags: ["escoba", "limpieza", "cerdas", "herramienta"]
    },
    {
      name: "Jabón Antibacterial",
      category: "cuidado-personal",
      basePrice: 6000,
      description: "Jabón líquido antibacterial para manos",
      tags: ["jabón", "antibacterial", "manos", "líquido"]
    },
    {
      name: "Toallas de Papel",
      category: "papel-higiene",
      basePrice: 8500,
      description: "Toallas de papel absorbentes para cocina",
      tags: ["toallas", "papel", "absorbente", "cocina"]
    },
    {
      name: "Ambientador",
      category: "cuidado-personal",
      basePrice: 7500,
      description: "Ambientador en spray para el hogar",
      tags: ["ambientador", "spray", "hogar", "fragancia"]
    }
  ];

  const variants = [
    "Premium", "Económico", "Familiar", "Concentrado", "Extra Fuerte",
    "Suave", "Natural", "Ecológico", "Profesional", "Industrial",
    "Delicado", "Ultra", "Mega", "Super", "Plus", "Advanced", "Pro",
    "Classic", "Original", "Fresh", "Clean", "Pure", "Active", "Power",
    "Max", "Intense", "Gentle", "Strong", "Soft", "Heavy Duty"
  ];

  const sizes = ["250ml", "500ml", "750ml", "1L", "1.5L", "2L", "3L", "5L", "Pequeño", "Mediano", "Grande", "XL", "XXL", "Familiar"];
  const scents = ["Lavanda", "Limón", "Eucalipto", "Menta", "Original", "Floral", "Cítrico", "Tropical", "Océano", "Vainilla", "Coco"];
  const brands = ["Ariel", "Fabuloso", "Lysol", "Genérico", "Premium", "CleanMax", "SafeGuard", "EcoClean", "ProClean"];

  const allProducts = [];
  let currentId = 1001;

  // Imágenes reales de productos de limpieza
  const productImages = [
    'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1574263867128-a3d5c1b1deae?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=400&h=400&fit=crop'
  ];

  // Generar exactamente 600 productos únicos
  for (let i = 0; i < 600; i++) {
    const template = productTemplates[i % productTemplates.length];
    const variant = variants[i % variants.length];
    const size = sizes[i % sizes.length];
    const scent = (i % 3 === 0) ? scents[i % scents.length] : null;
    const brand = brands[i % brands.length];

    // Crear nombre único
    const uniqueSuffix = Math.floor(i / productTemplates.length) + 1;
    const name = `${template.name} ${variant} ${size}${scent ? ` ${scent}` : ''} Pro-${i + 1}`.trim();

    // Variación de precio basada en el índice para consistencia
    const priceVariation = ((i % 20) - 10) / 50; // -20% a +20% variación
    const price = Math.round(template.basePrice * (1 + priceVariation));
    const originalPrice = Math.round(price * (1.1 + (i % 10) / 20)); // 10-60% más caro

    // Seleccionar imagen aleatoria pero consistente
    const imageIndex = i % productImages.length;

    allProducts.push({
      id: currentId++,
      name: name,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      description: `${template.description}. Presentación ${size}${scent ? ` con fragancia a ${scent.toLowerCase()}` : ''}. Producto profesional único ${i + 1} con tecnología avanzada.`,
      shortDescription: template.description.substring(0, 100) + '...',
      sku: `SKU-${currentId - 1}`,
      price: price,
      comparePrice: originalPrice,
      quantity: (i % 100) + 10,
      categoryId: template.category,
      brandId: brand.toLowerCase(),
      status: 'ACTIVE',
      isActive: true,
      isFeatured: i % 7 === 0, // ~14% destacados
      images: [productImages[imageIndex]],
      tags: [...template.tags, variant.toLowerCase(), size.toLowerCase(), ...(scent ? [scent.toLowerCase()] : [])],
      createdAt: new Date(Date.now() - (i * 60000)).toISOString(), // Diferentes fechas
      rating: (Math.random() * 1.5 + 3.5).toFixed(1),
      reviews: Math.floor(Math.random() * 800) + 15,
      discount: Math.random() > 0.7 ? Math.floor(Math.random() * 30) + 10 : null
    });
  }

  logger.info(`Generated ${allProducts.length} unique products`);
  return allProducts;
}

// Cargar datos iniciales
async function loadInitialData() {
  try {
    logger.info('Starting data initialization');

    // Generar exactamente 500 productos únicos
    products = generateUniqueProducts();

    // Categorías estándar
    categories = [
      { id: 'detergentes', name: 'Detergentes', slug: 'detergentes', description: 'Productos para lavar ropa', isActive: true },
      { id: 'desinfectantes', name: 'Desinfectantes', slug: 'desinfectantes', description: 'Productos antibacteriales', isActive: true },
      { id: 'limpieza-general', name: 'Limpieza General', slug: 'limpieza-general', description: 'Productos para el hogar', isActive: true },
      { id: 'papel-higiene', name: 'Papel e Higiene', slug: 'papel-higiene', description: 'Productos de papel e higiene', isActive: true },
      { id: 'herramientas', name: 'Herramientas', slug: 'herramientas', description: 'Herramientas de limpieza', isActive: true },
      { id: 'cuidado-personal', name: 'Cuidado Personal', slug: 'cuidado-personal', description: 'Productos de cuidado personal', isActive: true }
    ];

    logger.info(`✅ Generated ${products.length} unique products`);
    logger.info(`✅ Loaded ${categories.length} categories`);

    // Marcas (mantener las existentes por ahora)
    brands = [
      { id: 'ariel', name: 'Ariel', slug: 'ariel', description: 'Marca líder en detergentes', isActive: true },
      { id: 'fabuloso', name: 'Fabuloso', slug: 'fabuloso', description: 'Productos de limpieza multiusos', isActive: true },
      { id: 'lysol', name: 'Lysol', slug: 'lysol', description: 'Desinfectantes profesionales', isActive: true },
      { id: 'generic', name: 'Genérico', slug: 'generic', description: 'Productos genéricos de calidad', isActive: true }
    ];

    // Inicializar datos adicionales para funcionalidades completas
    await initializeAdditionalData();

    // Construir índices de búsqueda después de cargar los datos
    buildSearchIndices();

    console.log('✅ Datos iniciales cargados correctamente');
  } catch (error) {
    console.error('❌ Error cargando datos iniciales:', error);
    await loadFallbackData();
    buildSearchIndices();
  }
}

// ===== INICIALIZACIÓN DE DATOS ADICIONALES =====
async function initializeAdditionalData() {
  try {
    // Usuarios de ejemplo
    users = [
      {
        id: 'user-1',
        email: 'admin@tiendamoderna.com',
        name: 'Administrador',
        role: 'admin',
        isActive: true,
        createdAt: new Date().toISOString()
      },
      {
        id: 'user-2',
        email: 'cliente@ejemplo.com',
        name: 'Cliente Ejemplo',
        role: 'customer',
        isActive: true,
        createdAt: new Date().toISOString()
      }
    ];

    // Métodos de envío
    shippingMethods = [
      {
        id: 'standard',
        name: 'Envío Estándar',
        description: 'Entrega en 3-5 días hábiles',
        price: 5000,
        estimatedDays: '3-5',
        isActive: true
      },
      {
        id: 'express',
        name: 'Envío Express',
        description: 'Entrega en 1-2 días hábiles',
        price: 12000,
        estimatedDays: '1-2',
        isActive: true
      },
      {
        id: 'free',
        name: 'Envío Gratis',
        description: 'Envío gratis en compras mayores a $50.000',
        price: 0,
        estimatedDays: '5-7',
        minAmount: 50000,
        isActive: true
      }
    ];

    // Métodos de pago
    paymentMethods = [
      {
        id: 'credit-card',
        name: 'Tarjeta de Crédito',
        description: 'Visa, MasterCard, American Express',
        isActive: true,
        processingFee: 0.03
      },
      {
        id: 'debit-card',
        name: 'Tarjeta Débito',
        description: 'Tarjetas débito nacionales',
        isActive: true,
        processingFee: 0.02
      },
      {
        id: 'pse',
        name: 'PSE',
        description: 'Pagos Seguros en Línea',
        isActive: true,
        processingFee: 0.025
      },
      {
        id: 'cash',
        name: 'Efectivo',
        description: 'Pago contra entrega',
        isActive: true,
        processingFee: 0
      }
    ];

    // Cupones de descuento
    coupons = [
      {
        id: 'WELCOME10',
        code: 'WELCOME10',
        description: 'Descuento de bienvenida 10%',
        type: 'percentage',
        value: 10,
        minAmount: 20000,
        maxDiscount: 10000,
        isActive: true,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'SAVE5000',
        code: 'SAVE5000',
        description: 'Descuento fijo $5.000',
        type: 'fixed',
        value: 5000,
        minAmount: 30000,
        isActive: true,
        expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];

    // Reseñas de ejemplo
    reviews = [
      {
        id: 'review-1',
        productId: '1001',
        userId: 'user-2',
        rating: 5,
        title: 'Excelente producto',
        comment: 'Muy buen detergente, limpia perfectamente',
        isVerified: true,
        createdAt: new Date().toISOString()
      },
      {
        id: 'review-2',
        productId: '1002',
        userId: 'user-2',
        rating: 4,
        title: 'Buena calidad',
        comment: 'Cumple con lo prometido, buen desinfectante',
        isVerified: true,
        createdAt: new Date().toISOString()
      }
    ];

    logger.info('Additional data initialized', {
      users: users.length,
      shippingMethods: shippingMethods.length,
      paymentMethods: paymentMethods.length,
      coupons: coupons.length,
      reviews: reviews.length
    });

  } catch (error) {
    logger.error('Error initializing additional data', { error: error.message });
  }
}

// Datos de respaldo en caso de error
async function loadFallbackData() {
  categories = [
    { id: 'detergentes', name: 'Detergentes', slug: 'detergentes', description: 'Productos para lavar ropa', isActive: true },
    { id: 'desinfectantes', name: 'Desinfectantes', slug: 'desinfectantes', description: 'Productos antibacteriales', isActive: true },
    { id: 'limpieza-general', name: 'Limpieza General', slug: 'limpieza-general', description: 'Productos para el hogar', isActive: true }
  ];

  products = [
    {
      id: '1',
      name: 'Detergente Ariel Líquido 1L',
      slug: 'detergente-ariel-liquido-1l',
      description: 'Detergente líquido concentrado para ropa blanca y de color',
      shortDescription: 'Detergente líquido concentrado',
      sku: 'ARG-001',
      price: 15000,
      comparePrice: 18000,
      quantity: 50,
      categoryId: 'detergentes',
      brandId: 'ariel',
      status: 'ACTIVE',
      isActive: true,
      isFeatured: true,
      images: ['/images/products/ariel-liquido.jpg'],
      tags: ['detergente', 'líquido', 'ropa'],
      createdAt: new Date().toISOString()
    }
  ];
}

// ===== RUTAS DE SALUD EMPRESARIALES =====
app.get('/health', (req, res) => {
  const healthData = {
    status: 'OK',
    message: 'Servidor funcionando correctamente',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    pid: process.pid,
    memory: process.memoryUsage(),
    environment: process.env.NODE_ENV || 'development',
    version: '2.0.0-enterprise',
    requestId: req.requestId
  };

  logger.info('Health check accessed', { requestId: req.requestId, ip: req.ip });
  res.json(healthData);
});

app.get('/api/health', (req, res) => {
  const apiHealthData = {
    status: 'OK',
    message: 'API funcionando correctamente',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    stats: {
      totalProducts: products.length,
      totalCategories: categories.length,
      totalBrands: brands.length,
      activeProducts: products.filter(p => p.isActive).length,
      featuredProducts: products.filter(p => p.isActive && p.isFeatured).length
    },
    performance: {
      memory: process.memoryUsage(),
      cpuUsage: process.cpuUsage()
    },
    version: '2.0.0-enterprise',
    requestId: req.requestId
  };

  logger.info('API health check accessed', { requestId: req.requestId, ip: req.ip });
  res.json(apiHealthData);
});

// ===== RUTA DE MÉTRICAS EMPRESARIALES =====
app.get('/api/metrics', (req, res) => {
  try {
    const metrics = {
      timestamp: new Date().toISOString(),
      server: {
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        cpu: process.cpuUsage(),
        pid: process.pid,
        platform: process.platform,
        nodeVersion: process.version
      },
      database: {
        products: {
          total: products.length,
          active: products.filter(p => p.isActive).length,
          featured: products.filter(p => p.isActive && p.isFeatured).length,
          onSale: products.filter(p => p.isActive && p.comparePrice && p.comparePrice > p.price).length
        },
        categories: {
          total: categories.length,
          active: categories.filter(c => c.isActive).length
        },
        brands: {
          total: brands.length,
          active: brands.filter(b => b.isActive).length
        }
      },
      performance: {
        searchIndexSize: searchIndex.size,
        categoryIndexSize: productsByCategory.size,
        brandIndexSize: productsByBrand.size
      },
      requestId: req.requestId
    };

    logger.info('Metrics accessed', { requestId: req.requestId, ip: req.ip });
    res.json(metrics);
  } catch (error) {
    logger.error('Error getting metrics', {
      error: error.message,
      stack: error.stack,
      requestId: req.requestId
    });
    res.status(500).json({
      error: 'Error obteniendo métricas',
      requestId: req.requestId
    });
  }
});

// Índices para búsqueda eficiente
let productsByCategory = new Map();
let productsByBrand = new Map();
let searchIndex = new Map();

// Función para construir índices de búsqueda
function buildSearchIndices() {
  // Limpiar índices existentes
  productsByCategory.clear();
  productsByBrand.clear();
  searchIndex.clear();

  products.forEach(product => {
    if (!product.isActive) return;

    // Índice por categoría
    if (!productsByCategory.has(product.categoryId)) {
      productsByCategory.set(product.categoryId, []);
    }
    productsByCategory.get(product.categoryId).push(product);

    // Índice por marca
    if (!productsByBrand.has(product.brandId)) {
      productsByBrand.set(product.brandId, []);
    }
    productsByBrand.get(product.brandId).push(product);

    // Índice de búsqueda por palabras clave
    const searchTerms = [
      ...product.name.toLowerCase().split(/\s+/),
      ...product.description.toLowerCase().split(/\s+/),
      ...(product.tags || []).map(tag => tag.toLowerCase())
    ];

    searchTerms.forEach(term => {
      if (term.length > 2) { // Solo indexar términos de más de 2 caracteres
        if (!searchIndex.has(term)) {
          searchIndex.set(term, new Set());
        }
        searchIndex.get(term).add(product.id);
      }
    });
  });

  console.log(`📊 Índices construidos: ${productsByCategory.size} categorías, ${productsByBrand.size} marcas, ${searchIndex.size} términos de búsqueda`);
}

// ===== RUTAS DE PRODUCTOS EMPRESARIALES =====
app.get('/api/products',
  validatePagination,
  validateProductSearch,
  handleValidationErrors,
  async (req, res) => {
  const { category, brand, search, limit = 12, page = 1, sort = 'name', minPrice, maxPrice } = req.query;
  const limitNum = Math.min(parseInt(limit), 100); // Máximo 100 productos por página
  const pageNum = Math.max(parseInt(page), 1);

  let filteredProducts = [];

  try {
    // Filtrado eficiente usando índices
    if (category && productsByCategory.has(category)) {
      filteredProducts = [...productsByCategory.get(category)];
    } else if (brand && productsByBrand.has(brand)) {
      filteredProducts = [...productsByBrand.get(brand)];
    } else {
      filteredProducts = products.filter(p => p.isActive);
    }

    // Aplicar filtros adicionales
    if (category && brand) {
      filteredProducts = filteredProducts.filter(p => p.categoryId === category && p.brandId === brand);
    }

    // Búsqueda optimizada
    if (search) {
      const searchTerms = search.toLowerCase().split(/\s+/);
      const matchingIds = new Set();

      searchTerms.forEach(term => {
        searchIndex.forEach((productIds, indexTerm) => {
          if (indexTerm.includes(term)) {
            productIds.forEach(id => matchingIds.add(id));
          }
        });
      });

      if (matchingIds.size > 0) {
        filteredProducts = filteredProducts.filter(p => matchingIds.has(p.id));
      } else {
        // Fallback a búsqueda tradicional si no hay coincidencias en el índice
        const searchLower = search.toLowerCase();
        filteredProducts = filteredProducts.filter(p =>
          p.name.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower) ||
          (p.tags && p.tags.some(tag => tag.toLowerCase().includes(searchLower)))
        );
      }
    }

    // Filtrar por rango de precio
    if (minPrice || maxPrice) {
      const min = minPrice ? parseFloat(minPrice) : 0;
      const max = maxPrice ? parseFloat(maxPrice) : Infinity;
      filteredProducts = filteredProducts.filter(p =>
        p.price >= min && p.price <= max
      );
    }

    // Ordenamiento
    switch (sort) {
      case 'price-asc':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'newest':
        filteredProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'featured':
        filteredProducts.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
      default:
        // Mantener orden original
        break;
    }

    // Paginación
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    res.json({
      products: paginatedProducts,
      total: filteredProducts.length,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(filteredProducts.length / limitNum),
      hasNextPage: endIndex < filteredProducts.length,
      hasPrevPage: pageNum > 1
    });
  } catch (error) {
    console.error('❌ Error en /api/products:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// ===== RUTAS ESPECÍFICAS DE PRODUCTOS =====
app.get('/api/products/featured', (req, res) => {
  try {
    const featuredProducts = products.filter(p => p.isActive && p.isFeatured);

    logger.info('Featured products requested', {
      count: featuredProducts.length,
      requestId: req.requestId,
      ip: req.ip
    });

    res.json({
      products: featuredProducts,
      total: featuredProducts.length,
      requestId: req.requestId
    });
  } catch (error) {
    logger.error('Featured products error', {
      error: error.message,
      requestId: req.requestId
    });
    res.status(500).json({
      error: 'Error obteniendo productos destacados',
      requestId: req.requestId
    });
  }
});

app.get('/api/products/new', (req, res) => {
  try {
    const newProducts = products
      .filter(p => p.isActive)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 8);

    logger.info('New products requested', {
      count: newProducts.length,
      requestId: req.requestId,
      ip: req.ip
    });

    res.json({
      products: newProducts,
      total: newProducts.length,
      requestId: req.requestId
    });
  } catch (error) {
    logger.error('New products error', {
      error: error.message,
      requestId: req.requestId
    });
    res.status(500).json({
      error: 'Error obteniendo productos nuevos',
      requestId: req.requestId
    });
  }
});

app.get('/api/products/on-sale', (req, res) => {
  try {
    const onSaleProducts = products
      .filter(p => p.isActive && p.comparePrice && p.comparePrice > p.price)
      .slice(0, 8);

    logger.info('On-sale products requested', {
      count: onSaleProducts.length,
      requestId: req.requestId,
      ip: req.ip
    });

    res.json({
      products: onSaleProducts,
      total: onSaleProducts.length,
      requestId: req.requestId
    });
  } catch (error) {
    logger.error('On-sale products error', {
      error: error.message,
      requestId: req.requestId
    });
    res.status(500).json({
      error: 'Error obteniendo productos en oferta',
      requestId: req.requestId
    });
  }
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id && p.isActive);
  if (!product) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  res.json(product);
});

app.get('/api/products/:id/related', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  
  const relatedProducts = products
    .filter(p => p.id !== req.params.id && p.categoryId === product.categoryId && p.isActive)
    .slice(0, 4);
  
  res.json(relatedProducts);
});

// ===== RUTAS DE CATEGORÍAS =====
app.get('/api/categories', (req, res) => {
  try {
    const activeCategories = categories.filter(c => c.isActive);

    logger.info('Categories requested', {
      count: activeCategories.length,
      requestId: req.requestId,
      ip: req.ip
    });

    res.json({
      categories: activeCategories,
      total: activeCategories.length,
      requestId: req.requestId
    });
  } catch (error) {
    logger.error('Categories error', {
      error: error.message,
      requestId: req.requestId
    });
    res.status(500).json({
      error: 'Error obteniendo categorías',
      requestId: req.requestId
    });
  }
});

// ===== RUTAS DE MARCAS =====
app.get('/api/brands', (req, res) => {
  try {
    const activeBrands = brands.filter(b => b.isActive);

    logger.info('Brands requested', {
      count: activeBrands.length,
      requestId: req.requestId,
      ip: req.ip
    });

    res.json({
      brands: activeBrands,
      total: activeBrands.length,
      requestId: req.requestId
    });
  } catch (error) {
    logger.error('Brands error', {
      error: error.message,
      requestId: req.requestId
    });
    res.status(500).json({
      error: 'Error obteniendo marcas',
      requestId: req.requestId
    });
  }
});

// ===== RUTAS DE RESEÑAS =====
app.get('/api/products/:id/reviews',
  validateProductId,
  handleValidationErrors,
  (req, res) => {
    try {
      const { id } = req.params;
      const productReviews = reviews.filter(r => r.productId === id);

      // Enriquecer con datos del usuario
      const enrichedReviews = productReviews.map(review => {
        const user = users.find(u => u.id === review.userId);
        return {
          ...review,
          userName: user ? user.name : 'Usuario Anónimo'
        };
      });

      logger.info('Product reviews requested', {
        productId: id,
        count: enrichedReviews.length,
        requestId: req.requestId,
        ip: req.ip
      });

      res.json({
        reviews: enrichedReviews,
        total: enrichedReviews.length,
        averageRating: enrichedReviews.length > 0
          ? enrichedReviews.reduce((sum, r) => sum + r.rating, 0) / enrichedReviews.length
          : 0,
        requestId: req.requestId
      });

    } catch (error) {
      logger.error('Product reviews error', {
        error: error.message,
        requestId: req.requestId
      });
      res.status(500).json({
        error: 'Error obteniendo reseñas',
        requestId: req.requestId
      });
    }
  }
);

app.post('/api/products/:id/reviews',
  validateProductId,
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating debe estar entre 1 y 5'),
  body('title').isLength({ min: 3, max: 100 }).withMessage('Título debe tener entre 3 y 100 caracteres'),
  body('comment').isLength({ min: 10, max: 500 }).withMessage('Comentario debe tener entre 10 y 500 caracteres'),
  body('userId').notEmpty().withMessage('User ID requerido'),
  handleValidationErrors,
  (req, res) => {
    try {
      const { id } = req.params;
      const { rating, title, comment, userId } = req.body;

      // Verificar que el producto existe
      const product = products.find(p => p.id === id && p.isActive);
      if (!product) {
        return res.status(404).json({
          error: 'Producto no encontrado',
          requestId: req.requestId
        });
      }

      // Verificar que el usuario existe
      const user = users.find(u => u.id === userId);
      if (!user) {
        return res.status(404).json({
          error: 'Usuario no encontrado',
          requestId: req.requestId
        });
      }

      // Crear nueva reseña
      const newReview = {
        id: `review-${Date.now()}`,
        productId: id,
        userId,
        rating: parseInt(rating),
        title,
        comment,
        isVerified: false, // En un sistema real, verificar si compró el producto
        createdAt: new Date().toISOString()
      };

      reviews.push(newReview);

      logger.info('Review created', {
        reviewId: newReview.id,
        productId: id,
        userId,
        rating,
        requestId: req.requestId
      });

      res.status(201).json({
        success: true,
        review: {
          ...newReview,
          userName: user.name
        },
        message: 'Reseña creada exitosamente',
        requestId: req.requestId
      });

    } catch (error) {
      logger.error('Create review error', {
        error: error.message,
        requestId: req.requestId
      });
      res.status(500).json({
        error: 'Error creando reseña',
        requestId: req.requestId
      });
    }
  }
);

// ===== RUTA DE BÚSQUEDA AVANZADA =====
app.get('/api/search',
  query('q').isLength({ min: 2, max: 100 }).withMessage('Query debe tener entre 2 y 100 caracteres'),
  query('category').optional().isAlphanumeric('es-ES', { ignore: '-_' }).withMessage('Category inválida'),
  query('brand').optional().isAlphanumeric('es-ES', { ignore: '-_' }).withMessage('Brand inválida'),
  query('minPrice').optional().isNumeric().withMessage('MinPrice debe ser numérico'),
  query('maxPrice').optional().isNumeric().withMessage('MaxPrice debe ser numérico'),
  query('rating').optional().isInt({ min: 1, max: 5 }).withMessage('Rating debe estar entre 1 y 5'),
  validatePagination,
  handleValidationErrors,
  (req, res) => {
    try {
      const { q, category, brand, minPrice, maxPrice, rating, page = 1, limit = 12, sort = 'relevance' } = req.query;

      let filteredProducts = products.filter(p => p.isActive);

      // Búsqueda por texto
      if (q) {
        const searchTerms = q.toLowerCase().split(/\s+/);
        filteredProducts = filteredProducts.filter(product => {
          const searchableText = `${product.name} ${product.description} ${product.tags?.join(' ') || ''}`.toLowerCase();
          return searchTerms.some(term => searchableText.includes(term));
        });
      }

      // Filtros adicionales
      if (category) {
        filteredProducts = filteredProducts.filter(p => p.categoryId === category);
      }

      if (brand) {
        filteredProducts = filteredProducts.filter(p => p.brandId === brand);
      }

      if (minPrice) {
        filteredProducts = filteredProducts.filter(p => p.price >= parseFloat(minPrice));
      }

      if (maxPrice) {
        filteredProducts = filteredProducts.filter(p => p.price <= parseFloat(maxPrice));
      }

      // Ordenamiento
      if (sort === 'price-asc') {
        filteredProducts.sort((a, b) => a.price - b.price);
      } else if (sort === 'price-desc') {
        filteredProducts.sort((a, b) => b.price - a.price);
      } else if (sort === 'name') {
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sort === 'newest') {
        filteredProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }

      // Paginación
      const pageNum = parseInt(page);
      const limitNum = parseInt(limit);
      const startIndex = (pageNum - 1) * limitNum;
      const endIndex = startIndex + limitNum;
      const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

      logger.info('Advanced search performed', {
        query: q,
        filters: { category, brand, minPrice, maxPrice, rating },
        totalResults: filteredProducts.length,
        page: pageNum,
        limit: limitNum,
        requestId: req.requestId,
        ip: req.ip
      });

      res.json({
        products: paginatedProducts,
        total: filteredProducts.length,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(filteredProducts.length / limitNum),
        hasNextPage: endIndex < filteredProducts.length,
        hasPrevPage: pageNum > 1,
        searchQuery: q,
        appliedFilters: { category, brand, minPrice, maxPrice, rating },
        requestId: req.requestId
      });

    } catch (error) {
      logger.error('Advanced search error', {
        error: error.message,
        requestId: req.requestId
      });
      res.status(500).json({
        error: 'Error en búsqueda avanzada',
        requestId: req.requestId
      });
    }
  }
);

// ===== RUTAS DE AUTENTICACIÓN =====
app.post('/api/auth/login',
  body('email').isEmail().withMessage('Email inválido'),
  body('password').isLength({ min: 6 }).withMessage('Password debe tener al menos 6 caracteres'),
  handleValidationErrors,
  (req, res) => {
    try {
      const { email, password } = req.body;

      // Buscar usuario (simulado)
      const user = users.find(u => u.email === email && u.isActive);

      if (!user) {
        logger.warn('Login attempt with invalid email', { email, ip: req.ip, requestId: req.requestId });
        return res.status(401).json({
          error: 'Credenciales inválidas',
          requestId: req.requestId
        });
      }

      // En un sistema real, verificar password hasheado
      if (password !== 'password123') {
        logger.warn('Login attempt with invalid password', { email, ip: req.ip, requestId: req.requestId });
        return res.status(401).json({
          error: 'Credenciales inválidas',
          requestId: req.requestId
        });
      }

      // Generar token (simulado)
      const token = createHash('md5').update(`${user.id}-${Date.now()}`).digest('hex');

      logger.info('User logged in successfully', {
        userId: user.id,
        email: user.email,
        ip: req.ip,
        requestId: req.requestId
      });

      res.json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        },
        token,
        requestId: req.requestId
      });

    } catch (error) {
      logger.error('Login error', {
        error: error.message,
        stack: error.stack,
        requestId: req.requestId
      });
      res.status(500).json({
        error: 'Error interno del servidor',
        requestId: req.requestId
      });
    }
  }
);

app.post('/api/auth/register',
  body('email').isEmail().withMessage('Email inválido'),
  body('password').isLength({ min: 6 }).withMessage('Password debe tener al menos 6 caracteres'),
  body('name').isLength({ min: 2 }).withMessage('Nombre debe tener al menos 2 caracteres'),
  handleValidationErrors,
  (req, res) => {
    try {
      const { email, password, name } = req.body;

      // Verificar si el usuario ya existe
      const existingUser = users.find(u => u.email === email);
      if (existingUser) {
        return res.status(400).json({
          error: 'El email ya está registrado',
          requestId: req.requestId
        });
      }

      // Crear nuevo usuario
      const newUser = {
        id: `user-${Date.now()}`,
        email,
        name,
        role: 'customer',
        isActive: true,
        createdAt: new Date().toISOString()
      };

      users.push(newUser);

      logger.info('New user registered', {
        userId: newUser.id,
        email: newUser.email,
        ip: req.ip,
        requestId: req.requestId
      });

      res.status(201).json({
        success: true,
        message: 'Usuario registrado exitosamente',
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          role: newUser.role
        },
        requestId: req.requestId
      });

    } catch (error) {
      logger.error('Registration error', {
        error: error.message,
        stack: error.stack,
        requestId: req.requestId
      });
      res.status(500).json({
        error: 'Error interno del servidor',
        requestId: req.requestId
      });
    }
  }
);

// ===== RUTAS DEL CARRITO =====
app.get('/api/cart/:userId', (req, res) => {
  try {
    const { userId } = req.params;
    const userCartItems = cartItems.filter(item => item.userId === userId);

    // Enriquecer con datos del producto
    const enrichedCart = userCartItems.map(item => {
      const product = products.find(p => p.id === item.productId);
      return {
        ...item,
        product: product || null
      };
    });

    res.json({
      items: enrichedCart,
      total: enrichedCart.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0),
      requestId: req.requestId
    });
  } catch (error) {
    logger.error('Cart get error', { error: error.message, requestId: req.requestId });
    res.status(500).json({ error: 'Error obteniendo carrito', requestId: req.requestId });
  }
});

app.post('/api/cart/add',
  body('userId').notEmpty().withMessage('User ID requerido'),
  body('productId').notEmpty().withMessage('Product ID requerido'),
  body('quantity').isInt({ min: 1 }).withMessage('Cantidad debe ser mayor a 0'),
  handleValidationErrors,
  (req, res) => {
    try {
      const { userId, productId, quantity } = req.body;

      // Verificar que el producto existe
      const product = products.find(p => p.id === productId && p.isActive);
      if (!product) {
        return res.status(404).json({
          error: 'Producto no encontrado',
          requestId: req.requestId
        });
      }

      // Buscar item existente en el carrito
      const existingItemIndex = cartItems.findIndex(
        item => item.userId === userId && item.productId === productId
      );

      if (existingItemIndex >= 0) {
        // Actualizar cantidad
        cartItems[existingItemIndex].quantity += quantity;
        cartItems[existingItemIndex].updatedAt = new Date().toISOString();
      } else {
        // Agregar nuevo item
        cartItems.push({
          id: `cart-${Date.now()}`,
          userId,
          productId,
          quantity,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      }

      logger.info('Product added to cart', {
        userId,
        productId,
        quantity,
        requestId: req.requestId
      });

      res.json({
        success: true,
        message: 'Producto agregado al carrito',
        requestId: req.requestId
      });

    } catch (error) {
      logger.error('Cart add error', { error: error.message, requestId: req.requestId });
      res.status(500).json({ error: 'Error agregando al carrito', requestId: req.requestId });
    }
  }
);

// ===== RUTAS DE WISHLIST =====
app.get('/api/wishlist/:userId', (req, res) => {
  try {
    const { userId } = req.params;
    const userWishlistItems = wishlistItems.filter(item => item.userId === userId);

    // Enriquecer con datos del producto
    const enrichedWishlist = userWishlistItems.map(item => {
      const product = products.find(p => p.id === item.productId);
      return {
        ...item,
        product: product || null
      };
    });

    res.json({
      items: enrichedWishlist,
      requestId: req.requestId
    });
  } catch (error) {
    logger.error('Wishlist get error', { error: error.message, requestId: req.requestId });
    res.status(500).json({ error: 'Error obteniendo wishlist', requestId: req.requestId });
  }
});

app.post('/api/wishlist/add',
  body('userId').notEmpty().withMessage('User ID requerido'),
  body('productId').notEmpty().withMessage('Product ID requerido'),
  handleValidationErrors,
  (req, res) => {
    try {
      const { userId, productId } = req.body;

      // Verificar que el producto existe
      const product = products.find(p => p.id === productId && p.isActive);
      if (!product) {
        return res.status(404).json({
          error: 'Producto no encontrado',
          requestId: req.requestId
        });
      }

      // Verificar si ya está en wishlist
      const existingItem = wishlistItems.find(
        item => item.userId === userId && item.productId === productId
      );

      if (existingItem) {
        return res.status(400).json({
          error: 'Producto ya está en la wishlist',
          requestId: req.requestId
        });
      }

      // Agregar a wishlist
      wishlistItems.push({
        id: `wishlist-${Date.now()}`,
        userId,
        productId,
        createdAt: new Date().toISOString()
      });

      logger.info('Product added to wishlist', {
        userId,
        productId,
        requestId: req.requestId
      });

      res.json({
        success: true,
        message: 'Producto agregado a la wishlist',
        requestId: req.requestId
      });

    } catch (error) {
      logger.error('Wishlist add error', { error: error.message, requestId: req.requestId });
      res.status(500).json({ error: 'Error agregando a wishlist', requestId: req.requestId });
    }
  }
);

// ===== RUTAS DE ÓRDENES =====
app.get('/api/orders/:userId', (req, res) => {
  try {
    const { userId } = req.params;
    const userOrders = orders.filter(order => order.userId === userId);

    res.json({
      orders: userOrders,
      requestId: req.requestId
    });
  } catch (error) {
    logger.error('Orders get error', { error: error.message, requestId: req.requestId });
    res.status(500).json({ error: 'Error obteniendo órdenes', requestId: req.requestId });
  }
});

// ===== RUTAS DE MÉTODOS DE ENVÍO =====
app.get('/api/shipping-methods', (req, res) => {
  try {
    res.json({
      methods: shippingMethods.filter(method => method.isActive),
      requestId: req.requestId
    });
  } catch (error) {
    logger.error('Shipping methods error', { error: error.message, requestId: req.requestId });
    res.status(500).json({ error: 'Error obteniendo métodos de envío', requestId: req.requestId });
  }
});

// ===== RUTAS DE MÉTODOS DE PAGO =====
app.get('/api/payment-methods', (req, res) => {
  try {
    res.json({
      methods: paymentMethods.filter(method => method.isActive),
      requestId: req.requestId
    });
  } catch (error) {
    logger.error('Payment methods error', { error: error.message, requestId: req.requestId });
    res.status(500).json({ error: 'Error obteniendo métodos de pago', requestId: req.requestId });
  }
});

// ===== RUTAS DE CUPONES =====
app.post('/api/coupons/validate',
  body('code').notEmpty().withMessage('Código de cupón requerido'),
  body('amount').isNumeric().withMessage('Monto debe ser numérico'),
  handleValidationErrors,
  (req, res) => {
    try {
      const { code, amount } = req.body;

      const coupon = coupons.find(c =>
        c.code === code &&
        c.isActive &&
        new Date(c.expiresAt) > new Date()
      );

      if (!coupon) {
        return res.status(404).json({
          error: 'Cupón inválido o expirado',
          requestId: req.requestId
        });
      }

      if (amount < coupon.minAmount) {
        return res.status(400).json({
          error: `Monto mínimo requerido: $${coupon.minAmount.toLocaleString()}`,
          requestId: req.requestId
        });
      }

      let discount = 0;
      if (coupon.type === 'percentage') {
        discount = Math.min((amount * coupon.value / 100), coupon.maxDiscount || Infinity);
      } else {
        discount = coupon.value;
      }

      res.json({
        valid: true,
        coupon: {
          id: coupon.id,
          code: coupon.code,
          description: coupon.description,
          discount: Math.round(discount)
        },
        requestId: req.requestId
      });

    } catch (error) {
      logger.error('Coupon validation error', { error: error.message, requestId: req.requestId });
      res.status(500).json({ error: 'Error validando cupón', requestId: req.requestId });
    }
  }
);

// ===== MIDDLEWARE DE MANEJO DE ERRORES EMPRESARIAL =====
app.use((err, req, res, next) => {
  const errorId = createHash('md5').update(`${Date.now()}-${Math.random()}`).digest('hex').substring(0, 8);

  // Log detallado del error
  logger.error('Unhandled error', {
    errorId,
    requestId: req.requestId,
    error: err.message,
    stack: err.stack,
    method: req.method,
    url: req.url,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    body: req.body,
    query: req.query,
    params: req.params
  });

  // Respuesta según el entorno
  const errorResponse = {
    error: 'Error interno del servidor',
    errorId,
    requestId: req.requestId,
    timestamp: new Date().toISOString()
  };

  // En desarrollo, incluir más detalles
  if (!isProduction) {
    errorResponse.details = {
      message: err.message,
      stack: err.stack
    };
  }

  res.status(err.status || 500).json(errorResponse);
});

// ===== RUTA 404 EMPRESARIAL =====
app.use('*', (req, res) => {
  const notFoundId = createHash('md5').update(`${Date.now()}-${Math.random()}`).digest('hex').substring(0, 8);

  logger.warn('Route not found', {
    notFoundId,
    requestId: req.requestId,
    method: req.method,
    path: req.originalUrl,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });

  res.status(404).json({
    error: 'Ruta no encontrada',
    path: req.originalUrl,
    method: req.method,
    notFoundId,
    requestId: req.requestId,
    timestamp: new Date().toISOString(),
    suggestion: 'Verifique la URL y el método HTTP'
  });
});

// ===== MANEJO DE SEÑALES DEL SISTEMA =====
const gracefulShutdown = (signal) => {
  logger.info(`Received ${signal}, starting graceful shutdown`);

  server.close((err) => {
    if (err) {
      logger.error('Error during graceful shutdown', { error: err.message });
      process.exit(1);
    }

    logger.info('Server closed successfully');
    process.exit(0);
  });

  // Forzar cierre después de 30 segundos
  setTimeout(() => {
    logger.error('Forced shutdown after timeout');
    process.exit(1);
  }, 30000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Manejo de errores no capturados
process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception', {
    error: err.message,
    stack: err.stack
  });
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection', {
    reason: reason,
    promise: promise
  });
  process.exit(1);
});

// ===== INICIALIZACIÓN EMPRESARIAL DEL SERVIDOR =====
let server;

async function startServer() {
  try {
    logger.info('Starting Tienda Moderna Enterprise Server', {
      version: '2.0.0-enterprise',
      environment: process.env.NODE_ENV || 'development',
      port: PORT,
      pid: process.pid,
      nodeVersion: process.version
    });

    // Cargar datos iniciales
    await loadInitialData();

    // Iniciar servidor
    server = app.listen(PORT, () => {
      logger.info('Server started successfully', {
        port: PORT,
        environment: process.env.NODE_ENV || 'development',
        pid: process.pid,
        memory: process.memoryUsage(),
        urls: {
          server: `http://localhost:${PORT}`,
          api: `http://localhost:${PORT}/api`,
          health: `http://localhost:${PORT}/health`,
          metrics: `http://localhost:${PORT}/api/metrics`
        }
      });

      console.log(`
🏢 ===== TIENDA MODERNA ENTERPRISE SERVER =====
🚀 Servidor ejecutándose en: http://localhost:${PORT}
📊 API disponible en: http://localhost:${PORT}/api
❤️  Health check: http://localhost:${PORT}/health
📈 Métricas: http://localhost:${PORT}/api/metrics
🔒 Seguridad: Helmet, CORS, Rate Limiting activados
📝 Logging: Winston con rotación de archivos
⚡ Performance: Compresión y caché activados
🛡️  Validación: Express-validator en todas las rutas
🌍 Entorno: ${process.env.NODE_ENV || 'development'}
📦 Versión: 2.0.0-enterprise
===============================================
      `);
    });

    // Configurar timeout del servidor
    server.timeout = 30000; // 30 segundos
    server.keepAliveTimeout = 65000; // 65 segundos
    server.headersTimeout = 66000; // 66 segundos

  } catch (error) {
    logger.error('Failed to start server', {
      error: error.message,
      stack: error.stack
    });
    console.error('❌ Error iniciando servidor:', error);
    process.exit(1);
  }
}

// ===== VERIFICACIÓN DE ENTORNO =====
function validateEnvironment() {
  const requiredEnvVars = ['NODE_ENV'];
  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

  if (missingVars.length > 0) {
    logger.warn('Missing environment variables', { missingVars });
  }

  // Configurar valores por defecto
  process.env.NODE_ENV = process.env.NODE_ENV || 'development';
  process.env.LOG_LEVEL = process.env.LOG_LEVEL || 'info';
}

// ===== INICIO DE LA APLICACIÓN =====
validateEnvironment();
startServer();
