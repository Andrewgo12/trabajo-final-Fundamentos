import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/products?limit=8');
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (product) => {
    alert(`${product.name} agregado al carrito!`);
  };

  return (
    <div>
      {/* Hero Section */}
      <section style={{ 
        background: 'linear-gradient(135deg, var(--primary-color) 0%, #1d4ed8 100%)',
        color: 'white',
        padding: '5rem 0'
      }}>
        <div className="container text-center">
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            Tienda Moderna
          </h1>
          <p style={{ fontSize: '1.25rem', marginBottom: '2rem', opacity: 0.9 }}>
            Productos de limpieza de alta calidad para tu hogar
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/products" className="btn btn-secondary">
              Ver Productos
            </Link>
            <Link to="/contact" className="btn btn-outline" style={{ borderColor: 'white', color: 'white' }}>
              Contáctanos
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12">
        <div className="container">
          <div className="grid grid-cols-3" style={{ gap: '2rem' }}>
            <div className="text-center">
              <div style={{ 
                fontSize: '3rem', 
                marginBottom: '1rem',
                backgroundColor: 'var(--light-gray)',
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem'
              }}>
                🚚
              </div>
              <h3 className="text-xl font-semibold mb-2">Envío Gratis</h3>
              <p style={{ color: 'var(--dark-gray)' }}>En compras superiores a $50.000</p>
            </div>
            
            <div className="text-center">
              <div style={{ 
                fontSize: '3rem', 
                marginBottom: '1rem',
                backgroundColor: 'var(--light-gray)',
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem'
              }}>
                🛡️
              </div>
              <h3 className="text-xl font-semibold mb-2">Calidad Garantizada</h3>
              <p style={{ color: 'var(--dark-gray)' }}>Productos de las mejores marcas</p>
            </div>
            
            <div className="text-center">
              <div style={{ 
                fontSize: '3rem', 
                marginBottom: '1rem',
                backgroundColor: 'var(--light-gray)',
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem'
              }}>
                ⚡
              </div>
              <h3 className="text-xl font-semibold mb-2">Entrega Rápida</h3>
              <p style={{ color: 'var(--dark-gray)' }}>Recibe tu pedido en 24-48 horas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-12" style={{ backgroundColor: 'var(--light-gray)' }}>
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Productos Destacados</h2>
            <p style={{ color: 'var(--dark-gray)' }}>
              Descubre nuestros productos más populares
            </p>
          </div>

          {loading ? (
            <div className="text-center">
              <div className="spinner"></div>
              <p className="mt-4">Cargando productos...</p>
            </div>
          ) : (
            <div className="grid grid-cols-4" style={{ gap: '1.5rem' }}>
              {products.slice(0, 8).map((product) => (
                <div key={product.id} className="card">
                  <div style={{ 
                    height: '200px', 
                    backgroundColor: '#f1f5f9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '3rem'
                  }}>
                    🧽
                  </div>
                  
                  <div className="card-body">
                    <h3 style={{ 
                      fontSize: '1rem', 
                      fontWeight: '600', 
                      marginBottom: '0.5rem',
                      height: '2.5rem',
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical'
                    }}>
                      {product.name}
                    </h3>
                    
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      marginBottom: '1rem',
                      gap: '0.25rem'
                    }}>
                      <span style={{ color: '#fbbf24' }}>⭐⭐⭐⭐⭐</span>
                      <span style={{ fontSize: '0.875rem', color: 'var(--dark-gray)' }}>(4.8)</span>
                    </div>
                    
                    <div style={{ marginBottom: '1rem' }}>
                      <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                        ${product.price?.toLocaleString()}
                      </span>
                      {product.comparePrice && product.comparePrice > product.price && (
                        <span style={{ 
                          fontSize: '0.875rem', 
                          color: 'var(--dark-gray)', 
                          textDecoration: 'line-through',
                          marginLeft: '0.5rem'
                        }}>
                          ${product.comparePrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    
                    <button 
                      onClick={() => addToCart(product)}
                      className="btn btn-primary w-full"
                      style={{ fontSize: '0.875rem' }}
                    >
                      🛒 Agregar al Carrito
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-8">
            <Link to="/products" className="btn btn-primary btn-lg">
              Ver Todos los Productos
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12" style={{ backgroundColor: 'var(--primary-color)', color: 'white' }}>
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">
            ¿Necesitas ayuda para elegir?
          </h2>
          <p className="text-xl mb-6" style={{ opacity: 0.9 }}>
            Nuestro equipo está aquí para ayudarte a encontrar los productos perfectos.
          </p>
          <Link 
            to="/contact" 
            className="btn btn-secondary"
          >
            Contáctanos Ahora
          </Link>
        </div>
      </section>

      <style jsx>{`
        @media (max-width: 768px) {
          .grid-cols-3, .grid-cols-4 {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        
        @media (max-width: 480px) {
          .grid-cols-3, .grid-cols-4 {
            grid-template-columns: 1fr !important;
          }
          
          h1 {
            font-size: 2rem !important;
          }
          
          .text-3xl {
            font-size: 1.875rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
