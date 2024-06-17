import { IMarket } from '@/types/markets'
import { cn } from '@/utils/classname'
import { createColumnHelper } from '@tanstack/react-table'
import BigNumber from 'bignumber.js'

const columnHelper = createColumnHelper<IMarket>()

export const columns = [
  columnHelper.accessor('name', {
    header: () => 'Market',
    cell: ({ getValue }) => getValue(),
    meta: {
      column: {
        className: () => 'text-left',
      },
      header: {
        className: () => 'text-left',
      },
    },
  }),
  columnHelper.accessor('price', {
    header: () => 'Price',
    cell: ({ getValue }) => BigNumber(getValue()).toFormat(),
  }),
  columnHelper.accessor('change', {
    header: () => '24H Change',
    cell: ({ getValue }) => BigNumber(getValue()).toFormat(),
    meta: {
      column: {
        className: ({ original }) => {
          if (original.percentChange === 0) return ''
          return original.percentChange < 0 ? 'text-red-100' : 'text-green-100'
        },
      },
    },
  }),
  columnHelper.accessor('percentChange', {
    header: () => '24H %',
    cell: ({ getValue }) =>
      BigNumber(getValue()).toFormat(2, BigNumber.ROUND_DOWN),
    meta: {
      column: {
        className: ({ original }) => {
          const className = ['text-right']
          if (original.percentChange !== 0) {
            className.push(
              original.percentChange < 0 ? 'text-red-100' : 'text-green-100',
            )
          }
          return cn(className)
        },
      },
    },
  }),
]
