import { useState, type FormEvent } from 'react'
import { Button } from '../../components/Button/Button'
import { Input } from '../../components/Input/Input'
import { STORAGE_KEYS } from '../../constants/storage'
import styles from './Login.module.css'

export interface LoginProps {
  onSuccess: () => void
}

export function Login({ onSuccess }: LoginProps) {
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const trimmed = username.trim()
    if (!trimmed) {
      setError('Please enter your username')
      return
    }
    setError('')
    localStorage.setItem(STORAGE_KEYS.USERNAME, trimmed)
    onSuccess()
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>Welcome to CodeLeap network!</h1>
        <p className={styles.instruction}>Please enter your username</p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="John doe"
            autoFocus
            aria-label="Username"
            error={!!error}
          />
          {error && <p className={styles.error} role="alert">{error}</p>}
          <div className={styles.actions}>
            <Button type="submit">ENTER</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
