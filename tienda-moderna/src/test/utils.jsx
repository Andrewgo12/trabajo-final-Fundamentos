import React from 'react'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext'
import { CartProvider } from '../context/CartContext'
import { WishlistProvider } from '../context/WishlistContext'
import { Toaster } from 'react-hot-toast'

// Custom render function with all providers
export function renderWithProviders(ui, options = {}) {
  const {
    initialEntries = ['/'],
    ...renderOptions
  } = options

  function Wrapper({ children }) {
    return (
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              {children}
              <Toaster />
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    )
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions })
}

// Mock data for testing
export const mockUser = {
  id: '1',
  name: 'Test User',
  email: 'test@example.com',
  avatar: 'https://via.placeholder.com/150'
}

export const mockProduct = {
  id: '1',
  name: 'Producto Test',
  description: 'Descripción del producto test',
  price: 25000,
  originalPrice: 30000,
  image: 'https://via.placeholder.com/300',
  images: ['https://via.placeholder.com/300'],
  category: 'limpieza-general',
  brand: 'Test Brand',
  rating: 4.5,
  reviews: 150,
  inStock: true,
  stock: 50,
  features: ['Característica 1', 'Característica 2'],
  specifications: {
    'Peso': '500ml',
    'Tipo': 'Líquido'
  }
}

export const mockProducts = [
  mockProduct,
  {
    ...mockProduct,
    id: '2',
    name: 'Producto Test 2',
    price: 15000
  }
]

export const mockCartItem = {
  ...mockProduct,
  quantity: 2
}

export const mockOrder = {
  id: 'ORD-123',
  items: [mockCartItem],
  total: 50000,
  status: 'confirmed',
  createdAt: new Date().toISOString(),
  shippingAddress: {
    name: 'Test User',
    address: 'Test Address 123',
    city: 'Bogotá',
    phone: '123456789'
  }
}

// Custom matchers
export const customMatchers = {
  toBeInTheDocument: (received) => {
    const pass = received !== null
    return {
      message: () => `expected element ${pass ? 'not ' : ''}to be in the document`,
      pass,
    }
  }
}

// Test helpers
export const waitForLoadingToFinish = () => 
  new Promise(resolve => setTimeout(resolve, 100))

export const createMockIntersectionObserver = () => {
  const mockIntersectionObserver = vi.fn()
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null
  })
  window.IntersectionObserver = mockIntersectionObserver
  window.IntersectionObserverEntry = vi.fn()
}

// Re-export everything from testing-library
export * from '@testing-library/react'
export { default as userEvent } from '@testing-library/user-event'
