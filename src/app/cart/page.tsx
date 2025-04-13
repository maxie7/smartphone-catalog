'use client'

import { useCart } from '@/app/providers/CartProvider'
import { useRouter } from 'next/navigation'

export default function CartPage() {
  const { cart, removeItem } = useCart()
  const router = useRouter()

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  // Empty cart layout
  if (cart.length === 0) {
    return (
      <section className='max-w-screen-lg mx-auto p-4 md:p-8 flex flex-col min-h-screen'>
        <div className='mb-6'>
          <h2 className='text-xl md:text-2xl font-medium text-gray-700 uppercase'>
            CART (0)
          </h2>
        </div>

        <div className='flex-1 flex items-center justify-center'>
          <p className='text-gray-500'>Your cart is empty</p>
        </div>

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
    <section className='max-w-screen-lg mx-auto p-4 md:p-8 flex flex-col min-h-screen'>
      {/* Cart Title */}
      <div className='mb-6'>
        <h2 className='text-xl md:text-2xl font-medium text-gray-700 uppercase'>
          CART ({cart.length})
        </h2>
      </div>

      {/* Cart items list */}
      <div className='flex-1 overflow-auto pb-[120px]'>
        {cart.map((item) => (
          <div
            key={item.id}
            className='flex flex-col md:flex-row items-start md:items-center gap-4 mb-8'
          >
            {/* Phone image */}
            <div className='flex-shrink-0'>
              <img
                src={item.imageUrl}
                alt={item.name}
                className='w-40 md:w-56 object-contain'
              />
            </div>

            {/* Item info */}
            <div className='flex flex-col gap-1 md:gap-2'>
              <h3 className='text-lg font-medium'>
                {item.brand} {item.name}
              </h3>
              <p className='text-sm text-gray-600'>
                {item.storage} | {item.color}
              </p>
              <p className='text-sm text-gray-600'>
                {item.price} EUR
              </p>

              <button
                onClick={() => removeItem(item.id)}
                className='text-red-600 text-sm hover:underline mt-1'
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Sticky bottom bar */}
      <div
        className='
          sticky bottom-0 left-0 w-full
          bg-white
          flex
          items-center
          justify-between
          px-4 py-4
          gap-4
        '
      >
        {/* Left: Continue Shopping */}
        <button
          onClick={() => router.push('/phones')}
          className='border border-gray-600 text-gray-700 px-6 py-3 uppercase
                     hover:bg-gray-100 transition-colors cursor-pointer'
        >
          Continue Shopping
        </button>

        <div className='flex w-[140px] justify-between uppercase text-sm font-medium'>
          <span>TOTAL</span>
          <span>{totalPrice} EUR</span>
        </div>

        {/* Right: Pay button */}
        <button
          onClick={() => alert('Proceed to payment')}
          className='bg-black text-white px-6 py-3 uppercase'
        >
          Pay
        </button>
      </div>
    </section>
  )
}
