import { render, screen } from '@testing-library/react'
import CartPage from '@/app/cart/page'

const mockRemoveItem = jest.fn()

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
  }),
}))

const mockCartItems = [
  { id: 1, name: 'Phone A', price: 299, quantity: 2 },
  { id: 2, name: 'Phone B', price: 399, quantity: 1 },
]

jest.mock('@/app/providers/CartProvider', () => {
  const originalModule = jest.requireActual('@/app/providers/CartProvider')
  return {
    __esModule: true,
    ...originalModule,
    useCart: () => ({
      cart: mockCartItems,
      removeItem: mockRemoveItem,
    }),
  }
})

describe('CartPage', () => {
  it('renders the cart with items', () => {
    render(<CartPage />)

    expect(screen.getByText(/phone a/i)).toBeInTheDocument()
    expect(screen.getByText(/phone b/i)).toBeInTheDocument()
  })
})
