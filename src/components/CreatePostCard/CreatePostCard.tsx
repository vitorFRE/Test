import { useState, type FormEvent } from 'react'
import { Button } from '../Button/Button'
import { Input } from '../Input/Input'
import { TextArea } from '../TextArea/TextArea'
import styles from './CreatePostCard.module.css'

export interface CreatePostCardProps {
  onSubmit: (title: string, content: string) => void | Promise<void>
  onError?: (message: string) => void
}

export function CreatePostCard({ onSubmit, onError }: CreatePostCardProps) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const canSubmit =
    title.trim() !== '' && content.trim() !== '' && !isSubmitting

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!canSubmit) return
    setIsSubmitting(true)
    setError('')
    onError?.('')
    try {
      await onSubmit(title.trim(), content.trim())
      setTitle('')
      setContent('')
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      setError(message)
      onError?.(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>What&apos;s on your mind?</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.titleGroup}>
          <label className={styles.label} htmlFor="post-title">
            Title
          </label>
          <Input
            id="post-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Hello world"
          />
        </div>
        <div className={styles.contentGroup}>
          <label className={styles.label} htmlFor="post-content">
            Content
          </label>
          <TextArea
            id="post-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content here"
          />
        </div>
        {error && (
          <p className={styles.error} role="alert">
            {error}
          </p>
        )}
        <div className={styles.actions}>
          <Button type="submit" disabled={!canSubmit}>
            {isSubmitting ? 'Creating…' : 'Create'}
          </Button>
        </div>
      </form>
    </div>
  )
}
