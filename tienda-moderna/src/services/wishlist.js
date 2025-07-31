import { api } from './apiClient';

// Servicio de wishlist integrado con la API
export const wishlistService = {
  // Obtener wishlist del usuario
  getWishlist: async (params = {}) => {
    try {
      const response = await api.wishlist.get(params);
      return response.data;
    } catch (error) {
      console.error('Error getting wishlist:', error);
      throw error;
    }
  },

  // Agregar producto a wishlist
  addToWishlist: async (productId) => {
    try {
      const response = await api.wishlist.addItem({ productId });
      return response.data;
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      throw error;
    }
  },

  // Remover producto de wishlist por ID del item
  removeFromWishlist: async (itemId) => {
    try {
      const response = await api.wishlist.removeItem(itemId);
      return response.data;
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      throw error;
    }
  },

  // Remover producto de wishlist por ID del producto
  removeByProductId: async (productId) => {
    try {
      const response = await api.wishlist.removeByProductId(productId);
      return response.data;
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      throw error;
    }
  },

  // Limpiar wishlist completa
  clearWishlist: async () => {
    try {
      const response = await api.wishlist.clear();
      return response.data;
    } catch (error) {
      console.error('Error clearing wishlist:', error);
      throw error;
    }
  },

  // Obtener resumen de wishlist (para header)
  getWishlistSummary: async () => {
    try {
      const response = await api.wishlist.getSummary();
      return response.data;
    } catch (error) {
      console.error('Error getting wishlist summary:', error);
      throw error;
    }
  },

  // Mover item de wishlist a carrito
  moveToCart: async (itemId, quantity = 1) => {
    try {
      const response = await api.wishlist.moveToCart(itemId, { quantity });
      return response.data;
    } catch (error) {
      console.error('Error moving to cart:', error);
      throw error;
    }
  },

  // Verificar si un producto está en wishlist
  checkInWishlist: async (productId) => {
    try {
      const response = await api.wishlist.check(productId);
      return response.data;
    } catch (error) {
      console.error('Error checking wishlist:', error);
      throw error;
    }
  }
};

export default wishlistService;
