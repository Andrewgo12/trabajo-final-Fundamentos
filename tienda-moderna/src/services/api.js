import { products, categories } from '../data/products';

// Simulación de delay de red
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Simulación de base de datos de usuarios
let users = [
  {
    id: 1,
    name: 'Juan Pérez',
    email: 'juan@example.com',
    password: '123456', // En producción esto estaría hasheado
    phone: '+57 300 123 4567',
    addresses: [
      {
        id: 1,
        name: 'Casa',
        street: 'Calle 123 #45-67',
        city: 'Bogotá',
        state: 'Cundinamarca',
        zipCode: '110111',
        isDefault: true
      }
    ],
    createdAt: new Date('2024-01-15'),
  }
];

// Simulación de base de datos de pedidos
let orders = [
  {
    id: 'ORD-001',
    userId: 1,
    items: [
      { ...products[0], quantity: 2 },
      { ...products[1], quantity: 1 }
    ],
    total: 40000,
    status: 'delivered',
    shippingAddress: users[0].addresses[0],
    createdAt: new Date('2024-01-20'),
    deliveredAt: new Date('2024-01-22'),
  }
];

// API de Productos
export const productsAPI = {
  // Obtener todos los productos
  getAll: async (filters = {}) => {
    await delay(300);
    let filteredProducts = [...products];
    
    // Aplicar filtros
    if (filters.category) {
      filteredProducts = filteredProducts.filter(p => p.category === filters.category);
    }
    
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredProducts = filteredProducts.filter(p => 
        p.name.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm) ||
        p.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }
    
    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      filteredProducts = filteredProducts.filter(p => p.price >= min && p.price <= max);
    }
    
    if (filters.brand) {
      filteredProducts = filteredProducts.filter(p => p.brand === filters.brand);
    }
    
    if (filters.rating) {
      filteredProducts = filteredProducts.filter(p => p.rating >= filters.rating);
    }
    
    // Aplicar ordenamiento
    if (filters.sortBy) {
      filteredProducts.sort((a, b) => {
        const order = filters.sortOrder === 'desc' ? -1 : 1;
        
        switch (filters.sortBy) {
          case 'price':
            return (a.price - b.price) * order;
          case 'rating':
            return (a.rating - b.rating) * order;
          case 'name':
            return a.name.localeCompare(b.name) * order;
          case 'newest':
            return (new Date(b.createdAt || 0) - new Date(a.createdAt || 0)) * order;
          default:
            return 0;
        }
      });
    }
    
    return {
      products: filteredProducts,
      total: filteredProducts.length,
      page: filters.page || 1,
      limit: filters.limit || 20
    };
  },
  
  // Obtener producto por ID
  getById: async (id) => {
    await delay(200);
    const product = products.find(p => p.id === parseInt(id));
    if (!product) {
      throw new Error('Producto no encontrado');
    }
    return product;
  },
  
  // Obtener productos destacados
  getFeatured: async () => {
    await delay(200);
    return products.filter(p => p.isFeatured);
  },
  
  // Obtener productos nuevos
  getNew: async () => {
    await delay(200);
    return products.filter(p => p.isNew);
  },
  
  // Obtener productos en oferta
  getOnSale: async () => {
    await delay(200);
    return products.filter(p => p.isOnSale);
  },
  
  // Obtener productos relacionados
  getRelated: async (productId, limit = 4) => {
    await delay(200);
    const product = products.find(p => p.id === parseInt(productId));
    if (!product) return [];

    return products
      .filter(p => p.id !== product.id && p.category === product.category)
      .slice(0, limit);
  },

  // Obtener sugerencias de búsqueda
  searchSuggestions: async (query) => {
    await delay(150);
    const searchTerm = query.toLowerCase();
    const suggestions = [];

    // Buscar en nombres de productos
    products.forEach(product => {
      if (product.name.toLowerCase().includes(searchTerm)) {
        suggestions.push({
          type: 'product',
          value: product.name,
          category: product.category
        });
      }
    });

    // Buscar en marcas
    const brands = [...new Set(products.map(p => p.brand))];
    brands.forEach(brand => {
      if (brand.toLowerCase().includes(searchTerm)) {
        suggestions.push({
          type: 'brand',
          value: brand
        });
      }
    });

    // Buscar en categorías
    const categories = [
      'multipurpose', 'kitchen', 'bathroom', 'floors',
      'laundry', 'glass', 'disinfectants', 'eco'
    ];
    const categoryNames = {
      multipurpose: 'Multiusos',
      kitchen: 'Cocina',
      bathroom: 'Baño',
      floors: 'Pisos',
      laundry: 'Lavandería',
      glass: 'Cristales',
      disinfectants: 'Desinfectantes',
      eco: 'Eco-Amigables'
    };

    categories.forEach(category => {
      const categoryName = categoryNames[category];
      if (categoryName.toLowerCase().includes(searchTerm)) {
        suggestions.push({
          type: 'category',
          value: categoryName,
          categoryId: category
        });
      }
    });

    // Remover duplicados y limitar resultados
    const uniqueSuggestions = suggestions
      .filter((suggestion, index, self) =>
        index === self.findIndex(s => s.value === suggestion.value && s.type === suggestion.type)
      )
      .slice(0, 8);

    return uniqueSuggestions;
  }
};

