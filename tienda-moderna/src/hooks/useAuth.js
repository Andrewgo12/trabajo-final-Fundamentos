import { useState, useEffect } from 'react';
import { useStore } from '../stores/useStore';
import { api } from '../services/apiClient';

export const useAuth = () => {
  const { 
    user, 
    isAuthenticated, 
    login: setUser, 
    logout: clearUser,
    setLoading,
    setError,
    clearError
  } = useStore();

  const [isLoading, setIsLoading] = useState(false);

  // Verificar si hay un token guardado al cargar la aplicación
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('accessToken');
      if (token && !isAuthenticated) {
        try {
          setLoading(true);
          const response = await api.auth.me();
          setUser(response.data.data.user);
        } catch (error) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          setError('Sesión expirada');
        } finally {
          setLoading(false);
        }
      }
    };

    checkAuthStatus();
  }, [isAuthenticated, setUser, setLoading, setError]);

  const login = async (email, password) => {
    try {
      setIsLoading(true);
      clearError();

      const response = await api.auth.login({ email, password });

      // Guardar tokens en localStorage
      localStorage.setItem('accessToken', response.data.data.tokens.accessToken);
      localStorage.setItem('refreshToken', response.data.data.tokens.refreshToken);

      // Actualizar estado global
      setUser(response.data.data.user);

      return { success: true, user: response.data.data.user };
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setIsLoading(true);
      clearError();

      const response = await api.auth.register(userData);

      // Guardar tokens en localStorage
      localStorage.setItem('accessToken', response.data.data.tokens.accessToken);
      localStorage.setItem('refreshToken', response.data.data.tokens.refreshToken);

      // Actualizar estado global
      setUser(response.data.data.user);

      return { success: true, user: response.data.data.user };
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);

      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        await api.auth.logout(refreshToken);
      }

      // Limpiar tokens
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

      // Limpiar estado global
      clearUser();

      return { success: true };
    } catch (error) {
      // Incluso si falla el logout en el servidor, limpiamos localmente
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      clearUser();
      return { success: true };
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (userData) => {
    try {
      setIsLoading(true);
      clearError();
      
      const updatedUser = await usersAPI.updateProfile(user.id, userData);
      setUser(updatedUser);
      
      return { success: true };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    updateProfile
  };
};
