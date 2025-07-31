export const categories = [
  {
    id: 'limpieza-general',
    name: 'Limpieza General',
    description: 'Productos esenciales para la limpieza del hogar',
    image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&h=300&fit=crop',
    icon: '🧽'
  },
  {
    id: 'detergentes',
    name: 'Detergentes',
    description: 'Detergentes para ropa y lavado',
    image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400&h=300&fit=crop',
    icon: '🧴'
  },
  {
    id: 'desinfectantes',
    name: 'Desinfectantes',
    description: 'Productos desinfectantes y antibacteriales',
    image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=300&fit=crop',
    icon: '🦠'
  },
  {
    id: 'herramientas',
    name: 'Herramientas de Limpieza',
    description: 'Escobas, trapeadores y herramientas',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    icon: '🧹'
  },
  {
    id: 'papel-higiene',
    name: 'Papel e Higiene',
    description: 'Papel higiénico, toallas y productos de higiene',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    icon: '🧻'
  },
  {
    id: 'cuidado-personal',
    name: 'Cuidado Personal',
    description: 'Productos para el cuidado e higiene personal',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=300&fit=crop',
    icon: '🧴'
  }
];

export const products = [
  {
    id: 1001,
    name: "Detergente Líquido Premium",
    description: "Detergente concentrado para ropa con fórmula avanzada que elimina las manchas más difíciles y cuida las fibras de tu ropa.",
    price: 15000,
    originalPrice: 18000,
    discount: 17,
    images: [
      "https://www.kipclin.com/images/virtuemart/product/KIP-PQP-DETER00999(E).jpg",
      "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=500&h=500&fit=crop"
    ],
    category: 'detergentes',
    brand: 'CleanMax',
    stock: 29,
    rating: 4.5,
    reviews: 127,
    features: ['Concentrado', 'Anti-manchas', 'Cuida las fibras', 'Fragancia duradera'],
    specifications: {
      'Contenido': '1 Litro',
      'Tipo': 'Líquido concentrado',
      'Fragancia': 'Lavanda',
      'pH': '7.0 - 8.0'
    },
    tags: ['detergente', 'ropa', 'concentrado', 'premium'],
    isNew: false,
    isFeatured: true,
    isOnSale: true
  },
  {
    id: 1002,
    name: "Limpiador Multiusos Profesional",
    description: "Limpiador versátil ideal para todo tipo de superficies duras. Fórmula profesional que desinfecta y deja un aroma fresco.",
    price: 10000,
    originalPrice: 12000,
    discount: 17,
    images: [
      "https://mercaldas.vtexassets.com/arquivos/ids/1325813/Limpiador-DERSA-multiusos-desinfectante-x4000-ml_120391.jpg?v=638508604253470000s",
      "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=500&h=500&fit=crop"
    ],
    category: 'limpieza-general',
    brand: 'ProClean',
    stock: 50,
    rating: 4.3,
    reviews: 89,
    features: ['Multiusos', 'Desinfectante', 'Aroma fresco', 'Fórmula profesional'],
    specifications: {
      'Contenido': '4 Litros',
      'Tipo': 'Líquido',
      'Fragancia': 'Cítrica',
      'Superficie': 'Todo tipo'
    },
    tags: ['multiusos', 'desinfectante', 'profesional'],
    isNew: false,
    isFeatured: true,
    isOnSale: true
  },
  {
    id: 1003,
    name: "Desinfectante en Spray Antibacterial",
    description: "Potente desinfectante que elimina el 99.9% de gérmenes y bacterias. Ideal para superficies de contacto frecuente.",
    price: 20000,
    originalPrice: 20000,
    discount: 0,
    images: [
      "https://olimpica.vtexassets.com/arquivos/ids/1327291/7793253471705_2.jpg?v=638452530742270000",
      "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=500&h=500&fit=crop"
    ],
    category: 'desinfectantes',
    brand: 'SafeGuard',
    stock: 40,
    rating: 4.7,
    reviews: 156,
    features: ['Elimina 99.9% gérmenes', 'Spray fácil aplicación', 'Secado rápido', 'Sin residuos'],
    specifications: {
      'Contenido': '500ml',
      'Tipo': 'Spray',
      'Eficacia': '99.9% gérmenes',
      'Tiempo acción': '30 segundos'
    },
    tags: ['desinfectante', 'antibacterial', 'spray', 'gérmenes'],
    isNew: true,
    isFeatured: true,
    isOnSale: false
  },
  {
    id: 1004,
    name: "Jabón en Barra Biodegradable",
    description: "Jabón natural biodegradable para manos. Fórmula suave que cuida tu piel mientras protege el medio ambiente.",
    price: 5000,
    originalPrice: 6000,
    discount: 17,
    images: [
      "https://www.cerowasteshop.com/cdn/shop/products/Jabon-Para-Manos-Natural-Ecologico-Biodegradable-500-ml.jpg?v=1685639410&width=1445",
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&h=500&fit=crop"
    ],
    category: 'cuidado-personal',
    brand: 'EcoClean',
    stock: 50,
    rating: 4.2,
    reviews: 89,
    features: ['100% biodegradable', 'Fórmula natural', 'Cuida la piel', 'Eco-friendly'],
    specifications: {
      'Contenido': '100g',
      'Tipo': 'Barra sólida',
      'Ingredientes': 'Naturales',
      'pH': '6.5 - 7.5'
    },
    tags: ['jabón', 'biodegradable', 'natural', 'manos'],
    isNew: false,
    isFeatured: false,
    isOnSale: true
  },
  {
    id: 1005,
    name: "Toallas de Papel Absorbentes",
    description: "Toallas de papel ultra absorbentes y resistentes. Perfectas para la cocina y limpieza general del hogar.",
    price: 12000,
    originalPrice: 12000,
    discount: 0,
    images: [
      "https://www.catalogoespacial.com/16656-large_default/toallas-de-papel.jpg",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop"
    ],
    category: 'papel-higiene',
    brand: 'SoftPaper',
    stock: 150,
    rating: 4.4,
    reviews: 203,
    features: ['Ultra absorbentes', 'Resistentes', 'Multiusos', 'Suaves'],
    specifications: {
      'Contenido': '2 rollos',
      'Hojas': '120 por rollo',
      'Capas': '2 capas',
      'Tamaño': '22x24 cm'
    },
    tags: ['toallas', 'papel', 'absorbente', 'cocina'],
    isNew: false,
    isFeatured: true,
    isOnSale: false
  },
  {
    id: 1006,
    name: "Escoba de Madera Tradicional",
    description: "Escoba tradicional de madera con cerdas naturales. Ideal para barrer todo tipo de superficies.",
    price: 25000,
    originalPrice: 30000,
    discount: 17,
    images: [
      "https://www.loencuentras.com.co/1916-large_default/escoba-madera.jpg",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop"
    ],
    category: 'herramientas',
    brand: 'CleanTools',
    stock: 55,
    rating: 4.6,
    reviews: 134,
    features: ['Madera natural', 'Cerdas resistentes', 'Mango ergonómico', 'Duradera'],
    specifications: {
      'Material': 'Madera natural',
      'Largo': '120 cm',
      'Ancho': '30 cm',
      'Peso': '800g'
    },
    tags: ['escoba', 'madera', 'barrer', 'tradicional'],
    isNew: false,
    isFeatured: false,
    isOnSale: true
  },
  {
    id: 1007,
    name: "Recogedor de Basura Resistente",
    description: "Recogedor plástico de alta resistencia con borde de goma para una recolección eficiente. Diseño ergonómico y duradero.",
    price: 10000,
    originalPrice: 10000,
    discount: 0,
    images: [
      "https://detalshop.com/cdn/shop/products/022366.jpg?v=1588392867",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop"
    ],
    category: 'herramientas',
    brand: 'CleanTools',
    stock: 296,
    rating: 4.1,
    reviews: 78,
    features: ['Alta resistencia', 'Borde de goma', 'Ergonómico', 'Duradero'],
    specifications: {
      'Material': 'Plástico ABS',
      'Ancho': '25 cm',
      'Alto': '8 cm',
      'Color': 'Gris'
    },
    tags: ['recogedor', 'plástico', 'resistente', 'ergonómico'],
    isNew: false,
    isFeatured: false,
    isOnSale: false
  },
  {
    id: 1008,
    name: "Trapeador de Microfibra Premium",
    description: "Trapeador de microfibra de alta calidad, perfecto para pisos duros. Absorbe hasta 7 veces su peso en agua.",
    price: 30000,
    originalPrice: 35000,
    discount: 14,
    images: [
      "https://canelahogar.com.co/wp-content/uploads/2021/08/7016005-TraperoMicroFibraAzul.jpg",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop"
    ],
    category: 'herramientas',
    brand: 'MicroClean',
    stock: 40,
    rating: 4.8,
    reviews: 245,
    features: ['Microfibra premium', 'Super absorbente', 'Pisos duros', 'Lavable'],
    specifications: {
      'Material': 'Microfibra 80/20',
      'Tamaño': '40x40 cm',
      'Absorción': '7x su peso',
      'Lavable': 'Hasta 500 lavados'
    },
    tags: ['trapeador', 'microfibra', 'absorbente', 'premium'],
    isNew: false,
    isFeatured: true,
    isOnSale: true
  },
  {
    id: 1009,
    name: "Guantes de Limpieza Desechables",
    description: "Guantes desechables de nitrilo para tareas domésticas. Sin látex, resistentes y cómodos para uso prolongado.",
    price: 5000,
    originalPrice: 5000,
    discount: 0,
    images: [
      "https://http2.mlstatic.com/D_NQ_NP_661197-MCO47379769348_092021-O.webp",
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&h=500&fit=crop"
    ],
    category: 'cuidado-personal',
    brand: 'SafeHands',
    stock: 68,
    rating: 4.3,
    reviews: 156,
    features: ['Sin látex', 'Nitrilo', 'Desechables', 'Resistentes'],
    specifications: {
      'Material': 'Nitrilo',
      'Cantidad': '100 unidades',
      'Tallas': 'S, M, L, XL',
      'Grosor': '0.12 mm'
    },
    tags: ['guantes', 'nitrilo', 'desechables', 'limpieza'],
    isNew: false,
    isFeatured: false,
    isOnSale: false
  },
  {
    id: 1010,
    name: "Esponjas de Cocina Multiusos",
    description: "Pack de esponjas suaves y duraderas para cocina. Lado abrasivo y lado suave para diferentes superficies.",
    price: 7000,
    originalPrice: 8500,
    discount: 18,
    images: [
      "https://dojiw2m9tvv09.cloudfront.net/12840/product/M_esponja-lisa3798.png?11&time=1728407800",
      "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=500&h=500&fit=crop"
    ],
    category: 'limpieza-general',
    brand: 'KitchenClean',
    stock: 297,
    rating: 4.4,
    reviews: 189,
    features: ['Doble cara', 'Duraderas', 'Multiusos', 'Pack económico'],
    specifications: {
      'Cantidad': '6 unidades',
      'Tamaño': '11x7x3 cm',
      'Material': 'Espuma + fibra',
      'Colores': 'Variados'
    },
    tags: ['esponjas', 'cocina', 'multiusos', 'pack'],
    isNew: false,
    isFeatured: true,
    isOnSale: true
  }
];

export const featuredProducts = products.filter(product => product.isFeatured);
export const newProducts = products.filter(product => product.isNew);
export const saleProducts = products.filter(product => product.isOnSale);

export const getProductsByCategory = (categoryId) => {
  return products.filter(product => product.category === categoryId);
};

export const getProductById = (id) => {
  return products.find(product => product.id === parseInt(id));
};

export const searchProducts = (query) => {
  const searchTerm = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );
};
