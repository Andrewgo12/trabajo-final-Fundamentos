// Constantes de la aplicación

// URLs de la API
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_EMAIL: '/auth/verify-email'
  },
  PRODUCTS: {
    BASE: '/products',
    FEATURED: '/products/featured',
    NEW: '/products/new',
    BY_ID: (id) => `/products/${id}`,
    BY_SLUG: (slug) => `/products/slug/${slug}`
  },
  CATEGORIES: {
    BASE: '/categories',
    BY_ID: (id) => `/categories/${id}`,
    BY_SLUG: (slug) => `/categories/slug/${slug}`
  },
  BRANDS: {
    BASE: '/brands',
    BY_ID: (id) => `/brands/${id}`,
    BY_SLUG: (slug) => `/brands/slug/${slug}`
  },
  CART: {
    BASE: '/cart',
    ITEMS: '/cart/items',
    ITEM_BY_ID: (id) => `/cart/items/${id}`,
    SUMMARY: '/cart/summary',
    CLEAR: '/cart'
  },
  WISHLIST: {
    BASE: '/wishlist',
    ITEMS: '/wishlist/items',
    ITEM_BY_ID: (id) => `/wishlist/items/${id}`,
    BY_PRODUCT: (productId) => `/wishlist/products/${productId}`,
    SUMMARY: '/wishlist/summary'
  },
  ORDERS: {
    BASE: '/orders',
    BY_ID: (id) => `/orders/${id}`,
    CANCEL: (id) => `/orders/${id}/cancel`
  },
  REVIEWS: {
    BASE: '/reviews',
    BY_PRODUCT: (productId) => `/reviews/product/${productId}`,
    MY_REVIEWS: '/reviews/my-reviews',
    BY_ID: (id) => `/reviews/${id}`,
    CAN_REVIEW: (productId) => `/reviews/can-review/${productId}`
  },
  SEARCH: {
    BASE: '/search',
    SUGGESTIONS: '/search/suggestions',
    POPULAR: '/search/popular',
    FILTERS: '/search/filters'
  },
  USERS: {
    PROFILE: '/users/profile',
    AVATAR: '/users/avatar',
    ADDRESSES: '/users/addresses',
    ADDRESS_BY_ID: (id) => `/users/addresses/${id}`,
    PASSWORD: '/users/password',
    ACCOUNT: '/users/account'
  },
  UPLOAD: {
    IMAGE: '/upload/image',
    IMAGES: '/upload/images',
    DOCUMENT: '/upload/document'
  },
  ADMIN: {
    USERS: '/admin/users',
    USER_ROLE: (id) => `/admin/users/${id}/role`,
    USER_STATUS: (id) => `/admin/users/${id}/status`,
    ORDERS: '/admin/orders',
    PRODUCTS: '/admin/products',
    REVIEWS: '/admin/reviews',
    STATS: '/admin/stats'
  },
  ANALYTICS: {
    DASHBOARD: '/analytics/dashboard',
    SALES: '/analytics/sales',
    PRODUCTS: '/analytics/products',
    USERS: '/analytics/users'
  }
};

// Estados de órdenes
export const ORDER_STATUS = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  PROCESSING: 'PROCESSING',
  SHIPPED: 'SHIPPED',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED',
  REFUNDED: 'REFUNDED'
};

// Estados de pago
export const PAYMENT_STATUS = {
  PENDING: 'PENDING',
  PAID: 'PAID',
  FAILED: 'FAILED',
  REFUNDED: 'REFUNDED',
  PARTIALLY_REFUNDED: 'PARTIALLY_REFUNDED'
};

// Roles de usuario
export const USER_ROLES = {
  CUSTOMER: 'CUSTOMER',
  ADMIN: 'ADMIN',
  SUPER_ADMIN: 'SUPER_ADMIN'
};

// Estados de producto
export const PRODUCT_STATUS = {
  DRAFT: 'DRAFT',
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  ARCHIVED: 'ARCHIVED'
};

// Tipos de dirección
export const ADDRESS_TYPES = {
  SHIPPING: 'SHIPPING',
  BILLING: 'BILLING'
};

// Configuración de paginación
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 12,
  MAX_LIMIT: 100,
  PRODUCTS_PER_PAGE: 12,
  ORDERS_PER_PAGE: 10,
  REVIEWS_PER_PAGE: 10,
  USERS_PER_PAGE: 20
};

// Configuración de archivos
export const FILE_CONFIG = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'],
  ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
};

// Configuración de validación
export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  EMAIL_MAX_LENGTH: 255,
  PHONE_LENGTH: 10,
  POSTAL_CODE_LENGTH: 6,
  PRODUCT_NAME_MIN_LENGTH: 3,
  PRODUCT_NAME_MAX_LENGTH: 255,
  PRODUCT_DESCRIPTION_MIN_LENGTH: 10,
  PRODUCT_DESCRIPTION_MAX_LENGTH: 5000,
  REVIEW_TITLE_MAX_LENGTH: 200,
  REVIEW_COMMENT_MAX_LENGTH: 1000,
  SKU_MIN_LENGTH: 3,
  SKU_MAX_LENGTH: 20
};

// Configuración de cache
export const CACHE_CONFIG = {
  DEFAULT_TTL: 5 * 60 * 1000, // 5 minutos
  PRODUCTS_TTL: 10 * 60 * 1000, // 10 minutos
  CATEGORIES_TTL: 30 * 60 * 1000, // 30 minutos
  USER_TTL: 15 * 60 * 1000 // 15 minutos
};

