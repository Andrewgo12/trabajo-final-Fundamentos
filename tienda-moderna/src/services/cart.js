import { api } from './apiClient';

// Servicio de carrito integrado con la API
export const cartService = {
  // Obtener carrito del usuario
  getCart: async () => {
    try {
      const response = await api.cart.get();
      return response.data;
    } catch (error) {
      console.error('Error getting cart:', error);
      throw error;
    }
  },

  // Agregar producto al carrito
  addToCart: async (productId, quantity = 1) => {
    try {
      const response = await api.cart.addItem({ productId, quantity });
      return response.data;
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  },

  // Actualizar cantidad de producto en carrito
  updateCartItem: async (itemId, quantity) => {
    try {
      const response = await api.cart.updateItem(itemId, { quantity });
      return response.data;
    } catch (error) {
      console.error('Error updating cart item:', error);
      throw error;
    }
  },

  // Remover producto del carrito
  removeFromCart: async (itemId) => {
    try {
      const response = await api.cart.removeItem(itemId);
      return response.data;
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  },

  // Limpiar carrito completo
  clearCart: async () => {
    try {
      const response = await api.cart.clear();
      return response.data;
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  },

  // Obtener resumen del carrito (para header)
  getCartSummary: async () => {
    try {
      const response = await api.cart.getSummary();
      return response.data;
    } catch (error) {
      console.error('Error getting cart summary:', error);
      throw error;
    }
  },

  // Mover item del carrito a wishlist
  moveToWishlist: async (itemId) => {
    try {
      const response = await api.cart.moveToWishlist(itemId);
      return response.data;
    } catch (error) {
      console.error('Error moving to wishlist:', error);
      throw error;
    }
  }
};

export default cartService;
