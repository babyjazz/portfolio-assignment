import { ButtonHTMLAttributes } from 'react'
import { cn } from '@/utils/classname'

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button({
  className,
  children,
  ...props
}: IButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        'bg-primary text-theme-button-primary rounded p-1',
        className,
      )}
    >
      {children}
    </button>
  )
}
