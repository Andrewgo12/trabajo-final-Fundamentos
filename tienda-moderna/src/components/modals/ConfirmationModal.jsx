import React from 'react';
import { 
  AlertTriangle, 
  Trash2, 
  X, 
  CheckCircle, 
  Info, 
  AlertCircle,
  XCircle,
  HelpCircle
} from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  variant = 'warning', // 'warning', 'danger', 'info', 'success'
  loading = false,
  icon: CustomIcon,
  children,
  ...props
}) => {
  const getIcon = () => {
    if (CustomIcon) return CustomIcon;
    
    switch (variant) {
      case 'danger':
        return XCircle;
      case 'warning':
        return AlertTriangle;
      case 'success':
        return CheckCircle;
      case 'info':
        return Info;
      default:
        return HelpCircle;
    }
  };

  const getIconColor = () => {
    switch (variant) {
      case 'danger':
        return 'text-red-500';
      case 'warning':
        return 'text-yellow-500';
      case 'success':
        return 'text-green-500';
      case 'info':
        return 'text-blue-500';
      default:
        return 'text-gray-500';
    }
  };

  const getButtonVariant = () => {
    switch (variant) {
      case 'danger':
        return 'danger';
      case 'warning':
        return 'warning';
      case 'success':
        return 'success';
      case 'info':
        return 'primary';
      default:
        return 'primary';
    }
  };

  const IconComponent = getIcon();

  const handleConfirm = async () => {
    if (onConfirm) {
      await onConfirm();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      showCloseButton={false}
      closeOnOverlayClick={!loading}
      closeOnEscape={!loading}
      {...props}
    >
      <div className="text-center p-6">
        {/* Icon */}
        <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center`}>
          <IconComponent className={`w-8 h-8 ${getIconColor()}`} />
        </div>

        {/* Title */}
        {title && (
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {title}
          </h3>
        )}

        {/* Message */}
        {message && (
          <p className="text-gray-600 mb-6">
            {message}
          </p>
        )}

        {/* Custom Content */}
        {children && (
          <div className="mb-6">
            {children}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={loading}
            className="btn btn-outline"
          >
            {cancelText}
          </Button>
          <Button
            variant={getButtonVariant()}
            onClick={handleConfirm}
            loading={loading}
            className={`btn btn-${getButtonVariant()}`}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

// Preset confirmation modals for common use cases
export const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  itemName = 'este elemento',
  loading = false,
  ...props
}) => {
  return (
    <ConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Confirmar Eliminación"
      message={`¿Estás seguro de que quieres eliminar ${itemName}? Esta acción no se puede deshacer.`}
      confirmText="Eliminar"
      cancelText="Cancelar"
      variant="danger"
      icon={Trash2}
      loading={loading}
      {...props}
    />
  );
};

export const ClearCartModal = ({
  isOpen,
  onClose,
  onConfirm,
  itemCount = 0,
  loading = false,
  ...props
}) => {
  return (
    <ConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Vaciar Carrito"
      message={`¿Estás seguro de que quieres eliminar todos los ${itemCount} productos del carrito?`}
      confirmText="Vaciar Carrito"
      cancelText="Cancelar"
      variant="warning"
      icon={Trash2}
      loading={loading}
      {...props}
    />
  );
};

export const LogoutConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  loading = false,
  ...props
}) => {
  return (
    <ConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Cerrar Sesión"
      message="¿Estás seguro de que quieres cerrar sesión?"
      confirmText="Cerrar Sesión"
      cancelText="Cancelar"
      variant="info"
      loading={loading}
      {...props}
    />
  );
};

export const OrderCancelModal = ({
  isOpen,
  onClose,
  onConfirm,
  orderNumber,
  loading = false,
  ...props
}) => {
  return (
    <ConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Cancelar Pedido"
      message={`¿Estás seguro de que quieres cancelar el pedido ${orderNumber}? Esta acción no se puede deshacer.`}
      confirmText="Cancelar Pedido"
      cancelText="Mantener Pedido"
      variant="danger"
      icon={X}
      loading={loading}
      {...props}
    />
  );
};

export const AddressDeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  addressName,
  loading = false,
  ...props
}) => {
  return (
    <ConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Eliminar Dirección"
      message={`¿Estás seguro de que quieres eliminar la dirección "${addressName}"?`}
      confirmText="Eliminar"
      cancelText="Cancelar"
      variant="danger"
      loading={loading}
      {...props}
    />
  );
};

export const UnsavedChangesModal = ({
  isOpen,
  onClose,
  onConfirm,
  onSave,
  loading = false,
  ...props
}) => {
  return (
    <ConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Cambios sin Guardar"
      message="Tienes cambios sin guardar. ¿Qué quieres hacer?"
      confirmText="Salir sin Guardar"
      cancelText="Continuar Editando"
      variant="warning"
      loading={loading}
      {...props}
    >
      <div className="flex flex-col sm:flex-row gap-3 justify-center mt-4">
        <Button
          variant="success"
          onClick={onSave}
          disabled={loading}
          className="btn btn-success"
        >
          Guardar y Salir
        </Button>
      </div>
    </ConfirmationModal>
  );
};

export default ConfirmationModal;
