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
        background: 'var(--gradient-primary)',
        color: 'white',
        padding: '6rem 0',
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
              fontSize: '4rem',
              fontWeight: '900',
              marginBottom: '1.5rem',
              textShadow: '0 4px 8px rgba(0,0,0,0.3)',
              lineHeight: 1.1
            }}>
              🧽 CleanPro
            </h1>
            <p style={{
              fontSize: '1.5rem',
              marginBottom: '3rem',
              opacity: 0.95,
              maxWidth: '600px',
              margin: '0 auto 3rem',
              lineHeight: 1.6
            }}>
              Productos de aseo profesional para mantener tu hogar impecable
            </p>
            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/products" className="btn btn-secondary btn-xl hover-lift animate-slideInLeft">
                🛍️ Ver Productos
              </Link>
              <Link to="/contact" className="btn btn-outline btn-xl hover-lift animate-slideInRight" style={{
                borderColor: 'white',
                color: 'white',
                borderWidth: '2px'
              }}>
                📞 Contáctanos
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12" style={{ backgroundColor: 'var(--light-gray)' }}>
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold title-with-line mb-4">
              ¿Por qué elegir CleanPro?
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem' }}>
              La mejor experiencia en productos de aseo profesional
            </p>
          </div>

          <div className="grid grid-cols-3" style={{ gap: '2rem' }}>
            <div className="card hover-lift animate-fadeIn text-center">
              <div className="card-body">
                <div style={{
                  fontSize: '4rem',
                  marginBottom: '1.5rem',
                  background: 'var(--gradient-success)',
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  boxShadow: 'var(--shadow-lg)',
                  position: 'relative'
                }}>
                  <span style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>🚚</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gradient">Envío Gratis</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  En compras superiores a $50.000 en toda Colombia
                </p>
              </div>
            </div>

            <div className="card hover-lift animate-fadeIn text-center" style={{ animationDelay: '0.2s' }}>
              <div className="card-body">
                <div style={{
                  fontSize: '4rem',
                  marginBottom: '1.5rem',
                  background: 'var(--gradient-primary)',
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  boxShadow: 'var(--shadow-lg)'
                }}>
                  <span style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>🛡️</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gradient">Calidad Garantizada</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Productos de las mejores marcas internacionales
                </p>
              </div>
            </div>

            <div className="card hover-lift animate-fadeIn text-center" style={{ animationDelay: '0.4s' }}>
              <div className="card-body">
                <div style={{
                  fontSize: '4rem',
                  marginBottom: '1.5rem',
                  background: 'var(--gradient-secondary)',
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  boxShadow: 'var(--shadow-lg)'
                }}>
                  <span style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>⚡</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gradient">Entrega Rápida</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Recibe tu pedido en 24-48 horas máximo
                </p>
              </div>
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
            <div className="products-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '1.5rem'
            }}>
              {products.slice(0, 8).map((product) => (
                <div key={product.id} className="card-product" style={{
                  background: 'var(--white)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                  border: '1px solid var(--border-color)',
                  transition: 'var(--transition)'
                }}>
                  <div style={{
                    height: '220px',
                    background: 'linear-gradient(135deg, var(--light-gray) 0%, var(--medium-gray) 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '4rem',
                    position: 'relative'
                  }}>
                    🧽
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: 'var(--success-color)',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: '600'
                    }}>
                      NUEVO
                    </div>
                  </div>

                  <div style={{ padding: '1.5rem' }}>
                    <h3 style={{
                      fontSize: '1rem',
                      fontWeight: '600',
                      marginBottom: '0.75rem',
                      height: '2.5rem',
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      color: 'var(--text-primary)'
                    }}>
                      {product.name}
                    </h3>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '1rem',
                      gap: '0.5rem'
                    }}>
                      <div style={{ display: 'flex', color: '#fbbf24' }}>
                        {'★'.repeat(5)}
                      </div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>(4.8)</span>
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{
                          fontSize: '1.5rem',
                          fontWeight: '700',
                          color: 'var(--primary-color)'
                        }}>
                          ${product.price?.toLocaleString()}
                        </span>
                        {product.comparePrice && product.comparePrice > product.price && (
                          <span style={{
                            fontSize: '0.875rem',
                            color: 'var(--text-secondary)',
                            textDecoration: 'line-through'
                          }}>
                            ${product.comparePrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => addToCart(product)}
                      style={{
                        width: '100%',
                        background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '12px',
                        padding: '0.75rem',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        cursor: 'pointer',
                        transition: 'var(--transition)',
                        boxShadow: '0 4px 15px rgba(0, 102, 255, 0.3)'
                      }}
                    >
                      🛒 Agregar
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

      <style>{`
        @media (max-width: 1024px) {
          .grid-cols-3, .grid-cols-4 {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }

        @media (max-width: 768px) {
          .grid-cols-3, .grid-cols-4 {
            grid-template-columns: repeat(2, 1fr) !important;
          }

          h1 {
            font-size: 2.5rem !important;
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
            font-size: 1.5rem !important;
          }

          .container {
            padding: 0 1rem !important;
          }
        }

        .card-product:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15) !important;
        }

        .card-product button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 102, 255, 0.4) !important;
        }
      `}</style>
    </div>
  );
};

export default Home;
