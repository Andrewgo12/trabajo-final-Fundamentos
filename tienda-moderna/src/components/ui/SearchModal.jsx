import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNotification } from '../../context/NotificationContext';

const SearchModal = ({ isOpen, onClose }) => {
  const { showError } = useNotification();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    if (isOpen) {
      loadRecentSearches();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    if (searchTerm.length >= 2) {
      const debounceTimer = setTimeout(() => {
        performSearch(searchTerm);
      }, 300);

      return () => clearTimeout(debounceTimer);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const loadRecentSearches = () => {
    try {
      const saved = localStorage.getItem('cleanpro_recent_searches');
      if (saved) {
        setRecentSearches(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading recent searches:', error);
    }
  };

  const saveRecentSearch = (term) => {
    try {
      const current = JSON.parse(localStorage.getItem('cleanpro_recent_searches') || '[]');
      const updated = [term, ...current.filter(item => item !== term)].slice(0, 5);
      localStorage.setItem('cleanpro_recent_searches', JSON.stringify(updated));
      setRecentSearches(updated);
    } catch (error) {
      console.error('Error saving recent search:', error);
    }
  };

  const performSearch = async (term) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3001/api/products?search=${encodeURIComponent(term)}&limit=8`);
      
      if (!response.ok) {
        throw new Error('Error en la búsqueda');
      }

      const data = await response.json();
      setSearchResults(data.products || []);
    } catch (error) {
      console.error('Search error:', error);
      showError('Error al realizar la búsqueda');
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (term) => {
    if (term.trim()) {
      saveRecentSearch(term.trim());
      onClose();
      // Redirigir a la página de productos con el término de búsqueda
      window.location.href = `/products?search=${encodeURIComponent(term.trim())}`;
    }
  };

  const clearRecentSearches = () => {
    localStorage.removeItem('cleanpro_recent_searches');
    setRecentSearches([]);
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      zIndex: 10000,
      padding: '2rem'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '700px',
        maxHeight: '80vh',
        overflow: 'hidden',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
        marginTop: '5vh'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          padding: '1.5rem',
          borderBottom: '1px solid var(--border-color)'
        }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <input
              type="text"
              placeholder="🔍 Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearchSubmit(searchTerm)}
              autoFocus
              style={{
                width: '100%',
                padding: '1rem 1.5rem',
                border: '2px solid var(--border-color)',
                borderRadius: '12px',
                fontSize: '1rem',
                outline: 'none',
                transition: 'var(--transition)'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--primary-color)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
            />
            {loading && (
              <div style={{
                position: 'absolute',
                right: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '1rem'
              }}>
                ⏳
              </div>
            )}
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'var(--danger-color)',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              fontSize: '1.5rem',
              cursor: 'pointer',
              marginLeft: '1rem'
            }}
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '1.5rem', maxHeight: '60vh', overflow: 'auto' }}>
          {searchTerm.length >= 2 ? (
            // Search Results
            <div>
              <h3 style={{ marginBottom: '1rem', color: 'var(--primary-color)' }}>
                📦 Resultados ({searchResults.length})
              </h3>
              {searchResults.length === 0 && !loading ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
                  <p>No se encontraron productos para "{searchTerm}"</p>
                </div>
              ) : (
                <div style={{ display: 'grid', gap: '1rem' }}>
                  {searchResults.map(product => (
                    <Link
                      key={product.id}
                      to={`/product/${product.id}`}
                      onClick={onClose}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        padding: '1rem',
                        border: '1px solid var(--border-color)',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        color: 'inherit',
                        transition: 'var(--transition)'
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--light-gray)'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                    >
                      <div style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        backgroundColor: 'var(--light-gray)'
                      }}>
                        <img
                          src={product.images?.[0] || ''}
                          alt={product.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ margin: 0, fontSize: '0.875rem', fontWeight: '600' }}>
                          {product.name}
                        </h4>
                        <p style={{ 
                          margin: '0.25rem 0 0 0', 
                          fontSize: '1rem', 
                          fontWeight: '700',
                          color: 'var(--primary-color)'
                        }}>
                          ${product.price.toLocaleString()}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            // Recent Searches
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ margin: 0, color: 'var(--primary-color)' }}>
                  🕒 Búsquedas Recientes
                </h3>
                {recentSearches.length > 0 && (
                  <button
                    onClick={clearRecentSearches}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-secondary)',
                      fontSize: '0.875rem',
                      cursor: 'pointer'
                    }}
                  >
                    Limpiar
                  </button>
                )}
              </div>
              
              {recentSearches.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
                  <p>No hay búsquedas recientes</p>
                  <p style={{ fontSize: '0.875rem' }}>Comienza escribiendo para buscar productos</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearchSubmit(search)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.75rem',
                        border: '1px solid var(--border-color)',
                        borderRadius: '8px',
                        background: 'none',
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'var(--transition)',
                        fontSize: '0.875rem'
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--light-gray)'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                    >
                      <span>🔍</span>
                      <span>{search}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Popular Categories */}
              <div style={{ marginTop: '2rem' }}>
                <h3 style={{ marginBottom: '1rem', color: 'var(--primary-color)' }}>
                  🔥 Categorías Populares
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
                  {[
                    { name: 'Detergentes', emoji: '🧴' },
                    { name: 'Desinfectantes', emoji: '🧽' },
                    { name: 'Cuidado Personal', emoji: '🧼' },
                    { name: 'Limpieza del Hogar', emoji: '🏠' }
                  ].map(category => (
                    <button
                      key={category.name}
                      onClick={() => handleSearchSubmit(category.name)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.75rem',
                        border: '1px solid var(--border-color)',
                        borderRadius: '8px',
                        background: 'none',
                        cursor: 'pointer',
                        transition: 'var(--transition)',
                        fontSize: '0.875rem'
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--light-gray)'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                    >
                      <span>{category.emoji}</span>
                      <span>{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
