import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNotification } from '../context/NotificationContext';
import Invoice from '../components/ui/Invoice';
import CheckoutModal from '../components/ui/CheckoutModal';
import CouponSystem from '../components/ui/CouponSystem';

const Cart = () => {
  const { showSuccess, showError, showInfo } = useNotification();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showInvoice, setShowInvoice] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  useEffect(() => {
    loadCartItems();

    // Escuchar cambios en el carrito
    const handleCartUpdate = () => {
      loadCartItems();
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

  const loadCartItems = () => {
    try {
      const savedCart = localStorage.getItem('cleanpro_cart');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      } else {
        // Datos de ejemplo si no hay carrito
        setCartItems([
          {
            id: 1,
            name: "Detergente Líquido Premium 1L",
            price: 15000,
            quantity: 2,
            image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&h=400&fit=crop"
          },
          {
            id: 2,
            name: "Desinfectante Multiusos 500ml",
            price: 8500,
            quantity: 1,
            image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop"
          }
        ]);
      }
    } catch (error) {
      console.error('Error loading cart:', error);
      showError('Error al cargar el carrito');
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }

    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );

    setCartItems(updatedCart);
    localStorage.setItem('cleanpro_cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: updatedCart }));
  };

  const removeItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cleanpro_cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: updatedCart }));
    showInfo('Producto eliminado del carrito', 2000);
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cleanpro_cart');
    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: [] }));
    showInfo('Carrito vaciado', 2000);
  };

  const proceedToCheckout = () => {
    if (cartItems.length === 0) {
      showError('Tu carrito está vacío');
      return;
    }

    setShowCheckout(true);
  };

  const handleCheckoutSuccess = (orderData) => {
    setOrderData(orderData);
    setShowCheckout(false);
    setShowInvoice(true);
    clearCart();
  };

  const getTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getItemCount = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getShipping = () => {
    // Si hay cupón de envío gratis, no cobrar envío
    if (appliedCoupon && appliedCoupon.type === 'shipping') {
      return 0;
    }
    return getTotal() > 50000 ? 0 : 5000;
  };

  const getDiscount = () => {
    if (!appliedCoupon) return 0;
    return appliedCoupon.discountAmount || 0;
  };

  const getFinalTotal = () => {
    const subtotal = getTotal();
    const shipping = getShipping();
    const discount = getDiscount();
    return Math.max(0, subtotal + shipping - discount);
  };

  const handleCouponApplied = (coupon) => {
    setAppliedCoupon(coupon);
  };

  if (cartItems.length === 0) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="text-center">
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🛒</div>
          <h1 className="text-3xl font-bold mb-4">Tu carrito está vacío</h1>
          <p style={{ color: 'var(--dark-gray)', marginBottom: '2rem' }}>
            ¡Agrega algunos productos para comenzar!
          </p>
          <Link to="/products" className="btn btn-primary">
            Ver Productos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%)',
        color: 'white',
        padding: '5rem 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          opacity: 0.3
        }}></div>
        <div className="container text-center" style={{ position: 'relative', zIndex: 1 }}>
          <div className="animate-fadeIn">
            <h1 style={{
              fontSize: '3.5rem',
              fontWeight: '900',
              marginBottom: '1.5rem',
              textShadow: '0 4px 8px rgba(0,0,0,0.3)'
            }}>
              🛒 Carrito de Compras
            </h1>
            <p style={{
              fontSize: '1.5rem',
              opacity: 0.95,
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: 1.6
            }}>
              {getItemCount()} productos - Total: ${getTotal().toLocaleString()}
            </p>
          </div>
        </div>
      </section>

      {/* Cart Section */}
      <section className="py-12" style={{ backgroundColor: 'var(--light-gray)' }}>
        <div className="container">

        <div className="grid grid-cols-3" style={{ gap: '2rem' }}>
          {/* Items */}
          <div style={{ gridColumn: 'span 2' }}>
            <div className="card">
              <div className="card-body">
                {cartItems.map((item) => (
                  <div key={item.id} style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '1rem',
                    padding: '1rem 0',
                    borderBottom: '1px solid var(--medium-gray)'
                  }}>
                    <div style={{
                      width: '100px',
                      height: '100px',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      boxShadow: 'var(--shadow-md)'
                    }}>
                      {item.image && item.image.startsWith('http') ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                      ) : (
                        <div style={{
                          width: '100%',
                          height: '100%',
                          background: 'linear-gradient(135deg, var(--light-gray) 0%, var(--medium-gray) 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '3rem'
                        }}>
                          🧽
                        </div>
                      )}
                    </div>
                    
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>
                        {item.name}
                      </h3>
                      <p style={{ color: 'var(--dark-gray)' }}>
                        ${item.price.toLocaleString()}
                      </p>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      {/* Quantity Controls */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--light-gray)', borderRadius: '8px', padding: '0.25rem' }}>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          style={{
                            background: 'var(--danger-color)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            width: '2rem',
                            height: '2rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'var(--transition)'
                          }}
                          className="hover-scale"
                        >
                          −
                        </button>

                        <span style={{
                          width: '3rem',
                          textAlign: 'center',
                          fontWeight: '700',
                          fontSize: '1.125rem'
                        }}>
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          style={{
                            background: 'var(--success-color)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            width: '2rem',
                            height: '2rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'var(--transition)'
                          }}
                          className="hover-scale"
                        >
                          +
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.id)}
                        style={{
                          background: 'var(--danger-light)',
                          color: 'var(--danger-color)',
                          border: '2px solid var(--danger-color)',
                          borderRadius: '8px',
                          padding: '0.5rem',
                          cursor: 'pointer',
                          transition: 'var(--transition)',
                          fontSize: '1rem'
                        }}
                        className="hover-scale"
                        title="Eliminar producto"
                      >
                        🗑️
                      </button>
                    </div>

                    <div style={{ fontWeight: 'bold', fontSize: '1.125rem' }}>
                      ${(item.price * item.quantity).toLocaleString()}
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="btn btn-danger btn-sm"
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div>
            {/* Coupon System */}
            <CouponSystem
              cartTotal={getTotal()}
              onCouponApplied={handleCouponApplied}
            />

            <div className="card">
              <div className="card-body">
                <h3 className="text-xl font-bold mb-4">📋 Resumen del Pedido</h3>
                
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span>Subtotal:</span>
                    <span>${getTotal().toLocaleString()}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span>Envío:</span>
                    <span style={{ color: getShipping() === 0 ? 'var(--success-color)' : 'inherit' }}>
                      {getShipping() === 0 ? 'Gratis' : `$${getShipping().toLocaleString()}`}
                    </span>
                  </div>
                  {appliedCoupon && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ color: 'var(--success-color)' }}>
                        Descuento ({appliedCoupon.code}):
                      </span>
                      <span style={{ color: 'var(--success-color)', fontWeight: '600' }}>
                        -${getDiscount().toLocaleString()}
                      </span>
                    </div>
                  )}
                  <hr style={{ margin: '1rem 0' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 'bold' }}>
                    <span>Total:</span>
                    <span>${getFinalTotal().toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <button
                    onClick={proceedToCheckout}
                    style={{
                      width: '100%',
                      background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '1rem',
                      fontSize: '1rem',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      cursor: 'pointer',
                      transition: 'var(--transition)',
                      boxShadow: '0 4px 15px rgba(0, 102, 255, 0.3)'
                    }}
                    className="hover-lift"
                  >
                    💳 Proceder al Pago
                  </button>

                  <button
                    onClick={clearCart}
                    style={{
                      width: '100%',
                      background: 'var(--danger-light)',
                      color: 'var(--danger-color)',
                      border: '2px solid var(--danger-color)',
                      borderRadius: '12px',
                      padding: '0.75rem',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'var(--transition)',
                      marginTop: '0.5rem'
                    }}
                    className="hover-lift"
                  >
                    🗑️ Vaciar Carrito
                  </button>
                  
                  <Link
                    to="/products"
                    className="btn btn-secondary w-full"
                    style={{ textDecoration: 'none', textAlign: 'center' }}
                  >
                    Seguir Comprando
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .grid-cols-3 {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      {/* Checkout Modal */}
      {showCheckout && (
        <CheckoutModal
          cartItems={cartItems}
          total={getFinalTotal()}
          onClose={() => setShowCheckout(false)}
          onSuccess={handleCheckoutSuccess}
        />
      )}

      {/* Invoice Modal */}
      {showInvoice && orderData && (
        <Invoice
          orderData={orderData}
          onClose={() => setShowInvoice(false)}
        />
      )}
    </div>
  );
};

export default Cart;
