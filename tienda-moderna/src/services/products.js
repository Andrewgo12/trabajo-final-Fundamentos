import { api } from './apiClient';

// Servicio de productos integrado con la API
export const productsService = {
  // Obtener todos los productos con filtros
  getProducts: async (params = {}) => {
    try {
      const response = await api.products.getAll(params);
      return response.data;
    } catch (error) {
      console.error('Error getting products:', error);
      throw error;
    }
  },

  // Obtener producto por ID
  getProductById: async (id) => {
    try {
      const response = await api.products.getById(id);
      return response.data;
    } catch (error) {
      console.error('Error getting product:', error);
      throw error;
    }
  },

  // Obtener productos destacados
  getFeaturedProducts: async (params = {}) => {
    try {
      const response = await api.products.getFeatured(params);
      return response.data;
    } catch (error) {
      console.error('Error getting featured products:', error);
      throw error;
    }
  },

  // Obtener productos nuevos
  getNewProducts: async (params = {}) => {
    try {
      const response = await api.products.getNew(params);
      return response.data;
    } catch (error) {
      console.error('Error getting new products:', error);
      throw error;
    }
  },

  // Crear producto (Admin)
  createProduct: async (productData) => {
    try {
      const response = await api.products.create(productData);
      return response.data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  // Actualizar producto (Admin)
  updateProduct: async (id, productData) => {
    try {
      const response = await api.products.update(id, productData);
      return response.data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  // Eliminar producto (Admin)
  deleteProduct: async (id) => {
    try {
      const response = await api.products.delete(id);
      return response.data;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }
};

// Servicio de categorías
export const categoriesService = {
  // Obtener todas las categorías
  getCategories: async (params = {}) => {
    try {
      const response = await api.categories.getAll(params);
      return response.data;
    } catch (error) {
      console.error('Error getting categories:', error);
      throw error;
    }
  },

  // Obtener categoría por ID
  getCategoryById: async (id) => {
    try {
      const response = await api.categories.getById(id);
      return response.data;
    } catch (error) {
      console.error('Error getting category:', error);
      throw error;
    }
  },

  // Crear categoría (Admin)
  createCategory: async (categoryData) => {
    try {
      const response = await api.categories.create(categoryData);
      return response.data;
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  },

  // Actualizar categoría (Admin)
  updateCategory: async (id, categoryData) => {
    try {
      const response = await api.categories.update(id, categoryData);
      return response.data;
    } catch (error) {
      console.error('Error updating category:', error);
      throw error;
    }
  },

  // Eliminar categoría (Admin)
  deleteCategory: async (id) => {
    try {
      const response = await api.categories.delete(id);
      return response.data;
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  }
};

// Servicio de marcas
export const brandsService = {
  // Obtener todas las marcas
  getBrands: async (params = {}) => {
    try {
      const response = await api.brands.getAll(params);
      return response.data;
    } catch (error) {
      console.error('Error getting brands:', error);
      throw error;
    }
  },

  // Obtener marca por ID
  getBrandById: async (id) => {
    try {
      const response = await api.brands.getById(id);
      return response.data;
    } catch (error) {
      console.error('Error getting brand:', error);
      throw error;
    }
  },

  // Crear marca (Admin)
  createBrand: async (brandData) => {
    try {
      const response = await api.brands.create(brandData);
      return response.data;
    } catch (error) {
      console.error('Error creating brand:', error);
      throw error;
    }
  },

  // Actualizar marca (Admin)
  updateBrand: async (id, brandData) => {
    try {
      const response = await api.brands.update(id, brandData);
      return response.data;
    } catch (error) {
      console.error('Error updating brand:', error);
      throw error;
    }
  },

  // Eliminar marca (Admin)
  deleteBrand: async (id) => {
    try {
      const response = await api.brands.delete(id);
      return response.data;
    } catch (error) {
      console.error('Error deleting brand:', error);
      throw error;
    }
  }
};

export default {
  products: productsService,
  categories: categoriesService,
  brands: brandsService
};
