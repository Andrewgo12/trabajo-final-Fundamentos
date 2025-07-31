// Utilidades para notificaciones toast
// Usando react-hot-toast como librería de notificaciones

import toast from 'react-hot-toast';

// Configuración por defecto
const defaultOptions = {
  duration: 4000,
  position: 'top-right',
  style: {
    borderRadius: '8px',
    background: '#333',
    color: '#fff',
    fontSize: '14px',
    maxWidth: '400px'
  }
};

// Toast de éxito
export const showSuccess = (message, options = {}) => {
  return toast.success(message, {
    ...defaultOptions,
    style: {
      ...defaultOptions.style,
      background: '#10b981',
      color: '#fff'
    },
    iconTheme: {
      primary: '#fff',
      secondary: '#10b981'
    },
    ...options
  });
};

// Toast de error
export const showError = (message, options = {}) => {
  return toast.error(message, {
    ...defaultOptions,
    duration: 6000, // Errores duran más tiempo
    style: {
      ...defaultOptions.style,
      background: '#ef4444',
      color: '#fff'
    },
    iconTheme: {
      primary: '#fff',
      secondary: '#ef4444'
    },
    ...options
  });
};

// Toast de advertencia
export const showWarning = (message, options = {}) => {
  return toast(message, {
    ...defaultOptions,
    icon: '⚠️',
    style: {
      ...defaultOptions.style,
      background: '#f59e0b',
      color: '#fff'
    },
    ...options
  });
};

// Toast de información
export const showInfo = (message, options = {}) => {
  return toast(message, {
    ...defaultOptions,
    icon: 'ℹ️',
    style: {
      ...defaultOptions.style,
      background: '#3b82f6',
      color: '#fff'
    },
    ...options
  });
};

// Toast de carga
export const showLoading = (message = 'Cargando...', options = {}) => {
  return toast.loading(message, {
    ...defaultOptions,
    style: {
      ...defaultOptions.style,
      background: '#6b7280',
      color: '#fff'
    },
    ...options
  });
};

// Toast personalizado
export const showCustom = (message, options = {}) => {
  return toast(message, {
    ...defaultOptions,
    ...options
  });
};

// Promesa con toast
export const showPromise = (promise, messages, options = {}) => {
  return toast.promise(
    promise,
    {
      loading: messages.loading || 'Cargando...',
      success: messages.success || 'Completado',
      error: messages.error || 'Error'
    },
    {
      ...defaultOptions,
      ...options
    }
  );
};

// Dismiss toast
export const dismissToast = (toastId) => {
  toast.dismiss(toastId);
};

// Dismiss todos los toasts
export const dismissAllToasts = () => {
  toast.dismiss();
};

// Toast para operaciones de API
export const apiToast = {
  // Para operaciones exitosas
  success: (operation, item = '') => {
    const messages = {
      create: `${item} creado exitosamente`,
      update: `${item} actualizado exitosamente`,
      delete: `${item} eliminado exitosamente`,
      save: `${item} guardado exitosamente`,
      send: `${item} enviado exitosamente`,
      upload: `${item} subido exitosamente`,
      login: 'Inicio de sesión exitoso',
      logout: 'Sesión cerrada',
      register: 'Registro exitoso'
    };
    
    showSuccess(messages[operation] || `${operation} completado exitosamente`);
  },

  // Para errores de API
  error: (operation, error, item = '') => {
    let message = '';
    
    if (error?.response?.data?.message) {
      message = error.response.data.message;
    } else if (error?.message) {
      message = error.message;
    } else {
      const messages = {
        create: `Error al crear ${item}`,
        update: `Error al actualizar ${item}`,
        delete: `Error al eliminar ${item}`,
        save: `Error al guardar ${item}`,
        send: `Error al enviar ${item}`,
        upload: `Error al subir ${item}`,
        login: 'Error en el inicio de sesión',
        logout: 'Error al cerrar sesión',
        register: 'Error en el registro',
        fetch: `Error al cargar ${item}`,
        network: 'Error de conexión'
      };
      
      message = messages[operation] || `Error en ${operation}`;
    }
    
    showError(message);
  },

  // Para operaciones de carga
  loading: (operation, item = '') => {
    const messages = {
      create: `Creando ${item}...`,
      update: `Actualizando ${item}...`,
      delete: `Eliminando ${item}...`,
      save: `Guardando ${item}...`,
      send: `Enviando ${item}...`,
      upload: `Subiendo ${item}...`,
      login: 'Iniciando sesión...',
      logout: 'Cerrando sesión...',
      register: 'Registrando usuario...',
      fetch: `Cargando ${item}...`
    };
    
    return showLoading(messages[operation] || `${operation}...`);
  }
};

// Toast para carrito
export const cartToast = {
  added: (productName) => showSuccess(`${productName} agregado al carrito`),
  updated: (productName) => showSuccess(`${productName} actualizado en el carrito`),
  removed: (productName) => showSuccess(`${productName} removido del carrito`),
  cleared: () => showSuccess('Carrito vaciado'),
  error: (message) => showError(message || 'Error en el carrito')
};

// Toast para wishlist
export const wishlistToast = {
  added: (productName) => showSuccess(`${productName} agregado a favoritos`),
  removed: (productName) => showSuccess(`${productName} removido de favoritos`),
  cleared: () => showSuccess('Lista de favoritos vaciada'),
  error: (message) => showError(message || 'Error en la lista de favoritos')
};

// Toast para autenticación
export const authToast = {
  loginSuccess: () => showSuccess('¡Bienvenido de vuelta!'),
  loginError: (message) => showError(message || 'Error en el inicio de sesión'),
  registerSuccess: () => showSuccess('¡Cuenta creada exitosamente!'),
  registerError: (message) => showError(message || 'Error en el registro'),
  logoutSuccess: () => showInfo('Sesión cerrada'),
  sessionExpired: () => showWarning('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.')
};

// Toast para órdenes
export const orderToast = {
  created: (orderNumber) => showSuccess(`Orden ${orderNumber} creada exitosamente`),
  cancelled: (orderNumber) => showInfo(`Orden ${orderNumber} cancelada`),
  statusUpdated: (orderNumber, status) => showInfo(`Orden ${orderNumber} actualizada a ${status}`),
  error: (message) => showError(message || 'Error en la orden')
};

export default {
  success: showSuccess,
  error: showError,
  warning: showWarning,
  info: showInfo,
  loading: showLoading,
  custom: showCustom,
  promise: showPromise,
  dismiss: dismissToast,
  dismissAll: dismissAllToasts,
  api: apiToast,
  cart: cartToast,
  wishlist: wishlistToast,
  auth: authToast,
  order: orderToast
};
