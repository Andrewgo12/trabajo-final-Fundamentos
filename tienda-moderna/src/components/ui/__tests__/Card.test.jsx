import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Card from '../Card'

describe('Card Component', () => {
  it('renders card with content', () => {
    render(
      <Card>
        <div>Card content</div>
      </Card>
    )
    expect(screen.getByText('Card content')).toBeInTheDocument()
  })

  it('applies default card classes', () => {
    render(<Card data-testid="card">Content</Card>)
    const card = screen.getByTestId('card')
    expect(card).toHaveClass('card')
  })

  it('applies hover effect when hover prop is true', () => {
    render(<Card hover data-testid="card">Content</Card>)
    const card = screen.getByTestId('card')
    expect(card).toHaveClass('card-hover')
  })

  it('applies custom className', () => {
    render(<Card className="custom-class" data-testid="card">Content</Card>)
    const card = screen.getByTestId('card')
    expect(card).toHaveClass('custom-class')
  })

  it('handles click events', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()
    
    render(<Card onClick={handleClick} data-testid="card">Content</Card>)
    
    await user.click(screen.getByTestId('card'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('renders card header when provided', () => {
    render(
      <Card>
        <div className="card-header">Header</div>
        <div className="card-content">Content</div>
      </Card>
    )
    expect(screen.getByText('Header')).toBeInTheDocument()
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('renders card footer when provided', () => {
    render(
      <Card>
        <div className="card-content">Content</div>
        <div className="card-footer">Footer</div>
      </Card>
    )
    expect(screen.getByText('Content')).toBeInTheDocument()
    expect(screen.getByText('Footer')).toBeInTheDocument()
  })

  it('forwards ref correctly', () => {
    const ref = vi.fn()
    render(<Card ref={ref}>Content</Card>)
    expect(ref).toHaveBeenCalled()
  })

  it('applies padding variant', () => {
    render(<Card padding="lg" data-testid="card">Content</Card>)
    const card = screen.getByTestId('card')
    expect(card).toHaveClass('card-padding-lg')
  })

  it('applies shadow variant', () => {
    render(<Card shadow="lg" data-testid="card">Content</Card>)
    const card = screen.getByTestId('card')
    expect(card).toHaveClass('card-shadow-lg')
  })

  it('renders as different HTML element when as prop is provided', () => {
    render(<Card as="section" data-testid="card">Content</Card>)
    const card = screen.getByTestId('card')
    expect(card.tagName).toBe('SECTION')
  })

  it('supports keyboard navigation when clickable', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()
    
    render(<Card onClick={handleClick} data-testid="card">Content</Card>)
    const card = screen.getByTestId('card')
    
    card.focus()
    await user.keyboard('{Enter}')
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
