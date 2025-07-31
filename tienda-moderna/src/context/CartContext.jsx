import React, { createContext, useContext, useReducer, useEffect } from 'react';
import toast from 'react-hot-toast';
import { api } from '../services/apiClient';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Cart reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_CART':
      return {
        ...state,
        items: action.payload,
        loading: false,
      };

    case 'ADD_ITEM':
      const existingItemIndex = state.items.findIndex(
        item => item.id === action.payload.id && 
        item.selectedVariant?.id === action.payload.selectedVariant?.id
      );

      if (existingItemIndex >= 0) {
        // Update existing item quantity
        const updatedItems = state.items.map((item, index) => {
          if (index === existingItemIndex) {
            return {
              ...item,
              quantity: item.quantity + action.payload.quantity,
            };
          }
          return item;
        });

        return {
          ...state,
          items: updatedItems,
        };
      } else {
        // Add new item
        return {
          ...state,
          items: [...state.items, { ...action.payload, addedAt: Date.now() }],
        };
      }

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => 
          !(item.id === action.payload.id && 
            item.selectedVariant?.id === action.payload.variantId)
        ),
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item => {
          if (item.id === action.payload.id && 
              item.selectedVariant?.id === action.payload.variantId) {
            return {
              ...item,
              quantity: Math.max(1, action.payload.quantity),
            };
          }
          return item;
        }),
      };

    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
      };

    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };

    case 'APPLY_COUPON':
      return {
        ...state,
        coupon: action.payload,
      };

    case 'REMOVE_COUPON':
      return {
        ...state,
        coupon: null,
      };

    case 'SET_SHIPPING':
      return {
        ...state,
        shipping: action.payload,
      };

    default:
      return state;
  }
};

const initialState = {
  items: [],
  loading: true,
  coupon: null,
  shipping: null,
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: parsedCart });
      } else {
        dispatch({ type: 'LOAD_CART', payload: [] });
      }
    } catch (error) {
      console.error('Error loading cart:', error);
      dispatch({ type: 'LOAD_CART', payload: [] });
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!state.loading) {
      try {
        localStorage.setItem('cart', JSON.stringify(state.items));
      } catch (error) {
        console.error('Error saving cart:', error);
      }
    }
  }, [state.items, state.loading]);

  // Cart actions
  const addToCart = (product) => {
    try {
      dispatch({ type: 'ADD_ITEM', payload: product });
      toast.success(`${product.name} agregado al carrito`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Error al agregar el producto al carrito');
    }
  };

  const removeFromCart = (productId, variantId = null) => {
    try {
      const item = state.items.find(item => 
        item.id === productId && item.selectedVariant?.id === variantId
      );
      
      dispatch({ type: 'REMOVE_ITEM', payload: { id: productId, variantId } });
      
      if (item) {
        toast.success(`${item.name} eliminado del carrito`);
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast.error('Error al eliminar el producto del carrito');
    }
  };

  const updateQuantity = (productId, quantity, variantId = null) => {
    try {
      if (quantity <= 0) {
        removeFromCart(productId, variantId);
        return;
      }

      dispatch({ 
        type: 'UPDATE_QUANTITY', 
        payload: { id: productId, quantity, variantId } 
      });
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast.error('Error al actualizar la cantidad');
    }
  };

  const clearCart = () => {
    try {
      dispatch({ type: 'CLEAR_CART' });
      toast.success('Carrito vaciado');
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error('Error al vaciar el carrito');
    }
  };

  const applyCoupon = (coupon) => {
    try {
      dispatch({ type: 'APPLY_COUPON', payload: coupon });
      toast.success(`Cupón "${coupon.code}" aplicado correctamente`);
    } catch (error) {
      console.error('Error applying coupon:', error);
      toast.error('Error al aplicar el cupón');
    }
  };

  const removeCoupon = () => {
    try {
      dispatch({ type: 'REMOVE_COUPON' });
      toast.success('Cupón removido');
    } catch (error) {
      console.error('Error removing coupon:', error);
      toast.error('Error al remover el cupón');
    }
  };

  const setShipping = (shipping) => {
    dispatch({ type: 'SET_SHIPPING', payload: shipping });
  };

  // Utility functions
  const isInCart = (productId, variantId = null) => {
    return state.items.some(item => 
      item.id === productId && item.selectedVariant?.id === variantId
    );
  };

  const getItemQuantity = (productId, variantId = null) => {
    const item = state.items.find(item => 
      item.id === productId && item.selectedVariant?.id === variantId
    );
    return item ? item.quantity : 0;
  };

  const getCartTotal = () => {
    const subtotal = state.items.reduce((total, item) => {
      const price = item.selectedVariant?.price || item.price;
      return total + (price * item.quantity);
    }, 0);

    let discount = 0;
    if (state.coupon) {
      if (state.coupon.type === 'percentage') {
        discount = subtotal * (state.coupon.value / 100);
      } else if (state.coupon.type === 'fixed') {
        discount = state.coupon.value;
      }
    }

    const shippingCost = state.shipping?.cost || 0;
    const total = Math.max(0, subtotal - discount + shippingCost);

    return {
      subtotal,
      discount,
      shipping: shippingCost,
      total,
      itemCount: state.items.reduce((count, item) => count + item.quantity, 0),
    };
  };

  const getCartWeight = () => {
    return state.items.reduce((weight, item) => {
      const itemWeight = item.weight || 0;
      return weight + (itemWeight * item.quantity);
    }, 0);
  };

  const hasMinimumForFreeShipping = (minimum = 50000) => {
    const { subtotal } = getCartTotal();
    return subtotal >= minimum;
  };

  const getRecommendedProducts = () => {
    // Get categories from cart items
    const categories = [...new Set(state.items.map(item => item.category))];
    
    // This would typically fetch from an API
    // For now, return empty array
    return [];
  };

  const validateCart = () => {
    const errors = [];
    
    state.items.forEach(item => {
      // Check stock availability
      const availableStock = item.selectedVariant?.stock || item.stock || 0;
      if (item.quantity > availableStock) {
        errors.push({
          type: 'stock',
          message: `${item.name} solo tiene ${availableStock} unidades disponibles`,
          item
        });
      }

      // Check if product is still active
      if (item.discontinued) {
        errors.push({
          type: 'discontinued',
          message: `${item.name} ya no está disponible`,
          item
        });
      }
    });

    return errors;
  };

  const value = {
    // State
    items: state.items,
    loading: state.loading,
    coupon: state.coupon,
    shipping: state.shipping,

    // Actions
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    applyCoupon,
    removeCoupon,
    setShipping,

    // Utilities
    isInCart,
    getItemQuantity,
    getCartTotal,
    getCartWeight,
    hasMinimumForFreeShipping,
    getRecommendedProducts,
    validateCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
