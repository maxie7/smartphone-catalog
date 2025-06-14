import { fetchPhones } from '@/lib/api'

beforeAll(() => {
  process.env.API_BASE_URL = 'http://example.com'
  process.env.API_KEY = 'test-key'
})

afterAll(() => {
  delete process.env.API_BASE_URL
  delete process.env.API_KEY
})

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve([
        { id: 1, name: 'Phone A', price: 299 },
        { id: 2, name: 'Phone B', price: 399 },
      ]),
  })
) as jest.Mock

describe('fetchPhones', () => {
  it('fetches phone list', async () => {
    const phones = await fetchPhones()
    expect(phones).toHaveLength(2)
    expect(phones[0].name).toBe('Phone A')
  })
})
