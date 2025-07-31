import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Star, 
  Heart, 
  ShoppingCart, 
  Eye, 
  Share2,
  Zap,
  Leaf,
  Shield,
  Truck,
  Plus,
  Check
} from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import Tooltip from '../ui/Tooltip';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import ProductQuickView from '../modals/ProductQuickView';

const ProductCard = ({ 
  product, 
  layout = 'grid', // 'grid' or 'list'
  showQuickActions = true,
  showBadges = true,
  className = '',
  ...props 
}) => {
  const [showQuickView, setShowQuickView] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const { addToCart, isInCart, getItemQuantity } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { isAuthenticated, showLoginModal } = useAuth();

  const inCart = isInCart(product.id);
  const inWishlist = isInWishlist(product.id);
  const cartQuantity = getItemQuantity(product.id);

  // Calculate discount percentage
  const discount = product.originalPrice && product.price < product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Check stock status
  const inStock = product.stock > 0;
  const lowStock = product.stock <= 5 && product.stock > 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      showLoginModal();
      return;
    }

    addToCart({
      ...product,
      quantity: 1
    });
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      showLoginModal();
      return;
    }

    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowQuickView(true);
  };

  const handleShare = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const productUrl = `${window.location.origin}/products/${product.id}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: productUrl
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(productUrl);
        // Show toast notification
      } catch (error) {
        console.log('Error copying to clipboard:', error);
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    },
    hover: { 
      y: -4,
      transition: { duration: 0.2 }
    }
  };

  const imageVariants = {
    loading: { opacity: 0.7 },
    loaded: { opacity: 1 }
  };

  if (layout === 'list') {
    return (
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        className={`card card-hover ${className}`}
        {...props}
      >
        <Link to={`/products/${product.id}`} className="block">
          <div className="flex gap-4 p-4">
            {/* Image */}
            <div className="relative w-24 h-24 flex-shrink-0">
              <motion.img
                variants={imageVariants}
                initial="loading"
                animate={imageLoaded ? "loaded" : "loading"}
                src={imageError ? '/placeholder-product.jpg' : product.image}
                alt={product.name}
                className="w-full h-full object-cover rounded-lg"
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
              />
              
              {/* Badges */}
              {showBadges && (
                <div className="absolute top-1 left-1 flex flex-col gap-1">
                  {discount > 0 && (
                    <Badge variant="error" className="badge badge-error text-xs">
                      -{discount}%
                    </Badge>
                  )}
                  {product.featured && (
                    <Badge variant="warning" className="badge badge-warning text-xs">
                      <Star className="w-2 h-2 mr-1" />
                      Top
                    </Badge>
                  )}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-1 mb-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {product.brand}
                  </p>
                </div>
                
                {/* Quick Actions */}
                {showQuickActions && (
                  <div className="flex gap-1 ml-4">
                    <Tooltip content="Vista rápida">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleQuickView}
                        className="btn btn-ghost btn-sm p-2"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </Tooltip>
                    
                    <Tooltip content={inWishlist ? "Quitar de favoritos" : "Agregar a favoritos"}>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleWishlistToggle}
                        className={`btn btn-ghost btn-sm p-2 ${
                          inWishlist ? 'text-red-500' : 'text-gray-400'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
                      </Button>
                    </Tooltip>
                  </div>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-500">
                  ({product.reviews})
                </span>
              </div>

              {/* Price and Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-gray-900">
                    ${product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-sm text-gray-500 line-through">
                      ${product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                <Button
                  onClick={handleAddToCart}
                  disabled={!inStock}
                  size="sm"
                  className={`btn btn-sm ${inCart ? 'btn-success' : 'btn-primary'}`}
                >
                  {inCart ? (
                    <>
                      <Check className="w-4 h-4 mr-1" />
                      En Carrito ({cartQuantity})
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4 mr-1" />
                      {inStock ? 'Agregar' : 'Agotado'}
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </Link>

        <ProductQuickView
          product={product}
          isOpen={showQuickView}
          onClose={() => setShowQuickView(false)}
        />
      </motion.div>
    );
  }

  // Grid layout (default)
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className={`card card-hover overflow-hidden ${className}`}
      {...props}
    >
      <Link to={`/products/${product.id}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-square bg-gray-100 overflow-hidden">
          <motion.img
            variants={imageVariants}
            initial="loading"
            animate={imageLoaded ? "loaded" : "loading"}
            src={imageError ? '/placeholder-product.jpg' : product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
          
          {/* Overlay with quick actions */}
          {showQuickActions && (
            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
              <div className="flex gap-2">
                <Tooltip content="Vista rápida">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleQuickView}
                    className="btn btn-ghost btn-sm bg-white text-gray-900 hover:bg-gray-100"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </Tooltip>
                
                <Tooltip content="Compartir">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleShare}
                    className="btn btn-ghost btn-sm bg-white text-gray-900 hover:bg-gray-100"
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                </Tooltip>
              </div>
            </div>
          )}

          {/* Badges */}
          {showBadges && (
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {discount > 0 && (
                <Badge variant="error" className="badge badge-error">
                  -{discount}%
                </Badge>
              )}
              {product.featured && (
                <Badge variant="warning" className="badge badge-warning">
                  <Star className="w-3 h-3 mr-1" />
                  Destacado
                </Badge>
              )}
              {product.category === 'eco' && (
                <Badge variant="success" className="badge badge-success">
                  <Leaf className="w-3 h-3 mr-1" />
                  Eco
                </Badge>
              )}
              {product.fastShipping && (
                <Badge variant="info" className="badge badge-info">
                  <Zap className="w-3 h-3 mr-1" />
                  Rápido
                </Badge>
              )}
            </div>
          )}

          {/* Wishlist button */}
          <div className="absolute top-3 right-3">
            <Tooltip content={inWishlist ? "Quitar de favoritos" : "Agregar a favoritos"}>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleWishlistToggle}
                className={`btn btn-ghost btn-sm p-2 bg-white hover:bg-gray-100 ${
                  inWishlist ? 'text-red-500' : 'text-gray-400'
                }`}
              >
                <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
              </Button>
            </Tooltip>
          </div>

          {/* Stock status */}
          {!inStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <Badge variant="error" className="badge badge-error text-lg px-4 py-2">
                Agotado
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Brand */}
          <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">
            {product.brand}
          </p>

          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem]">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
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
            <span className="text-sm text-gray-500">
              {product.rating} ({product.reviews})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl font-bold text-gray-900">
              ${product.price.toLocaleString()}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-1 mb-4">
            {product.features?.slice(0, 2).map((feature, index) => (
              <Badge key={index} variant="outline" className="badge badge-outline text-xs">
                {feature}
              </Badge>
            ))}
          </div>

          {/* Stock warning */}
          {lowStock && inStock && (
            <div className="flex items-center gap-1 mb-3 text-orange-600">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-xs">Solo quedan {product.stock} unidades</span>
            </div>
          )}

          {/* Add to Cart Button */}
          <Button
            onClick={handleAddToCart}
            disabled={!inStock}
            className={`btn w-full ${inCart ? 'btn-success' : 'btn-primary'}`}
          >
            {inCart ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                En Carrito ({cartQuantity})
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4 mr-2" />
                {inStock ? 'Agregar al Carrito' : 'Producto Agotado'}
              </>
            )}
          </Button>
        </div>
      </Link>

      <ProductQuickView
        product={product}
        isOpen={showQuickView}
        onClose={() => setShowQuickView(false)}
      />
    </motion.div>
  );
};

export default ProductCard;
