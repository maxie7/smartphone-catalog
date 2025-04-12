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
      <div className='mb-3'>
        <input
          type='text'
          placeholder='Search by brand or name...'
          value={search}
          onChange={handleSearchChange}
          className='border p-2 rounded'
        />
        <span className='ml-2'>Found {phones.length} items</span>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {phones.map((phone) => (
          <div key={phone.id} className='border p-4 rounded'>
            <img src={phone.imageUrl} alt={`${phone.brand} - ${phone.name}`} />
            <h2 className='font-semibold'>{phone.name}</h2>
            <p>{phone.brand}</p>
            <p>Base Price: ${phone.basePrice}</p>
            <a
              href={`/phones/${phone.id}`}
              className='text-blue-500 underline mt-2 inline-block'
            >
              View Details
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
