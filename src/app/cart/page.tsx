'use client'

import { useCart } from '@/app/providers/CartProvider'

export default function CartPage() {
  const { cart, removeItem } = useCart()
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (cart.length === 0) {
    // Empty cart layout
    return (
      <section className='max-w-screen-lg mx-auto px-4 py-6'>
        <h1 className='text-2xl text-gray-500 font-medium mb-4 uppercase'>Cart ({cart.length})</h1>
        <a
          href='/phones'
          className='inline-block bg-white border border-gray-400 text-gray-500 px-6 py-3 uppercase'
        >
          Continue Shopping
        </a>
      </section>
    )
  }

  // If the cart has items:
  return (
    <section className='max-w-screen-lg mx-auto px-4 py-6'>
      <h1 className='text-2xl text-gray-500 font-medium mb-4 uppercase'>
        Cart ({cart.length})
      </h1>

      <div className='flex flex-col gap-4'>
        {cart.map((item) => (
          <div
            key={item.id}
            className='flex flex-col md:flex-row items-center md:justify-between 
                       border rounded p-4'
          >
            {/* IMAGE & INFO */}
            <div className='flex items-center gap-4 mb-4 md:mb-0'>
              <img
                src={item.imageUrl}
                alt={item.name}
                className='w-24 h-24 object-contain'
              />
              <div>
                <p className='font-medium text-lg'>
                  {item.brand} {item.name}
                </p>
                <p className='text-sm text-gray-600'>
                  Color: {item.color} | Storage: {item.storage}
                </p>
                <p className='text-sm text-gray-600'>
                  Price: ${item.price} x {item.quantity}
                </p>
              </div>
            </div>

            {/* REMOVE BUTTON */}
            <button
              className='text-sm text-red-600 hover:underline hover:text-red-800 
                         md:self-start md:mt-2'
              onClick={() => removeItem(item.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* TOTAL + BUTTONS */}
      <div className='mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
        {/* Total Price */}
        <p className='text-xl font-semibold'>
          Total: ${totalPrice}
        </p>

        {/* Button row */}
        <div className='flex gap-4'>
          {/* Continue Shopping link */}
          <a
            href='/phones'
            className='inline-block border border-gray-600 px-6 py-3 text-sm 
                       hover:bg-gray-100 transition-colors'
          >
            Continue Shopping
          </a>

          {/* Pay Button */}
          <button
            onClick={() => alert('Proceed to payment')}
            className='bg-black text-white px-6 py-3 text-sm'
          >
            Pay
          </button>
        </div>
      </div>
    </section>
  )
}
