import { TableHTMLAttributes } from 'react'

interface ITableProps extends TableHTMLAttributes<HTMLTableElement> {}

export default function Table({ children, ...props }: ITableProps) {
  return (
    <div className="overflow-x-auto">
      <table {...props}>{children}</table>
    </div>
  )
}
