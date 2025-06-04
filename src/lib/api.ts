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

function getApiBaseUrl(): string {
  const baseUrl = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL
  if (!baseUrl) {
    throw new Error('API_BASE_URL environment variable is not defined')
  }
  return baseUrl
}

function getApiKey(): string {
  const key = process.env.API_KEY || process.env.NEXT_PUBLIC_API_KEY
  if (!key) {
    throw new Error('API_KEY environment variable is not defined')
  }
  return key
}

export async function fetchPhones(search?: string): Promise<Phone[]> {
  const API_BASE_URL = getApiBaseUrl()
  const API_KEY = getApiKey()

  let url = `${API_BASE_URL}/products?limit=23`
  if (search) {
    url += `&search=${encodeURIComponent(search)}`
  }

  const res = await fetch(url, {
    headers: {
      'x-api-key': API_KEY
    }
  })

  if (!res.ok) {
    throw new Error('Failed to fetch phones')
  }

  return res.json()
}

export async function fetchPhoneById(id: string): Promise<PhoneDetail> {
  const API_BASE_URL = getApiBaseUrl()
  const API_KEY = getApiKey()

  const res = await fetch(`${API_BASE_URL}/products/${id}`, {
    headers: {
      'x-api-key': API_KEY
    },
    next: { revalidate: 3600 }
  })

  if (!res.ok) {
    throw new Error('Failed to fetch phone by id')
  }

  return res.json()
}
