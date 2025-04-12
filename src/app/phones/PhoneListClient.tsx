'use client'

import { useState, useEffect } from 'react'
import type { ChangeEvent } from 'react'

interface Phone {
  id: string
  brand: string
  name: string
  basePrice: number
  imageUrl: string
}

interface Props {
  initialPhones: Phone[]
}

export default function PhoneListClient({ initialPhones }: Props) {
  const [phones, setPhones] = useState<Phone[]>(initialPhones)
  const [search, setSearch] = useState('')

  async function handleSearchChange(e: ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value)
  }

  useEffect(() => {
    let ignore = false

    async function getPhones() {
      try {
        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/products?search=${search}&limit=23`
        const res = await fetch(url, {
          headers: {
            'x-api-key': process.env.NEXT_PUBLIC_API_KEY || ''
          }
        })
        if (!res.ok) {
          console.error('Error fetching phones')
        }
        const data: Phone[] = await res.json()

        if (!ignore) {
          const uniqueData = data.filter(
            (item: Phone, index: number, arr: Phone[]) => arr.findIndex((p) => p.id === item.id) === index
          )

          setPhones(uniqueData.slice(0, 20))
        }
      } catch (error) {
        console.error(error)
      }
    }

    getPhones()

    return () => { ignore = true }
  }, [search])

  return (
    <div>
      <div className='mb-6'>
        <input
          type='text'
          placeholder='Search for a smartphone...'
          value={search}
          onChange={handleSearchChange}
          className='w-full md:w-[400px] border-b border-gray-300 focus:outline-none text-lg py-2 placeholder-gray-400'
        />
        <span className='mt-2 text-gray-500 uppercase text-sm'>
          {phones.length} results
        </span>
      </div>

      {/* Grid of phones */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-6'>
        {phones.map((phone) => (
          <div key={phone.id} className="border rounded p-4">
            <img
              src={phone.imageUrl}
              alt={`${phone.brand} - ${phone.name}`}
              className="mx-auto mb-3 h-60 object-contain"
            />
            <p className="text-xs text-gray-500 uppercase">{phone.brand}</p>
            <h3 className="font-semibold">{phone.name}</h3>
            <p className="text-sm text-gray-500">
              Base Price: ${phone.basePrice}
            </p>
            <a
              href={`/phones/${phone.id}`}
              className="mt-2 inline-block text-blue-500 underline"
            >
              View Details
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
