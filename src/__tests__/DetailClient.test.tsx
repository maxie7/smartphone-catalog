import { render, screen } from '@testing-library/react'
import DetailClient from '@/app/phones/[id]/DetailClient'
import { CartProvider } from '@/app/providers/CartProvider'

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
  }),
}))

describe('DetailClient', () => {
  it('displays phone details', () => {
    const mockPhone = {
      'id': 'GPX-8A',
      'brand': 'Google',
      'name': 'Pixel 8a',
      'description': 'Descubre Pixel 8a, creado por Google. Saca fotos magníficas con la Cámara Pixel. Haz más en menos tiempo con la IA de Google, como arreglar imágenes borrosas, filtrar llamadas y aprender cosas nuevas. Sus funciones de seguridad del más alto nivel ayudan a proteger tus datos. Y se ha diseñado para durar. Todo, a un precio excepcional.',
      'basePrice': 459,
      'rating': 4.7,
      'specs': {
        'screen': '6.1\' OLED Actua',
        'resolution': '2400 x 1080 pixels',
        'processor': 'Google Tensor G3',
        'mainCamera': '64 MP + 13 MP',
        'selfieCamera': '13 MP',
        'battery': '4492 mAh',
        'os': 'Android',
        'screenRefreshRate': '120 Hz'
      },
      'colorOptions': [
        {
          'name': 'Obsidiana',
          'hexCode': '#000000',
          'imageUrl': 'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/GPX-8A-obsidiana.webp'
        },
        {
          'name': 'Porcelana',
          'hexCode': '#F5F5F5',
          'imageUrl': 'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/GPX-8A-porcelana.webp'
        },
        {
          'name': 'Celeste',
          'hexCode': '#87CEEB',
          'imageUrl': 'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/GPX-8A-celeste.webp'
        }
      ],
      'storageOptions': [
        {
          'capacity': '128 GB',
          'price': 459
        },
        {
          'capacity': '256 GB',
          'price': 509
        }
      ],
      'similarProducts': [
        {
          'id': 'MTE-EDGE50PRO',
          'brand': 'Motorola',
          'name': 'edge 50 Pro',
          'basePrice': 649,
          'imageUrl': 'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/MTE-EDGE50PRO-negro.webp'
        },
        {
          'id': 'XIA-RN13',
          'brand': 'Xiaomi',
          'name': 'Redmi Note 13',
          'basePrice': 169,
          'imageUrl': 'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/XIA-RN13-mint-green.webp'
        },
        {
          'id': 'RLM-NOTE50',
          'brand': 'realme',
          'name': 'Note 50',
          'basePrice': 99,
          'imageUrl': 'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/RLM-NOTE50-midnight-black.webp'
        },
        {
          'id': 'SMG-S24U',
          'brand': 'Samsung',
          'name': 'Galaxy S24 Ultra',
          'basePrice': 1329,
          'imageUrl': 'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/SMG-S24U-titanium-violet.webp'
        },
        {
          'id': 'SMG-A25',
          'brand': 'Samsung',
          'name': 'Galaxy A25 5G',
          'basePrice': 239,
          'imageUrl': 'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/SMG-A25-negro.webp'
        },
        {
          'id': 'SMG-A15',
          'brand': 'Samsung',
          'name': 'Galaxy A15 LTE',
          'basePrice': 159,
          'imageUrl': 'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/SMG-A15-azul.webp'
        }
      ]
    }

    render(
      <CartProvider>
        <DetailClient phone={mockPhone} />
      </CartProvider>
    )

    expect(screen.getByRole('heading', { name: /google pixel 8a/i })).toBeInTheDocument()
    expect(screen.getByText(/from 459 eur/i)).toBeInTheDocument()
  })
})
