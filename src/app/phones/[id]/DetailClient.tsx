'use client'

import { useRouter } from 'next/navigation'
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
  description: string
  basePrice: number
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
  const router = useRouter()
  const cart = useCart()

  const [selectedColor, setSelectedColor] = useState<string>(phone.colorOptions[0]?.name || '')
  const [selectedStorage, setSelectedStorage] = useState<string>('')

  const activeStorage = phone.storageOptions.find((s) => s.capacity === selectedStorage)
  const currentPrice = activeStorage ? activeStorage.price : phone.basePrice

  // Price label logic
  const priceLabel = selectedStorage
    ? `${currentPrice} EUR`
    : `From ${phone.basePrice} EUR`

  const matchedColor = phone.colorOptions.find((c) => c.name === selectedColor)
  const phoneImage = matchedColor?.imageUrl || phone.colorOptions[0]?.imageUrl || ''

  function handleAddToCart() {
    if (!selectedStorage || !selectedColor) return
    cart.addItem({
      id: `${phone.id}-${selectedColor}-${selectedStorage}`,
      brand: phone.brand,
      name: phone.name,
      price: currentPrice,
      color: selectedColor,
      storage: selectedStorage,
      imageUrl: phoneImage,
      quantity: 1
    })
  }

  return (
    <div className='flex flex-col gap-6'>
      {/* BACK BUTTON */}
      <div>
        <button
          onClick={() => router.back()}
          className='text-gray-500 hover:text-gray-800 inline-flex items-center gap-1 cursor-pointer'
        >
          <span className='uppercase'>&lt;&nbsp;&nbsp;Back</span>
        </button>
      </div>

      {/* MAIN CONTENT: 2-column on desktop, 1-column on mobile */}
      <div className='flex flex-col md:flex-row gap-8'>
        {/* LEFT COLUMN: phone image */}
        <div className='flex-1 flex items-center justify-center'>
          <img
            src={phoneImage}
            alt={`${phone.brand} - ${phone.name}`}
            className='w-auto max-h-[500px] object-contain'
          />
        </div>

        {/* RIGHT COLUMN: brand, name, price, color pickers, storage pickers, add to cart */}
        <div className='flex-1 max-w-md'>
          <h1 className='text-3xl font-medium mb-2'>
            {phone.brand} {phone.name}
          </h1>
          <p className='text-lg text-gray-600 mb-4'>{priceLabel}</p>

          {/* STORAGE OPTIONS */}
          <div className='mb-6'>
            <h2 className='text-sm text-gray-600 font-normal mb-2'>
              STORAGE – HOW MUCH SPACE DO YOU NEED?
            </h2>
            <div className='flex gap-2'>
              {phone.storageOptions.map((st) => (
                <button
                  key={st.capacity}
                  onClick={() => setSelectedStorage(st.capacity)}
                  className={`px-6 py-3 border cursor-pointer ${
                    selectedStorage === st.capacity
                      ? 'border-black font-semibold'
                      : 'border-gray-300'
                  }`}
                >
                  {st.capacity}
                </button>
              ))}
            </div>
          </div>

          {/* COLOR OPTIONS */}
          <div className='mb-4'>
            <h2 className='text-sm text-gray-600 font-normal mb-2'>
              COLOR – PICK YOUR FAVOURITE
            </h2>
            <div className='flex gap-2 mb-2'>
              {phone.colorOptions.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c.name)}
                  style={{ backgroundColor: c.hexCode }}
                  className={`w-8 h-8 border cursor-pointer ${
                    selectedColor === c.name ? 'border-black' : 'border-gray-300'
                  }`}
                />
              ))}
            </div>
            {selectedColor && <p className='text-sm text-gray-600'>{selectedColor}</p>}
          </div>

          {/* ADD TO CART BUTTON */}
          <div className='mb-6'>
            <button
              onClick={handleAddToCart}
              disabled={!selectedStorage || !selectedColor}
              className='bg-black text-white text-sm px-12 py-4 disabled:bg-gray-100 disabled:text-gray-300 cursor-pointer disabled:cursor-not-allowed'
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>

      {/* SPECIFICATIONS */}
      <section className='mt-8'>
        <h2 className='text-xl font-medium mb-4'>SPECIFICATIONS</h2>
        <div className='space-y-1'>
          <SpecRow label='BRAND' value={phone.brand} />
          <SpecRow label='NAME' value={phone.name} />
          <SpecRow label='DESCRIPTION' value={phone.description} />
          <SpecRow label='SCREEN' value={phone.specs.screen} />
          <SpecRow label='RESOLUTION' value={phone.specs.resolution} />
          <SpecRow label='PROCESSOR' value={phone.specs.processor} />
          <SpecRow label='MAIN CAMERA' value={phone.specs.mainCamera} />
          <SpecRow label='SELFIE CAMERA' value={phone.specs.selfieCamera} />
          <SpecRow label='BATTERY' value={phone.specs.battery} />
          <SpecRow label='OS' value={phone.specs.os} />
          <SpecRow label='SCREEN REFRESH RATE' value={phone.specs.screenRefreshRate} />
        </div>
      </section>

      {/* SIMILAR PRODUCTS */}
      <section className='mt-8'>
        <h2 className='text-xl font-medium mb-4'>SIMILAR ITEMS</h2>
        <SimilarItems products={phone.similarProducts} />
      </section>
    </div>
  )
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className='flex items-start justify-between border-t border-gray-300 py-2'>
      <div className='text-sm font-normal w-1/4 uppercase'>{label}</div>
      <div className='text-sm flex-1 ml-4'>{value}</div>
    </div>
  )
}

function SimilarItems({ products }: { products: SimilarProduct[] }) {
  const router = useRouter()

  return (
    <div className='overflow-x-auto'>
      <div className='flex gap-4'>
        {products.map((p) => (
          <div
            key={p.id}
            onClick={() => router.push(`/phones/${p.id}`)}
            className='min-w-[200px] p-2 hover:bg-gray-50 cursor-pointer'
          >
            <img src={p.imageUrl} alt={p.name} className='w-full h-40 object-contain mb-2' />
            <p className='text-xs text-gray-500 uppercase'>{p.brand}</p>
            <p className='text-sm font-medium'>{p.name}</p>
            <p className='text-sm'>${p.basePrice}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
