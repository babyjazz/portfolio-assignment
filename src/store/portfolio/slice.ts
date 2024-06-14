import { IPortfolio } from '@/types/portfolio'
import { createSlice } from '@reduxjs/toolkit'

const initialState: IPortfolio | null = null

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    setPortfolio(_, action) {
      return action.payload
    },
  },
})

export default portfolioSlice
