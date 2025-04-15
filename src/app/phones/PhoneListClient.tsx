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

  function handleSearchChange(e: ChangeEvent<HTMLInputElement>) {
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
            (item, index, arr) =>
              arr.findIndex((p) => p.id === item.id) === index
          )
          setPhones(uniqueData.slice(0, 20))
        }
      } catch (error) {
        console.error(error)
      }
    }

    getPhones()

    return () => {
      ignore = true
    }
  }, [search])

  return (
    <div className='w-full'>
      <div className='flex flex-col gap-1 mb-6 md:mb-12 w-full'>
        <div className='relative md:mb-2'>
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

        <span className='text-sm uppercase'>
          {phones.length} results
        </span>
      </div>

      <div className='overflow-hidden border-t border-l border-gray-300'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-0'>
          {phones.map((phone) => (
            <Link
              key={phone.id}
              href={`/phones/${phone.id}`}
              className='
                relative
                border-r border-b border-gray-300 p-4 flex flex-col
                group
                transition-colors
                transition-all transition-discrete
                overflow-hidden
              '
            >
              <div
                className='
                  absolute inset-0
                  bg-gradient-to-t from-black via-black/70 to-transparent
                  opacity-0
                  transition-opacity duration-300 ease-in-out
                  group-hover:opacity-100
                  pointer-events-none
                  z-10
                '
              />
                <div className='relative z-20 flex-1 flex items-center justify-center mb-2'>
                  <img
                    src={phone.imageUrl}
                    alt={`${phone.brand} - ${phone.name}`}
                    className='h-60 w-full object-contain transition-transform duration-300 ease-in-out'
                  />
                </div>

                <div className='relative z-20 w-full flex justify-between items-end text-gray-700 group-hover:text-white transition-colors duration-300 ease-in-out'>
                  <div className='flex flex-col'>
                    <p className='text-sm text-gray-500 uppercase'>
                      {phone.brand}
                    </p>
                    <h3 className='text-medium'>{phone.name}</h3>
                  </div>
                  <p className='text-normal'>{phone.basePrice} EUR</p>
                </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
