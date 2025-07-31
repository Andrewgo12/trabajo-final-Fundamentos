/**
 * Configuración SEO y meta tags para Tienda Moderna
 */

// Configuración base del sitio
export const siteConfig = {
  name: 'Tienda Moderna',
  description: 'Tu tienda online de productos de limpieza de alta calidad. Encuentra detergentes, desinfectantes, productos de aseo y más con envío gratis en Colombia.',
  url: 'https://tiendamoderna.com',
  ogImage: '/images/og-image.jpg',
  twitterHandle: '@tiendamoderna',
  keywords: [
    'productos de limpieza',
    'detergentes',
    'desinfectantes',
    'productos de aseo',
    'limpieza hogar',
    'productos antibacteriales',
    'tienda online Colombia',
    'envío gratis',
    'limpieza profesional'
  ],
  author: 'Tienda Moderna',
  language: 'es-CO',
  region: 'CO',
  robots: 'index, follow',
  googleSiteVerification: 'your-google-verification-code',
  bingVerification: 'your-bing-verification-code'
};

// Meta tags por página
export const pageMetaTags = {
  home: {
    title: 'Tienda Moderna - Productos de Limpieza de Calidad | Envío Gratis Colombia',
    description: 'Descubre la mejor selección de productos de limpieza para tu hogar y oficina. Detergentes, desinfectantes y más con envío gratis en compras +$50.000.',
    keywords: [
      'productos limpieza Colombia',
      'detergentes online',
      'desinfectantes hogar',
      'tienda limpieza',
      'envío gratis Colombia'
    ],
    ogType: 'website'
  },
  products: {
    title: 'Catálogo de Productos de Limpieza | Tienda Moderna',
    description: 'Explora nuestro amplio catálogo de productos de limpieza. Encuentra detergentes, jabones, desinfectantes y productos especializados para cada necesidad.',
    keywords: [
      'catálogo productos limpieza',
      'comprar detergentes online',
      'productos aseo Colombia',
      'limpieza profesional'
    ],
    ogType: 'website'
  },
  offers: {
    title: 'Ofertas y Descuentos en Productos de Limpieza | Tienda Moderna',
    description: 'Aprovecha nuestras ofertas especiales en productos de limpieza. Descuentos de hasta 50% en las mejores marcas. ¡Compra ahora!',
    keywords: [
      'ofertas productos limpieza',
      'descuentos detergentes',
      'promociones aseo',
      'ofertas especiales Colombia'
    ],
    ogType: 'website'
  },
  about: {
    title: 'Sobre Nosotros - Tienda Moderna | 10+ Años de Experiencia',
    description: 'Conoce la historia de Tienda Moderna. Más de 10 años ofreciendo productos de limpieza de calidad con el mejor servicio al cliente en Colombia.',
    keywords: [
      'sobre tienda moderna',
      'historia empresa',
      'productos limpieza Colombia',
      'experiencia calidad'
    ],
    ogType: 'website'
  },
  contact: {
    title: 'Contacto - Tienda Moderna | Atención al Cliente',
    description: 'Contáctanos para resolver tus dudas sobre productos de limpieza. Atención personalizada por teléfono, email y WhatsApp.',
    keywords: [
      'contacto tienda moderna',
      'atención cliente',
      'soporte productos limpieza',
      'servicio al cliente Colombia'
    ],
    ogType: 'website'
  },
  help: {
    title: 'Centro de Ayuda - Preguntas Frecuentes | Tienda Moderna',
    description: 'Encuentra respuestas a las preguntas más frecuentes sobre envíos, devoluciones, productos y más en nuestro centro de ayuda.',
    keywords: [
      'ayuda tienda moderna',
      'preguntas frecuentes',
      'soporte cliente',
      'FAQ productos limpieza'
    ],
    ogType: 'website'
  }
};

/**
 * Genera meta tags para una página específica
 * @param {string} page - Nombre de la página
 * @param {Object} customData - Datos personalizados para sobrescribir
 * @returns {Object} Meta tags generados
 */
export const generateMetaTags = (page = 'home', customData = {}) => {
  const pageData = pageMetaTags[page] || pageMetaTags.home;
  const data = { ...pageData, ...customData };

  const title = data.title || siteConfig.name;
  const description = data.description || siteConfig.description;
  const keywords = [...(data.keywords || []), ...siteConfig.keywords].join(', ');
  const url = `${siteConfig.url}${data.path || ''}`;
  const image = data.ogImage || siteConfig.ogImage;

  return {
    title,
    description,
    keywords,
    canonical: url,
    openGraph: {
      type: data.ogType || 'website',
      title,
      description,
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title
        }
      ],
      locale: siteConfig.language,
    },
    twitter: {
      card: 'summary_large_image',
      site: siteConfig.twitterHandle,
      creator: siteConfig.twitterHandle,
      title,
      description,
      image
    },
    additionalMetaTags: [
      {
        name: 'author',
        content: siteConfig.author
      },
      {
        name: 'robots',
        content: data.robots || siteConfig.robots
      },
      {
        name: 'language',
        content: siteConfig.language
      },
      {
        name: 'geo.region',
        content: siteConfig.region
      },
      {
        name: 'geo.country',
        content: 'CO'
      },
      {
        name: 'theme-color',
        content: '#0284c7'
      },
      {
        name: 'msapplication-TileColor',
        content: '#0284c7'
      }
    ]
  };
};

