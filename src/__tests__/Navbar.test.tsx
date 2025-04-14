import { render, screen } from '@testing-library/react'
import Navbar from '@/app/components/Navbar'
import { CartProvider } from '@/app/providers/CartProvider'

describe('Navbar', () => {
  it('renders the MBST logo alt text', () => {
    render(
      <CartProvider>
        <Navbar />
      </CartProvider>
    )
    expect(screen.getByAltText('MBST')).toBeInTheDocument()
  })

  it('renders the Cart icon alt text', () => {
    render(
      <CartProvider>
        <Navbar />
      </CartProvider>
    )
    expect(screen.getByAltText('Cart')).toBeInTheDocument()
  })

  it('has a link to the cart page', () => {
    render(
      <CartProvider>
        <Navbar />
      </CartProvider>
    )
    const link = screen.getByRole('link', { name: /cart/i })
    expect(link).toHaveAttribute('href', '/cart')
  })
})
