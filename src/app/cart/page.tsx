'use client'

import { useCart } from '@/app/providers/CartProvider'

export default function CartPage() {
  const { cart, removeItem } = useCart()

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <section>
      <h1 className='text-2xl font-bold mb-4'>Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} className='border p-4 mb-4 flex justify-between items-center'>
              <div>
                <img src={item.imageUrl} alt={item.name} className='w-16 h-16 object-contain mb-2' />
                <p>{item.brand} - {item.name}</p>
                <p>Color: {item.color}, Storage: {item.storage}</p>
                <p>Price: {item.price}$</p>
              </div>
              <button
                className='bg-red-500 text-white px-3 py-1 rounded'
                onClick={() => removeItem(item.id)}
              >
                Remove
              </button>
            </div>
          ))}

          <p className='text-lg font-semibold'>Total: {totalPrice}$</p>
        </div>
      )}

      <a href='/phones' className='inline-block bg-blue-500 text-white px-4 py-2 mt-4 rounded'>
        Continue Shopping
      </a>
    </section>
  )
}