// Mensajes de error comunes
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Error de conexión. Por favor, verifica tu conexión a internet.',
  UNAUTHORIZED: 'No tienes permisos para realizar esta acción.',
  FORBIDDEN: 'Acceso denegado.',
  NOT_FOUND: 'El recurso solicitado no fue encontrado.',
  VALIDATION_ERROR: 'Por favor, verifica los datos ingresados.',
  SERVER_ERROR: 'Error interno del servidor. Por favor, intenta más tarde.',
  SESSION_EXPIRED: 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.',
  GENERIC_ERROR: 'Ha ocurrido un error inesperado.'
};

// Mensajes de éxito comunes
export const SUCCESS_MESSAGES = {
  LOGIN: '¡Bienvenido de vuelta!',
  REGISTER: '¡Cuenta creada exitosamente!',
  LOGOUT: 'Sesión cerrada correctamente.',
  PROFILE_UPDATED: 'Perfil actualizado exitosamente.',
  PASSWORD_CHANGED: 'Contraseña cambiada exitosamente.',
  ADDRESS_ADDED: 'Dirección agregada exitosamente.',
  ADDRESS_UPDATED: 'Dirección actualizada exitosamente.',
  ADDRESS_DELETED: 'Dirección eliminada exitosamente.',
  PRODUCT_ADDED_TO_CART: 'Producto agregado al carrito.',
  PRODUCT_REMOVED_FROM_CART: 'Producto removido del carrito.',
  PRODUCT_ADDED_TO_WISHLIST: 'Producto agregado a favoritos.',
  PRODUCT_REMOVED_FROM_WISHLIST: 'Producto removido de favoritos.',
  ORDER_CREATED: 'Orden creada exitosamente.',
  ORDER_CANCELLED: 'Orden cancelada exitosamente.',
  REVIEW_CREATED: 'Reseña creada exitosamente.',
  REVIEW_UPDATED: 'Reseña actualizada exitosamente.',
  REVIEW_DELETED: 'Reseña eliminada exitosamente.'
};

// Configuración de filtros
export const FILTER_OPTIONS = {
  SORT_BY: {
    RELEVANCE: 'relevance',
    PRICE_LOW_TO_HIGH: 'price_asc',
    PRICE_HIGH_TO_LOW: 'price_desc',
    NAME_A_TO_Z: 'name_asc',
    NAME_Z_TO_A: 'name_desc',
    NEWEST: 'newest',
    RATING: 'rating',
    POPULARITY: 'popularity'
  },
  PRICE_RANGES: [
    { label: 'Menos de $10,000', min: 0, max: 10000 },
    { label: '$10,000 - $25,000', min: 10000, max: 25000 },
    { label: '$25,000 - $50,000', min: 25000, max: 50000 },
    { label: '$50,000 - $100,000', min: 50000, max: 100000 },
    { label: 'Más de $100,000', min: 100000, max: null }
  ],
  RATINGS: [5, 4, 3, 2, 1]
};

// Configuración de la aplicación
export const APP_CONFIG = {
  NAME: 'Tienda Moderna',
  VERSION: '1.0.0',
  DESCRIPTION: 'Tu tienda de productos de limpieza y hogar',
  CONTACT_EMAIL: 'contacto@tiendamoderna.com',
  SUPPORT_EMAIL: 'soporte@tiendamoderna.com',
  PHONE: '+57 300 123 4567',
  ADDRESS: 'Bogotá, Colombia',
  SOCIAL_MEDIA: {
    FACEBOOK: 'https://facebook.com/tiendamoderna',
    INSTAGRAM: 'https://instagram.com/tiendamoderna',
    TWITTER: 'https://twitter.com/tiendamoderna',
    WHATSAPP: 'https://wa.me/573001234567'
  }
};

// Configuración de SEO
export const SEO_CONFIG = {
  DEFAULT_TITLE: 'Tienda Moderna - Productos de Limpieza y Hogar',
  DEFAULT_DESCRIPTION: 'Encuentra los mejores productos de limpieza y hogar en Tienda Moderna. Calidad garantizada y envío gratis.',
  DEFAULT_KEYWORDS: 'productos de limpieza, hogar, desinfectantes, detergentes, limpiadores',
  DEFAULT_IMAGE: '/images/og-image.jpg',
  SITE_URL: 'https://tiendamoderna.com'
};

// Departamentos de Colombia
export const COLOMBIA_STATES = [
  'Amazonas', 'Antioquia', 'Arauca', 'Atlántico', 'Bolívar', 'Boyacá',
  'Caldas', 'Caquetá', 'Casanare', 'Cauca', 'Cesar', 'Chocó', 'Córdoba',
  'Cundinamarca', 'Guainía', 'Guaviare', 'Huila', 'La Guajira', 'Magdalena',
  'Meta', 'Nariño', 'Norte de Santander', 'Putumayo', 'Quindío', 'Risaralda',
  'San Andrés y Providencia', 'Santander', 'Sucre', 'Tolima', 'Valle del Cauca',
  'Vaupés', 'Vichada'
];

export default {
  API_ENDPOINTS,
  ORDER_STATUS,
  PAYMENT_STATUS,
  USER_ROLES,
  PRODUCT_STATUS,
  ADDRESS_TYPES,
  PAGINATION,
  FILE_CONFIG,
  VALIDATION,
  CACHE_CONFIG,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  FILTER_OPTIONS,
  APP_CONFIG,
  SEO_CONFIG,
  COLOMBIA_STATES
};
