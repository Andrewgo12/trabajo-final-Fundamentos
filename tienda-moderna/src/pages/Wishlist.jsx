import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, X, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../stores/useStore';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { useToast } from '../components/ui/Toast';
import Breadcrumb from '../components/ui/Breadcrumb';
import ErrorDisplay from '../components/ui/ErrorDisplay';
import Loading from '../components/ui/Loading';

const Wishlist = () => {
  const { wishlist, removeFromWishlist, addToCart, clearWishlist } = useStore();
  const { isAuthenticated, showLoginModal } = useAuth();
  const { addToast } = useToast();

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Inicia sesión para ver tu lista de deseos
          </h2>
          <p className="text-gray-600 mb-8">
            Guarda tus productos favoritos y accede a ellos desde cualquier dispositivo.
          </p>
          <Button onClick={showLoginModal} className="btn btn-primary">
            Iniciar Sesión
          </Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = (product) => {
    addToCart(product, 1);
  };

  const handleRemoveFromWishlist = (productId) => {
    removeFromWishlist(productId);
  };

  const handleShare = async (product) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: `${window.location.origin}/product/${product.id}`,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${window.location.origin}/product/${product.id}`);
      // You could show a toast notification here
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="container-custom py-4">
          <Breadcrumb items={[
            { label: 'Mi Cuenta', href: '/profile' },
            { label: 'Lista de Deseos' }
          ]} />
        </div>
      </div>

      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-custom py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
                Mi Lista de Deseos
              </h1>
              <p className="text-gray-600">
                {wishlist.length === 0 
                  ? 'No tienes productos guardados' 
                  : `${wishlist.length} producto${wishlist.length !== 1 ? 's' : ''} guardado${wishlist.length !== 1 ? 's' : ''}`
                }
              </p>
            </div>
            {wishlist.length > 0 && (
              <div className="flex items-center gap-4">
                <Button
                  onClick={() => {
                    wishlist.forEach(product => addToCart(product, 1));
                  }}
                  className="btn btn-primary"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Agregar Todo al Carrito
                </Button>
                <Button
                  onClick={clearWishlist}
                  variant="outline"
                  className="btn btn-outline text-red-600 border-red-300 hover:bg-red-50"
                >
                  Limpiar Lista
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        {wishlist.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Tu lista de deseos está vacía
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Explora nuestros productos y guarda tus favoritos haciendo clic en el corazón.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <Button className="btn btn-primary">
                  Explorar Productos
                </Button>
              </Link>
              <Link to="/offers">
                <Button variant="outline" className="btn btn-outline">
                  Ver Ofertas
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          /* Wishlist Items */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {wishlist.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="card card-hover group relative">
                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemoveFromWishlist(product.id)}
                      className="absolute top-3 right-3 z-10 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
                    >
                      <X className="w-4 h-4 text-red-500" />
                    </button>

                    <Link to={`/product/${product.id}`}>
                      {/* Product Image */}
                      <div className="aspect-square relative overflow-hidden bg-gray-100">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                        
                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex flex-col gap-2">
                          {product.discount > 0 && (
                            <Badge variant="error" size="sm" className="badge badge-error">
                              -{product.discount}%
                            </Badge>
                          )}
                          {product.isNew && (
                            <Badge variant="success" size="sm" className="badge badge-success">
                              Nuevo
                            </Badge>
                          )}
                        </div>

                        {/* Stock Status */}
                        {product.stock === 0 && (
                          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <Badge variant="error" size="lg" className="badge badge-error">
                              Agotado
                            </Badge>
                          </div>
                        )}
                      </div>
                    </Link>

                    {/* Product Info */}
                    <div className="card-content">
                      <div className="mb-4">
                        <p className="text-xs text-gray-500 mb-1">{product.brand}</p>
                        <Link to={`/product/${product.id}`}>
                          <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                            {product.name}
                          </h3>
                        </Link>
                        
                        {/* Rating */}
                        <div className="flex items-center gap-1 mb-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <span
                                key={i}
                                className={`text-xs ${
                                  i < Math.floor(product.rating)
                                    ? 'text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                          <span className="text-xs text-gray-500">
                            {product.rating} ({product.reviews})
                          </span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-xl font-bold text-gray-900">
                            ${product.price.toLocaleString()}
                          </span>
                          {product.originalPrice > product.price && (
                            <span className="text-sm text-gray-500 line-through">
                              ${product.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleAddToCart(product)}
                          disabled={product.stock === 0}
                          className="flex-1 btn btn-primary"
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          {product.stock === 0 ? 'Agotado' : 'Agregar'}
                        </Button>
                        <Button
                          onClick={() => handleShare(product)}
                          variant="outline"
                          className="btn btn-outline p-3"
                        >
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Recommendations */}
        {wishlist.length > 0 && (
          <div className="mt-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-2">
                También te podría interesar
              </h2>
              <p className="text-gray-600">
                Productos similares a los de tu lista de deseos
              </p>
            </div>
            
            <div className="flex justify-center">
              <Link to="/products">
                <Button variant="outline" className="btn btn-outline">
                  Ver Más Productos
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Wishlist Actions */}
        {wishlistItems.length > 0 && (
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => {
                // Add all to cart logic
                wishlistItems.forEach(item => {
                  addToCart(item);
                });
                addToast({
                  type: 'success',
                  title: 'Productos agregados',
                  message: 'Todos los productos han sido agregados al carrito'
                });
              }}
              className="btn btn-primary"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Agregar Todo al Carrito
            </Button>

            <Button
              variant="outline"
              onClick={() => {
                // Share wishlist logic
                if (navigator.share) {
                  navigator.share({
                    title: 'Mi Lista de Deseos - Tienda Moderna',
                    text: 'Mira los productos que me gustan en Tienda Moderna',
                    url: window.location.href
                  });
                } else {
                  // Fallback to copy to clipboard
                  navigator.clipboard.writeText(window.location.href);
                  addToast({
                    type: 'success',
                    title: 'Enlace copiado',
                    message: 'El enlace de tu lista de deseos ha sido copiado'
                  });
                }
              }}
              className="btn btn-outline"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Compartir Lista
            </Button>

            <Button
              variant="outline"
              onClick={() => {
                if (window.confirm('¿Estás seguro de que quieres limpiar toda tu lista de deseos?')) {
                  clearWishlist();
                  addToast({
                    type: 'info',
                    title: 'Lista limpiada',
                    message: 'Tu lista de deseos ha sido vaciada'
                  });
                }
              }}
              className="btn btn-outline text-red-600 hover:text-red-700"
            >
              <X className="w-4 h-4 mr-2" />
              Limpiar Lista
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
