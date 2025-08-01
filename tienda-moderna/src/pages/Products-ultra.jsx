import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchProducts();
  }, [currentPage, searchTerm]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3001/api/products?page=${currentPage}&limit=12&search=${searchTerm}`
      );
      const data = await response.json();
      setProducts(data.products || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error('Error:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (product) => {
    alert(`${product.name} agregado al carrito!`);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="text-center">
          <div className="spinner"></div>
          <p className="mt-4">Cargando productos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Nuestros Productos</h1>
          <p style={{ color: 'var(--dark-gray)', fontSize: '1.125rem' }}>
            Descubre nuestra amplia selección de productos de limpieza
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div style={{ maxWidth: '400px', margin: '0 auto', position: 'relative' }}>
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={handleSearch}
              className="form-input"
              style={{ paddingLeft: '3rem' }}
            />
            <span style={{ 
              position: 'absolute', 
              left: '1rem', 
              top: '50%', 
              transform: 'translateY(-50%)',
              fontSize: '1.25rem'
            }}>
              🔍
            </span>
          </div>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="text-center py-12">
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📦</div>
            <h3 className="text-xl font-semibold mb-2">No se encontraron productos</h3>
            <p style={{ color: 'var(--dark-gray)' }}>
              Intenta con otros términos de búsqueda
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-4 mb-8" style={{ gap: '1.5rem' }}>
              {products.map((product) => (
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
                    
                    <p style={{ 
                      fontSize: '0.875rem', 
                      color: 'var(--dark-gray)', 
                      marginBottom: '0.75rem',
                      height: '2.5rem',
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical'
                    }}>
                      {product.shortDescription || product.description}
                    </p>
                    
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
                    
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button 
                        onClick={() => addToCart(product)}
                        className="btn btn-primary"
                        style={{ flex: 1, fontSize: '0.875rem' }}
                      >
                        🛒 Agregar
                      </button>
                      
                      <Link
                        to={`/product/${product.id}`}
                        className="btn btn-secondary"
                        style={{ textDecoration: 'none', fontSize: '0.875rem' }}
                      >
                        Ver
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="btn btn-secondary"
                  style={{ opacity: currentPage === 1 ? 0.5 : 1 }}
                >
                  ← Anterior
                </button>
                
                <span style={{ 
                  padding: '0.75rem 1.5rem',
                  backgroundColor: 'var(--primary-color)',
                  color: 'white',
                  borderRadius: '0.5rem',
                  fontWeight: '600'
                }}>
                  {currentPage} de {totalPages}
                </span>
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="btn btn-secondary"
                  style={{ opacity: currentPage === totalPages ? 0.5 : 1 }}
                >
                  Siguiente →
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .grid-cols-4 {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        
        @media (max-width: 480px) {
          .grid-cols-4 {
            grid-template-columns: 1fr !important;
          }
          
          .text-4xl {
            font-size: 2rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Products;
