import { fetchPhones } from '@/lib/api'
import PhoneListClient from '@/app/phones/PhoneListClient'

export default async function PhonesPage() {
  const initialPhones = await fetchPhones()

  // Render a client component for handling search
  return (
    <section>
      <h1 className='text-2xl font-bold mb-4'>Phone Catalog</h1>
      <PhoneListClient initialPhones={initialPhones} />
    </section>
  )
}
