const BASE_URL = import.meta.env.VITE_WP_API_URL as string | undefined

export function wpBaseUrl(): string | undefined {
  return BASE_URL
}

export async function wpFetch<T>(path: string): Promise<T> {
  if (!BASE_URL) {
    throw new Error('VITE_WP_API_URL não configurado')
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
  })

  if (!res.ok) {
    throw new Error(`WordPress API error: ${res.status} ${path}`)
  }

  return res.json() as Promise<T>
}
