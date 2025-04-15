'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface CartItem {
  id: string
  brand: string
  name: string
  price: number
  color?: string
  storage?: string
  imageUrl?: string
  quantity: number
}

interface CartContextValue {
  cart: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('cart')
    if (saved) {
      setCart(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  function addItem(newItem: CartItem) {
    setCart((prev) => {
      // Check if there's an existing cart item with the same id
      const existingIndex = prev.findIndex((i) => i.id === newItem.id)
      if (existingIndex !== -1) {
        // If found, increment its quantity
        const updated = [...prev]
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + newItem.quantity
        }
        return updated
      } else {
        // Otherwise push a new item
        return [...prev, newItem]
      }
    })
  }

  function removeItem(id: string) {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === id)
      if (existingIndex === -1) {
        // not found, just return
        return prev
      }

      const updated = [...prev]
      const existingItem = updated[existingIndex]
      if (existingItem.quantity > 1) {
        // Decrement
        updated[existingIndex] = {
          ...existingItem,
          quantity: existingItem.quantity - 1
        }
        return updated
      } else {
        // quantity is 1 => remove item entirely
        updated.splice(existingIndex, 1)
        return updated
      }
    })
  }
  function clearCart() {
    setCart([])
  }

  const value: CartContextValue = {
    cart,
    addItem,
    removeItem,
    clearCart
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
