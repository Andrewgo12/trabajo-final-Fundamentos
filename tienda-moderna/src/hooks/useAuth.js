import { useState, useEffect } from 'react';
import { useStore } from '../stores/useStore';
import { authAPI } from '../services/api';

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
      const token = localStorage.getItem('auth_token');
      if (token && !isAuthenticated) {
        try {
          setLoading(true);
          const userData = await authAPI.getCurrentUser(token);
          setUser(userData);
        } catch (error) {
          localStorage.removeItem('auth_token');
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
      
      const response = await authAPI.login(email, password);
      
      // Guardar token en localStorage
      localStorage.setItem('auth_token', response.token);
      
      // Actualizar estado global
      setUser(response.user);
      
      return { success: true };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setIsLoading(true);
      clearError();
      
      const response = await authAPI.register(userData);
      
      // Guardar token en localStorage
      localStorage.setItem('auth_token', response.token);
      
      // Actualizar estado global
      setUser(response.user);
      
      return { success: true };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      
      await authAPI.logout();
      
      // Limpiar token
      localStorage.removeItem('auth_token');
      
      // Limpiar estado global
      clearUser();
      
      return { success: true };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
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
