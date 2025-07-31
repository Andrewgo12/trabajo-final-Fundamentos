import { api } from './apiClient';

// Servicio de usuarios integrado con la API
export const usersService = {
  // Obtener perfil del usuario
  getProfile: async () => {
    try {
      const response = await api.users.getProfile();
      return response.data;
    } catch (error) {
      console.error('Error getting profile:', error);
      throw error;
    }
  },

  // Actualizar perfil del usuario
  updateProfile: async (profileData) => {
    try {
      const response = await api.users.updateProfile(profileData);
      return response.data;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  },

  // Subir avatar
  uploadAvatar: async (file) => {
    try {
      const formData = new FormData();
      formData.append('avatar', file);
      
      const response = await api.users.uploadAvatar(formData);
      return response.data;
    } catch (error) {
      console.error('Error uploading avatar:', error);
      throw error;
    }
  },

  // Obtener direcciones del usuario
  getAddresses: async () => {
    try {
      const response = await api.users.getAddresses();
      return response.data;
    } catch (error) {
      console.error('Error getting addresses:', error);
      throw error;
    }
  },

  // Agregar nueva dirección
  addAddress: async (addressData) => {
    try {
      const response = await api.users.addAddress(addressData);
      return response.data;
    } catch (error) {
      console.error('Error adding address:', error);
      throw error;
    }
  },

  // Actualizar dirección
  updateAddress: async (id, addressData) => {
    try {
      const response = await api.users.updateAddress(id, addressData);
      return response.data;
    } catch (error) {
      console.error('Error updating address:', error);
      throw error;
    }
  },

  // Eliminar dirección
  deleteAddress: async (id) => {
    try {
      const response = await api.users.deleteAddress(id);
      return response.data;
    } catch (error) {
      console.error('Error deleting address:', error);
      throw error;
    }
  },

  // Cambiar contraseña
  changePassword: async (currentPassword, newPassword) => {
    try {
      const response = await api.users.changePassword({
        currentPassword,
        newPassword
      });
      return response.data;
    } catch (error) {
      console.error('Error changing password:', error);
      throw error;
    }
  },

  // Desactivar cuenta
  deactivateAccount: async (password) => {
    try {
      const response = await api.users.deactivateAccount({ password });
      return response.data;
    } catch (error) {
      console.error('Error deactivating account:', error);
      throw error;
    }
  }
};

// Servicio de upload
export const uploadService = {
  // Subir imagen individual
  uploadImage: async (file) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      
      const response = await api.upload.image(formData);
      return response.data;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  },

  // Subir múltiples imágenes
  uploadImages: async (files) => {
    try {
      const formData = new FormData();
      files.forEach(file => {
        formData.append('images', file);
      });
      
      const response = await api.upload.images(formData);
      return response.data;
    } catch (error) {
      console.error('Error uploading images:', error);
      throw error;
    }
  },

  // Subir documento
  uploadDocument: async (file) => {
    try {
      const formData = new FormData();
      formData.append('document', file);
      
      const response = await api.upload.document(formData);
      return response.data;
    } catch (error) {
      console.error('Error uploading document:', error);
      throw error;
    }
  }
};

// Servicio de administración
export const adminService = {
  // Obtener usuarios (Admin)
  getUsers: async (params = {}) => {
    try {
      const response = await api.admin.getUsers(params);
      return response.data;
    } catch (error) {
      console.error('Error getting users:', error);
      throw error;
    }
  },

  // Actualizar rol de usuario (Super Admin)
  updateUserRole: async (id, role) => {
    try {
      const response = await api.admin.updateUserRole(id, { role });
      return response.data;
    } catch (error) {
      console.error('Error updating user role:', error);
      throw error;
    }
  },

  // Actualizar estado de usuario (Admin)
  updateUserStatus: async (id, isActive) => {
    try {
      const response = await api.admin.updateUserStatus(id, { isActive });
      return response.data;
    } catch (error) {
      console.error('Error updating user status:', error);
      throw error;
    }
  },

  // Obtener órdenes (Admin)
  getOrders: async (params = {}) => {
    try {
      const response = await api.admin.getOrders(params);
      return response.data;
    } catch (error) {
      console.error('Error getting admin orders:', error);
      throw error;
    }
  },

  // Obtener productos (Admin)
  getProducts: async (params = {}) => {
    try {
      const response = await api.admin.getProducts(params);
      return response.data;
    } catch (error) {
      console.error('Error getting admin products:', error);
      throw error;
    }
  },

  // Obtener reviews (Admin)
  getReviews: async (params = {}) => {
    try {
      const response = await api.admin.getReviews(params);
      return response.data;
    } catch (error) {
      console.error('Error getting admin reviews:', error);
      throw error;
    }
  },

  // Obtener estadísticas del sistema (Admin)
  getStats: async () => {
    try {
      const response = await api.admin.getStats();
      return response.data;
    } catch (error) {
      console.error('Error getting admin stats:', error);
      throw error;
    }
  }
};

// Servicio de analytics
export const analyticsService = {
  // Obtener dashboard de analytics (Admin)
  getDashboard: async (params = {}) => {
    try {
      const response = await api.analytics.getDashboard(params);
      return response.data;
    } catch (error) {
      console.error('Error getting analytics dashboard:', error);
      throw error;
    }
  },

  // Obtener analytics de ventas (Admin)
  getSales: async (params = {}) => {
    try {
      const response = await api.analytics.getSales(params);
      return response.data;
    } catch (error) {
      console.error('Error getting sales analytics:', error);
      throw error;
    }
  },

  // Obtener analytics de productos (Admin)
  getProducts: async (params = {}) => {
    try {
      const response = await api.analytics.getProducts(params);
      return response.data;
    } catch (error) {
      console.error('Error getting product analytics:', error);
      throw error;
    }
  },

  // Obtener analytics de usuarios (Admin)
  getUsers: async (params = {}) => {
    try {
      const response = await api.analytics.getUsers(params);
      return response.data;
    } catch (error) {
      console.error('Error getting user analytics:', error);
      throw error;
    }
  }
};

export default {
  users: usersService,
  upload: uploadService,
  admin: adminService,
  analytics: analyticsService
};
