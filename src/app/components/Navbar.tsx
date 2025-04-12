'use client'

import { useCart } from '@/app/providers/CartProvider'
import Link from 'next/link'

export default function Navbar() {
  const { cart } = useCart()

  return (
    <nav className='flex items-center justify-between bg-gray-100 p-4 mb-4'>
      <Link href='/' className='font-bold text-xl'>
        Home
      </Link>

      <Link href='/phones' className='font-bold text-lg'>
        Phones
      </Link>

      <Link href='/cart' className='flex items-center gap-2'>
        <span>Cart</span>
        <span className='bg-blue-500 text-white px-2 py-1 rounded'>
          {cart.length}
        </span>
      </Link>
    </nav>
  )
}
