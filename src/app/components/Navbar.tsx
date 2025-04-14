'use client'

import { useCart } from '@/app/providers/CartProvider'
import Link from 'next/link'

export default function Navbar() {
  const { cart } = useCart()
  const cartCount = cart.length
  const cartIconSrc = cartCount > 0 ? '/icons/cart-1.svg' : '/icons/cart-0.svg'

  return (
    <header className='w-full lg:mx-4'>
      <div className='px-4 lg:pr-8 h-16 flex items-center justify-between'>
        <Link href='/phones' className='text-2xl font-bold tracking-wide'>
          <img src='/icons/mbst-logo.svg' alt='MBST' className='h-8' />
        </Link>

        <Link href='/cart' className='flex items-center gap-1'>
          <img src={cartIconSrc} alt='Cart' className='h-6' />
          <span className='px-2 py-1 text-2xl font-thin'>
            {cartCount}
          </span>
        </Link>
      </div>
    </header>
  )
}
