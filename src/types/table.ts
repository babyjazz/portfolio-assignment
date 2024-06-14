import { Row, RowData } from '@tanstack/react-table'

/**
 * Must define by global. follow by official document
 */
declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    column?: {
      className?: (row: Row<TData>) => string
    }
    header?: {
      className?: () => string
    }
  }
}
