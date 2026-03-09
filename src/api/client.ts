function getBaseUrl(): string {
  const url = import.meta.env.VITE_API_BASE_URL
  if (url && typeof url === 'string') {
    return url.replace(/\/$/, '')
  }
  return 'https://dev.codeleap.co.uk'
}

export class ApiError extends Error {
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

export interface GetOptions {
  signal?: AbortSignal
}

export async function get<T>(path: string, options?: GetOptions): Promise<T> {
  const base = getBaseUrl()
  const url = path.startsWith('/') ? `${base}${path}` : `${base}/${path}`
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
    signal: options?.signal,
  })

  if (!response.ok) {
    throw new ApiError(
      response.statusText || `Request failed with status ${response.status}`,
      response.status,
    )
  }

  return response.json() as Promise<T>
}

export interface PostOptions {
  body: unknown
}

export async function post<T>(path: string, options: PostOptions): Promise<T> {
  const base = getBaseUrl()
  const url = path.startsWith('/') ? `${base}${path}` : `${base}/${path}`
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(options.body),
  })

  if (!response.ok) {
    throw new ApiError(
      response.statusText || `Request failed with status ${response.status}`,
      response.status,
    )
  }

  return response.json() as Promise<T>
}

export interface PatchOptions {
  body: unknown
}

export async function patch<T>(path: string, options: PatchOptions): Promise<T> {
  const base = getBaseUrl()
  const url = path.startsWith('/') ? `${base}${path}` : `${base}/${path}`
  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(options.body),
  })

  if (!response.ok) {
    throw new ApiError(
      response.statusText || `Request failed with status ${response.status}`,
      response.status,
    )
  }

  return response.json() as Promise<T>
}

export async function del<T>(path: string): Promise<T> {
  const base = getBaseUrl()
  const url = path.startsWith('/') ? `${base}${path}` : `${base}/${path}`
  const response = await fetch(url, {
    method: 'DELETE',
    headers: { Accept: 'application/json' },
  })

  if (!response.ok) {
    throw new ApiError(
      response.statusText || `Request failed with status ${response.status}`,
      response.status,
    )
  }

  if (response.status === 204 || response.headers.get('content-length') === '0') {
    return undefined as T
  }
  return response.json() as Promise<T>
}

export const apiClient = { get, post, patch, delete: del }
