import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Store principal de la aplicación
export const useStore = create(
  persist(
    (set, get) => ({
      // Estado del usuario
      user: null,
      isAuthenticated: false,
      
      // Estado del carrito
      cart: [],
      cartOpen: false,

      // Estado de la UI
      sidebarOpen: false,
      loading: false,
      error: null,
      
      // Lista de deseos
      wishlist: [],
      
      // Historial de pedidos
      orders: [],
      
      // Acciones de autenticación
      login: (userData) => set({ 
        user: userData, 
        isAuthenticated: true 
      }),
      
      logout: () => set({ 
        user: null, 
        isAuthenticated: false,
        cart: [],
        wishlist: [],
        orders: []
      }),
      
      updateUser: (userData) => set((state) => ({
        user: { ...state.user, ...userData }
      })),
      
      // Acciones del carrito
      addToCart: (product, quantity = 1) => set((state) => {
        const existingItem = state.cart.find(item => item.id === product.id);
        
        if (existingItem) {
          return {
            cart: state.cart.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          };
        }
        
        return {
          cart: [...state.cart, { ...product, quantity }]
        };
      }),
      
      removeFromCart: (productId) => set((state) => ({
        cart: state.cart.filter(item => item.id !== productId)
      })),
      
      updateCartQuantity: (productId, quantity) => set((state) => ({
        cart: state.cart.map(item =>
          item.id === productId
            ? { ...item, quantity: Math.max(0, quantity) }
            : item
        ).filter(item => item.quantity > 0)
      })),
      
      clearCart: () => set({ cart: [] }),
      
      toggleCart: () => set((state) => ({ cartOpen: !state.cartOpen })),

      closeCart: () => set({ cartOpen: false }),

      // Acciones del sidebar
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

      openSidebar: () => set({ sidebarOpen: true }),

      closeSidebar: () => set({ sidebarOpen: false }),
      
      // Getters del carrito
      getCartTotal: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
      },
      
      getCartItemsCount: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      },
      
      // Acciones de lista de deseos
      addToWishlist: (product) => set((state) => {
        const exists = state.wishlist.find(item => item.id === product.id);
        if (!exists) {
          return { wishlist: [...state.wishlist, product] };
        }
        return state;
      }),
      
      removeFromWishlist: (productId) => set((state) => ({
        wishlist: state.wishlist.filter(item => item.id !== productId)
      })),
      
      isInWishlist: (productId) => {
        const { wishlist } = get();
        return wishlist.some(item => item.id === productId);
      },
      
      // Acciones de pedidos
      addOrder: (order) => set((state) => ({
        orders: [order, ...state.orders]
      })),
      
      updateOrderStatus: (orderId, status) => set((state) => ({
        orders: state.orders.map(order =>
          order.id === orderId
            ? { ...order, status }
            : order
        )
      })),
      
      // Acciones de UI
      setLoading: (loading) => set({ loading }),
      
      setError: (error) => set({ error }),
      
      clearError: () => set({ error: null }),
    }),
    {
      name: 'tienda-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        cart: state.cart,
        wishlist: state.wishlist,
        orders: state.orders,
      }),
    }
  )
);

// Store para filtros de productos
export const useFiltersStore = create((set) => ({
  filters: {
    category: '',
    priceRange: [0, 200000],
    brand: '',
    rating: 0,
    sortBy: 'name',
    sortOrder: 'asc',
  },
  
  searchQuery: '',
  
  setFilter: (key, value) => set((state) => ({
    filters: { ...state.filters, [key]: value }
  })),
  
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  clearFilters: () => set({
    filters: {
      category: '',
      priceRange: [0, 200000],
      brand: '',
      rating: 0,
      sortBy: 'name',
      sortOrder: 'asc',
    },
    searchQuery: '',
  }),
}));
