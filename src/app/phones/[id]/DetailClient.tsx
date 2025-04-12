'use client'

import { useState } from 'react'
import { useCart } from '@/app/providers/CartProvider'

interface ColorOption {
  name: string
  hexCode: string
  imageUrl: string
}

interface StorageOption {
  capacity: string
  price: number
}

interface SimilarProduct {
  id: string
  brand: string
  name: string
  basePrice: number
  imageUrl: string
}

interface PhoneDetail {
  id: string
  brand: string
  name: string
  basePrice: number
  imageUrl: string
  description: string
  rating: number
  specs: {
    screen: string
    resolution: string
    processor: string
    mainCamera: string
    selfieCamera: string
    battery: string
    os: string
    screenRefreshRate: string
  }
  colorOptions: ColorOption[]
  storageOptions: StorageOption[]
  similarProducts: SimilarProduct[]
}

interface DetailClientProps {
  phone: PhoneDetail
}

export default function DetailClient({ phone }: DetailClientProps) {
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedStorage, setSelectedStorage] = useState('')
  const cart = useCart()

  const handleAddToCart = () => {
    if (!selectedColor || !selectedStorage) return

    let price = phone.basePrice
    const storageOption = phone.storageOptions.find(
      (opt) => opt.capacity === selectedStorage
    )
    if (storageOption) {
      price = storageOption.price
    }

    cart.addItem({
      id: `${phone.id}-${selectedColor}-${selectedStorage}`,
      brand: phone.brand,
      name: phone.name,
      price,
      color: selectedColor,
      storage: selectedStorage,
      imageUrl:
        phone.colorOptions.find((opt) => opt.name === selectedColor)?.imageUrl
        || phone.imageUrl,
      quantity: 1
    })
  }

  return (
    <div>
      {/* Large image */}
      <img
        src={
          phone.colorOptions.find((opt) => opt.name === selectedColor)?.imageUrl
          || phone.imageUrl
        }
        alt={`${phone.brand} - ${phone.name}`}
        className='mb-4 w-64'
      />

      {/* Color Picker */}
      <div className='flex space-x-2 mb-4'>
        {phone.colorOptions.map((color) => (
          <button
            key={color.name}
            className={`border p-2 ${
              selectedColor === color.name ? 'font-bold' : ''
            }`}
            onClick={() => setSelectedColor(color.name)}
          >
            {color.name}
          </button>
        ))}
      </div>

      {/* Storage Picker */}
      <div className='flex space-x-2 mb-4'>
        {phone.storageOptions.map((storage) => (
          <button
            key={storage.capacity}
            className={`border p-2 ${
              selectedStorage === storage.capacity ? 'font-bold' : ''
            }`}
            onClick={() => setSelectedStorage(storage.capacity)}
          >
            {storage.capacity}
          </button>
        ))}
      </div>

      {/* Price display */}
      <p className='mb-4'>
        Price:{' '}
        {selectedStorage
          ? phone.storageOptions.find((s) => s.capacity === selectedStorage)?.price
          : phone.basePrice}
        $
      </p>

      {/* Add to Cart button */}
      <button
        className='bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400'
        onClick={handleAddToCart}
        disabled={!selectedColor || !selectedStorage}
      >
        Add to Cart
      </button>

      {/* Similar Products */}
      <div className='mt-8'>
        <h2 className='text-lg font-semibold mb-2'>Similar Products</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {phone.similarProducts.map((sp) => (
            <div key={sp.id} className='border p-2 rounded'>
              <img src={sp.imageUrl} alt={sp.name} />
              <p>
                {sp.brand} - {sp.name}
              </p>
              <p>${sp.basePrice}</p>
              <a
                href={`/phones/${sp.id}`}
                className='text-blue-500 underline'
              >
                View
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
