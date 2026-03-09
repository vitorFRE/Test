import { Button } from '../Button/Button'
import styles from './Pagination.module.css'

export interface PaginationProps {
  hasPrevious: boolean
  hasNext: boolean
  onPrevious: () => void
  onNext: () => void
  summary?: string
}

export function Pagination({
  hasPrevious,
  hasNext,
  onPrevious,
  onNext,
  summary,
}: PaginationProps) {
  return (
    <nav className={styles.pagination} aria-label="Pagination">
      <Button
        type="button"
        variant="secondary"
        disabled={!hasPrevious}
        onClick={onPrevious}
      >
        Previous
      </Button>
      {summary && <span className={styles.summary}>{summary}</span>}
      <Button
        type="button"
        variant="secondary"
        disabled={!hasNext}
        onClick={onNext}
      >
        Next
      </Button>
    </nav>
  )
}
