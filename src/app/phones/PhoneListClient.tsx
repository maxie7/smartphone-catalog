'use client'

import { useState, useEffect, ChangeEvent } from 'react'
import Link from 'next/link'

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

  function handleClearSearch() {
    setSearch('')
  }

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
      <div className='relative md:mb-12 mb-6 w-full md:w-[400px]'>
        <input
          type='text'
          placeholder='Search for a smartphone...'
          value={search}
          onChange={handleSearchChange}
          className='w-full border-b border-gray-600 focus:outline-none text-lg py-2 placeholder-gray-400 pr-8'
        />
        {search && (
          <button
            onClick={handleClearSearch}
            className='absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 px-2'
          >
            &times;
          </button>
        )}
        <span className='mt-2 block text-gray-500 uppercase text-sm'>
          {phones.length} results
        </span>
      </div>

      {/* Grid of phones */}
      <div className='border border-gray-600 divide-y divide-gray-600 overflow-hidden'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 divide-x divide-gray-600'>
          {phones.map((phone) => (
            <Link
              key={phone.id}
              href={`/phones/${phone.id}`}
              className='p-4 flex flex-col items-center hover:bg-gray-50 transition-colors'
            >
              <img
                src={phone.imageUrl}
                alt={`${phone.brand} - ${phone.name}`}
                className='mb-3 h-60 object-contain'
              />
              <p className='text-xs text-gray-500 uppercase'>{phone.brand}</p>
              <h3 className='font-semibold'>{phone.name}</h3>
              <p className='text-sm text-gray-500'>
                Base Price: ${phone.basePrice}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
