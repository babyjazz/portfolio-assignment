import { IPortfolio } from '@/types/portfolio'
import { createSlice } from '@reduxjs/toolkit'

const initialState: { data: IPortfolio[] } = { data: [] }

const portfolio = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    addPortfolio(state, action) {
      if (!state.data.includes(action.payload)) {
        state.data.push(action.payload)
      }
    },
  },
})

export default portfolio
