import React, { createContext, useContext, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Info, 
  X,
  ShoppingCart,
  Heart,
  Package,
  User
} from 'lucide-react';

// Toast Context
const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// Toast Provider
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((toast) => {
    const id = Date.now() + Math.random();
    const newToast = {
      id,
      type: 'info',
      duration: 4000,
      ...toast,
    };

    setToasts(prev => [...prev, newToast]);

    // Auto remove toast
    if (newToast.duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, newToast.duration);
    }

    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const removeAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  // Convenience methods
  const success = useCallback((message, options = {}) => {
    return addToast({ type: 'success', message, ...options });
  }, [addToast]);

  const error = useCallback((message, options = {}) => {
    return addToast({ type: 'error', message, duration: 6000, ...options });
  }, [addToast]);

  const warning = useCallback((message, options = {}) => {
    return addToast({ type: 'warning', message, duration: 5000, ...options });
  }, [addToast]);

  const info = useCallback((message, options = {}) => {
    return addToast({ type: 'info', message, ...options });
  }, [addToast]);

  const value = {
    toasts,
    addToast,
    removeToast,
    removeAllToasts,
    success,
    error,
    warning,
    info,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

// Toast Container
const ToastContainer = ({ toasts, removeToast }) => {
  if (toasts.length === 0) return null;

  return createPortal(
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full">
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} onRemove={removeToast} />
        ))}
      </AnimatePresence>
    </div>,
    document.body
  );
};

// Individual Toast Component
const Toast = ({ toast, onRemove }) => {
  const getIcon = () => {
    if (toast.icon) return toast.icon;
    
    switch (toast.type) {
      case 'success':
        return CheckCircle;
      case 'error':
        return XCircle;
      case 'warning':
        return AlertTriangle;
      case 'info':
      default:
        return Info;
    }
  };

  const getColors = () => {
    switch (toast.type) {
      case 'success':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          icon: 'text-green-500',
          text: 'text-green-800'
        };
      case 'error':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          icon: 'text-red-500',
          text: 'text-red-800'
        };
      case 'warning':
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          icon: 'text-yellow-500',
          text: 'text-yellow-800'
        };
      case 'info':
      default:
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          icon: 'text-blue-500',
          text: 'text-blue-800'
        };
    }
  };

  const IconComponent = getIcon();
  const colors = getColors();

  const toastVariants = {
    initial: {
      opacity: 0,
      x: 300,
      scale: 0.9,
    },
    animate: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
      },
    },
    exit: {
      opacity: 0,
      x: 300,
      scale: 0.9,
      transition: {
        duration: 0.2,
        ease: [0.4, 0, 1, 1],
      },
    },
  };

  return (
    <motion.div
      variants={toastVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`
        ${colors.bg} ${colors.border} border rounded-lg shadow-lg p-4
        flex items-start gap-3 max-w-sm w-full
      `}
    >
      {/* Icon */}
      <div className="flex-shrink-0">
        <IconComponent className={`w-5 h-5 ${colors.icon}`} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {toast.title && (
          <h4 className={`text-sm font-semibold ${colors.text} mb-1`}>
            {toast.title}
          </h4>
        )}
        <p className={`text-sm ${colors.text}`}>
          {toast.message}
        </p>
        {toast.action && (
          <button
            onClick={toast.action.onClick}
            className={`text-xs font-medium ${colors.text} underline mt-2 hover:no-underline`}
          >
            {toast.action.label}
          </button>
        )}
      </div>

      {/* Close Button */}
      <button
        onClick={() => onRemove(toast.id)}
        className={`flex-shrink-0 p-1 rounded-md hover:bg-black hover:bg-opacity-10 transition-colors ${colors.icon}`}
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

// Preset toast functions for common use cases
export const useToastActions = () => {
  const toast = useToast();

  const showCartSuccess = useCallback((productName) => {
    return toast.success(`${productName} agregado al carrito`, {
      icon: ShoppingCart,
      action: {
        label: 'Ver carrito',
        onClick: () => {
          // Navigate to cart
          window.location.href = '/cart';
        }
      }
    });
  }, [toast]);

  const showWishlistSuccess = useCallback((productName, added = true) => {
    return toast.success(
      `${productName} ${added ? 'agregado a' : 'eliminado de'} favoritos`,
      {
        icon: Heart,
        duration: 2000
      }
    );
  }, [toast]);

  const showOrderSuccess = useCallback((orderNumber) => {
    return toast.success(`Pedido #${orderNumber} realizado exitosamente`, {
      icon: Package,
      duration: 6000,
      action: {
        label: 'Ver pedido',
        onClick: () => {
          window.location.href = `/orders/${orderNumber}`;
        }
      }
    });
  }, [toast]);

  const showLoginRequired = useCallback((action = 'realizar esta acción') => {
    return toast.warning(`Inicia sesión para ${action}`, {
      icon: User,
      duration: 5000,
      action: {
        label: 'Iniciar sesión',
        onClick: () => {
          // Show login modal or navigate to login
          const event = new CustomEvent('showLoginModal');
          window.dispatchEvent(event);
        }
      }
    });
  }, [toast]);

  const showNetworkError = useCallback(() => {
    return toast.error('Error de conexión. Verifica tu internet e intenta nuevamente.', {
      duration: 8000,
      action: {
        label: 'Reintentar',
        onClick: () => {
          window.location.reload();
        }
      }
    });
  }, [toast]);

  const showFormError = useCallback((message = 'Por favor, corrige los errores en el formulario') => {
    return toast.error(message, {
      duration: 5000
    });
  }, [toast]);

  const showSaveSuccess = useCallback((item = 'Los cambios') => {
    return toast.success(`${item} se guardaron correctamente`, {
      duration: 3000
    });
  }, [toast]);

  const showDeleteSuccess = useCallback((item = 'El elemento') => {
    return toast.success(`${item} se eliminó correctamente`, {
      duration: 3000
    });
  }, [toast]);

  const showCopySuccess = useCallback((item = 'Texto') => {
    return toast.success(`${item} copiado al portapapeles`, {
      duration: 2000
    });
  }, [toast]);

  return {
    showCartSuccess,
    showWishlistSuccess,
    showOrderSuccess,
    showLoginRequired,
    showNetworkError,
    showFormError,
    showSaveSuccess,
    showDeleteSuccess,
    showCopySuccess,
  };
};

export default Toast;
