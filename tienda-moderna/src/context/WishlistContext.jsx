import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useToast } from '../components/ui/Toast';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

// Wishlist reducer
const wishlistReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_WISHLIST':
      return {
        ...state,
        items: action.payload,
        loading: false,
      };

    case 'ADD_ITEM':
      // Check if item already exists
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return state; // Item already in wishlist
      }

      return {
        ...state,
        items: [...state.items, { ...action.payload, addedAt: Date.now() }],
      };

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };

    case 'CLEAR_WISHLIST':
      return {
        ...state,
        items: [],
      };

    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };

    case 'MOVE_TO_CART':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };

    case 'UPDATE_ITEM':
      return {
        ...state,
        items: state.items.map(item => 
          item.id === action.payload.id 
            ? { ...item, ...action.payload.updates }
            : item
        ),
      };

    default:
      return state;
  }
};

const initialState = {
  items: [],
  loading: true,
};

export const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);
  const { isAuthenticated, user } = useAuth();
  const toast = useToast();

  // Load wishlist from localStorage on mount
  useEffect(() => {
    try {
      if (isAuthenticated && user) {
        const savedWishlist = localStorage.getItem(`wishlist_${user.id}`);
        if (savedWishlist) {
          const parsedWishlist = JSON.parse(savedWishlist);
          dispatch({ type: 'LOAD_WISHLIST', payload: parsedWishlist });
        } else {
          dispatch({ type: 'LOAD_WISHLIST', payload: [] });
        }
      } else {
        // For non-authenticated users, use general wishlist
        const savedWishlist = localStorage.getItem('wishlist_guest');
        if (savedWishlist) {
          const parsedWishlist = JSON.parse(savedWishlist);
          dispatch({ type: 'LOAD_WISHLIST', payload: parsedWishlist });
        } else {
          dispatch({ type: 'LOAD_WISHLIST', payload: [] });
        }
      }
    } catch (error) {
      console.error('Error loading wishlist:', error);
      dispatch({ type: 'LOAD_WISHLIST', payload: [] });
    }
  }, [isAuthenticated, user]);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (!state.loading) {
      try {
        const key = isAuthenticated && user 
          ? `wishlist_${user.id}` 
          : 'wishlist_guest';
        localStorage.setItem(key, JSON.stringify(state.items));
      } catch (error) {
        console.error('Error saving wishlist:', error);
      }
    }
  }, [state.items, state.loading, isAuthenticated, user]);

  // Clear wishlist when user logs out
  useEffect(() => {
    if (!isAuthenticated) {
      // Optionally clear wishlist on logout
      // dispatch({ type: 'CLEAR_WISHLIST' });
    }
  }, [isAuthenticated]);

  // Wishlist actions
  const addToWishlist = (product) => {
    try {
      if (isInWishlist(product.id)) {
        toast.warning(`${product.name} ya está en tu lista de deseos`);
        return;
      }

      dispatch({ type: 'ADD_ITEM', payload: product });
      toast.success(`${product.name} agregado a favoritos`, {
        action: {
          label: 'Ver lista',
          onClick: () => {
            window.location.href = '/wishlist';
          }
        }
      });
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      toast.error('Error al agregar a favoritos');
    }
  };

  const removeFromWishlist = (productId) => {
    try {
      const item = state.items.find(item => item.id === productId);
      dispatch({ type: 'REMOVE_ITEM', payload: productId });
      
      if (item) {
        toast.success(`${item.name} eliminado de favoritos`);
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      toast.error('Error al eliminar de favoritos');
    }
  };

  const clearWishlist = () => {
    try {
      dispatch({ type: 'CLEAR_WISHLIST' });
      toast.success('Lista de deseos vaciada');
    } catch (error) {
      console.error('Error clearing wishlist:', error);
      toast.error('Error al vaciar la lista de deseos');
    }
  };

  const moveToCart = (productId, addToCartFn) => {
    try {
      const item = state.items.find(item => item.id === productId);
      if (!item) return;

      // Add to cart
      if (addToCartFn) {
        addToCartFn(item);
      }

      // Remove from wishlist
      dispatch({ type: 'MOVE_TO_CART', payload: productId });
      
      toast.success(`${item.name} movido al carrito`);
    } catch (error) {
      console.error('Error moving to cart:', error);
      toast.error('Error al mover al carrito');
    }
  };

  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const updateWishlistItem = (productId, updates) => {
    try {
      dispatch({ 
        type: 'UPDATE_ITEM', 
        payload: { id: productId, updates } 
      });
    } catch (error) {
      console.error('Error updating wishlist item:', error);
      toast.error('Error al actualizar el producto');
    }
  };

  // Utility functions
  const isInWishlist = (productId) => {
    return state.items.some(item => item.id === productId);
  };

  const getWishlistCount = () => {
    return state.items.length;
  };

  const getWishlistTotal = () => {
    return state.items.reduce((total, item) => {
      const price = item.price || 0;
      return total + price;
    }, 0);
  };

  const getRecentlyAdded = (limit = 5) => {
    return [...state.items]
      .sort((a, b) => (b.addedAt || 0) - (a.addedAt || 0))
      .slice(0, limit);
  };

  const getWishlistByCategory = () => {
    const categories = {};
    
    state.items.forEach(item => {
      const category = item.category || 'other';
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(item);
    });

    return categories;
  };

  const getAvailableItems = () => {
    return state.items.filter(item => {
      const stock = item.stock || 0;
      return stock > 0 && !item.discontinued;
    });
  };

  const getUnavailableItems = () => {
    return state.items.filter(item => {
      const stock = item.stock || 0;
      return stock <= 0 || item.discontinued;
    });
  };

  const getPriceDropItems = () => {
    // Items where current price is lower than when added
    return state.items.filter(item => {
      const originalPrice = item.originalPriceWhenAdded || item.price;
      const currentPrice = item.price || 0;
      return currentPrice < originalPrice;
    });
  };

  const getBackInStockItems = () => {
    // Items that were out of stock but are now available
    return state.items.filter(item => {
      const wasOutOfStock = item.wasOutOfStock || false;
      const currentStock = item.stock || 0;
      return wasOutOfStock && currentStock > 0;
    });
  };

  const shareWishlist = async () => {
    try {
      const wishlistUrl = `${window.location.origin}/wishlist/shared/${user?.id}`;
      
      if (navigator.share) {
        await navigator.share({
          title: 'Mi Lista de Deseos - Tienda Moderna',
          text: `Mira mi lista de deseos con ${state.items.length} productos`,
          url: wishlistUrl
        });
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(wishlistUrl);
        toast.success('Enlace de lista de deseos copiado al portapapeles');
      }
    } catch (error) {
      console.error('Error sharing wishlist:', error);
      toast.error('Error al compartir la lista de deseos');
    }
  };

  const exportWishlist = () => {
    try {
      const dataToExport = {
        items: state.items,
        exportDate: new Date().toISOString(),
        user: user?.name || 'Usuario',
        totalItems: state.items.length,
        totalValue: getWishlistTotal()
      };
      
      const blob = new Blob([JSON.stringify(dataToExport, null, 2)], {
        type: 'application/json'
      });
      
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `wishlist-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast.success('Lista de deseos exportada correctamente');
    } catch (error) {
      console.error('Error exporting wishlist:', error);
      toast.error('Error al exportar la lista de deseos');
    }
  };

  const value = {
    // State
    items: state.items,
    loading: state.loading,

    // Actions
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    moveToCart,
    toggleWishlist,
    updateWishlistItem,

    // Utilities
    isInWishlist,
    getWishlistCount,
    getWishlistTotal,
    getRecentlyAdded,
    getWishlistByCategory,
    getAvailableItems,
    getUnavailableItems,
    getPriceDropItems,
    getBackInStockItems,
    shareWishlist,
    exportWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistContext;
