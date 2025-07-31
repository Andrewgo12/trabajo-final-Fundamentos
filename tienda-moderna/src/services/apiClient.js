import axios from 'axios';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
            refreshToken,
          });

          const { accessToken, refreshToken: newRefreshToken } = response.data.data.tokens;
          
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', newRefreshToken);

          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, redirect to login
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// API Methods
export const api = {
  // Auth endpoints
  auth: {
    register: (data) => apiClient.post('/auth/register', data),
    login: (data) => apiClient.post('/auth/login', data),
    logout: (refreshToken) => apiClient.post('/auth/logout', { refreshToken }),
    refresh: (refreshToken) => apiClient.post('/auth/refresh', { refreshToken }),
    me: () => apiClient.get('/auth/me'),
  },

  // Products endpoints
  products: {
    getAll: (params) => apiClient.get('/products', { params }),
    getById: (id) => apiClient.get(`/products/${id}`),
    getFeatured: (params) => apiClient.get('/products/featured', { params }),
    getNew: (params) => apiClient.get('/products/new', { params }),
    create: (data) => apiClient.post('/products', data),
    update: (id, data) => apiClient.put(`/products/${id}`, data),
    delete: (id) => apiClient.delete(`/products/${id}`),
  },

  // Categories endpoints
  categories: {
    getAll: (params) => apiClient.get('/categories', { params }),
    getById: (id) => apiClient.get(`/categories/${id}`),
    create: (data) => apiClient.post('/categories', data),
    update: (id, data) => apiClient.put(`/categories/${id}`, data),
    delete: (id) => apiClient.delete(`/categories/${id}`),
  },

  // Brands endpoints
  brands: {
    getAll: (params) => apiClient.get('/brands', { params }),
    getById: (id) => apiClient.get(`/brands/${id}`),
    create: (data) => apiClient.post('/brands', data),
    update: (id, data) => apiClient.put(`/brands/${id}`, data),
    delete: (id) => apiClient.delete(`/brands/${id}`),
  },

  // Cart endpoints
  cart: {
    get: () => apiClient.get('/cart'),
    addItem: (data) => apiClient.post('/cart/items', data),
    updateItem: (id, data) => apiClient.put(`/cart/items/${id}`, data),
    removeItem: (id) => apiClient.delete(`/cart/items/${id}`),
    clear: () => apiClient.delete('/cart'),
    getSummary: () => apiClient.get('/cart/summary'),
    moveToWishlist: (id) => apiClient.post(`/cart/items/${id}/move-to-wishlist`),
  },

  // Wishlist endpoints
  wishlist: {
    get: (params) => apiClient.get('/wishlist', { params }),
    addItem: (data) => apiClient.post('/wishlist/items', data),
    removeItem: (id) => apiClient.delete(`/wishlist/items/${id}`),
    removeByProductId: (productId) => apiClient.delete(`/wishlist/products/${productId}`),
    clear: () => apiClient.delete('/wishlist'),
    getSummary: () => apiClient.get('/wishlist/summary'),
    moveToCart: (id, data) => apiClient.post(`/wishlist/items/${id}/move-to-cart`, data),
    check: (productId) => apiClient.get(`/wishlist/check/${productId}`),
  },

  // Orders endpoints
  orders: {
    getAll: (params) => apiClient.get('/orders', { params }),
    getById: (id) => apiClient.get(`/orders/${id}`),
    create: (data) => apiClient.post('/orders', data),
    cancel: (id, data) => apiClient.patch(`/orders/${id}/cancel`, data),
    updateStatus: (id, data) => apiClient.patch(`/orders/${id}/status`, data),
  },

  // Reviews endpoints
  reviews: {
    getByProduct: (productId, params) => apiClient.get(`/reviews/product/${productId}`, { params }),
    getMy: (params) => apiClient.get('/reviews/my-reviews', { params }),
    create: (data) => apiClient.post('/reviews', data),
    update: (id, data) => apiClient.put(`/reviews/${id}`, data),
    delete: (id) => apiClient.delete(`/reviews/${id}`),
    canReview: (productId) => apiClient.get(`/reviews/can-review/${productId}`),
    moderate: (id, data) => apiClient.patch(`/reviews/${id}/moderate`, data),
  },

  // Search endpoints
  search: {
    global: (params) => apiClient.get('/search', { params }),
    suggestions: (params) => apiClient.get('/search/suggestions', { params }),
    popular: () => apiClient.get('/search/popular'),
    filters: (params) => apiClient.get('/search/filters', { params }),
  },

  // Users endpoints
  users: {
    getProfile: () => apiClient.get('/users/profile'),
    updateProfile: (data) => apiClient.put('/users/profile', data),
    uploadAvatar: (formData) => apiClient.post('/users/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
    getAddresses: () => apiClient.get('/users/addresses'),
    addAddress: (data) => apiClient.post('/users/addresses', data),
    updateAddress: (id, data) => apiClient.put(`/users/addresses/${id}`, data),
    deleteAddress: (id) => apiClient.delete(`/users/addresses/${id}`),
    changePassword: (data) => apiClient.put('/users/password', data),
    deactivateAccount: (data) => apiClient.delete('/users/account', { data }),
  },

  // Upload endpoints
  upload: {
    image: (formData) => apiClient.post('/upload/image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
    images: (formData) => apiClient.post('/upload/images', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
    document: (formData) => apiClient.post('/upload/document', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  },

  // Admin endpoints
  admin: {
    getUsers: (params) => apiClient.get('/admin/users', { params }),
    updateUserRole: (id, data) => apiClient.patch(`/admin/users/${id}/role`, data),
    updateUserStatus: (id, data) => apiClient.patch(`/admin/users/${id}/status`, data),
    getOrders: (params) => apiClient.get('/admin/orders', { params }),
    getProducts: (params) => apiClient.get('/admin/products', { params }),
    getReviews: (params) => apiClient.get('/admin/reviews', { params }),
    getStats: () => apiClient.get('/admin/stats'),
  },

  // Analytics endpoints
  analytics: {
    getDashboard: (params) => apiClient.get('/analytics/dashboard', { params }),
    getSales: (params) => apiClient.get('/analytics/sales', { params }),
    getProducts: (params) => apiClient.get('/analytics/products', { params }),
    getUsers: (params) => apiClient.get('/analytics/users', { params }),
  },
};

export default apiClient;
