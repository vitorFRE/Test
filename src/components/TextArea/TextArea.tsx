import type { TextareaHTMLAttributes } from 'react'
import styles from './TextArea.module.css'

export type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: boolean
}

export function TextArea({ className = '', error, ...props }: TextAreaProps) {
  return (
    <textarea
      className={`${styles.textarea} ${error ? styles.error : ''} ${className}`.trim()}
      {...props}
    />
  )
}
