import { columns } from './columns'
import Table from '@/components/ui/Table'
import { IMarket } from '@/types/markets'
import { cn } from '@/utils/classname'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table'

interface IAssetTableProps {
  data: IMarket[]
}

export default function AssetsTable({ data }: IAssetTableProps) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  return (
    <Table className="w-full">
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id} className="rounded bg-black-200 p-4">
          {headerGroup.headers.map((header) => (
            <th
              key={header.id}
              className={cn(
                'rounded p-5 text-right',
                header.column.columnDef.meta?.header?.className?.(),
              )}
            >
              {flexRender(header.column.columnDef.header, header.getContext())}
            </th>
          ))}
        </tr>
      ))}
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                className={cn(
                  'p-5 text-right text-sm',
                  cell.column.columnDef.meta?.column?.className?.(row),
                )}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
