import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNotification } from '../context/NotificationContext';
import ProductComparison, { addToCompare } from '../components/ui/ProductComparison';

const Products = () => {
  const { showSuccess, showError } = useNotification();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [showFilters, setShowFilters] = useState(false);
  const [showComparison, setShowComparison] = useState(false);

  const categories = [
    'Limpieza del Hogar',
    'Cuidado Personal',
    'Desinfectantes',
    'Detergentes',
    'Productos de Aseo'
  ];

  useEffect(() => {
    fetchProducts();
  }, [currentPage, searchTerm, selectedCategory, sortBy, priceRange]);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      // Construir URL con filtros
      const params = new URLSearchParams({
        page: currentPage,
        limit: 12,
        search: searchTerm,
        category: selectedCategory,
        sortBy: sortBy,
        minPrice: priceRange.min || '',
        maxPrice: priceRange.max || ''
      });

      const response = await fetch(`http://localhost:3001/api/products?${params}`);
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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
    setCurrentPage(1);
  };

  const handlePriceRangeChange = (type, value) => {
    setPriceRange(prev => ({
      ...prev,
      [type]: value
    }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setSortBy('name');
    setPriceRange({ min: '', max: '' });
    setSearchTerm('');
    setCurrentPage(1);
  };

  const addToCart = (product) => {
    try {
      // Obtener carrito actual del localStorage
      const currentCart = JSON.parse(localStorage.getItem('cleanpro_cart') || '[]');

      // Verificar si el producto ya existe
      const existingItem = currentCart.find(item => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
        showSuccess(`Cantidad actualizada: ${product.name}`, 2000);
      } else {
        currentCart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.images?.[0] || '',
          quantity: 1
        });
        showSuccess(`✅ ${product.name} agregado al carrito`, 2500);
      }

      // Guardar en localStorage
      localStorage.setItem('cleanpro_cart', JSON.stringify(currentCart));

      // Disparar evento personalizado para actualizar el header
      window.dispatchEvent(new CustomEvent('cartUpdated', { detail: currentCart }));

    } catch (error) {
      console.error('Error adding to cart:', error);
      showError('Error al agregar al carrito');
    }
  };

  const addToWishlist = (product) => {
    try {
      // Obtener wishlist actual del localStorage
      const currentWishlist = JSON.parse(localStorage.getItem('cleanpro_wishlist') || '[]');

      // Verificar si el producto ya existe
      const existingItem = currentWishlist.find(item => item.id === product.id);

      if (existingItem) {
        showError('Este producto ya está en tu lista de deseos');
        return;
      }

      currentWishlist.push({
        id: product.id,
        name: product.name,
        price: product.price,
        comparePrice: product.comparePrice,
        image: product.images?.[0] || '',
        rating: product.rating
      });

      // Guardar en localStorage
      localStorage.setItem('cleanpro_wishlist', JSON.stringify(currentWishlist));

      showSuccess(`❤️ ${product.name} agregado a lista de deseos`, 2500);

    } catch (error) {
      console.error('Error adding to wishlist:', error);
      showError('Error al agregar a lista de deseos');
    }
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
              🛍️ Nuestros Productos
            </h1>
            <p style={{
              fontSize: '1.5rem',
              opacity: 0.95,
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: 1.6
            }}>
              Más de 600 productos de aseo profesional
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12" style={{ backgroundColor: 'var(--light-gray)' }}>
        <div className="container">

          {/* Search */}
          <div className="mb-8">
            <div style={{ maxWidth: '500px', margin: '0 auto', position: 'relative' }}>
              <input
                type="text"
                placeholder="🔍 Buscar productos de aseo..."
                value={searchTerm}
                onChange={handleSearch}
                className="form-input"
                style={{
                  border: '2px solid var(--border-color)',
                  borderRadius: '50px',
                  padding: '1rem 1.5rem',
                  fontSize: '1rem',
                  transition: 'var(--transition)',
                  boxShadow: 'var(--shadow-md)',
                  textAlign: 'center'
                }}
              />
            </div>
          </div>

          {/* Filters */}
          <div className="card mb-8" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', margin: 0 }}>
                🔧 Filtros
              </h3>
              <button
                onClick={() => setShowFilters(!showFilters)}
                style={{
                  background: 'var(--primary-color)',
                  color: 'white',
                  border: 'none',
                  borderRadius: 'var(--radius)',
                  padding: '0.5rem 1rem',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  transition: 'var(--transition)'
                }}
                className="hover-lift"
              >
                {showFilters ? '🔼 Ocultar' : '🔽 Mostrar'}
              </button>
            </div>

            {showFilters && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', alignItems: 'end' }}>
                {/* Category Filter */}
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.875rem' }}>
                    📂 Categoría
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid var(--border-color)',
                      borderRadius: 'var(--radius)',
                      fontSize: '0.875rem',
                      transition: 'var(--transition)'
                    }}
                  >
                    <option value="">Todas las categorías</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Sort Filter */}
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.875rem' }}>
                    📊 Ordenar por
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => handleSortChange(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid var(--border-color)',
                      borderRadius: 'var(--radius)',
                      fontSize: '0.875rem',
                      transition: 'var(--transition)'
                    }}
                  >
                    <option value="name">Nombre A-Z</option>
                    <option value="price-asc">Precio: Menor a Mayor</option>
                    <option value="price-desc">Precio: Mayor a Menor</option>
                    <option value="rating">Mejor Calificación</option>
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.875rem' }}>
                    💰 Rango de Precio
                  </label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                      type="number"
                      placeholder="Min"
                      value={priceRange.min}
                      onChange={(e) => handlePriceRangeChange('min', e.target.value)}
                      style={{
                        width: '50%',
                        padding: '0.75rem',
                        border: '2px solid var(--border-color)',
                        borderRadius: 'var(--radius)',
                        fontSize: '0.875rem'
                      }}
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={priceRange.max}
                      onChange={(e) => handlePriceRangeChange('max', e.target.value)}
                      style={{
                        width: '50%',
                        padding: '0.75rem',
                        border: '2px solid var(--border-color)',
                        borderRadius: 'var(--radius)',
                        fontSize: '0.875rem'
                      }}
                    />
                  </div>
                </div>

                {/* Clear Filters */}
                <div>
                  <button
                    onClick={clearFilters}
                    style={{
                      width: '100%',
                      background: 'var(--danger-color)',
                      color: 'white',
                      border: 'none',
                      borderRadius: 'var(--radius)',
                      padding: '0.75rem',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'var(--transition)'
                    }}
                    className="hover-lift"
                  >
                    🗑️ Limpiar Filtros
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Products Grid */}
          {products.length === 0 ? (
            <div className="text-center py-12">
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📦</div>
              <h3 className="text-xl font-semibold mb-2">No se encontraron productos</h3>
              <p style={{ color: 'var(--text-secondary)' }}>
                Intenta con otros términos de búsqueda
              </p>
            </div>
          ) : (
            <>
              <div className="products-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '1.5rem',
                marginBottom: '3rem'
              }}>
              {products.map((product) => (
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
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    {product.images && product.images[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'var(--transition)'
                        }}
                      />
                    ) : (
                      <span style={{ fontSize: '4rem' }}>🧽</span>
                    )}
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
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        ({product.rating || '4.8'})
                      </span>
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

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => addToCart(product)}
                        style={{
                          flex: 1,
                          background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '12px',
                          padding: '0.75rem',
                          fontSize: '0.875rem',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'var(--transition)',
                          boxShadow: '0 4px 15px rgba(0, 102, 255, 0.3)'
                        }}
                        className="hover-lift"
                      >
                        🛒 Agregar
                      </button>

                      <button
                        onClick={() => addToWishlist(product)}
                        style={{
                          background: 'var(--danger-light)',
                          color: 'var(--danger-color)',
                          border: '2px solid var(--danger-color)',
                          borderRadius: '12px',
                          padding: '0.75rem',
                          fontSize: '0.875rem',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'var(--transition)',
                          minWidth: '50px'
                        }}
                        className="hover-lift"
                        title="Agregar a lista de deseos"
                      >
                        ❤️
                      </button>

                      <button
                        onClick={() => addToCompare(product)}
                        style={{
                          background: 'var(--warning-light)',
                          color: 'var(--warning-color)',
                          border: '2px solid var(--warning-color)',
                          borderRadius: '12px',
                          padding: '0.75rem',
                          fontSize: '0.875rem',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'var(--transition)',
                          minWidth: '50px'
                        }}
                        className="hover-lift"
                        title="Agregar a comparación"
                      >
                        ⚖️
                      </button>

                      <Link
                        to={`/product/${product.id}`}
                        style={{
                          background: 'var(--light-gray)',
                          color: 'var(--text-primary)',
                          border: '2px solid var(--border-color)',
                          borderRadius: '12px',
                          padding: '0.75rem 1rem',
                          fontSize: '0.875rem',
                          fontWeight: '600',
                          textDecoration: 'none',
                          transition: 'var(--transition)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                        className="hover-lift"
                      >
                        👁️
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
      </section>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 1024px) {
          .products-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }

        @media (max-width: 768px) {
          .products-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 480px) {
          .products-grid {
            grid-template-columns: 1fr !important;
          }
        }

        .card-product:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15) !important;
        }

        .card-product:hover img {
          transform: scale(1.05);
        }

        .card-product button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 102, 255, 0.4) !important;
        }
      `}</style>

      {/* Floating Compare Button */}
      <button
        onClick={() => setShowComparison(true)}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          background: 'linear-gradient(135deg, var(--warning-color) 0%, #f59e0b 100%)',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          fontSize: '1.5rem',
          cursor: 'pointer',
          boxShadow: '0 8px 25px rgba(245, 158, 11, 0.4)',
          zIndex: 1000,
          transition: 'var(--transition)'
        }}
        className="hover-lift"
        title="Ver comparación de productos"
      >
        ⚖️
      </button>

      {/* Product Comparison Modal */}
      <ProductComparison
        isOpen={showComparison}
        onClose={() => setShowComparison(false)}
      />
    </div>
  );
};

export default Products;
