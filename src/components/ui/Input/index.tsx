import { InputHTMLAttributes } from 'react'
import { cn } from '@/utils/classname'

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  errors?: string
}

export default function Input({ className, errors, ...props }: IInputProps) {
  return (
    <>
      <input
        {...props}
        className={cn(
          'h-10 rounded bg-theme-input px-4 focus-visible:outline-none',
          className,
        )}
      />
      {errors && <span className="text-red-100">{errors}</span>}
    </>
  )
}
