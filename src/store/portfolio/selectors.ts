import { RootState } from '@/store'
import { IPortfolio } from '@/types/portfolio'

export const portfolio = (state: RootState): IPortfolio => state.porfolio