// API de Categorías
export const categoriesAPI = {
  getAll: async () => {
    await delay(200);
    return categories;
  },
  
  getById: async (id) => {
    await delay(200);
    const category = categories.find(c => c.id === id);
    if (!category) {
      throw new Error('Categoría no encontrada');
    }
    return category;
  }
};

// API de Autenticación
export const authAPI = {
  login: async (email, password) => {
    await delay(500);
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      throw new Error('Credenciales inválidas');
    }
    
    const { password: _, ...userWithoutPassword } = user;
    return {
      user: userWithoutPassword,
      token: 'fake-jwt-token-' + user.id
    };
  },
  
  register: async (userData) => {
    await delay(500);
    
    // Verificar si el email ya existe
    if (users.find(u => u.email === userData.email)) {
      throw new Error('El email ya está registrado');
    }
    
    const newUser = {
      id: users.length + 1,
      ...userData,
      addresses: [],
      createdAt: new Date()
    };
    
    users.push(newUser);
    
    const { password: _, ...userWithoutPassword } = newUser;
    return {
      user: userWithoutPassword,
      token: 'fake-jwt-token-' + newUser.id
    };
  },
  
  logout: async () => {
    await delay(200);
    return { success: true };
  },
  
  getCurrentUser: async (token) => {
    await delay(200);
    const userId = parseInt(token.replace('fake-jwt-token-', ''));
    const user = users.find(u => u.id === userId);
    if (!user) {
      throw new Error('Token inválido');
    }
    
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
};

// API de Usuarios
export const usersAPI = {
  updateProfile: async (userId, userData) => {
    await delay(300);
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
      throw new Error('Usuario no encontrado');
    }
    
    users[userIndex] = { ...users[userIndex], ...userData };
    const { password: _, ...userWithoutPassword } = users[userIndex];
    return userWithoutPassword;
  },
  
  addAddress: async (userId, address) => {
    await delay(300);
    const user = users.find(u => u.id === userId);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    
    const newAddress = {
      id: Date.now(),
      ...address,
      isDefault: user.addresses.length === 0
    };
    
    user.addresses.push(newAddress);
    return newAddress;
  },
  
  updateAddress: async (userId, addressId, addressData) => {
    await delay(300);
    const user = users.find(u => u.id === userId);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    
    const addressIndex = user.addresses.findIndex(a => a.id === addressId);
    if (addressIndex === -1) {
      throw new Error('Dirección no encontrada');
    }
    
    user.addresses[addressIndex] = { ...user.addresses[addressIndex], ...addressData };
    return user.addresses[addressIndex];
  },
  
  deleteAddress: async (userId, addressId) => {
    await delay(300);
    const user = users.find(u => u.id === userId);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    
    user.addresses = user.addresses.filter(a => a.id !== addressId);
    return { success: true };
  }
};

// API de Pedidos
export const ordersAPI = {
  create: async (orderData) => {
    await delay(500);
    
    const newOrder = {
      id: 'ORD-' + String(orders.length + 1).padStart(3, '0'),
      ...orderData,
      status: 'pending',
      createdAt: new Date()
    };
    
    orders.push(newOrder);
    return newOrder;
  },
  
  getByUserId: async (userId) => {
    await delay(300);
    return orders.filter(o => o.userId === userId);
  },
  
  getById: async (orderId) => {
    await delay(200);
    const order = orders.find(o => o.id === orderId);
    if (!order) {
      throw new Error('Pedido no encontrado');
    }
    return order;
  },
  
  updateStatus: async (orderId, status) => {
    await delay(300);
    const orderIndex = orders.findIndex(o => o.id === orderId);
    if (orderIndex === -1) {
      throw new Error('Pedido no encontrado');
    }
    
    orders[orderIndex].status = status;
    if (status === 'delivered') {
      orders[orderIndex].deliveredAt = new Date();
    }
    
    return orders[orderIndex];
  }
};
