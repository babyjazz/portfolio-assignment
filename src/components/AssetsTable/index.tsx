import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { columns } from './columns'
import { useGetMarketsQuery } from '@/services/markets'
import { portfolioSelectors } from '@/store/portfolio'
import { IMarket } from '@/types/markets'
import { cn } from '@/utils/classname'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table'

export default function AssetsTable() {
  const portfolio = useSelector(portfolioSelectors.portfolio)
  const { data: markets = [] } = useGetMarketsQuery(undefined, {
    pollingInterval: 5000,
  })

  const portfolioMarkets = useMemo(() => {
    if (portfolio?.length > 0 && markets?.length > 0) {
      const _portfolioMarkets: IMarket[] = []
      portfolio.forEach((o) => {
        const market = markets.find(
          (m) => m.name?.toLowerCase() === o.toLowerCase(),
        )
        if (market) _portfolioMarkets.push(market)
      })
      return _portfolioMarkets
    }
    return []
  }, [portfolio, markets])

  const table = useReactTable({
    data: portfolioMarkets,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  return (
    <div>
      <table className="w-full">
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
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext(),
                )}
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
      </table>
    </div>
  )
}
