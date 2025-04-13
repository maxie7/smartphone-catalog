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

async function getParams(params: { id: string }) {
  return params
}

export default async function PhoneDetailPage(props: PhoneDetailPageProps) {
  const params = await getParams(props.params)
  const phone = await fetchPhoneById(params.id)

  // Deduplicate the similarProducts array (this is a API/backend bug)
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
