import { RootState } from '@/store'
import { ISummaryLevel1 } from '@/types/summaryLevel1'

export const summaryLevel1 = (state: RootState): ISummaryLevel1 =>
  state.summaryLevel1
