import { fetchPhones } from '@/lib/api'
import PhoneListClient from '@/app/phones/PhoneListClient'

export default async function PhonesPage() {
  const data = await fetchPhones()

  const uniqueData = data.filter(
    (item, index, arr) => arr.findIndex((p) => p.id === item.id) === index
  ).slice(0, 20)

  return (
    <section>
      <h1 className='text-2xl font-bold mb-4'>Phone Catalog</h1>
      <PhoneListClient initialPhones={uniqueData} />
    </section>
  )
}
