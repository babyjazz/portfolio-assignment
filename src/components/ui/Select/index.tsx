import { ChangeEvent, InputHTMLAttributes, useState } from 'react'
import { cn } from '@/utils/classname'
import { Combobox } from '@headlessui/react'
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
  extends Pick<
      InputHTMLAttributes<HTMLInputElement>,
      'type' | 'placeholder' | 'autoComplete'
    >,
    VariantProps<typeof InputVariants>,
    ISelect {
  errors?: string
  className?: string
  width?: number
}

export interface ISelect {
  options: { label: string; value: string }[]
  value: string
  onSelect: (value: ISelect['options'][number]['value']) => void
}

export default function Select({
  options,
  value,
  onSelect,
  size,
  width,
  className,
  errors,
  ...props
}: IInputProps) {
  const [filtered, setFitered] = useState<ISelect['options']>([])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setFitered([])
      return
    }
    const _filtered = options.filter((option) => {
      return option.label?.toLowerCase()?.includes(e.target.value)
    })
    setFitered(_filtered)
  }

  return (
    <div className="flex flex-col">
      <Combobox
        value={value}
        onChange={(value) => {
          if (onSelect) onSelect(value as ISelect['options'][number]['value'])
        }}
      >
        <Combobox.Input
          {...props}
          onChange={handleChange}
          className={cn(InputVariants({ size, className }))}
          style={{ width }}
        />
        <Combobox.Options
          className={cn(
            'absolute z-10 mt-10 max-h-72 overflow-auto rounded bg-theme-input',
          )}
        >
          {filtered.map((option) => (
            <Combobox.Option
              key={option.value}
              value={option.value}
              {...(width && { style: { width: width } })}
              className="rounded px-3 py-2 [&[data-active]]:bg-primary [&[data-active]]:text-black"
            >
              {option.label}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
      {errors && <span className="mt-1 text-sm text-red-100">{errors}</span>}
    </div>
  )
}
