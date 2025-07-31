import { useState, useEffect, useCallback } from 'react';

/**
 * Hook para manejar localStorage de manera segura con React
 * @param {string} key - Clave del localStorage
 * @param {*} initialValue - Valor inicial si no existe en localStorage
 * @returns {Array} [value, setValue, removeValue]
 */
export const useLocalStorage = (key, initialValue) => {
  // Función para obtener el valor inicial
  const getInitialValue = useCallback(() => {
    try {
      if (typeof window === 'undefined') {
        return initialValue;
      }

      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  }, [key, initialValue]);

  const [storedValue, setStoredValue] = useState(getInitialValue);

  // Función para actualizar el valor
  const setValue = useCallback((value) => {
    try {
      // Permitir que value sea una función para casos como setState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      setStoredValue(valueToStore);
      
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        
        // Disparar evento personalizado para sincronizar entre pestañas
        window.dispatchEvent(new CustomEvent('localStorageChange', {
          detail: { key, value: valueToStore }
        }));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  // Función para remover el valor
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
        
        // Disparar evento personalizado
        window.dispatchEvent(new CustomEvent('localStorageChange', {
          detail: { key, value: null }
        }));
      }
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  // Sincronizar con cambios en otras pestañas
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.warn(`Error parsing localStorage value for key "${key}":`, error);
        }
      }
    };

    const handleCustomStorageChange = (e) => {
      if (e.detail.key === key) {
        setStoredValue(e.detail.value);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageChange);
      window.addEventListener('localStorageChange', handleCustomStorageChange);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('storage', handleStorageChange);
        window.removeEventListener('localStorageChange', handleCustomStorageChange);
      }
    };
  }, [key]);

  return [storedValue, setValue, removeValue];
};

/**
 * Hook para manejar múltiples valores de localStorage
 * @param {Object} keys - Objeto con claves y valores iniciales
 * @returns {Object} Objeto con valores y funciones de actualización
 */
export const useMultipleLocalStorage = (keys) => {
  const [values, setValues] = useState(() => {
    const initialValues = {};
    Object.entries(keys).forEach(([key, initialValue]) => {
      try {
        if (typeof window !== 'undefined') {
          const item = window.localStorage.getItem(key);
          initialValues[key] = item ? JSON.parse(item) : initialValue;
        } else {
          initialValues[key] = initialValue;
        }
      } catch (error) {
        console.warn(`Error reading localStorage key "${key}":`, error);
        initialValues[key] = initialValue;
      }
    });
    return initialValues;
  });

  const setValue = useCallback((key, value) => {
    try {
      const valueToStore = value instanceof Function ? value(values[key]) : value;
      
      setValues(prev => ({ ...prev, [key]: valueToStore }));
      
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [values]);

  const removeValue = useCallback((key) => {
    try {
      setValues(prev => ({ ...prev, [key]: keys[key] }));
      
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }, [keys]);

  const clearAll = useCallback(() => {
    try {
      const initialValues = {};
      Object.entries(keys).forEach(([key, initialValue]) => {
        initialValues[key] = initialValue;
        if (typeof window !== 'undefined') {
          window.localStorage.removeItem(key);
        }
      });
      setValues(initialValues);
    } catch (error) {
      console.warn('Error clearing localStorage:', error);
    }
  }, [keys]);

  return {
    values,
    setValue,
    removeValue,
    clearAll
  };
};

/**
 * Hook para localStorage con expiración
 * @param {string} key - Clave del localStorage
 * @param {*} initialValue - Valor inicial
 * @param {number} ttl - Tiempo de vida en milisegundos
 * @returns {Array} [value, setValue, removeValue, isExpired]
 */
export const useLocalStorageWithExpiry = (key, initialValue, ttl = 24 * 60 * 60 * 1000) => {
  const getValueWithExpiry = useCallback(() => {
    try {
      if (typeof window === 'undefined') {
        return { value: initialValue, expired: false };
      }

      const item = window.localStorage.getItem(key);
      if (!item) {
        return { value: initialValue, expired: false };
      }

      const parsedItem = JSON.parse(item);
      const now = new Date().getTime();

      if (parsedItem.expiry && now > parsedItem.expiry) {
        window.localStorage.removeItem(key);
        return { value: initialValue, expired: true };
      }

      return { 
        value: parsedItem.value !== undefined ? parsedItem.value : initialValue, 
        expired: false 
      };
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return { value: initialValue, expired: false };
    }
  }, [key, initialValue]);

  const [state, setState] = useState(getValueWithExpiry);

  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(state.value) : value;
      const now = new Date().getTime();
      const expiry = now + ttl;
      
      const item = {
        value: valueToStore,
        expiry: expiry
      };

      setState({ value: valueToStore, expired: false });
      
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(item));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, ttl, state.value]);

  const removeValue = useCallback(() => {
    try {
      setState({ value: initialValue, expired: false });
      
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  // Verificar expiración periódicamente
  useEffect(() => {
    const interval = setInterval(() => {
      const { value, expired } = getValueWithExpiry();
      if (expired) {
        setState({ value, expired: true });
      }
    }, 60000); // Verificar cada minuto

    return () => clearInterval(interval);
  }, [getValueWithExpiry]);

  return [state.value, setValue, removeValue, state.expired];
};

/**
 * Hook para detectar si localStorage está disponible
 * @returns {boolean} Si localStorage está disponible
 */
export const useLocalStorageAvailable = () => {
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    try {
      const test = '__localStorage_test__';
      window.localStorage.setItem(test, test);
      window.localStorage.removeItem(test);
      setIsAvailable(true);
    } catch (error) {
      setIsAvailable(false);
    }
  }, []);

  return isAvailable;
};

export default useLocalStorage;