/**
 * Genera meta tags para productos específicos
 * @param {Object} product - Datos del producto
 * @returns {Object} Meta tags del producto
 */
export const generateProductMetaTags = (product) => {
  const title = `${product.name} - ${product.brand} | Tienda Moderna`;
  const description = `${product.description} Compra ${product.name} de ${product.brand} con envío gratis. Precio: $${product.price.toLocaleString()}`;
  const keywords = [
    product.name.toLowerCase(),
    product.brand.toLowerCase(),
    product.category.toLowerCase(),
    'comprar online',
    'envío gratis Colombia'
  ];

  return generateMetaTags('product', {
    title,
    description,
    keywords,
    path: `/product/${product.id}`,
    ogImage: product.images[0],
    ogType: 'product'
  });
};

/**
 * Genera meta tags para categorías
 * @param {Object} category - Datos de la categoría
 * @returns {Object} Meta tags de la categoría
 */
export const generateCategoryMetaTags = (category) => {
  const title = `${category.name} - Productos de Limpieza | Tienda Moderna`;
  const description = `Encuentra los mejores productos de ${category.name.toLowerCase()} para tu hogar. Calidad garantizada y envío gratis en compras +$50.000`;
  const keywords = [
    category.name.toLowerCase(),
    `productos ${category.name.toLowerCase()}`,
    'limpieza hogar',
    'comprar online Colombia'
  ];

  return generateMetaTags('category', {
    title,
    description,
    keywords,
    path: `/category/${category.id}`,
    ogType: 'website'
  });
};

/**
 * Genera datos estructurados JSON-LD para SEO
 * @param {string} type - Tipo de datos estructurados
 * @param {Object} data - Datos específicos
 * @returns {Object} Datos estructurados JSON-LD
 */
export const generateStructuredData = (type, data = {}) => {
  const baseData = {
    '@context': 'https://schema.org',
    '@type': type
  };

  switch (type) {
    case 'Organization':
      return {
        ...baseData,
        name: siteConfig.name,
        url: siteConfig.url,
        logo: `${siteConfig.url}/logo.png`,
        description: siteConfig.description,
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Calle 123 #45-67',
          addressLocality: 'Bogotá',
          addressRegion: 'Cundinamarca',
          postalCode: '110111',
          addressCountry: 'CO'
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+57-300-123-4567',
          contactType: 'customer service',
          availableLanguage: 'Spanish'
        },
        sameAs: [
          'https://facebook.com/tiendamoderna',
          'https://instagram.com/tiendamoderna',
          'https://twitter.com/tiendamoderna'
        ]
      };

    case 'Product':
      return {
        ...baseData,
        name: data.name,
        description: data.description,
        brand: {
          '@type': 'Brand',
          name: data.brand
        },
        image: data.images,
        offers: {
          '@type': 'Offer',
          price: data.price,
          priceCurrency: 'COP',
          availability: data.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
          seller: {
            '@type': 'Organization',
            name: siteConfig.name
          }
        },
        aggregateRating: data.rating ? {
          '@type': 'AggregateRating',
          ratingValue: data.rating,
          reviewCount: data.reviews
        } : undefined
      };

    case 'WebSite':
      return {
        ...baseData,
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${siteConfig.url}/products?search={search_term_string}`,
          'query-input': 'required name=search_term_string'
        }
      };

    default:
      return baseData;
  }
};

/**
 * Actualiza el título de la página
 * @param {string} title - Nuevo título
 */
export const updatePageTitle = (title) => {
  if (typeof document !== 'undefined') {
    document.title = title;
  }
};

/**
 * Actualiza meta tags dinámicamente
 * @param {Object} metaTags - Meta tags a actualizar
 */
export const updateMetaTags = (metaTags) => {
  if (typeof document === 'undefined') return;

  // Actualizar descripción
  const descriptionMeta = document.querySelector('meta[name="description"]');
  if (descriptionMeta && metaTags.description) {
    descriptionMeta.setAttribute('content', metaTags.description);
  }

  // Actualizar keywords
  const keywordsMeta = document.querySelector('meta[name="keywords"]');
  if (keywordsMeta && metaTags.keywords) {
    keywordsMeta.setAttribute('content', metaTags.keywords);
  }

  // Actualizar Open Graph
  if (metaTags.openGraph) {
    Object.entries(metaTags.openGraph).forEach(([key, value]) => {
      const meta = document.querySelector(`meta[property="og:${key}"]`);
      if (meta) {
        meta.setAttribute('content', value);
      }
    });
  }
};

export default {
  siteConfig,
  pageMetaTags,
  generateMetaTags,
  generateProductMetaTags,
  generateCategoryMetaTags,
  generateStructuredData,
  updatePageTitle,
  updateMetaTags
};
