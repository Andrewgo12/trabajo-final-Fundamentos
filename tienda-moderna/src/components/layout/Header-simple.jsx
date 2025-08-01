import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openLoginModal = () => {
    setShowLoginModal(true);
    setShowRegisterModal(false);
  };

  const openRegisterModal = () => {
    setShowRegisterModal(true);
    setShowLoginModal(false);
  };

  const closeModals = () => {
    setShowLoginModal(false);
    setShowRegisterModal(false);
  };

  return (
    <>
      <header style={{ backgroundColor: 'var(--white)', boxShadow: 'var(--shadow)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div className="container">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link to="/" style={{ textDecoration: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ 
                  width: '40px', 
                  height: '40px', 
                  backgroundColor: 'var(--primary-color)', 
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '12px'
                }}>
                  <span style={{ color: 'white', fontWeight: 'bold', fontSize: '20px' }}>T</span>
                </div>
                <span style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--black)' }}>
                  Tienda Moderna
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
              <Link to="/cart" style={{ textDecoration: 'none' }}>
                <button style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <span style={{ fontSize: '20px' }}>🛒</span>
                  <span style={{ 
                    backgroundColor: 'var(--primary-color)', 
                    color: 'white', 
                    borderRadius: '50%', 
                    width: '20px', 
                    height: '20px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}>
                    0
                  </span>
                </button>
              </Link>

              {/* Wishlist */}
              <Link to="/wishlist" style={{ textDecoration: 'none' }}>
                <button style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px',
                  borderRadius: '8px'
                }}>
                  <span style={{ fontSize: '20px' }}>❤️</span>
                </button>
              </Link>

              {/* Auth Buttons */}
              <button 
                onClick={openLoginModal}
                className="btn btn-outline btn-sm"
              >
                Iniciar Sesión
              </button>
              
              <button 
                onClick={openRegisterModal}
                className="btn btn-primary btn-sm"
              >
                Registrarse
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

      {/* Login Modal */}
      {showLoginModal && (
        <div className="modal-overlay" onClick={closeModals}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--black)' }}>
                  Iniciar Sesión
                </h2>
                <button 
                  onClick={closeModals}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    fontSize: '24px', 
                    cursor: 'pointer',
                    color: 'var(--dark-gray)'
                  }}
                >
                  ×
                </button>
              </div>
              
              <form className="space-y-4">
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-input" placeholder="tu@email.com" />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Contraseña</label>
                  <input type="password" className="form-input" placeholder="••••••••" />
                </div>
                
                <button type="submit" className="btn btn-primary w-full">
                  Iniciar Sesión
                </button>
                
                <div className="text-center">
                  <span style={{ color: 'var(--dark-gray)' }}>¿No tienes cuenta? </span>
                  <button 
                    type="button"
                    onClick={openRegisterModal}
                    style={{ 
                      background: 'none', 
                      border: 'none', 
                      color: 'var(--primary-color)', 
                      cursor: 'pointer',
                      textDecoration: 'underline'
                    }}
                  >
                    Regístrate aquí
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Register Modal */}
      {showRegisterModal && (
        <div className="modal-overlay" onClick={closeModals}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--black)' }}>
                  Crear Cuenta
                </h2>
                <button 
                  onClick={closeModals}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    fontSize: '24px', 
                    cursor: 'pointer',
                    color: 'var(--dark-gray)'
                  }}
                >
                  ×
                </button>
              </div>
              
              <form className="space-y-4">
                <div className="form-group">
                  <label className="form-label">Nombre Completo</label>
                  <input type="text" className="form-input" placeholder="Tu nombre completo" />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-input" placeholder="tu@email.com" />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Contraseña</label>
                  <input type="password" className="form-input" placeholder="••••••••" />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Confirmar Contraseña</label>
                  <input type="password" className="form-input" placeholder="••••••••" />
                </div>
                
                <button type="submit" className="btn btn-primary w-full">
                  Crear Cuenta
                </button>
                
                <div className="text-center">
                  <span style={{ color: 'var(--dark-gray)' }}>¿Ya tienes cuenta? </span>
                  <button 
                    type="button"
                    onClick={openLoginModal}
                    style={{ 
                      background: 'none', 
                      border: 'none', 
                      color: 'var(--primary-color)', 
                      cursor: 'pointer',
                      textDecoration: 'underline'
                    }}
                  >
                    Inicia sesión aquí
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
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
