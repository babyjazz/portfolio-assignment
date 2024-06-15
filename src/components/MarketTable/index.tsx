import { useRef } from 'react'
import { columns } from './columns'
import { useGetMarketsQuery } from '@/services/markets'
import { IMarket } from '@/types/markets'
import { cn } from '@/utils/classname'
import {
  Row,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useVirtualizer } from '@tanstack/react-virtual'

export default function MarketTable() {
  const { data: portfolio = [] } = useGetMarketsQuery(undefined, {
    pollingInterval: 5000,
  })
  const table = useReactTable({
    data: portfolio,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  const { rows } = table.getRowModel()
  const parentRef = useRef<HTMLDivElement>(null)
  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 34,
    overscan: 20,
  })

  return (
    <div ref={parentRef}>
      <div style={{ height: `${virtualizer.getTotalSize()}px` }}>
        <table className="w-full">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={cn(
                    'text-right',
                    header.column.columnDef.meta?.header?.className?.(),
                  )}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </th>
              ))}
            </tr>
          ))}

          <tbody>
            {virtualizer.getVirtualItems().map((virtualRow, i) => {
              const row = rows[virtualRow.index] as Row<IMarket>
              return (
                <tr
                  key={row.id}
                  style={{
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${
                      virtualRow.start - i * virtualRow.size
                    }px)`,
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className={cn(
                        'py-2 text-right text-sm',
                        cell.column.columnDef.meta?.column?.className?.(row),
                      )}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
