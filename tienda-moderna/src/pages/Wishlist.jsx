import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNotification } from '../context/NotificationContext';

const Wishlist = () => {
  const { showSuccess, showInfo, showError } = useNotification();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWishlistItems();
  }, []);

  const loadWishlistItems = () => {
    try {
      const savedWishlist = localStorage.getItem('cleanpro_wishlist');
      if (savedWishlist) {
        setWishlistItems(JSON.parse(savedWishlist));
      } else {
        // Datos de ejemplo si no hay wishlist
        setWishlistItems([
          {
            id: 1,
            name: "Detergente Premium CleanPro 1L",
            price: 15000,
            comparePrice: 18000,
            image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&h=400&fit=crop",
            rating: 4.8
          },
          {
            id: 2,
            name: "Desinfectante Multiusos Pro-Clean 500ml",
            price: 8500,
            comparePrice: 12000,
            image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop",
            rating: 4.9
          }
        ]);
      }
    } catch (error) {
      console.error('Error loading wishlist:', error);
      showError('Error al cargar la lista de deseos');
      setWishlistItems([]);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = (id) => {
    try {
      const updatedWishlist = wishlistItems.filter(item => item.id !== id);
      setWishlistItems(updatedWishlist);
      localStorage.setItem('cleanpro_wishlist', JSON.stringify(updatedWishlist));
      showInfo('Producto eliminado de la lista de deseos', 2000);
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      showError('Error al eliminar de la lista de deseos');
    }
  };

  const addToCart = (product) => {
    try {
      // Obtener carrito actual del localStorage
      const currentCart = JSON.parse(localStorage.getItem('cleanpro_cart') || '[]');

      // Verificar si el producto ya existe
      const existingItem = currentCart.find(item => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
        showInfo(`Cantidad actualizada: ${product.name}`, 2000);
      } else {
        currentCart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1
        });
        showSuccess(`✅ ${product.name} agregado al carrito`, 2500);
      }

      // Guardar en localStorage
      localStorage.setItem('cleanpro_cart', JSON.stringify(currentCart));

      // Disparar evento personalizado para actualizar el header
      window.dispatchEvent(new CustomEvent('cartUpdated', { detail: currentCart }));

      // Opcional: remover de wishlist después de agregar al carrito
      // removeFromWishlist(product.id);

    } catch (error) {
      console.error('Error adding to cart:', error);
      showError('Error al agregar al carrito');
    }
  };

  if (wishlistItems.length === 0) {
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
          <div className="container text-center">
            <div className="animate-fadeIn">
              <h1 style={{
                fontSize: '3.5rem',
                fontWeight: '900',
                marginBottom: '1.5rem',
                textShadow: '0 4px 8px rgba(0,0,0,0.3)'
              }}>
                ❤️ Lista de Deseos
              </h1>
              <p style={{
                fontSize: '1.5rem',
                opacity: 0.95,
                maxWidth: '600px',
                margin: '0 auto',
                lineHeight: 1.6
              }}>
                Tu lista está vacía
              </p>
            </div>
          </div>
        </section>

        {/* Empty State */}
        <section className="py-12" style={{ backgroundColor: 'var(--light-gray)' }}>
          <div className="container">
            <div className="text-center py-12">
              <div style={{ fontSize: '6rem', marginBottom: '2rem' }}>💔</div>
              <h2 className="text-2xl font-bold mb-4">Tu lista de deseos está vacía</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                ¡Agrega algunos productos que te gusten!
              </p>
              <Link
                to="/products"
                style={{
                  background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '1rem 2rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  textDecoration: 'none',
                  transition: 'var(--transition)',
                  boxShadow: '0 4px 15px rgba(0, 102, 255, 0.3)',
                  display: 'inline-block'
                }}
                className="hover-lift"
              >
                🛍️ Explorar Productos
              </Link>
            </div>
          </div>
        </section>
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
              ❤️ Lista de Deseos
            </h1>
            <p style={{
              fontSize: '1.5rem',
              opacity: 0.95,
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: 1.6
            }}>
              {wishlistItems.length} productos guardados para más tarde
            </p>
          </div>
        </div>
      </section>

      {/* Wishlist Section */}
      <section className="py-12" style={{ backgroundColor: 'var(--light-gray)' }}>
        <div className="container">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative">
                <img
                  src={product.image || '/images/products/default.jpg'}
                  alt={product.name}
                  className="w-full h-48 object-cover object-center"
                />
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors duration-200"
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2 line-clamp-2">
                  {product.name}
                </h3>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-gray-900">
                    ${product.price?.toLocaleString()}
                  </span>
                  {product.comparePrice && product.comparePrice > product.price && (
                    <span className="text-sm text-gray-500 line-through">
                      ${product.comparePrice.toLocaleString()}
                    </span>
                  )}
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Agregar</span>
                  </button>
                  
                  <Link
                    to={`/product/${product.id}`}
                    className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                  >
                    Ver
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

          <div className="text-center mt-12">
            <Link
              to="/products"
              style={{
                background: 'linear-gradient(135deg, var(--secondary-color) 0%, var(--dark-gray) 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: '1rem 2rem',
                fontSize: '1rem',
                fontWeight: '600',
                textDecoration: 'none',
                transition: 'var(--transition)',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                display: 'inline-block'
              }}
              className="hover-lift"
            >
              🔍 Seguir Explorando
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Wishlist;
