import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNotification } from '../../context/NotificationContext';

const ProductComparison = ({ isOpen, onClose }) => {
  const { showSuccess, showInfo, showError } = useNotification();
  const [compareProducts, setCompareProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadCompareProducts();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const loadCompareProducts = () => {
    try {
      const saved = localStorage.getItem('cleanpro_compare');
      if (saved) {
        setCompareProducts(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading compare products:', error);
    }
  };

  const removeFromCompare = (productId) => {
    try {
      const updated = compareProducts.filter(p => p.id !== productId);
      setCompareProducts(updated);
      localStorage.setItem('cleanpro_compare', JSON.stringify(updated));
      showInfo('Producto eliminado de la comparación', 2000);
    } catch (error) {
      showError('Error al eliminar producto');
    }
  };

  const clearComparison = () => {
    setCompareProducts([]);
    localStorage.removeItem('cleanpro_compare');
    showInfo('Comparación limpiada', 2000);
  };

  const addToCart = (product) => {
    try {
      const currentCart = JSON.parse(localStorage.getItem('cleanpro_cart') || '[]');
      const existingItem = currentCart.find(item => item.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        currentCart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.images?.[0] || product.image || '',
          quantity: 1
        });
      }
      
      localStorage.setItem('cleanpro_cart', JSON.stringify(currentCart));
      window.dispatchEvent(new CustomEvent('cartUpdated', { detail: currentCart }));
      showSuccess(`✅ ${product.name} agregado al carrito`, 2500);
    } catch (error) {
      showError('Error al agregar al carrito');
    }
  };

  const renderStars = (rating) => {
    return (
      <div style={{ display: 'flex', gap: '2px' }}>
        {[1, 2, 3, 4, 5].map(star => (
          <span
            key={star}
            style={{
              fontSize: '1rem',
              color: star <= rating ? '#fbbf24' : '#e5e7eb'
            }}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  const getComparisonFeatures = () => {
    if (compareProducts.length === 0) return [];
    
    return [
      { key: 'price', label: '💰 Precio', type: 'currency' },
      { key: 'comparePrice', label: '🏷️ Precio Original', type: 'currency' },
      { key: 'rating', label: '⭐ Calificación', type: 'rating' },
      { key: 'quantity', label: '📦 Stock', type: 'number' },
      { key: 'categoryId', label: '📂 Categoría', type: 'text' },
      { key: 'brandId', label: '🏢 Marca', type: 'text' },
      { key: 'sku', label: '🔖 SKU', type: 'text' }
    ];
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
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10000,
      padding: '1rem'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        width: '95%',
        maxWidth: '1200px',
        maxHeight: '90vh',
        overflow: 'auto',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1.5rem',
          borderBottom: '2px solid var(--primary-color)',
          position: 'sticky',
          top: 0,
          backgroundColor: 'white',
          zIndex: 1
        }}>
          <h2 style={{
            fontSize: '1.75rem',
            fontWeight: '700',
            color: 'var(--primary-color)',
            margin: 0
          }}>
            ⚖️ Comparar Productos ({compareProducts.length})
          </h2>
          <div style={{ display: 'flex', gap: '1rem' }}>
            {compareProducts.length > 0 && (
              <button
                onClick={clearComparison}
                style={{
                  background: 'var(--danger-color)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.5rem 1rem',
                  fontSize: '0.875rem',
                  cursor: 'pointer'
                }}
              >
                🗑️ Limpiar Todo
              </button>
            )}
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
                cursor: 'pointer'
              }}
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '1.5rem' }}>
          {compareProducts.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '4rem 2rem',
              color: 'var(--text-secondary)'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⚖️</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
                No hay productos para comparar
              </h3>
              <p style={{ marginBottom: '2rem' }}>
                Agrega productos desde la página de productos para compararlos aquí
              </p>
              <Link
                to="/products"
                onClick={onClose}
                style={{
                  background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%)',
                  color: 'white',
                  textDecoration: 'none',
                  padding: '1rem 2rem',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  display: 'inline-block'
                }}
              >
                🛍️ Ir a Productos
              </Link>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                {/* Product Headers */}
                <thead>
                  <tr>
                    <th style={{
                      padding: '1rem',
                      textAlign: 'left',
                      borderBottom: '2px solid var(--border-color)',
                      minWidth: '200px',
                      position: 'sticky',
                      left: 0,
                      backgroundColor: 'white',
                      zIndex: 1
                    }}>
                      Característica
                    </th>
                    {compareProducts.map(product => (
                      <th key={product.id} style={{
                        padding: '1rem',
                        textAlign: 'center',
                        borderBottom: '2px solid var(--border-color)',
                        minWidth: '250px',
                        position: 'relative'
                      }}>
                        <button
                          onClick={() => removeFromCompare(product.id)}
                          style={{
                            position: 'absolute',
                            top: '0.5rem',
                            right: '0.5rem',
                            background: 'var(--danger-color)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '50%',
                            width: '24px',
                            height: '24px',
                            fontSize: '0.75rem',
                            cursor: 'pointer'
                          }}
                        >
                          ×
                        </button>
                        
                        <div style={{
                          width: '120px',
                          height: '120px',
                          margin: '0 auto 1rem',
                          borderRadius: '8px',
                          overflow: 'hidden',
                          backgroundColor: 'var(--light-gray)'
                        }}>
                          <img
                            src={product.images?.[0] || product.image || ''}
                            alt={product.name}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover'
                            }}
                          />
                        </div>
                        
                        <h4 style={{
                          fontSize: '0.875rem',
                          fontWeight: '600',
                          margin: '0 0 1rem 0',
                          lineHeight: 1.4
                        }}>
                          {product.name}
                        </h4>
                        
                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                          <button
                            onClick={() => addToCart(product)}
                            style={{
                              background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%)',
                              color: 'white',
                              border: 'none',
                              borderRadius: '8px',
                              padding: '0.5rem 1rem',
                              fontSize: '0.75rem',
                              cursor: 'pointer',
                              fontWeight: '600'
                            }}
                          >
                            🛒 Agregar
                          </button>
                          <Link
                            to={`/product/${product.id}`}
                            onClick={onClose}
                            style={{
                              background: 'var(--light-gray)',
                              color: 'var(--text-primary)',
                              textDecoration: 'none',
                              border: '1px solid var(--border-color)',
                              borderRadius: '8px',
                              padding: '0.5rem 1rem',
                              fontSize: '0.75rem',
                              fontWeight: '600'
                            }}
                          >
                            👁️ Ver
                          </Link>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                {/* Comparison Rows */}
                <tbody>
                  {getComparisonFeatures().map(feature => (
                    <tr key={feature.key}>
                      <td style={{
                        padding: '1rem',
                        fontWeight: '600',
                        borderBottom: '1px solid var(--border-color)',
                        backgroundColor: 'var(--light-gray)',
                        position: 'sticky',
                        left: 0,
                        zIndex: 1
                      }}>
                        {feature.label}
                      </td>
                      {compareProducts.map(product => (
                        <td key={product.id} style={{
                          padding: '1rem',
                          textAlign: 'center',
                          borderBottom: '1px solid var(--border-color)'
                        }}>
                          {feature.type === 'currency' && product[feature.key] ? (
                            <span style={{ 
                              fontWeight: '600',
                              color: feature.key === 'price' ? 'var(--primary-color)' : 'var(--text-secondary)'
                            }}>
                              ${product[feature.key].toLocaleString()}
                            </span>
                          ) : feature.type === 'rating' ? (
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                              {renderStars(product[feature.key] || 4.5)}
                              <span style={{ fontSize: '0.875rem' }}>
                                ({product[feature.key] || 4.5})
                              </span>
                            </div>
                          ) : feature.type === 'number' ? (
                            <span style={{ fontWeight: '600' }}>
                              {product[feature.key] || 0}
                            </span>
                          ) : (
                            <span style={{ textTransform: 'capitalize' }}>
                              {product[feature.key] || 'N/A'}
                            </span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Función helper para agregar productos a comparación
export const addToCompare = (product) => {
  try {
    const currentCompare = JSON.parse(localStorage.getItem('cleanpro_compare') || '[]');
    
    if (currentCompare.length >= 4) {
      if (window.showNotification) {
        window.showNotification('Máximo 4 productos para comparar', 'warning');
      }
      return false;
    }
    
    const existingItem = currentCompare.find(item => item.id === product.id);
    if (existingItem) {
      if (window.showNotification) {
        window.showNotification('Este producto ya está en comparación', 'info');
      }
      return false;
    }
    
    currentCompare.push(product);
    localStorage.setItem('cleanpro_compare', JSON.stringify(currentCompare));
    
    if (window.showNotification) {
      window.showNotification(`⚖️ ${product.name} agregado a comparación`, 'success');
    }
    
    return true;
  } catch (error) {
    console.error('Error adding to compare:', error);
    return false;
  }
};

export default ProductComparison;
