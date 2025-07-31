import React from 'react';
import { 
  AlertTriangle, 
  RefreshCw, 
  Home, 
  ArrowLeft, 
  Wifi, 
  Server,
  ShoppingCart,
  Search,
  Package,
  XCircle,
  AlertCircle,
  Info
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from './Button';
import Card from './Card';

const ErrorDisplay = ({
  type = 'general', // 'general', 'network', 'notFound', 'server', 'empty', 'search'
  title,
  message,
  showRetry = true,
  showHome = true,
  showBack = false,
  onRetry,
  onBack,
  className = '',
  children,
  ...props
}) => {
  const getErrorConfig = () => {
    switch (type) {
      case 'network':
        return {
          icon: Wifi,
          title: title || 'Error de Conexión',
          message: message || 'No se pudo conectar al servidor. Verifica tu conexión a internet.',
          color: 'text-red-500',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200'
        };
      
      case 'server':
        return {
          icon: Server,
          title: title || 'Error del Servidor',
          message: message || 'Ocurrió un error en el servidor. Intenta nuevamente en unos minutos.',
          color: 'text-orange-500',
          bgColor: 'bg-orange-50',
          borderColor: 'border-orange-200'
        };
      
      case 'notFound':
        return {
          icon: Search,
          title: title || 'Página No Encontrada',
          message: message || 'La página que buscas no existe o ha sido movida.',
          color: 'text-blue-500',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200'
        };
      
      case 'empty':
        return {
          icon: Package,
          title: title || 'No Hay Resultados',
          message: message || 'No se encontraron productos que coincidan con tu búsqueda.',
          color: 'text-gray-500',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200'
        };
      
      case 'search':
        return {
          icon: Search,
          title: title || 'Sin Resultados',
          message: message || 'No encontramos productos con esos criterios. Intenta con otros términos.',
          color: 'text-gray-500',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200'
        };
      
      case 'general':
      default:
        return {
          icon: AlertTriangle,
          title: title || 'Algo Salió Mal',
          message: message || 'Ocurrió un error inesperado. Por favor, intenta nuevamente.',
          color: 'text-yellow-500',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200'
        };
    }
  };

  const config = getErrorConfig();
  const IconComponent = config.icon;

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  const iconVariants = {
    hidden: { scale: 0 },
    visible: { 
      scale: 1,
      transition: { 
        delay: 0.2,
        type: "spring",
        stiffness: 200
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`flex items-center justify-center p-8 ${className}`}
      {...props}
    >
      <Card className={`card max-w-md w-full text-center ${config.bgColor} ${config.borderColor} border`}>
        <div className="card-content p-8">
          {/* Icon */}
          <motion.div
            variants={iconVariants}
            className={`w-16 h-16 mx-auto mb-6 rounded-full ${config.bgColor} flex items-center justify-center`}
          >
            <IconComponent className={`w-8 h-8 ${config.color}`} />
          </motion.div>

          {/* Title */}
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            {config.title}
          </h3>

          {/* Message */}
          <p className="text-gray-600 mb-6 leading-relaxed">
            {config.message}
          </p>

          {/* Custom Content */}
          {children && (
            <div className="mb-6">
              {children}
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {showRetry && onRetry && (
              <Button
                onClick={onRetry}
                className="btn btn-primary"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Reintentar
              </Button>
            )}

            {showBack && onBack && (
              <Button
                variant="outline"
                onClick={onBack}
                className="btn btn-outline"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver
              </Button>
            )}

            {showHome && (
              <Link to="/">
                <Button
                  variant={showRetry ? "outline" : "primary"}
                  className={`btn ${showRetry ? 'btn-outline' : 'btn-primary'}`}
                >
                  <Home className="w-4 h-4 mr-2" />
                  Ir al Inicio
                </Button>
              </Link>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

// Preset error components for common use cases
export const NetworkError = ({ onRetry, ...props }) => (
  <ErrorDisplay
    type="network"
    onRetry={onRetry}
    showRetry={!!onRetry}
    {...props}
  />
);

export const ServerError = ({ onRetry, ...props }) => (
  <ErrorDisplay
    type="server"
    onRetry={onRetry}
    showRetry={!!onRetry}
    {...props}
  />
);

export const NotFoundError = ({ showBack = true, onBack, ...props }) => (
  <ErrorDisplay
    type="notFound"
    showBack={showBack}
    onBack={onBack}
    showRetry={false}
    {...props}
  />
);

export const EmptyState = ({ 
  title = 'No Hay Productos',
  message = 'No se encontraron productos en esta categoría.',
  actionLabel = 'Ver Todas las Categorías',
  actionLink = '/categories',
  ...props 
}) => (
  <ErrorDisplay
    type="empty"
    title={title}
    message={message}
    showRetry={false}
    showHome={false}
    {...props}
  >
    <Link to={actionLink}>
      <Button className="btn btn-primary">
        <Package className="w-4 h-4 mr-2" />
        {actionLabel}
      </Button>
    </Link>
  </ErrorDisplay>
);

export const SearchEmpty = ({ 
  query,
  onClearSearch,
  suggestions = [],
  ...props 
}) => (
  <ErrorDisplay
    type="search"
    title="Sin Resultados de Búsqueda"
    message={`No encontramos productos para "${query}". Intenta con otros términos.`}
    showRetry={false}
    showHome={false}
    {...props}
  >
    <div className="space-y-4">
      {suggestions.length > 0 && (
        <div>
          <p className="text-sm text-gray-600 mb-2">Sugerencias:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => onClearSearch && onClearSearch(suggestion)}
                className="px-3 py-1 text-sm bg-primary-100 text-primary-700 rounded-full hover:bg-primary-200 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
      
      <div className="flex flex-col sm:flex-row gap-2 justify-center">
        {onClearSearch && (
          <Button
            variant="outline"
            onClick={() => onClearSearch('')}
            className="btn btn-outline"
          >
            <XCircle className="w-4 h-4 mr-2" />
            Limpiar Búsqueda
          </Button>
        )}
        
        <Link to="/categories">
          <Button className="btn btn-primary">
            <Package className="w-4 h-4 mr-2" />
            Ver Categorías
          </Button>
        </Link>
      </div>
    </div>
  </ErrorDisplay>
);

export const CartEmpty = ({ ...props }) => (
  <ErrorDisplay
    type="empty"
    title="Tu Carrito Está Vacío"
    message="Agrega algunos productos de limpieza para comenzar tu compra."
    showRetry={false}
    showHome={false}
    {...props}
  >
    <div className="flex flex-col sm:flex-row gap-3 justify-center">
      <Link to="/products">
        <Button className="btn btn-primary">
          <ShoppingCart className="w-4 h-4 mr-2" />
          Explorar Productos
        </Button>
      </Link>
      
      <Link to="/categories">
        <Button variant="outline" className="btn btn-outline">
          <Package className="w-4 h-4 mr-2" />
          Ver Categorías
        </Button>
      </Link>
    </div>
  </ErrorDisplay>
);

export const WishlistEmpty = ({ ...props }) => (
  <ErrorDisplay
    type="empty"
    title="Tu Lista de Deseos Está Vacía"
    message="Guarda tus productos favoritos para encontrarlos fácilmente después."
    showRetry={false}
    showHome={false}
    {...props}
  >
    <Link to="/products">
      <Button className="btn btn-primary">
        <ShoppingCart className="w-4 h-4 mr-2" />
        Descubrir Productos
      </Button>
    </Link>
  </ErrorDisplay>
);

export const OrdersEmpty = ({ ...props }) => (
  <ErrorDisplay
    type="empty"
    title="No Tienes Pedidos"
    message="Cuando realices tu primera compra, aparecerá aquí."
    showRetry={false}
    showHome={false}
    {...props}
  >
    <Link to="/products">
      <Button className="btn btn-primary">
        <ShoppingCart className="w-4 h-4 mr-2" />
        Comenzar a Comprar
      </Button>
    </Link>
  </ErrorDisplay>
);

export default ErrorDisplay;
