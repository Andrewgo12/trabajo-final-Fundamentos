import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders, mockProducts } from '../../test/utils'
import Home from '../Home'

// Mock the hooks
vi.mock('../../hooks/useProducts', () => ({
  useFeaturedProducts: () => ({
    products: mockProducts,
    loading: false,
    error: null
  })
}))

describe('Home Page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders home page with hero section', async () => {
    renderWithProviders(<Home />)
    
    await waitFor(() => {
      expect(screen.getByText(/productos de limpieza/i)).toBeInTheDocument()
    })
  })

  it('displays featured products section', async () => {
    renderWithProviders(<Home />)
    
    await waitFor(() => {
      expect(screen.getByText(/productos destacados/i)).toBeInTheDocument()
    })
  })

  it('shows features section with benefits', async () => {
    renderWithProviders(<Home />)
    
    await waitFor(() => {
      expect(screen.getByText(/envío gratis/i)).toBeInTheDocument()
      expect(screen.getByText(/garantía/i)).toBeInTheDocument()
    })
  })

  it('displays categories section', async () => {
    renderWithProviders(<Home />)
    
    await waitFor(() => {
      expect(screen.getByText(/explora nuestras categorías/i)).toBeInTheDocument()
    })
  })

  it('shows testimonials section', async () => {
    renderWithProviders(<Home />)
    
    await waitFor(() => {
      expect(screen.getByText(/lo que dicen nuestros clientes/i)).toBeInTheDocument()
    })
  })

  it('renders interactive components demo section', async () => {
    renderWithProviders(<Home />)
    
    await waitFor(() => {
      expect(screen.getByText(/experiencia interactiva/i)).toBeInTheDocument()
    })
  })

  it('handles search functionality', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Home />)
    
    await waitFor(() => {
      const searchInput = screen.getByPlaceholderText(/busca productos/i)
      expect(searchInput).toBeInTheDocument()
    })
  })

  it('opens modal when clicking special offers button', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Home />)
    
    await waitFor(async () => {
      const button = screen.getByText(/ver ofertas especiales/i)
      await user.click(button)
      expect(screen.getByText(/ofertas especiales/i)).toBeInTheDocument()
    })
  })

  it('displays progress bars in demo section', async () => {
    renderWithProviders(<Home />)
    
    await waitFor(() => {
      expect(screen.getByText(/tu progreso hacia envío gratis/i)).toBeInTheDocument()
    })
  })

  it('shows rating component in demo section', async () => {
    renderWithProviders(<Home />)
    
    await waitFor(() => {
      expect(screen.getByText(/califica tu experiencia/i)).toBeInTheDocument()
    })
  })

  it('renders accordion with FAQ', async () => {
    renderWithProviders(<Home />)
    
    await waitFor(() => {
      expect(screen.getByText(/¿cómo funciona el envío?/i)).toBeInTheDocument()
    })
  })

  it('displays tabs for navigation', async () => {
    renderWithProviders(<Home />)
    
    await waitFor(() => {
      expect(screen.getByText(/destacados/i)).toBeInTheDocument()
      expect(screen.getByText(/nuevos/i)).toBeInTheDocument()
    })
  })

  it('shows CTA buttons with proper links', async () => {
    renderWithProviders(<Home />)
    
    await waitFor(() => {
      const shopButton = screen.getByRole('link', { name: /comprar ahora/i })
      expect(shopButton).toHaveAttribute('href', '/products')
    })
  })
})
