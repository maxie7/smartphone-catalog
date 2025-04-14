'use client'

import { useCart } from '@/app/providers/CartProvider'
import { useRouter } from 'next/navigation'

export default function CartPage() {
  const { cart, removeItem } = useCart()
  const router = useRouter()

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  // If cart is empty
  if (cart.length === 0) {
    return (
      <section className='max-w-screen-lg mx-auto p-4 md:p-8 flex flex-col min-h-[calc(100vh-60px)]'>
        <div className='mb-6'>
          <h2 className='text-xl md:text-2xl font-medium text-gray-500 uppercase'>
            CART (0)
          </h2>
        </div>

        <div className='flex-1 flex items-center justify-center'>
          <p className='text-gray-500'>Your cart is empty</p>
        </div>

        {/* Sticky bottom bar */}
        <div
          className='
            sticky bottom-0 left-0 w-full
            bg-white
            flex justify-center
            py-4
            mt-auto
          '
        >
          <button
            onClick={() => router.push('/phones')}
            className='border border-gray-600 text-gray-700 px-6 py-3 uppercase
                       hover:bg-gray-100 transition-colors cursor-pointer'
          >
            Continue Shopping
          </button>
        </div>
      </section>
    )
  }

  // If cart has items
  return (
    <section className='max-w-screen-lg mx-auto p-4 md:p-8 flex flex-col min-h-[calc(100vh-60px)]'>
      {/* Cart Title */}
      <div className='mb-6'>
        <h2 className='text-xl md:text-2xl font-medium text-gray-500 uppercase'>
          CART ({cart.length})
        </h2>
      </div>

      {/* Cart items */}
      <div className='flex-1 pb-[40px]'>
        {cart.map((item) => (
          <div
            key={item.id}
            className='
              flex flex-nowrap
              items-center
              gap-4
              mb-8
            '
          >
            <div className='flex-shrink-0'>
              <img
                src={item.imageUrl}
                alt={item.name}
                className='
                  w-24 h-24
                  sm:w-32 sm:h-32
                  md:w-40 md:h-40
                  object-contain
                '
              />
            </div>

            <div className='flex flex-col flex-1 min-w-0'>
              <h3 className='text-base sm:text-lg font-medium truncate'>
                {item.brand} {item.name}
              </h3>
              <p className='text-sm text-gray-600 truncate'>
                {item.storage} | {item.color}
              </p>
              <p className='text-sm text-gray-600'>
                {item.price} EUR
              </p>

              <button
                onClick={() => removeItem(item.id)}
                className='text-red-600 text-sm hover:underline mt-1 self-start'
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className='sticky bottom-0 left-0 w-full bg-white px-4 py-4'>
        <div className='flex flex-col sm:flex-row items-center sm:justify-between gap-4'>
          <div className='flex sm:order-none items-center justify-between w-full sm:w-auto'>
            <span className='uppercase text-sm font-medium mr-2'>TOTAL</span>
            <span className='uppercase text-sm font-medium'>
              {totalPrice} EUR
            </span>
          </div>

          <div className='flex gap-4 w-full sm:w-auto justify-end'>
            <button
              onClick={() => router.push('/phones')}
              className='border border-gray-600 text-gray-700 px-6 py-3 uppercase
                         hover:bg-gray-100 transition-colors cursor-pointer'
            >
              Continue Shopping
            </button>
            <button
              onClick={() => alert('Proceed to payment')}
              className='bg-black text-white px-6 py-3 uppercase flex-1 text-center sm:flex-none cursor-pointer'
            >
              Pay
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
