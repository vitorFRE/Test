import { useState, useEffect, useCallback } from 'react'
import { careersApi } from '../api/careers'
import type { Post } from '../types/post'

export const PAGE_SIZE = 10

export interface UseCareersListResult {
  posts: Post[]
  count: number
  isLoading: boolean
  error: Error | null
  hasNextPage: boolean
  hasPreviousPage: boolean
  currentPage: number
  totalPages: number
  goToNextPage: () => void
  goToPreviousPage: () => void
  refetch: () => Promise<void>
}

export function useCareersList(): UseCareersListResult {
  const [posts, setPosts] = useState<Post[]>([])
  const [count, setCount] = useState(0)
  const [next, setNext] = useState<string | null>(null)
  const [previous, setPrevious] = useState<string | null>(null)
  const [offset, setOffset] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const load = useCallback(async (offsetToFetch: number) => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await careersApi.getList(PAGE_SIZE, offsetToFetch)
      setPosts(result.posts)
      setCount(result.count)
      setNext(result.next)
      setPrevious(result.previous)
      setOffset(offsetToFetch)
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)))
      setPosts([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    load(0)
  }, [load])

  const refetch = useCallback(() => load(offset), [load, offset])
  const goToNextPage = useCallback(() => load(offset + PAGE_SIZE), [load, offset])
  const goToPreviousPage = useCallback(
    () => load(Math.max(0, offset - PAGE_SIZE)),
    [load, offset]
  )

  const totalPages = Math.ceil(count / PAGE_SIZE) || 1
  const currentPage = totalPages > 0 ? Math.floor(offset / PAGE_SIZE) + 1 : 1

  return {
    posts,
    count,
    isLoading,
    error,
    hasNextPage: !!next,
    hasPreviousPage: !!previous,
    currentPage,
    totalPages,
    goToNextPage,
    goToPreviousPage,
    refetch,
  }
}
