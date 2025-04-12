import '../styles/globals.css'
import { CartProvider } from '@/app/providers/CartProvider'
import Navbar from '@/app/components/Navbar'
import type { ReactNode } from 'react'

export const metadata = {
  title: 'Smartphone Catalog',
  description: 'A Next.js SSR phone catalog'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
    <body>
    <CartProvider>
      <Navbar />
      <main className='p-4'>
        {children}
      </main>
    </CartProvider>
    </body>
    </html>
  )
}
