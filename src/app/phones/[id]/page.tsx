import { fetchPhoneById } from '@/lib/api'
import DetailClient from './DetailClient'

interface PhoneDetailPageProps {
  params: { id: string }
}

function deduplicateById<T extends { id: string }>(items: T[]): T[] {
  return items.filter(
    (item, index, arr) => arr.findIndex((p) => p.id === item.id) === index
  )
}

export default async function PhoneDetailPage(props: PhoneDetailPageProps) {
  const { params } = props
  const phone = await fetchPhoneById(params.id)

  // Deduplicate the similarProducts array (this is a backend bug)
  phone.similarProducts = deduplicateById(phone.similarProducts)

  return (
    <section>
      <h1 className='text-2xl font-bold mb-2'>
        {phone.brand} - {phone.name}
      </h1>
      <DetailClient phone={phone} />
    </section>
  )
}
