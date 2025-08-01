import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{ 
      backgroundColor: 'var(--black)', 
      color: 'var(--white)', 
      marginTop: 'auto' 
    }}>
      <div className="container py-12">
        <div className="grid grid-cols-4">
          {/* Company Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ 
                width: '32px', 
                height: '32px', 
                backgroundColor: 'var(--primary-color)', 
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '8px'
              }}>
                <span style={{ color: 'white', fontWeight: 'bold', fontSize: '16px' }}>T</span>
              </div>
              <span style={{ fontSize: '20px', fontWeight: 'bold' }}>
                Tienda Moderna
              </span>
            </div>
            <p style={{ color: '#94a3b8', lineHeight: '1.6', marginBottom: '1rem' }}>
              Tu tienda online de productos de limpieza de alta calidad en Colombia.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="#" style={{ color: '#94a3b8', fontSize: '20px', textDecoration: 'none' }}>📘</a>
              <a href="#" style={{ color: '#94a3b8', fontSize: '20px', textDecoration: 'none' }}>📷</a>
              <a href="#" style={{ color: '#94a3b8', fontSize: '20px', textDecoration: 'none' }}>🐦</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '1rem' }}>
              Enlaces Rápidos
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <Link to="/" style={{ color: '#94a3b8', textDecoration: 'none' }}>
                Inicio
              </Link>
              <Link to="/products" style={{ color: '#94a3b8', textDecoration: 'none' }}>
                Productos
              </Link>
              <Link to="/about" style={{ color: '#94a3b8', textDecoration: 'none' }}>
                Nosotros
              </Link>
              <Link to="/contact" style={{ color: '#94a3b8', textDecoration: 'none' }}>
                Contacto
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '1rem' }}>
              Categorías
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <Link to="/category/limpieza-hogar" style={{ color: '#94a3b8', textDecoration: 'none' }}>
                Limpieza del Hogar
              </Link>
              <Link to="/category/cuidado-personal" style={{ color: '#94a3b8', textDecoration: 'none' }}>
                Cuidado Personal
              </Link>
              <Link to="/category/desinfectantes" style={{ color: '#94a3b8', textDecoration: 'none' }}>
                Desinfectantes
              </Link>
              <Link to="/category/detergentes" style={{ color: '#94a3b8', textDecoration: 'none' }}>
                Detergentes
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '1rem' }}>
              Contacto
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>📍</span>
                <span style={{ color: '#94a3b8', fontSize: '14px' }}>
                  Calle 123 #45-67, Bogotá, Colombia
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>📞</span>
                <span style={{ color: '#94a3b8', fontSize: '14px' }}>
                  +57 300 123 4567
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>✉️</span>
                <span style={{ color: '#94a3b8', fontSize: '14px' }}>
                  info@tiendamoderna.com
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>🕒</span>
                <span style={{ color: '#94a3b8', fontSize: '14px' }}>
                  Lun - Vie: 9:00 AM - 6:00 PM
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ 
          borderTop: '1px solid #374151', 
          marginTop: '2rem', 
          paddingTop: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ color: '#94a3b8', fontSize: '14px' }}>
            © 2024 Tienda Moderna. Todos los derechos reservados.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="#" style={{ color: '#94a3b8', fontSize: '14px', textDecoration: 'none' }}>
              Términos y Condiciones
            </a>
            <a href="#" style={{ color: '#94a3b8', fontSize: '14px', textDecoration: 'none' }}>
              Política de Privacidad
            </a>
            <a href="#" style={{ color: '#94a3b8', fontSize: '14px', textDecoration: 'none' }}>
              Política de Cookies
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 2rem;
          }
        }
        
        @media (max-width: 480px) {
          .grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
