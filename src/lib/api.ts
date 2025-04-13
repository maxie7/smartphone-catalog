interface Phone {
  id: string
  brand: string
  name: string
  basePrice: number
  imageUrl: string
}

interface PhoneDetail extends Phone {
  description: string
  rating: number
  specs: {
    screen: string
    resolution: string
    processor: string
    mainCamera: string
    selfieCamera: string
    battery: string
    os: string
    screenRefreshRate: string
  }
  colorOptions: {
    name: string
    hexCode: string
    imageUrl: string
  }[]
  storageOptions: {
    capacity: string
    price: number
  }[]
  similarProducts: Phone[]
}

const API_BASE_URL = process.env.API_BASE_URL
if (!API_BASE_URL) {
  throw new Error('API_BASE_URL environment variable is not defined')
}

const API_KEY = process.env.API_KEY
if (!API_KEY) {
  throw new Error('API_KEY environment variable is not defined')
}

export async function fetchPhones(search?: string): Promise<Phone[]> {
  let url = `${API_BASE_URL}/products?limit=23`
  if (search) {
    url += `&search=${encodeURIComponent(search)}`
  }

  const res = await fetch(url, {
    headers: {
      'x-api-key': API_KEY || ''
    }
  })

  if (!res.ok) {
    throw new Error('Failed to fetch phones')
  }

  return res.json()
}

export async function fetchPhoneById(id: string): Promise<PhoneDetail> {
  const res = await fetch(`${API_BASE_URL}/products/${id}`, {
    headers: {
      'x-api-key': API_KEY || ''
    },
    next: { revalidate: 3600 }
  })

  if (!res.ok) {
    throw new Error('Failed to fetch phone by id')
  }

  return res.json()
}
