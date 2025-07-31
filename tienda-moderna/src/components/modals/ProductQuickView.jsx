import React, { useState } from 'react';
import { 
  Star, 
  Heart, 
  ShoppingCart, 
  Plus, 
  Minus, 
  Share2, 
  Eye,
  Shield,
  Truck,
  RotateCcw,
  CheckCircle,
  AlertCircle,
  Zap,
  Leaf
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';

const ProductQuickView = ({ product, isOpen, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0] || null);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const { addToCart, isInCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { isAuthenticated, showLoginModal } = useAuth();

  if (!product) return null;

  const currentPrice = selectedVariant?.price || product.price;
  const originalPrice = selectedVariant?.originalPrice || product.originalPrice;
  const discount = originalPrice ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100) : 0;
  const inStock = selectedVariant?.stock > 0 || product.stock > 0;
  const stockCount = selectedVariant?.stock || product.stock;

  const images = product.images || [product.image];

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      showLoginModal();
      return;
    }

    const cartItem = {
      ...product,
      selectedVariant,
      quantity,
      price: currentPrice
    };
    
    addToCart(cartItem);
    onClose();
  };

  const handleWishlistToggle = () => {
    if (!isAuthenticated) {
      showLoginModal();
      return;
    }

    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const features = [
    { icon: Shield, text: 'Garantía de calidad', color: 'text-blue-600' },
    { icon: Truck, text: 'Envío gratis desde $50.000', color: 'text-green-600' },
    { icon: RotateCcw, text: 'Devolución fácil', color: 'text-purple-600' },
  ];

  if (product.category === 'eco') {
    features.push({ icon: Leaf, text: 'Producto eco-amigable', color: 'text-green-600' });
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="4xl"
      className="max-h-[90vh] overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
        {/* Images Section */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {discount > 0 && (
              <div className="absolute top-4 left-4">
                <Badge variant="error" className="badge badge-error">
                  -{discount}%
                </Badge>
              </div>
            )}
            {product.featured && (
              <div className="absolute top-4 right-4">
                <Badge variant="warning" className="badge badge-warning">
                  <Star className="w-3 h-3 mr-1" />
                  Destacado
                </Badge>
              </div>
            )}
            {!inStock && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <Badge variant="error" className="badge badge-error text-lg px-4 py-2">
                  Agotado
                </Badge>
              </div>
            )}
          </div>

          {/* Thumbnail Images */}
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`
                    flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors
                    ${selectedImage === index ? 'border-primary-500' : 'border-gray-200 hover:border-gray-300'}
                  `}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info Section */}
        <div className="space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
                <p className="text-gray-600 text-sm mb-3">
                  Marca: <span className="font-medium">{product.brand}</span>
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleWishlistToggle}
                  className={`btn btn-ghost btn-sm ${
                    isInWishlist(product.id) ? 'text-red-500' : 'text-gray-400'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleShare}
                  className="btn btn-ghost btn-sm text-gray-400"
                >
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating} ({product.reviews} reseñas)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl font-bold text-gray-900">
                ${currentPrice.toLocaleString()}
              </span>
              {originalPrice && originalPrice > currentPrice && (
                <span className="text-lg text-gray-500 line-through">
                  ${originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2 mb-4">
              {inStock ? (
                <>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-600">
                    En stock ({stockCount} disponibles)
                  </span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  <span className="text-sm text-red-600">Agotado</span>
                </>
              )}
            </div>
          </div>

          {/* Variants */}
          {product.variants && product.variants.length > 1 && (
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                Presentación:
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((variant, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedVariant(variant)}
                    className={`
                      px-3 py-2 text-sm border rounded-lg transition-colors
                      ${selectedVariant?.id === variant.id
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-gray-300 hover:border-gray-400'
                      }
                      ${variant.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                    disabled={variant.stock === 0}
                  >
                    {variant.name}
                    {variant.stock === 0 && (
                      <span className="ml-1 text-xs text-red-500">(Agotado)</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          {inStock && (
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                Cantidad:
              </h3>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100 transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(stockCount, quantity + 1))}
                    className="p-2 hover:bg-gray-100 transition-colors"
                    disabled={quantity >= stockCount}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-sm text-gray-600">
                  Total: ${(currentPrice * quantity).toLocaleString()}
                </span>
              </div>
            </div>
          )}

          {/* Add to Cart Button */}
          <div className="space-y-3">
            <Button
              onClick={handleAddToCart}
              disabled={!inStock}
              className="btn btn-primary w-full"
              size="lg"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              {isInCart(product.id) ? 'Actualizar Carrito' : 'Agregar al Carrito'}
            </Button>
            
            {!isAuthenticated && (
              <p className="text-xs text-gray-500 text-center">
                Inicia sesión para agregar productos al carrito
              </p>
            )}
          </div>

          {/* Features */}
          <div className="space-y-2">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <feature.icon className={`w-4 h-4 ${feature.color}`} />
                <span className="text-sm text-gray-600">{feature.text}</span>
              </div>
            ))}
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-2">
              Descripción:
            </h3>
            <div className="text-sm text-gray-600">
              <p className={showFullDescription ? '' : 'line-clamp-3'}>
                {product.description}
              </p>
              {product.description.length > 150 && (
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="text-primary-600 hover:text-primary-700 mt-1 text-xs font-medium"
                >
                  {showFullDescription ? 'Ver menos' : 'Ver más'}
                </button>
              )}
            </div>
          </div>

          {/* Specifications */}
          {product.specifications && (
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                Especificaciones:
              </h3>
              <div className="space-y-1">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-sm">
                    <span className="text-gray-600">{key}:</span>
                    <span className="text-gray-900 font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ProductQuickView;
