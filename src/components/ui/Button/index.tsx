import { ButtonHTMLAttributes } from 'react'
import { cn } from '@/utils/classname'
import { type VariantProps, cva } from 'class-variance-authority'

const ButtonVariants = cva('rounded bg-primary p-1 text-theme-button-primary', {
  variants: {
    size: {
      md: 'h-9 px-4',
      sm: 'px-3 h-8 text-md',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

interface IButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof ButtonVariants> {}

export default function Button({
  className,
  size,
  children,
  ...props
}: IButtonProps) {
  return (
    <button {...props} className={cn(ButtonVariants({ size, className }))}>
      {children}
    </button>
  )
}
