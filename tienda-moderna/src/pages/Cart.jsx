import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  X, 
  Heart, 
  ArrowLeft,
  Package,
  Truck,
  Shield,
  CreditCard,
  Tag,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Loading from '../components/ui/Loading';
import ErrorDisplay from '../components/ui/ErrorDisplay';
import Progress from '../components/ui/Progress';
import Breadcrumb from '../components/ui/Breadcrumb';
import Rating from '../components/ui/Rating';
import Tooltip from '../components/ui/Tooltip';
import Modal from '../components/ui/Modal';
import Accordion from '../components/ui/Accordion';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/ui/Toast';

const Cart = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { 
    items, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    getCartTotal, 
    getCartSubtotal,
    getCartTax,
    getCartShipping,
    applyCoupon,
    removeCoupon,
    appliedCoupon
  } = useCart();
  const { addToWishlist } = useWishlist();
  const { addToast } = useToast();

  const [couponCode, setCouponCode] = useState('');
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('cart');
  const [selectedRating, setSelectedRating] = useState(5);

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveItem(itemId);
      return;
    }
    updateQuantity(itemId, newQuantity);
  };

  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
    addToast({
      type: 'success',
      title: 'Producto eliminado',
      message: 'El producto ha sido eliminado del carrito'
    });
  };

  const handleMoveToWishlist = (item) => {
    addToWishlist(item);
    removeFromCart(item.id);
    addToast({
      type: 'success',
      title: 'Movido a lista de deseos',
      message: `${item.name} ha sido movido a tu lista de deseos`
    });
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    
    setIsApplyingCoupon(true);
    try {
      const success = await applyCoupon(couponCode);
      if (success) {
        addToast({
          type: 'success',
          title: 'Cupón aplicado',
          message: 'El descuento ha sido aplicado correctamente'
        });
        setCouponCode('');
      } else {
        addToast({
          type: 'error',
          title: 'Cupón inválido',
          message: 'El código de cupón no es válido o ha expirado'
        });
      }
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Error',
        message: 'No se pudo aplicar el cupón. Intenta nuevamente.'
      });
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    addToast({
      type: 'info',
      title: 'Cupón removido',
      message: 'El descuento ha sido removido'
    });
  };

  const handleClearCart = () => {
    clearCart();
    addToast({
      type: 'info',
      title: 'Carrito vaciado',
      message: 'Todos los productos han sido eliminados del carrito'
    });
  };

  const handleCheckout = () => {
    if (!user) {
      addToast({
        type: 'warning',
        title: 'Inicia sesión',
        message: 'Debes iniciar sesión para continuar con la compra'
      });
      return;
    }
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm p-12"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingCart className="w-12 h-12 text-gray-400" />
              </div>
              
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Tu carrito está vacío
              </h1>
              
              <p className="text-gray-600 mb-8">
                Agrega algunos productos de limpieza para comenzar tu compra
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/products">
                  <Button className="btn btn-primary">
                    <Package className="w-4 h-4 mr-2" />
                    Explorar Productos
                  </Button>
                </Link>
                
                <Link to="/categories">
                  <Button variant="outline" className="btn btn-outline">
                    Ver Categorías
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <Breadcrumb items={[
            { label: 'Carrito de Compras' }
          ]} />
        </div>
      </div>

      <div className="py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="btn btn-ghost"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
          
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Carrito de Compras
            </h1>
            <p className="text-gray-600">
              {items.length} {items.length === 1 ? 'producto' : 'productos'} en tu carrito
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="card">
              <div className="card-content p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Productos ({items.length})
                  </h2>
                  
                  {items.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleClearCart}
                      className="btn btn-ghost btn-sm text-red-600 hover:text-red-700"
                    >
                      Vaciar carrito
                    </Button>
                  )}
                </div>

                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex gap-4 p-4 border border-gray-200 rounded-lg mb-4 last:mb-0"
                    >
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium text-gray-900 truncate">
                              {item.name}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                              {item.brand}
                            </p>
                            
                            {item.variant && (
                              <Badge variant="outline" className="badge badge-outline mt-2">
                                {item.variant}
                              </Badge>
                            )}
                          </div>

                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Price and Quantity */}
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-3">
                            {/* Quantity Controls */}
                            <div className="flex items-center border border-gray-300 rounded-lg">
                              <button
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                className="p-2 hover:bg-gray-50 transition-colors"
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              
                              <span className="px-3 py-2 text-sm font-medium min-w-[3rem] text-center">
                                {item.quantity}
                              </span>
                              
                              <button
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                className="p-2 hover:bg-gray-50 transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            {/* Move to Wishlist */}
                            <button
                              onClick={() => handleMoveToWishlist(item)}
                              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                              title="Mover a lista de deseos"
                            >
                              <Heart className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <div className="font-semibold text-gray-900">
                              ${(item.price * item.quantity).toLocaleString()}
                            </div>
                            {item.originalPrice && item.originalPrice > item.price && (
                              <div className="text-sm text-gray-500 line-through">
                                ${(item.originalPrice * item.quantity).toLocaleString()}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </Card>

            {/* Coupon Section */}
            <Card className="card">
              <div className="card-content p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Código de Descuento
                </h3>
                
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <div>
                        <div className="font-medium text-green-900">
                          Cupón aplicado: {appliedCoupon.code}
                        </div>
                        <div className="text-sm text-green-700">
                          Descuento: {appliedCoupon.discount}%
                        </div>
                      </div>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleRemoveCoupon}
                      className="btn btn-ghost btn-sm text-green-700"
                    >
                      Remover
                    </Button>
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <Input
                      type="text"
                      placeholder="Ingresa tu código de descuento"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="input flex-1"
                    />
                    
                    <Button
                      onClick={handleApplyCoupon}
                      disabled={!couponCode.trim() || isApplyingCoupon}
                      className="btn btn-outline"
                    >
                      {isApplyingCoupon ? 'Aplicando...' : 'Aplicar'}
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="card sticky top-4">
              <div className="card-content p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Resumen del Pedido
                </h3>

                <div className="space-y-4">
                  {/* Subtotal */}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${getCartSubtotal().toLocaleString()}</span>
                  </div>

                  {/* Discount */}
                  {appliedCoupon && (
                    <div className="flex justify-between text-green-600">
                      <span>Descuento ({appliedCoupon.discount}%)</span>
                      <span>-${((getCartSubtotal() * appliedCoupon.discount) / 100).toLocaleString()}</span>
                    </div>
                  )}

                  {/* Shipping */}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Envío</span>
                    <span className="font-medium">
                      {getCartShipping() === 0 ? 'Gratis' : `$${getCartShipping().toLocaleString()}`}
                    </span>
                  </div>

                  {/* Tax */}
                  <div className="flex justify-between">
                    <span className="text-gray-600">IVA (19%)</span>
                    <span className="font-medium">${getCartTax().toLocaleString()}</span>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span>${getCartTotal().toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <Button
                  onClick={handleCheckout}
                  className="btn btn-primary w-full mt-6"
                  size="lg"
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Proceder al Pago
                </Button>

                {/* Security Features */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span>Compra 100% segura</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Truck className="w-4 h-4 text-blue-500" />
                    <span>Envío gratis en compras mayores a $50.000</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Tag className="w-4 h-4 text-purple-500" />
                    <span>Garantía de satisfacción</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Continue Shopping */}
            <Card className="card">
              <div className="card-content p-6 text-center">
                <h4 className="font-semibold text-gray-900 mb-2">
                  ¿Necesitas algo más?
                </h4>
                <p className="text-gray-600 text-sm mb-4">
                  Explora nuestro catálogo completo de productos de limpieza
                </p>
                
                <Link to="/products">
                  <Button variant="outline" className="btn btn-outline w-full">
                    <Package className="w-4 h-4 mr-2" />
                    Seguir Comprando
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
