import type { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './Button.module.css'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variant?: 'primary' | 'danger' | 'secondary' | 'success'
}

export function Button({
  className = '',
  children,
  variant = 'primary',
  ...props
}: ButtonProps) {
  const variantClass =
    variant === 'danger'
      ? styles.danger
      : variant === 'secondary'
        ? styles.secondary
        : variant === 'success'
          ? styles.success
          : ''
  return (
    <button
      className={`${styles.button} ${variantClass} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  )
}
