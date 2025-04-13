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
    <div className='w-full'>

      <div className='flex flex-col gap-1 mb-6 md:mb-12 w-full'>
        <div className='relative'>
          <input
            type='text'
            placeholder='Search for a smartphone...'
            value={search}
            onChange={handleSearchChange}
            className='w-full border-b border-gray-600 focus:outline-none text-lg py-2 pr-8 placeholder-gray-400'
          />
          {search && (
            <button
              onClick={handleClearSearch}
              className='absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 px-2 cursor-pointer'
            >
              &times;
            </button>
          )}
        </div>

        <span className='text-gray-500 uppercase text-sm'>
          {phones.length} results
        </span>
      </div>

      <div className='border border-gray-600 divide-y divide-gray-600 overflow-hidden'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 divide-x divide-gray-600'>
          {phones.map((phone) => (
            <Link
              key={phone.id}
              href={`/phones/${phone.id}`}
              className='p-4 flex flex-col hover:bg-gray-50 transition-colors'
            >
              <div className='flex-1 flex items-center justify-center mb-2'>
                <img
                  src={phone.imageUrl}
                  alt={`${phone.brand} - ${phone.name}`}
                  className='h-60 object-contain'
                />
              </div>

              {/* Bottom row with brand+name on left, price on right */}
              <div className='w-full flex justify-between items-end'>
                <div className='flex flex-col'>
                  <p className='text-xs text-gray-500 uppercase'>
                    {phone.brand}
                  </p>
                  <h3 className='font-semibold'>{phone.name}</h3>
                </div>
                <p className='text-sm text-gray-500'>
                  ${phone.basePrice}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
