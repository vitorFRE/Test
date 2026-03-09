import styles from './PostCard.module.css'
import deleteIcon from '../../assets/delete.svg'
import editIcon from '../../assets/edit.svg'

export interface PostCardProps {
  id: string
  title: string
  content: string
  username: string
  createdAt: Date
  currentUsername: string
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
}

function formatTimeAgo(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  if (diffMins < 1) return 'now'
  if (diffMins === 1) return '1 minute ago'
  if (diffMins < 60) return `${diffMins} minutes ago`
  const diffHours = Math.floor(diffMins / 60)
  if (diffHours === 1) return '1 hour ago'
  if (diffHours < 24) return `${diffHours} hours ago`
  const diffDays = Math.floor(diffHours / 24)
  if (diffDays === 1) return '1 day ago'
  return `${diffDays} days ago`
}

export function PostCard({
  id,
  title,
  content,
  username,
  createdAt,
  currentUsername,
  onEdit,
  onDelete,
}: PostCardProps) {
  const isOwner = currentUsername.trim() !== '' && username === currentUsername

  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <h3 className={styles.postTitle}>{title}</h3>
        {isOwner && (
          <div className={styles.actions}>
            {onDelete && (
              <button
                type="button"
                className={styles.iconButton}
                onClick={() => onDelete(id)}
                aria-label="Delete post"
              >
                <img src={deleteIcon} alt="" width={31.2} height={30} />
              </button>
            )}
            {onEdit && (
              <button
                type="button"
                className={styles.iconButton}
                onClick={() => onEdit(id)}
                aria-label="Edit post"
              >
                <img src={editIcon} alt="" width={31.2} height={30} />
              </button>
            )}
          </div>
        )}
      </header>
      <div className={styles.body}>
        <div className={styles.meta}>
          <span className={styles.author}>@{username}</span>
          <span className={styles.time}>{formatTimeAgo(createdAt)}</span>
        </div>
        <p className={styles.content}>{content}</p>
      </div>
    </article>
  )
}

