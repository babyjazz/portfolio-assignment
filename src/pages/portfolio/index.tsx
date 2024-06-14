import { useRef } from 'react'
import { columns } from './columns'
import { useGetPortfolioQuery } from '@/services/portfolio'
import { IPortfolioApi } from '@/types/portfolio'
import { cn } from '@/utils/classname'
import {
  Row,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useVirtualizer } from '@tanstack/react-virtual'

export default function Portfolio() {
  const { data: portfolio = [] } = useGetPortfolioQuery(undefined, {
    pollingInterval: 5000,
  })
  const table = useReactTable({
    data: portfolio,
    columns,
    getCoreRowModel: getCoreRowModel(),
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
    <div>
      <h1>Portfolio</h1>
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
                const row = rows[virtualRow.index] as Row<IPortfolioApi>
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
                          'py-2 text-right',
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
    </div>
  )
}
