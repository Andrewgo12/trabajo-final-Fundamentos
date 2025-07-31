import React, { useEffect } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Info, 
  X,
  ShoppingCart,
  Heart,
  User,
  Package,
  CreditCard,
  Truck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

const NotificationModal = ({
  isOpen,
  onClose,
  type = 'info', // 'success', 'error', 'warning', 'info'
  title,
  message,
  autoClose = false,
  autoCloseDelay = 3000,
  showCloseButton = true,
  actions = [],
  icon: CustomIcon,
  ...props
}) => {
  const getIcon = () => {
    if (CustomIcon) return CustomIcon;
    
    switch (type) {
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
    switch (type) {
      case 'success':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          icon: 'text-green-500',
          title: 'text-green-800',
          message: 'text-green-700'
        };
      case 'error':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          icon: 'text-red-500',
          title: 'text-red-800',
          message: 'text-red-700'
        };
      case 'warning':
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          icon: 'text-yellow-500',
          title: 'text-yellow-800',
          message: 'text-yellow-700'
        };
      case 'info':
      default:
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          icon: 'text-blue-500',
          title: 'text-blue-800',
          message: 'text-blue-700'
        };
    }
  };

  const IconComponent = getIcon();
  const colors = getColors();

  // Auto close functionality
  useEffect(() => {
    if (autoClose && isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDelay);

      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseDelay, isOpen, onClose]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      showCloseButton={false}
      className="notification-modal"
      {...props}
    >
      <div className={`${colors.bg} ${colors.border} border rounded-lg p-6`}>
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className="flex-shrink-0">
            <IconComponent className={`w-6 h-6 ${colors.icon}`} />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {title && (
              <h3 className={`text-lg font-semibold ${colors.title} mb-2`}>
                {title}
              </h3>
            )}
            {message && (
              <p className={`text-sm ${colors.message}`}>
                {message}
              </p>
            )}
          </div>

          {/* Close Button */}
          {showCloseButton && (
            <button
              onClick={onClose}
              className={`flex-shrink-0 p-1 rounded-md hover:bg-black hover:bg-opacity-10 transition-colors ${colors.icon}`}
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Actions */}
        {actions.length > 0 && (
          <div className="flex gap-3 mt-4 pt-4 border-t border-current border-opacity-20">
            {actions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant || 'outline'}
                size="sm"
                onClick={action.onClick}
                className={`btn btn-${action.variant || 'outline'} btn-sm`}
              >
                {action.icon && <action.icon className="w-4 h-4 mr-2" />}
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
};

// Preset notification modals for common use cases
export const SuccessNotification = ({
  isOpen,
  onClose,
  title = '¡Éxito!',
  message,
  autoClose = true,
  ...props
}) => {
  return (
    <NotificationModal
      isOpen={isOpen}
      onClose={onClose}
      type="success"
      title={title}
      message={message}
      autoClose={autoClose}
      {...props}
    />
  );
};

export const ErrorNotification = ({
  isOpen,
  onClose,
  title = 'Error',
  message,
  autoClose = false,
  ...props
}) => {
  return (
    <NotificationModal
      isOpen={isOpen}
      onClose={onClose}
      type="error"
      title={title}
      message={message}
      autoClose={autoClose}
      {...props}
    />
  );
};

export const CartNotification = ({
  isOpen,
  onClose,
  productName,
  onViewCart,
  onContinueShopping,
  ...props
}) => {
  const actions = [
    {
      label: 'Ver Carrito',
      variant: 'primary',
      icon: ShoppingCart,
      onClick: onViewCart
    },
    {
      label: 'Seguir Comprando',
      variant: 'outline',
      onClick: onContinueShopping
    }
  ];

  return (
    <NotificationModal
      isOpen={isOpen}
      onClose={onClose}
      type="success"
      title="Producto Agregado"
      message={`${productName} se agregó correctamente al carrito.`}
      icon={ShoppingCart}
      actions={actions}
      autoClose={false}
      {...props}
    />
  );
};

export const WishlistNotification = ({
  isOpen,
  onClose,
  productName,
  added = true,
  onViewWishlist,
  ...props
}) => {
  const actions = added ? [
    {
      label: 'Ver Lista de Deseos',
      variant: 'primary',
      icon: Heart,
      onClick: onViewWishlist
    }
  ] : [];

  return (
    <NotificationModal
      isOpen={isOpen}
      onClose={onClose}
      type={added ? 'success' : 'info'}
      title={added ? 'Agregado a Favoritos' : 'Eliminado de Favoritos'}
      message={`${productName} ${added ? 'se agregó a' : 'se eliminó de'} tu lista de deseos.`}
      icon={Heart}
      actions={actions}
      autoClose={true}
      autoCloseDelay={2000}
      {...props}
    />
  );
};

export const OrderNotification = ({
  isOpen,
  onClose,
  orderNumber,
  onViewOrder,
  onTrackOrder,
  ...props
}) => {
  const actions = [
    {
      label: 'Ver Pedido',
      variant: 'primary',
      icon: Package,
      onClick: onViewOrder
    },
    {
      label: 'Seguir Pedido',
      variant: 'outline',
      icon: Truck,
      onClick: onTrackOrder
    }
  ];

  return (
    <NotificationModal
      isOpen={isOpen}
      onClose={onClose}
      type="success"
      title="¡Pedido Realizado!"
      message={`Tu pedido #${orderNumber} ha sido procesado exitosamente.`}
      icon={Package}
      actions={actions}
      autoClose={false}
      {...props}
    />
  );
};

export const PaymentNotification = ({
  isOpen,
  onClose,
  success = true,
  amount,
  method,
  onRetry,
  ...props
}) => {
  const actions = success ? [] : [
    {
      label: 'Reintentar Pago',
      variant: 'primary',
      icon: CreditCard,
      onClick: onRetry
    }
  ];

  return (
    <NotificationModal
      isOpen={isOpen}
      onClose={onClose}
      type={success ? 'success' : 'error'}
      title={success ? 'Pago Exitoso' : 'Error en el Pago'}
      message={success 
        ? `Tu pago de $${amount?.toLocaleString()} con ${method} fue procesado correctamente.`
        : 'Hubo un problema procesando tu pago. Por favor, intenta nuevamente.'
      }
      icon={CreditCard}
      actions={actions}
      autoClose={success}
      autoCloseDelay={3000}
      {...props}
    />
  );
};

export const LoginRequiredNotification = ({
  isOpen,
  onClose,
  onLogin,
  onRegister,
  action = 'realizar esta acción',
  ...props
}) => {
  const actions = [
    {
      label: 'Iniciar Sesión',
      variant: 'primary',
      icon: User,
      onClick: onLogin
    },
    {
      label: 'Registrarse',
      variant: 'outline',
      onClick: onRegister
    }
  ];

  return (
    <NotificationModal
      isOpen={isOpen}
      onClose={onClose}
      type="info"
      title="Inicia Sesión"
      message={`Necesitas iniciar sesión para ${action}.`}
      icon={User}
      actions={actions}
      autoClose={false}
      {...props}
    />
  );
};

export default NotificationModal;
