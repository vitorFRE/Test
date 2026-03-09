import type { InputHTMLAttributes } from 'react'
import styles from './Input.module.css'

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean
}

export function Input({ className = '', error, ...props }: InputProps) {
  return (
    <input
      className={`${styles.input} ${error ? styles.error : ''} ${className}`.trim()}
      {...props}
    />
  )
}
