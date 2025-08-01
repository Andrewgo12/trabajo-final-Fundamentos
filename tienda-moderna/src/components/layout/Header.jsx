import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openAuthModal = () => {
    setShowAuthModal(true);
    setAuthMode('login');
  };

  const closeAuthModal = () => {
    setShowAuthModal(false);
  };

  const switchToRegister = () => {
    setAuthMode('register');
  };

  const switchToLogin = () => {
    setAuthMode('login');
  };

  return (
    <>
      <header style={{
        backgroundColor: 'var(--white)',
        boxShadow: 'var(--shadow-md)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        borderBottom: '1px solid var(--border-color)'
      }}>
        <div className="container">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link to="/" style={{ textDecoration: 'none' }} className="hover-scale">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: 'var(--gradient-primary)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '12px',
                  boxShadow: 'var(--shadow-md)',
                  transition: 'var(--transition)'
                }}>
                  <span style={{ color: 'white', fontWeight: 'bold', fontSize: '24px' }}>T</span>
                </div>
                <span className="text-gradient" style={{ fontSize: '28px', fontWeight: '800' }}>
                  CleanPro
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav style={{ display: 'none' }} className="desktop-nav">
              <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <Link to="/" style={{ textDecoration: 'none', color: 'var(--dark-gray)', fontWeight: '500' }}>
                  Inicio
                </Link>
                <Link to="/products" style={{ textDecoration: 'none', color: 'var(--dark-gray)', fontWeight: '500' }}>
                  Productos
                </Link>
                <Link to="/about" style={{ textDecoration: 'none', color: 'var(--dark-gray)', fontWeight: '500' }}>
                  Nosotros
                </Link>
                <Link to="/contact" style={{ textDecoration: 'none', color: 'var(--dark-gray)', fontWeight: '500' }}>
                  Contacto
                </Link>
              </div>
            </nav>

            {/* Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              {/* Cart */}
              <Link to="/cart" style={{ textDecoration: 'none' }} className="hover-lift">
                <button style={{
                  background: 'var(--light-gray)',
                  border: '2px solid var(--border-color)',
                  cursor: 'pointer',
                  padding: '12px',
                  borderRadius: 'var(--radius)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'var(--transition)',
                  position: 'relative'
                }}>
                  <span style={{ fontSize: '20px' }}>🛒</span>
                  <span style={{
                    background: 'var(--gradient-primary)',
                    color: 'white',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    position: 'absolute',
                    top: '-8px',
                    right: '-8px',
                    boxShadow: 'var(--shadow-md)'
                  }}>
                    0
                  </span>
                </button>
              </Link>

              {/* Wishlist */}
              <Link to="/wishlist" style={{ textDecoration: 'none' }} className="hover-lift">
                <button style={{
                  background: 'var(--light-gray)',
                  border: '2px solid var(--border-color)',
                  cursor: 'pointer',
                  padding: '12px',
                  borderRadius: 'var(--radius)',
                  transition: 'var(--transition)'
                }}>
                  <span style={{ fontSize: '20px' }}>❤️</span>
                </button>
              </Link>

              {/* Auth Button */}
              <button
                onClick={openAuthModal}
                className="btn btn-primary btn-sm hover-lift"
                style={{
                  background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%)',
                  border: 'none',
                  boxShadow: '0 4px 15px rgba(0, 102, 255, 0.3)',
                  textTransform: 'none',
                  fontWeight: '600'
                }}
              >
                🔐 Mi Cuenta
              </button>

              {/* Mobile Menu Button */}
              <button 
                onClick={toggleMenu}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px',
                  display: 'none'
                }}
                className="mobile-menu-btn"
              >
                <span style={{ fontSize: '24px' }}>☰</span>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav style={{ 
              display: 'block',
              borderTop: '1px solid var(--medium-gray)',
              paddingTop: '1rem',
              paddingBottom: '1rem'
            }} className="mobile-nav">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <Link 
                  to="/" 
                  style={{ textDecoration: 'none', color: 'var(--dark-gray)', fontWeight: '500' }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Inicio
                </Link>
                <Link 
                  to="/products" 
                  style={{ textDecoration: 'none', color: 'var(--dark-gray)', fontWeight: '500' }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Productos
                </Link>
                <Link 
                  to="/about" 
                  style={{ textDecoration: 'none', color: 'var(--dark-gray)', fontWeight: '500' }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Nosotros
                </Link>
                <Link 
                  to="/contact" 
                  style={{ textDecoration: 'none', color: 'var(--dark-gray)', fontWeight: '500' }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contacto
                </Link>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="modal-overlay" onClick={closeAuthModal} style={{
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(10px)'
        }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{
            background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
            border: '1px solid rgba(0, 102, 255, 0.2)',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 0,
            overflow: 'hidden'
          }}>
            {/* Left Column - Branding */}
            <div style={{
              background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%)',
              padding: '3rem 2.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
              textAlign: 'center'
            }}>
              <div style={{
                width: '120px',
                height: '120px',
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '2rem',
                backdropFilter: 'blur(10px)'
              }}>
                <span style={{ fontSize: '3rem' }}>🧽</span>
              </div>
              <h2 style={{
                fontSize: '2.5rem',
                fontWeight: '900',
                marginBottom: '1rem',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}>
                CleanPro
              </h2>
              <p style={{
                fontSize: '1.125rem',
                opacity: 0.9,
                lineHeight: 1.6,
                marginBottom: '2rem'
              }}>
                {authMode === 'login'
                  ? 'Bienvenido de vuelta a la mejor plataforma de productos de aseo profesional'
                  : 'Únete a miles de usuarios que confían en CleanPro para sus necesidades de limpieza'
                }
              </p>
              <div style={{ display: 'flex', gap: '1rem', opacity: 0.8 }}>
                <span>✨ Calidad Premium</span>
                <span>🚚 Envío Gratis</span>
                <span>🔒 Seguro</span>
              </div>
            </div>

            {/* Right Column - Form */}
            <div style={{ padding: '3rem 2.5rem' }}>
              {/* Form Header */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{
                  fontSize: '1.75rem',
                  fontWeight: '700',
                  color: 'var(--text-primary)',
                  marginBottom: '0.5rem'
                }}>
                  {authMode === 'login' ? '🔐 Iniciar Sesión' : '🚀 Crear Cuenta'}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                  {authMode === 'login'
                    ? 'Ingresa tus credenciales para acceder'
                    : 'Completa el formulario para registrarte'
                  }
                </p>
              </div>

              {/* Form */}
              <form style={{ marginBottom: '1.5rem' }}>
                {authMode === 'register' && (
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Nombre completo"
                      style={{
                        border: '2px solid var(--border-color)',
                        borderRadius: '12px',
                        padding: '1rem',
                        fontSize: '0.875rem',
                        transition: 'var(--transition)'
                      }}
                    />
                  </div>
                )}

                <div className="form-group">
                  <input
                    type="email"
                    className="form-input"
                    placeholder="Email"
                    style={{
                      border: '2px solid var(--border-color)',
                      borderRadius: '12px',
                      padding: '1rem',
                      fontSize: '0.875rem',
                      transition: 'var(--transition)'
                    }}
                  />
                </div>

                <div className="form-group">
                  <input
                    type="password"
                    className="form-input"
                    placeholder="Contraseña"
                    style={{
                      border: '2px solid var(--border-color)',
                      borderRadius: '12px',
                      padding: '1rem',
                      fontSize: '0.875rem',
                      transition: 'var(--transition)'
                    }}
                  />
                </div>

                {authMode === 'register' && (
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-input"
                      placeholder="Confirmar contraseña"
                      style={{
                        border: '2px solid var(--border-color)',
                        borderRadius: '12px',
                        padding: '1rem',
                        fontSize: '0.875rem',
                        transition: 'var(--transition)'
                      }}
                    />
                  </div>
                )}

                <button
                  type="submit"
                  className="btn w-full"
                  style={{
                    background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '1rem',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    boxShadow: '0 4px 15px rgba(0, 102, 255, 0.3)',
                    transition: 'var(--transition)',
                    marginTop: '1.5rem'
                  }}
                >
                  {authMode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
                </button>
              </form>

              {/* Switch Mode */}
              <div style={{ textAlign: 'center' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                  {authMode === 'login' ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
                </span>
                <button
                  type="button"
                  onClick={authMode === 'login' ? switchToRegister : switchToLogin}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--primary-color)',
                    cursor: 'pointer',
                    fontWeight: '600',
                    marginLeft: '0.5rem',
                    textDecoration: 'underline'
                  }}
                >
                  {authMode === 'login' ? 'Regístrate aquí' : 'Inicia sesión'}
                </button>
              </div>

              {/* Close Button */}
              <button
                onClick={closeAuthModal}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'var(--light-gray)',
                  border: 'none',
                  fontSize: '18px',
                  cursor: 'pointer',
                  color: 'var(--text-secondary)',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'var(--transition)'
                }}
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}



      <style>{`
        @media (min-width: 768px) {
          .desktop-nav {
            display: block !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
          .mobile-nav {
            display: none !important;
          }
        }
        
        @media (max-width: 767px) {
          .mobile-menu-btn {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
};

export default Header;
