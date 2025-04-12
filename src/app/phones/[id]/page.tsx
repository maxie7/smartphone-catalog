import { fetchPhoneById } from '@/lib/api'
import DetailClient from './DetailClient'

interface PhoneDetailPageProps {
  params: { id: string }
}

export default async function PhoneDetailPage(props: PhoneDetailPageProps) {
  const { params } = props
  const phone = await fetchPhoneById(params.id)

  return (
    <section>
      <h1 className='text-2xl font-bold mb-2'>
        {phone.brand} - {phone.name}
      </h1>
      <DetailClient phone={phone} />
    </section>
  )
}
