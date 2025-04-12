'use client'

import { useCart } from '@/app/providers/CartProvider'
import Link from 'next/link'

export default function Navbar() {
  const { cart } = useCart()

  return (
    <header className="w-full border-b border-gray-200">
      <div className="max-w-screen-xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/phones" className="text-2xl font-bold tracking-wide">
          <img src="/icons/mbst-logo.svg" alt="MBST" className="h-8" />
        </Link>

        <Link href="/cart" className="flex items-center gap-2">
          <img src="/icons/cart-0.svg" alt="Cart" className="h-6" />
          <span className="px-2 py-1 text-2xl font-thin">
            {cart.length}
          </span>
        </Link>
      </div>
    </header>
  )
}
