import { InputHTMLAttributes } from 'react'
import { cn } from '@/utils/classname'
import { type VariantProps, cva } from 'class-variance-authority'

const InputVariants = cva(
  'rounded bg-theme-input focus-visible:outline-none placeholder:text-black-400',
  {
    variants: {
      size: {
        md: 'h-9 px-4',
        sm: 'px-3 h-8 text-md',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

interface IInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof InputVariants> {
  errors?: string
  className?: string
}

export default function Input({
  className,
  errors,
  size,
  ...props
}: IInputProps) {
  return (
    <>
      <input {...props} className={cn(InputVariants({ size, className }))} />
      {errors && <span className="text-red-100">{errors}</span>}
    </>
  )
}
