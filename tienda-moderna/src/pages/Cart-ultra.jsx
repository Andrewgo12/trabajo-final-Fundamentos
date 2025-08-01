import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
  // Simulando items del carrito
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Detergente Líquido Premium 1L",
      price: 15000,
      quantity: 2,
      image: "🧴"
    },
    {
      id: 2,
      name: "Desinfectante Multiusos 500ml",
      price: 8500,
      quantity: 1,
      image: "🧽"
    }
  ]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    setCartItems(items => 
      items.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const getTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
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
    <div className="py-8">
      <div className="container">
        <h1 className="text-3xl font-bold mb-8">Carrito de Compras</h1>

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
                    <div style={{ fontSize: '3rem' }}>{item.image}</div>
                    
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>
                        {item.name}
                      </h3>
                      <p style={{ color: 'var(--dark-gray)' }}>
                        ${item.price.toLocaleString()}
                      </p>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="btn btn-secondary btn-sm"
                        style={{ width: '2rem', height: '2rem', padding: 0 }}
                      >
                        -
                      </button>
                      
                      <span style={{ 
                        width: '3rem', 
                        textAlign: 'center', 
                        fontWeight: '600' 
                      }}>
                        {item.quantity}
                      </span>
                      
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="btn btn-secondary btn-sm"
                        style={{ width: '2rem', height: '2rem', padding: 0 }}
                      >
                        +
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
            <div className="card">
              <div className="card-body">
                <h3 className="text-xl font-bold mb-4">Resumen del Pedido</h3>
                
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span>Subtotal:</span>
                    <span>${getTotal().toLocaleString()}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span>Envío:</span>
                    <span style={{ color: 'var(--success-color)' }}>Gratis</span>
                  </div>
                  <hr style={{ margin: '1rem 0' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 'bold' }}>
                    <span>Total:</span>
                    <span>${getTotal().toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <button 
                    onClick={() => alert('¡Función de checkout próximamente!')}
                    className="btn btn-primary w-full"
                  >
                    Proceder al Pago
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

      <style jsx>{`
        @media (max-width: 768px) {
          .grid-cols-3 {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Cart;
