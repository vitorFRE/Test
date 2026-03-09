import { STORAGE_KEYS } from '../constants/storage'

export function getStoredUsername(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(STORAGE_KEYS.USERNAME)
}

export function clearStoredUsername(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEYS.USERNAME)
}
