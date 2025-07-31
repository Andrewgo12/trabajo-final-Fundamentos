import React from 'react';
import { Link } from 'react-router-dom';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { useStore } from '../../stores/useStore';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

const Cart = () => {
  const {
    cart,
    cartOpen,
    closeCart,
    removeFromCart,
    updateCartQuantity,
    getCartTotal,
    clearCart
  } = useStore();

  const { isAuthenticated, showLoginModal } = useAuth();

  const total = getCartTotal();

  if (!cartOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={closeCart}
      />
      
      {/* Cart Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 transform transition-transform">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-6 h-6 text-primary-600" />
              <h2 className="text-xl font-semibold text-gray-900">
                Carrito de Compras
              </h2>
              {cart.length > 0 && (
                <Badge variant="primary">
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </Badge>
              )}
            </div>
            <button
              onClick={closeCart}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Tu carrito está vacío
                </h3>
                <p className="text-gray-500 mb-6">
                  Agrega algunos productos para comenzar
                </p>
                <Button onClick={closeCart} variant="primary">
                  Continuar Comprando
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 truncate">
                        {item.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        ${item.price.toLocaleString()} c/u
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-3 py-1 bg-white border border-gray-200 rounded text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        ${(item.price * item.quantity).toLocaleString()}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="mt-2 p-1 text-red-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="border-t border-gray-200 p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">Total:</span>
                <span className="text-2xl font-bold text-primary-600">
                  ${total.toLocaleString()}
                </span>
              </div>
              
              <div className="space-y-2">
                {isAuthenticated ? (
                  <Link to="/checkout">
                    <Button
                      className="w-full"
                      variant="primary"
                      size="lg"
                      onClick={closeCart}
                    >
                      Proceder al Pago
                    </Button>
                  </Link>
                ) : (
                  <Button
                    className="w-full"
                    variant="primary"
                    size="lg"
                    onClick={() => {
                      closeCart();
                      showLoginModal();
                    }}
                  >
                    Iniciar Sesión para Comprar
                  </Button>
                )}
                <Button 
                  className="w-full" 
                  variant="outline" 
                  onClick={closeCart}
                >
                  Continuar Comprando
                </Button>
              </div>

              <button
                onClick={clearCart}
                className="w-full text-sm text-red-600 hover:text-red-700 transition-colors"
              >
                Vaciar Carrito
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
