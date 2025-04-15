import { render, screen } from '@testing-library/react'
import PhoneListClient from '@/app/phones/PhoneListClient'

describe('PhoneListClient', () => {
  it('renders a list of phones with correct data', () => {
    const mockPhones = [
      {
        id: 'SMG-S24U',
        brand: 'Samsung',
        name: 'Galaxy S24 Ultra',
        basePrice: 1329,
        imageUrl: 'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/GPX-8A-obsidiana.webp',
      },
      {
        id: 'SMG-A25',
        brand: 'Samsung',
        name: 'Galaxy A25 5G',
        basePrice: 239,
        imageUrl: 'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/GPX-8A-obsidiana.webp',
      },
    ]

    render(<PhoneListClient initialPhones={mockPhones} />)

    expect(screen.getByText(/galaxy s24 ultra/i)).toBeInTheDocument()
    expect(screen.getByText('1329 EUR')).toBeInTheDocument()

    expect(screen.getByText(/galaxy a25 5g/i)).toBeInTheDocument()
    expect(screen.getByText('239 EUR')).toBeInTheDocument()

    expect(screen.getByText(/2 results/i)).toBeInTheDocument()
  });
});
