import { api } from './apiClient';

// Servicio de órdenes integrado con la API
export const ordersService = {
  // Obtener todas las órdenes del usuario
  getOrders: async (params = {}) => {
    try {
      const response = await api.orders.getAll(params);
      return response.data;
    } catch (error) {
      console.error('Error getting orders:', error);
      throw error;
    }
  },

  // Obtener orden por ID
  getOrderById: async (id) => {
    try {
      const response = await api.orders.getById(id);
      return response.data;
    } catch (error) {
      console.error('Error getting order:', error);
      throw error;
    }
  },

  // Crear nueva orden (checkout)
  createOrder: async (orderData) => {
    try {
      const response = await api.orders.create(orderData);
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  // Cancelar orden
  cancelOrder: async (id, reason) => {
    try {
      const response = await api.orders.cancel(id, { reason });
      return response.data;
    } catch (error) {
      console.error('Error cancelling order:', error);
      throw error;
    }
  },

  // Actualizar estado de orden (Admin)
  updateOrderStatus: async (id, status, paymentStatus, notes) => {
    try {
      const response = await api.orders.updateStatus(id, {
        status,
        paymentStatus,
        notes
      });
      return response.data;
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  }
};

// Servicio de reviews
export const reviewsService = {
  // Obtener reviews de un producto
  getProductReviews: async (productId, params = {}) => {
    try {
      const response = await api.reviews.getByProduct(productId, params);
      return response.data;
    } catch (error) {
      console.error('Error getting product reviews:', error);
      throw error;
    }
  },

  // Obtener reviews del usuario
  getMyReviews: async (params = {}) => {
    try {
      const response = await api.reviews.getMy(params);
      return response.data;
    } catch (error) {
      console.error('Error getting my reviews:', error);
      throw error;
    }
  },

  // Crear review
  createReview: async (reviewData) => {
    try {
      const response = await api.reviews.create(reviewData);
      return response.data;
    } catch (error) {
      console.error('Error creating review:', error);
      throw error;
    }
  },

  // Actualizar review
  updateReview: async (id, reviewData) => {
    try {
      const response = await api.reviews.update(id, reviewData);
      return response.data;
    } catch (error) {
      console.error('Error updating review:', error);
      throw error;
    }
  },

  // Eliminar review
  deleteReview: async (id) => {
    try {
      const response = await api.reviews.delete(id);
      return response.data;
    } catch (error) {
      console.error('Error deleting review:', error);
      throw error;
    }
  },

  // Verificar si el usuario puede hacer review de un producto
  canReview: async (productId) => {
    try {
      const response = await api.reviews.canReview(productId);
      return response.data;
    } catch (error) {
      console.error('Error checking review eligibility:', error);
      throw error;
    }
  },

  // Moderar review (Admin)
  moderateReview: async (id, isApproved) => {
    try {
      const response = await api.reviews.moderate(id, { isApproved });
      return response.data;
    } catch (error) {
      console.error('Error moderating review:', error);
      throw error;
    }
  }
};

// Servicio de búsqueda
export const searchService = {
  // Búsqueda global
  search: async (params = {}) => {
    try {
      const response = await api.search.global(params);
      return response.data;
    } catch (error) {
      console.error('Error searching:', error);
      throw error;
    }
  },

  // Obtener sugerencias de búsqueda
  getSuggestions: async (query, limit = 10) => {
    try {
      const response = await api.search.suggestions({ q: query, limit });
      return response.data;
    } catch (error) {
      console.error('Error getting search suggestions:', error);
      throw error;
    }
  },

  // Obtener búsquedas populares
  getPopularSearches: async () => {
    try {
      const response = await api.search.popular();
      return response.data;
    } catch (error) {
      console.error('Error getting popular searches:', error);
      throw error;
    }
  },

  // Obtener filtros disponibles
  getFilters: async (params = {}) => {
    try {
      const response = await api.search.filters(params);
      return response.data;
    } catch (error) {
      console.error('Error getting search filters:', error);
      throw error;
    }
  }
};

export default {
  orders: ordersService,
  reviews: reviewsService,
  search: searchService
};
